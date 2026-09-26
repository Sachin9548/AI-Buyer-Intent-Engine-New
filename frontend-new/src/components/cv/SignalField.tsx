import { useEffect, useRef, useState } from "react";

import { buildSessions, type Session } from "@/lib/claarvia-data";
import { signalSound } from "@/lib/signal-sound";

/**
 * The Signal Field — a full-canvas generative visualization where every live
 * visitor session is a glowing thread. Converted threads stream into the
 * Recovery Core at the centre. Aggregate conditions drive an ambient mood that
 * is published to the rest of the dashboard through a CSS variable.
 */

type ThreadState = "browsing" | "hesitating" | "converting" | "lost";

type Thread = {
  session: Session;
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: { x: number; y: number }[];
  state: ThreadState;
  t: number;
  next: number;
  ring: number;
  dust: number;
  wander: number;
};

const COLORS: Record<ThreadState, [number, number, number]> = {
  browsing: [186, 178, 255],
  hesitating: [251, 191, 36],
  converting: [52, 211, 153],
  lost: [148, 148, 170],
};

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export function SignalField({
  onSelectSession,
  recovered,
  onRecover,
  className,
}: {
  onSelectSession: (s: Session) => void;
  recovered: number;
  onRecover: (amount: number) => void;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const threadsRef = useRef<Thread[]>([]);
  const poolRef = useRef<Session[]>([]);
  const coreRef = useRef({ pulse: 0, glow: 0.5 });
  const moodRef = useRef(0.25);
  const [tension, setTension] = useState(0.25);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const maxThreads = mobile ? 14 : 34;
    const trailLen = mobile ? 10 : 20;

    poolRef.current = buildSessions(80);
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = Math.max(320, r.width);
      h = Math.max(260, r.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const spawn = (inside = false) => {
      const session =
        poolRef.current[Math.floor(Math.random() * poolRef.current.length)]!;
      const edge = Math.floor(Math.random() * 4);
      const x = inside
        ? rand(w * 0.1, w * 0.9)
        : edge === 0
          ? -20
          : edge === 1
            ? w + 20
            : rand(0, w);
      const y = inside
        ? rand(h * 0.1, h * 0.9)
        : edge === 2
          ? -20
          : edge === 3
            ? h + 20
            : rand(0, h);
      const cx = w / 2;
      const cy = h / 2;
      // const a = Math.atan2(cy - y, cx - x) + rand(-0.5, 0.5);
      const a = rand(0, Math.PI * 2);
      const speed = rand(0.35, 0.8);
      threadsRef.current.push({
        session: {
          ...session,
          id: `#${7000 + Math.floor(Math.random() * 2900)}`,
        },
        x,
        y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
        trail: [],
        state: "browsing",
        t: 0,
        next: rand(420, 1100),
        ring: 0,
        dust: 0,
        wander: rand(0, Math.PI * 2),
      });
    };

    for (let i = 0; i < maxThreads * 0.8; i += 1) spawn(true);

    let raf = 0;
    let frame = 0;
    let running = true;
    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);

    const loop = () => {
      if (!running) return;
      frame += 1;
      const cx = w / 2;
      const cy = h * 0.5;
      const core = coreRef.current;

      ctx.clearRect(0, 0, w, h);

      // core aura
      core.pulse *= 0.94;
      const coreR = 46 + core.pulse * 26;
      const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 3.4);
      aura.addColorStop(0, `rgba(124,108,255,${0.3 + core.pulse * 0.35})`);
      aura.addColorStop(0.45, "rgba(34,211,238,0.09)");
      aura.addColorStop(1, "rgba(5,6,11,0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 3.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124,108,255,${0.14 + core.pulse * 0.2})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(34,211,238,${0.32 + core.pulse * 0.4})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      if (threadsRef.current.length < maxThreads && Math.random() < 0.06)
        spawn();

      let hesitating = 0;
      let flowing = 0;
      let hover: string | null = null;

      for (let i = threadsRef.current.length - 1; i >= 0; i -= 1) {
        const th = threadsRef.current[i]!;
        th.t += 1;
        th.ring *= 0.93;

        if (th.state === "browsing" && th.t > th.next) {
          const roll = Math.random();
          th.state =
            roll < 0.5 ? "hesitating" : roll < 0.8 ? "converting" : "lost";
          th.t = 0;
          th.next = rand(200, 520);
          if (th.state === "hesitating") {
            th.ring = 1;
            signalSound.hesitate();
          }
        } else if (th.state === "hesitating" && th.t > th.next) {
          th.state = Math.random() < 0.55 ? "converting" : "lost";
          th.t = 0;
          if (th.state === "converting") th.ring = 1;
        }

        if (th.state === "browsing") {
          th.wander += 0.02;
          th.vx += Math.cos(th.wander) * 0.004;
          th.vy += Math.sin(th.wander * 1.3) * 0.004;
        } else if (th.state === "hesitating") {
          hesitating += 1;
          th.wander += 0.11;
          const ang = Math.atan2(th.vy, th.vx) + 0.05;
          const sp = 0.16;
          th.vx = Math.cos(ang) * sp;
          th.vy = Math.sin(ang) * sp;
        } else if (th.state === "converting") {
          flowing += 1;
          // const dx = cx - th.x;
          // const dy = cy - th.y;
          // const d = Math.hypot(dx, dy) || 1;
          // th.vx += (dx / d) * 0.03;
          // th.vy += (dy / d) * 0.03;
          // th.vx *= 0.95;
          // th.vy *= 0.95;
          const dx = cx - th.x;
          const dy = cy - th.y;
          const d = Math.hypot(dx, dy) || 1;

          const pull = 0.012;
          const curve = 0.003;

          th.vx += (dx / d) * pull + (-dy / d) * curve;
          th.vy += (dy / d) * pull + (dx / d) * curve;
          th.vx *= 0.97;
          th.vy *= 0.97;
          if (d < coreR * 0.7) {
            core.pulse = Math.min(1.6, core.pulse + 0.7);
            signalSound.convert();
            onRecover(Math.round(th.session.value * 100) / 100);
            threadsRef.current.splice(i, 1);
            continue;
          }
        } else {
          th.dust += 1;
          th.vx *= 0.985;
          th.vy *= 0.985;
          if (th.dust > 140) {
            threadsRef.current.splice(i, 1);
            continue;
          }
        }

        const speedScale = reduced ? 0.35 : 1;
        th.x += th.vx * speedScale;
        th.y += th.vy * speedScale;

        if (th.x < -60 || th.x > w + 60 || th.y < -60 || th.y > h + 60) {
          threadsRef.current.splice(i, 1);
          continue;
        }

        th.trail.push({ x: th.x, y: th.y });
        if (th.trail.length > trailLen) th.trail.shift();

        const [r, g, b] = COLORS[th.state];
        const flicker =
          th.state === "hesitating"
            ? 0.55 + Math.abs(Math.sin(frame * 0.16 + th.wander)) * 0.45
            : 1;
        const fade = th.state === "lost" ? Math.max(0, 1 - th.dust / 140) : 1;
        const alpha = flicker * fade;

        // trail
        // ctx.lineCap = "round";
        // for (let p = 1; p < th.trail.length; p += 1) {
        //   const a0 = (p / th.trail.length) * 0.5 * alpha;
        //   ctx.strokeStyle = `rgba(${r},${g},${b},${a0})`;
        //   ctx.lineWidth = 1 + (p / th.trail.length) * 1.4;
        //   ctx.beginPath();
        //   ctx.moveTo(th.trail[p - 1]!.x, th.trail[p - 1]!.y);
        //   ctx.lineTo(th.trail[p]!.x, th.trail[p]!.y);
        //   ctx.stroke();
        // }

        // head
        const isHover = hovered === th.session.id;
        // const headR = (th.state === "converting" ? 3 : 2.2) * (isHover ? 1.8 : 1);
        // const glow = ctx.createRadialGradient(th.x, th.y, 0, th.x, th.y, headR * 6);
        // glow.addColorStop(0, `rgba(${r},${g},${b},${0.9 * alpha})`);
        // glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
        // ctx.fillStyle = glow;
        // ctx.beginPath();
        // ctx.arc(th.x, th.y, headR * 6, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.fillStyle = `rgba(255,255,255,${0.85 * alpha})`;
        // ctx.beginPath();
        // ctx.arc(th.x, th.y, headR, 0, Math.PI * 2);
        // ctx.fill();
        const headR = isHover ? 6 : 4.5;
        const glow = ctx.createRadialGradient(
          th.x,
          th.y,
          0,
          th.x,
          th.y,
          headR * 3,
        );

        glow.addColorStop(0, `rgba(${r},${g},${b},${0.5 * alpha})`);
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(th.x, th.y, headR * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(th.x, th.y, headR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.95 * alpha})`;
        ctx.fill();

        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(255,255,255,${0.8 * alpha})`;
        ctx.stroke();

        // intervention ring
        if (th.ring > 0.02) {
          ctx.strokeStyle = `rgba(${r},${g},${b},${th.ring * 0.7})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(th.x, th.y, 8 + (1 - th.ring) * 34, 0, Math.PI * 2);
          ctx.stroke();
        }

        if (isHover) hover = th.session.id;
      }

      if (hovered && !hover) setHovered(null);

      // mood: share of hesitation among active, eased slowly
      const total = Math.max(1, hesitating + flowing);
      const target = Math.min(1, hesitating / total);
      moodRef.current += (target - moodRef.current) * 0.0016;
      if (frame % 60 === 0) {
        const m = Math.round(moodRef.current * 100) / 100;
        setTension(m);
        document.documentElement.style.setProperty("--cv-mood", String(m));
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const pick = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      const px = clientX - r.left;
      const py = clientY - r.top;
      let best: Thread | null = null;
      let bd = 26;
      for (const th of threadsRef.current) {
        const d = Math.hypot(th.x - px, th.y - py);
        if (d < bd) {
          bd = d;
          best = th;
        }
      }
      return best;
    };

    const onClick = (e: MouseEvent) => {
      const th = pick(e.clientX, e.clientY);
      if (th) onSelectSession(th.session);
    };
    const onMove = (e: MouseEvent) => {
      const th = pick(e.clientX, e.clientY);
      setHovered(th ? th.session.id : null);
      canvas.style.cursor = th ? "pointer" : "default";
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (!t) return;
      const th = pick(t.clientX, t.clientY);
      if (th) onSelectSession(th.session);
    };

    canvas.addEventListener("click", onClick);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchend", onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("touchend", onTouch);
      document.documentElement.style.setProperty("--cv-mood", "0");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={wrapRef}
      className={
        "relative isolate h-[62vh] min-h-[26rem] w-full overflow-hidden rounded-3xl " +
        (className ?? "")
      }
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Recovery Core readout */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="num text-3xl font-semibold text-foreground drop-shadow-[0_0_26px_rgba(124,108,255,0.75)] sm:text-5xl">
          ${recovered.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Revenue recovered
        </p>
      </div>
      <span className="sr-only">
        Live signal field. Ambient tension {Math.round(tension * 100)} percent.
      </span>
    </div>
  );
}
