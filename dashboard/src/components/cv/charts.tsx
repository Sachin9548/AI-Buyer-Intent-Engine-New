import { AnimatePresence, motion, useSpring } from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------ helpers */

export type Pt = { x: number; y: number };

/** Monotone cubic interpolation (same family Stripe/Linear charts use). */
export function monotonePath(pts: Pt[]): string {
  const n = pts.length;
  if (n === 0) return "";
  if (n === 1) return `M ${pts[0]!.x} ${pts[0]!.y}`;
  if (n === 2) return `M ${pts[0]!.x} ${pts[0]!.y} L ${pts[1]!.x} ${pts[1]!.y}`;

  const dx: number[] = [];
  const dy: number[] = [];
  const ms: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const a = pts[i]!;
    const b = pts[i + 1]!;
    const h = b.x - a.x || 1e-6;
    dx.push(h);
    dy.push(b.y - a.y);
    ms.push((b.y - a.y) / h);
  }

  const tangents: number[] = new Array(n).fill(0);
  tangents[0] = ms[0]!;
  tangents[n - 1] = ms[n - 2]!;
  for (let i = 1; i < n - 1; i++) {
    const m0 = ms[i - 1]!;
    const m1 = ms[i]!;
    if (m0 * m1 <= 0) tangents[i] = 0;
    else {
      const h0 = dx[i - 1]!;
      const h1 = dx[i]!;
      const common = h0 + h1;
      tangents[i] = (3 * common) / ((common + h1) / m0 + (common + h0) / m1);
    }
  }

  let d = `M ${pts[0]!.x} ${pts[0]!.y}`;
  for (let i = 0; i < n - 1; i++) {
    const a = pts[i]!;
    const b = pts[i + 1]!;
    const h = dx[i]!;
    const c1x = a.x + h / 3;
    const c1y = a.y + (tangents[i]! * h) / 3;
    const c2x = b.x - h / 3;
    const c2y = b.y - (tangents[i + 1]! * h) / 3;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`;
  }
  return d;
}

function useMeasure() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      setWidth(w);
    });
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return reduced;
}

function scale(values: number[], padRatio = 0.15) {
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) {
    min = min - 1;
    max = max + 1;
  }
  const pad = (max - min) * padRatio;
  return { min: min - pad, max: max + pad };
}

/* ---------------------------------------------------------- Sparkline */

export function Sparkline({
  data,
  height = 40,
  className,
  tone = "accent",
  glowEnd = true,
}: {
  data: number[];
  height?: number;
  className?: string;
  tone?: "accent" | "success" | "warn" | "danger";
  glowEnd?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const { ref, width } = useMeasure();
  const reduced = useReducedMotion();
  const w = width || 160;
  const stops =
    tone === "success"
      ? ["#34D399", "#22D3EE"]
      : tone === "warn"
        ? ["#FBBF24", "#F87171"]
        : tone === "danger"
          ? ["#F87171", "#FBBF24"]
          : ["#7C6CFF", "#22D3EE"];

  const { d, area, last } = useMemo(() => {
    const vals = data.length ? data : [0, 0];
    const { min, max } = scale(vals, 0.2);
    const pts = vals.map((v, i) => ({
      x: (i / Math.max(1, vals.length - 1)) * (w - 4) + 2,
      y: height - 3 - ((v - min) / (max - min)) * (height - 8),
    }));
    const line = monotonePath(pts);
    return {
      d: line,
      area: `${line} L ${pts[pts.length - 1]!.x} ${height} L ${pts[0]!.x} ${height} Z`,
      last: pts[pts.length - 1]!,
    };
  }, [data, w, height]);

  return (
    <div ref={ref} className={cn("w-full", className)} style={{ height }}>
      <svg width={w} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`sl-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={stops[0]} />
            <stop offset="100%" stopColor={stops[1]} />
          </linearGradient>
          <linearGradient id={`sf-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stops[1]} stopOpacity="0.28" />
            <stop offset="100%" stopColor={stops[1]} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill={`url(#sf-${uid})`}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke={`url(#sl-${uid})`}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        {glowEnd ? (
          <>
            <circle cx={last.x} cy={last.y} r={4.5} fill={stops[1]} opacity={0.18}>
              {reduced ? null : (
                <animate attributeName="r" values="3.5;7;3.5" dur="2.4s" repeatCount="indefinite" />
              )}
            </circle>
            <circle cx={last.x} cy={last.y} r={2} fill={stops[1]} />
          </>
        ) : null}
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------- AreaTrend */

export type TrendPoint = { label: string; value: number; compare?: number };

export function AreaTrend({
  data,
  height = 260,
  live = false,
  format = (v: number) => v.toLocaleString("en-US"),
  compareLabel,
  valueLabel = "Value",
  className,
}: {
  data: TrendPoint[];
  height?: number;
  live?: boolean;
  format?: (v: number) => string;
  compareLabel?: string;
  valueLabel?: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const { ref, width } = useMeasure();
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const w = Math.max(width || 320, 200);
  const isNarrow = w < 520;
  const padL = isNarrow ? 34 : 46;
  const padR = 10;
  const padT = 12;
  const padB = 26;

  const tipX = useSpring(0, { stiffness: 380, damping: 32, mass: 0.5 });

  const hasCompare = data.some((d) => typeof d.compare === "number");

  const geo = useMemo(() => {
    const vals = data.flatMap((d) =>
      typeof d.compare === "number" ? [d.value, d.compare] : [d.value],
    );
    const { min, max } = scale(vals.length ? vals : [0, 1], 0.12);
    const innerW = w - padL - padR;
    const innerH = height - padT - padB;
    const xOf = (i: number) => padL + (i / Math.max(1, data.length - 1)) * innerW;
    const yOf = (v: number) => padT + innerH - ((v - min) / (max - min)) * innerH;
    const pts = data.map((d, i) => ({ x: xOf(i), y: yOf(d.value) }));
    const cmpPts = hasCompare
      ? data.map((d, i) => ({ x: xOf(i), y: yOf(d.compare ?? d.value) }))
      : [];
    const line = monotonePath(pts);
    const areaD = pts.length
      ? `${line} L ${pts[pts.length - 1]!.x} ${padT + innerH} L ${pts[0]!.x} ${padT + innerH} Z`
      : "";
    const ticks = Array.from({ length: 4 }, (_, i) => {
      const v = min + ((max - min) / 3) * i;
      return { v, y: yOf(v) };
    });
    return { pts, cmpPts, line, areaD, ticks, xOf, baseline: padT + innerH };
  }, [data, w, height, hasCompare, padL]);

  const labelStep = Math.ceil(data.length / (isNarrow ? 4 : 8));

  const handleMove = useCallback(
    (e: ReactPointerEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      let best = 0;
      let bestD = Infinity;
      geo.pts.forEach((p, i) => {
        const dd = Math.abs(p.x - x);
        if (dd < bestD) {
          bestD = dd;
          best = i;
        }
      });
      setActive(best);
      tipX.set(geo.pts[best]?.x ?? 0);
    },
    [geo, tipX],
  );

  const activePt = active !== null ? geo.pts[active] : undefined;
  const activeDatum = active !== null ? data[active] : undefined;
  const lastPt = geo.pts[geo.pts.length - 1];

  return (
    <div ref={ref} className={cn("relative w-full select-none", className)} style={{ height }}>
      <svg
        width={w}
        height={height}
        className="touch-manipulation overflow-visible"
        onPointerMove={handleMove}
        onPointerDown={handleMove}
        onPointerLeave={() => setActive(null)}
        role="img"
        aria-label={`${valueLabel} trend chart`}
      >
        <defs>
          <linearGradient id={`al-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C6CFF" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id={`af-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C6CFF" stopOpacity="0.24" />
            <stop offset="55%" stopColor="#22D3EE" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {geo.ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={padL}
              x2={w - padR}
              y1={t.y}
              y2={t.y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={1}
            />
            <text
              x={padL - 8}
              y={t.y + 3}
              textAnchor="end"
              className="num"
              fontSize={isNarrow ? 8 : 9}
              fill="#94A3B8"
            >
              {format(t.v)}
            </text>
          </g>
        ))}

        {/* x labels */}
        {data.map((d, i) =>
          i % labelStep === 0 || i === data.length - 1 ? (
            <text
              key={d.label + i}
              x={geo.xOf(i)}
              y={height - 8}
              textAnchor="middle"
              className="num"
              fontSize={isNarrow ? 8 : 9}
              fill="#94A3B8"
            >
              {d.label}
            </text>
          ) : null,
        )}

        {/* compare series */}
        {hasCompare ? (
          <motion.path
            d={monotonePath(geo.cmpPts)}
            fill="none"
            stroke="rgba(148,163,184,0.5)"
            strokeWidth={1.4}
            strokeDasharray="4 5"
            initial={reduced ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />
        ) : null}

        {/* area + line */}
        <motion.path
          d={geo.areaD}
          fill={`url(#af-${uid})`}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        />
        <motion.path
          d={geo.line}
          fill="none"
          stroke={`url(#al-${uid})`}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* live endpoint */}
        {live && lastPt ? (
          <>
            <circle cx={lastPt.x} cy={lastPt.y} r={7} fill="#22D3EE" opacity={0.16}>
              {reduced ? null : (
                <animate attributeName="r" values="5;13;5" dur="2.2s" repeatCount="indefinite" />
              )}
            </circle>
            <circle cx={lastPt.x} cy={lastPt.y} r={3.4} fill="#22D3EE" />
          </>
        ) : null}

        {/* hover guide */}
        {activePt ? (
          <g>
            <line
              x1={activePt.x}
              x2={activePt.x}
              y1={padT}
              y2={geo.baseline}
              stroke="rgba(124,108,255,0.45)"
              strokeWidth={1}
            />
            <circle cx={activePt.x} cy={activePt.y} r={7} fill="#7C6CFF" opacity={0.2} />
            <circle
              cx={activePt.x}
              cy={activePt.y}
              r={3.6}
              fill="#0B0F1E"
              stroke="#7C6CFF"
              strokeWidth={2}
            />
          </g>
        ) : null}
      </svg>

      <AnimatePresence>
        {activeDatum ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            style={{ x: tipX, top: 6 }}
            className="glass pointer-events-none absolute z-10 -translate-x-1/2 rounded-xl px-3 py-2"
          >
            <div className="num text-[10px] uppercase tracking-wide text-muted-foreground">
              {activeDatum.label}
            </div>
            <div className="num mt-0.5 text-sm text-foreground">{format(activeDatum.value)}</div>
            {typeof activeDatum.compare === "number" ? (
              <div className="num mt-0.5 text-[10px] text-muted-foreground">
                {compareLabel ?? "Previous"}: {format(activeDatum.compare)}
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------ BarTrend */

export function BarTrend({
  data,
  height = 240,
  format = (v: number) => v.toLocaleString("en-US"),
  className,
}: {
  data: TrendPoint[];
  height?: number;
  format?: (v: number) => string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const { ref, width } = useMeasure();
  const [active, setActive] = useState<number | null>(null);
  const w = Math.max(width || 320, 200);
  const isNarrow = w < 520;
  const padL = isNarrow ? 34 : 46;
  const padR = 10;
  const padT = 12;
  const padB = 26;
  const innerW = w - padL - padR;
  const innerH = height - padT - padB;
  const max = Math.max(...data.map((d) => d.value), 1) * 1.12;
  const slot = innerW / Math.max(1, data.length);
  const barW = Math.max(6, Math.min(30, slot * 0.55));
  const labelStep = Math.ceil(data.length / (isNarrow ? 4 : 10));

  return (
    <div ref={ref} className={cn("relative w-full", className)} style={{ height }}>
      <svg width={w} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#7C6CFF" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {Array.from({ length: 4 }, (_, i) => {
          const v = (max / 3) * i;
          const y = padT + innerH - (v / max) * innerH;
          return (
            <g key={i}>
              <line
                x1={padL}
                x2={w - padR}
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={1}
              />
              <text
                x={padL - 8}
                y={y + 3}
                textAnchor="end"
                className="num"
                fontSize={isNarrow ? 8 : 9}
                fill="#94A3B8"
              >
                {format(v)}
              </text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const h = (d.value / max) * innerH;
          const x = padL + slot * i + (slot - barW) / 2;
          return (
            <g
              key={d.label + i}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
            >
              <rect
                x={padL + slot * i}
                y={padT}
                width={slot}
                height={innerH}
                fill="transparent"
              />
              <motion.rect
                x={x}
                width={barW}
                rx={4}
                fill={`url(#bg-${uid})`}
                initial={{ height: 0, y: padT + innerH }}
                animate={{ height: h, y: padT + innerH - h }}
                transition={{ duration: 0.8, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                opacity={active === null || active === i ? 1 : 0.45}
              />
              {i % labelStep === 0 || i === data.length - 1 ? (
                <text
                  x={x + barW / 2}
                  y={height - 8}
                  textAnchor="middle"
                  className="num"
                  fontSize={isNarrow ? 8 : 9}
                  fill="#94A3B8"
                >
                  {d.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      <AnimatePresence>
        {active !== null && data[active] ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ left: padL + slot * active + slot / 2, top: 4 }}
            className="glass pointer-events-none absolute z-10 -translate-x-1/2 rounded-xl px-3 py-2"
          >
            <div className="num text-[10px] uppercase tracking-wide text-muted-foreground">
              {data[active]!.label}
            </div>
            <div className="num mt-0.5 text-sm text-foreground">{format(data[active]!.value)}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
