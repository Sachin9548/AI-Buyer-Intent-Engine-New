"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Activity, Users, Filter, MousePointer2, Info } from "lucide-react";
import { Reveal, SectionHeader } from "./primitives";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { ReactNode } from "react";

export function Dashboard() {
  return (
    <TooltipProvider delayDuration={120}>
      <section id="dashboard" className="relative py-32">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="The control room"
              title={<>One screen. <em className="italic">Everything visible.</em></>}
              subtitle="Live charts, funnels, heatmaps, visitor timelines and AI insights — composed like a flagship product, not a tool."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-14 max-w-7xl">
              <div className="glass relative overflow-hidden rounded-3xl p-4 shadow-card md:p-6">
                <div className="absolute inset-0 -z-10 bg-gradient-aurora opacity-20" />
                {/* top bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-primary text-[10px] font-bold text-primary-foreground">A</span>
                    <div>
                      <div className="font-display text-base">alistine.app / Conversion Lab</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">workspace · production</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {["Overview", "Visitors", "Funnels", "Heatmaps", "AI"].map((t, i) => (
                      <span key={t} className={`rounded-full px-3 py-1 text-xs ${i === 0 ? "bg-white/10 text-foreground" : "text-muted-foreground"}`}>{t}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-12 gap-4">
                  {/* big chart */}
                  <div className="col-span-12 lg:col-span-8">
                    <BigChart />
                    <Funnel />
                  </div>
                  {/* right column */}
                  <div className="col-span-12 space-y-4 lg:col-span-4">
                    <KPI />
                    <Heatmap />
                    <Timeline />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </TooltipProvider>
  );
}

/* ------------------------------- Tooltip UI ------------------------------- */

function InfoTip({
  label,
  title,
  summary,
  drivers,
  ariaLabel,
  children,
}: {
  label: string;
  title: string;
  summary: string;
  drivers: { name: string; value: string }[];
  ariaLabel?: string;
  children?: ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel ?? `${label}. ${title}. Press for details.`}
          className="inline-flex items-center gap-1 rounded-sm text-muted-foreground/80 transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {children ?? <Info className="h-3 w-3" aria-hidden="true" />}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8} className="max-w-[18rem] border-border/70 bg-background/95 p-0 shadow-card backdrop-blur">
        <div className="p-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
          <p className="mt-1 text-[12px] font-medium leading-snug text-foreground">{title}</p>
          <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">{summary}</p>
          {drivers.length > 0 && (
            <div className="mt-2.5 border-t border-border/60 pt-2">
              <div className="mb-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                What drives this
              </div>
              <ul className="space-y-1">
                {drivers.map((d) => (
                  <li key={d.name} className="flex items-start justify-between gap-3 text-[11px]">
                    <span className="text-muted-foreground">{d.name}</span>
                    <span className="text-right text-foreground/90">{d.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

/* --------------------------------- BigChart -------------------------------- */

function BigChart() {
  const N = 60;
  const a = Array.from({ length: N }, (_, i) => 40 + Math.sin(i / 4) * 10 + i * 0.4);
  const b = Array.from({ length: N }, (_, i) => 60 + Math.sin(i / 3 + 1) * 14 + i * 0.5);
  const toPath = (arr: number[]) => arr.map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (N - 1)) * 100} ${100 - v / 1.4}`).join(" ");
  return (
    <div className="rounded-2xl border border-border/60 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Active visitors · 7 days</span>
            <InfoTip
              label="Active visitors"
              title="Rolling 7-day count of unique intent-scored visitors"
              summary="Aggregated from your live session stream. Predicted line is Alistine's forecast; actual is what really happened. Divergence flags model drift."
              drivers={[
                { name: "Session stream", value: "Live · 12.8k today" },
                { name: "Deduping", value: "Cross-device identity graph" },
                { name: "Forecast window", value: "Rolling 24h Bayesian" },
                { name: "Confidence", value: "±3.1% at 95%" },
              ]}
            />
          </div>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="font-display text-4xl">38,210</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  ↑ 18.4%
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[14rem] text-[11px]">
                Week-over-week change vs the same 7-day window ending last Sunday. Seasonally adjusted.
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="flex items-center gap-1.5 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <span className="h-2 w-2 rounded-full bg-primary" /> Predicted
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[16rem] text-[11px]">
              Alistine's forecast built from intent, referrer mix, historical seasonality, and current campaign lift.
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="flex items-center gap-1.5 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <span className="h-2 w-2 rounded-full bg-accent" /> Actual
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[16rem] text-[11px]">
              What actually happened, drawn from your live event stream. The band between the two lines is model residual.
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="relative mt-4 h-56">
        <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="da" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(215 100% 60%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(215 100% 60%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path d={`${toPath(a)} L 100 100 L 0 100 Z`} fill="url(#da)"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }} />
          <motion.path d={toPath(a)} fill="none" stroke="hsl(215 100% 65%)" strokeWidth="0.8"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6 }}
            style={{ filter: "drop-shadow(0 0 6px hsl(215 100% 60% / 0.7))" }} />
          <motion.path d={toPath(b)} fill="none" stroke="hsl(270 80% 70%)" strokeWidth="0.6" strokeDasharray="1.4 1.4"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.4 }} />
        </svg>
        <div className="absolute inset-0 grid grid-rows-4">{[0,1,2,3].map(i => <div key={i} className="border-t border-border/40" />)}</div>
      </div>
    </div>
  );
}

/* ---------------------------------- Funnel --------------------------------- */

function Funnel() {
  const steps = [
    {
      name: "Landing", v: 100, p: "12,840 visitors",
      title: "Everyone who reached your entry pages",
      summary: "Deduped by identity graph across sessions and devices; bot and preview traffic filtered.",
      drivers: [
        { name: "Top source", value: "Direct · 41%" },
        { name: "Paid mix", value: "Google + LinkedIn · 27%" },
        { name: "Referrer quality", value: "0.78 (high)" },
      ],
    },
    {
      name: "Pricing", v: 64, p: "8,217 visitors",
      title: "36% drop-off from landing → pricing",
      summary: "Healthy for a self-serve funnel. Alistine flags this as expected — the majority who leave here weren't intent-qualified.",
      drivers: [
        { name: "Avg scroll depth", value: "72% before exit" },
        { name: "Reached CTA", value: "58%" },
        { name: "Intent at exit", value: "0.31 (low)" },
      ],
    },
    {
      name: "Sign up", v: 38, p: "4,879 visitors",
      title: "Sign up is your biggest bottleneck",
      summary: "40% who reach the form leave without submitting. Detected friction: field-level hesitation on 'company size'.",
      drivers: [
        { name: "Form abandonment", value: "40%" },
        { name: "Rage clicks", value: "128 (SSO button)" },
        { name: "Median time-to-fill", value: "1m 42s" },
        { name: "AI recommendation", value: "Defer 'company size' to onboarding" },
      ],
    },
    {
      name: "Activated", v: 22, p: "2,825 visitors",
      title: "22% land on an activation moment within 24h",
      summary: "Users who complete first meaningful action. Correlates 4.2× with 30-day retention.",
      drivers: [
        { name: "First-action median", value: "8m 20s" },
        { name: "Guided path", value: "62% completed" },
        { name: "Retention lift", value: "+4.2× vs non-activated" },
      ],
    },
  ];
  return (
    <div className="mt-4 rounded-2xl border border-border/60 bg-white/[0.02] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Conversion funnel</span>
        </div>
        <span className="text-[11px] text-muted-foreground">
          AI bottleneck:{" "}
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="rounded-sm text-primary underline decoration-primary/40 underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                Sign up
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[16rem] text-[11px]">
              Ranked by expected revenue recovered if fixed. Sign up drops 40% of qualified intent — highest ROI target this week.
            </TooltipContent>
          </Tooltip>
        </span>
      </div>
      <div className="space-y-3">
        {steps.map((s, i) => (
          <div key={s.name}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 text-foreground/80">
                {s.name}
                <InfoTip
                  label={`${s.name} · step ${i + 1}`}
                  title={s.title}
                  summary={s.summary}
                  drivers={s.drivers}
                  ariaLabel={`${s.name} funnel step, ${s.v}% retained, ${s.p}. ${s.title}. Press for drivers.`}
                />
              </span>
              <span className="text-muted-foreground">{s.p} · {s.v}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }} whileInView={{ width: `${s.v}%` }} viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-primary"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------- KPI ---------------------------------- */

function KPI() {
  const items = [
    {
      i: Users, l: "Visitors", v: "12.8k",
      title: "12,840 unique visitors today",
      summary: "Deduped by identity graph. Compared against 7-day median (10.1k) for anomaly detection.",
      drivers: [
        { name: "Anomaly score", value: "+2.1σ (high)" },
        { name: "Top region", value: "US-West · 34%" },
        { name: "New vs returning", value: "68 / 32" },
      ],
    },
    {
      i: Activity, l: "Intent", v: "0.74",
      title: "Median intent score is high",
      summary: "0–1 score per visitor derived from behavioral fingerprint: pricing dwell, doc reads, return frequency, and 40+ signals.",
      drivers: [
        { name: "Pricing dwell", value: "avg 38s (+22%)" },
        { name: "Doc engagement", value: "3.1 pages / session" },
        { name: "Return frequency", value: "1.8× / week" },
      ],
    },
    {
      i: MousePointer2, l: "Friction", v: "↓21%",
      title: "Friction down 21% week over week",
      summary: "Weighted mix of rage clicks, dead clicks, form retries, and cursor hesitation. Lower is better.",
      drivers: [
        { name: "Rage clicks", value: "−34%" },
        { name: "Dead clicks", value: "−12%" },
        { name: "Form retries", value: "−18%" },
      ],
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map(({ i: Icon, l, v, title, summary, drivers }) => (
        <div key={l} className="rounded-xl border border-border/60 bg-white/[0.02] p-3">
          <div className="flex items-center justify-between">
            <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <InfoTip label={l} title={title} summary={summary} drivers={drivers} />
          </div>
          <div className="mt-2 font-display text-xl">{v}</div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{l}</div>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------- Heatmap -------------------------------- */

function Heatmap() {
  // Math.random() ko useEffect mein rakho — Next.js SSR mein
  // server aur client pe alag values nahi aani chahiye
  const [intensities, setIntensities] = useState<number[]>([]);

  useEffect(() => {
    setIntensities(
      Array.from({ length: 80 }, (_, i) =>
        Math.max(0, Math.min(1, Math.sin(i / 3) * 0.6 + Math.random() * 0.6 + (i > 35 && i < 55 ? 0.3 : 0)))
      )
    );
  }, []);

  return (
    <div className="rounded-2xl border border-border/60 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Heatmap · pricing page</div>
        <InfoTip
          label="Heatmap intensity"
          title="Attention density, not raw clicks"
          summary="Cell brightness combines dwell time, cursor proximity, and read-through rate. Bright zones are where visitors actually focus — not just where they land."
          drivers={[
            { name: "Signals blended", value: "Dwell · gaze · scroll pause" },
            { name: "Sample", value: "Last 24h · 3,214 sessions" },
            { name: "Hotspot", value: "Pro tier feature list" },
            { name: "Cold zone", value: "FAQ (below fold)" },
          ]}
        />
      </div>
      <div className="mt-3 grid gap-[3px]" style={{ gridTemplateColumns: "repeat(20, minmax(0,1fr))" }}>
        {Array.from({ length: 80 }).map((_, i) => {
          const intensity = intensities[i] ?? 0;
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.005, duration: 0.4 }}
              style={{
                background: `hsl(215 100% ${60 - intensity * 20}% / ${0.12 + intensity * 0.7})`,
              }}
              className="aspect-square rounded-[2px]"
            />
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
        <span className="font-mono uppercase tracking-widest">Low attention</span>
        <div className="mx-2 h-1 flex-1 rounded-full" style={{ background: "linear-gradient(to right, hsl(215 100% 60% / 0.12), hsl(215 100% 60% / 0.85))" }} />
        <span className="font-mono uppercase tracking-widest">High attention</span>
      </div>
    </div>
  );
}

/* -------------------------------- Timeline -------------------------------- */

function Timeline() {
  const events = [
    { t: "12:04", e: "Visitor #8412 entered", k: "join",
      tip: { title: "Session started from google/cpc", summary: "New visitor · US-West · Chrome desktop. Attributed to 'ai-analytics' campaign.", drivers: [
        { name: "Source", value: "google / cpc" }, { name: "Landing", value: "/product/intent" }, { name: "Device", value: "Chrome · Mac" }] } },
    { t: "12:05", e: "Scrolled pricing 3×", k: "behavior",
      tip: { title: "Comparison behavior detected", summary: "Repeated scrolling between pricing tiers is a strong intent signal — 3.4× above baseline for converters.", drivers: [
        { name: "Tier compared", value: "Pro ↔ Enterprise" }, { name: "Dwell", value: "42s on Pro" }] } },
    { t: "12:06", e: "Cursor paused 8.2s", k: "friction",
      tip: { title: "Hesitation over 'contact sales' CTA", summary: "Cursor hovered without click. Correlates with pricing ambiguity in 68% of similar sessions.", drivers: [
        { name: "Element", value: "button.cta-sales" }, { name: "Similar sessions", value: "68% converted with nudge" }] } },
    { t: "12:06", e: "AI: hesitation detected", k: "ai",
      tip: { title: "Model flagged high-intent hesitation", summary: "Intent 0.86, friction spike 0.42. Recommendation queued: offer trial nudge instead of sales handoff.", drivers: [
        { name: "Intent", value: "0.86" }, { name: "Friction", value: "0.42" }, { name: "Recommendation", value: "Trial nudge" }] } },
    { t: "12:07", e: "Trial nudge shown", k: "action",
      tip: { title: "Auto-personalized nudge delivered", summary: "In-page banner with 14-day trial CTA. Historical lift for this segment: +23% conversion.", drivers: [
        { name: "Segment", value: "High-intent hesitator" }, { name: "Expected lift", value: "+23%" }] } },
  ];
  return (
    <div className="rounded-2xl border border-border/60 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Live visitor timeline</div>
        <InfoTip
          label="Timeline"
          title="Real-time event stream, per visitor"
          summary="Every meaningful behavior, AI decision, and action taken — reconstructed as a single narrative you can replay."
          drivers={[
            { name: "Latency", value: "< 400ms end-to-end" },
            { name: "Retention", value: "90 days full fidelity" },
          ]}
        />
      </div>
      <ul className="mt-3 space-y-2">
        {events.map((ev, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="flex items-start gap-3 text-xs"
          >
            <span className="font-mono text-[10px] text-muted-foreground">{ev.t}</span>
            <span className={`mt-1 h-1.5 w-1.5 rounded-full ${
              ev.k === "ai" ? "bg-primary shadow-glow" : ev.k === "friction" ? "bg-destructive" : ev.k === "action" ? "bg-accent" : "bg-muted-foreground"
            }`} aria-hidden="true" />
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`${ev.t} · ${ev.e}. ${ev.tip.title}. Press for details.`}
                  className="rounded-sm text-left text-foreground/85 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {ev.e}
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" sideOffset={8} className="max-w-[17rem] border-border/70 bg-background/95 p-0 shadow-card backdrop-blur">
                <div className="p-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{ev.t} · {ev.k}</div>
                  <p className="mt-1 text-[12px] font-medium leading-snug text-foreground">{ev.tip.title}</p>
                  <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">{ev.tip.summary}</p>
                  <div className="mt-2.5 border-t border-border/60 pt-2">
                    <div className="mb-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Signals</div>
                    <ul className="space-y-1">
                      {ev.tip.drivers.map((d) => (
                        <li key={d.name} className="flex items-start justify-between gap-3 text-[11px]">
                          <span className="text-muted-foreground">{d.name}</span>
                          <span className="text-right text-foreground/90">{d.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
