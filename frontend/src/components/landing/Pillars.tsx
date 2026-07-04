"use client";
import { motion } from "framer-motion";
import { Eye, Brain, Sparkles, ArrowUpRight, TrendingUp, RotateCcw, TrendingDown, Info } from "lucide-react";
import { Reveal, SectionHeader } from "./primitives";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const pillars = [
  {
    icon: Eye,
    title: "Observe",
    sub: "Every signal, captured silently.",
    body: "Sessions, scrolls, clicks, dwell, rage, hesitation. A complete behavioral fingerprint per visitor — no manual events, no tagging.",
    bullets: ["Auto-instrumentation", "Heatmaps · session replay", "Cross-device identity"],
  },
  {
    icon: Brain,
    title: "Understand",
    sub: "Behavior becomes meaning.",
    body: "Alistine's models translate raw behavior into intent, sentiment, friction and confidence — at the level of a single visitor.",
    bullets: ["Intent scoring", "Friction detection", "Cohort discovery"],
  },
  {
    icon: Sparkles,
    title: "Predict",
    sub: "The next 60 minutes, already mapped.",
    body: "Forecast conversions, churn risk and the precise moment a visitor will disengage — and act before they do.",
    bullets: ["Drop-off forecasting", "Recommendations", "Live nudges"],
  },
];

export function Pillars() {
  return (
    <section id="pillars" className="relative py-32">
      <div className="container">
        <Reveal>
          <SectionHeader
            eyebrow="The Alistine method"
            title={<>Three movements.<br /> One quiet revolution.</>}
            subtitle="A complete visitor intelligence loop, designed to feel inevitable."
          />
        </Reveal>

        <div className="mt-20 space-y-28">
          {pillars.map((p, i) => (
            <Pillar key={p.title} {...p} index={i} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillar({ icon: Icon, title, sub, body, bullets, index, reverse }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16 ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}
    >
      <div className="md:col-span-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">0{index + 1} · {title}</span>
        <h3 className="mt-3 font-display text-4xl text-gradient md:text-6xl">{sub}</h3>
        <p className="mt-5 max-w-md text-muted-foreground">{body}</p>
        <ul className="mt-6 space-y-2 text-sm">
          {bullets.map((b: string) => (
            <li key={b} className="flex items-center gap-2 text-foreground/85">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />{b}
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-7">
        <div className="glass relative aspect-[5/4] overflow-hidden rounded-3xl p-6 shadow-card">
          <div className="absolute inset-0 bg-gradient-aurora opacity-30" />
          <div className="relative flex items-center gap-2">
            <Icon className="h-4 w-4 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{title} · live</span>
            <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-muted-foreground"><ArrowUpRight className="h-3 w-3" /> v2.0</span>
          </div>
          {/* unique mini-vis per pillar */}
          {index === 0 && <ObserveVis />}
          {index === 1 && <UnderstandVis />}
          {index === 2 && <PredictVis />}
        </div>
      </div>
    </motion.div>
  );
}

function ObserveVis() {
  // grid of micro signals lighting up
  const cells = Array.from({ length: 90 });
  return (
    <div className="absolute inset-6 top-12 grid grid-cols-15 gap-1.5" style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}>
      {cells.map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.05 }}
          animate={{ opacity: [0.05, 0.9, 0.05] }}
          transition={{ duration: 2 + (i % 5) * 0.4, repeat: Infinity, delay: (i % 11) * 0.12 }}
          className="aspect-square rounded-sm bg-primary"
        />
      ))}
    </div>
  );
}

function UnderstandVis() {
  // Behavioral radar — labeled axes, animated sweep, dual layers (baseline vs live)
  const dims = [
    { label: "Intent", value: 0.92 },
    { label: "Trust", value: 0.71 },
    { label: "Urgency", value: 0.58 },
    { label: "Friction", value: 0.34 },
    { label: "Delight", value: 0.81 },
    { label: "Focus", value: 0.66 },
  ];
  const baseline = [0.55, 0.5, 0.5, 0.55, 0.45, 0.5];
  const N = dims.length;
  const cx = 100, cy = 100, R = 68;
  const point = (i: number, v: number) => {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v] as const;
  };
  const toPath = (vals: number[]) => vals.map((v, i) => point(i, v).join(",")).join(" ");

  return (
    <div className="absolute inset-0 grid place-items-center">
      <svg viewBox="0 0 200 200" className="h-[19rem] w-[19rem]">
        <defs>
          <radialGradient id="uRad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.35)" />
            <stop offset="70%" stopColor="hsl(var(--primary) / 0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="uSweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.55)" />
          </linearGradient>
          <linearGradient id="uStroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="hsl(var(--primary))" />
            <stop offset="1" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>

        <circle cx={cx} cy={cy} r={R} fill="url(#uRad)" />

        {[0.25, 0.5, 0.75, 1].map((f) => (
          <circle key={f} cx={cx} cy={cy} r={R * f} fill="none" stroke="hsl(var(--border))" strokeWidth="0.4" strokeDasharray={f === 1 ? "0" : "1 2"} />
        ))}

        {dims.map((d, i) => {
          const [x, y] = point(i, 1);
          const [lx, ly] = point(i, 1.22);
          return (
            <g key={d.label}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="hsl(var(--border))" strokeWidth="0.4" />
              <text x={lx} y={ly} fontSize="4.6" fill="hsl(var(--muted-foreground))" textAnchor="middle" dominantBaseline="middle"
                style={{ letterSpacing: "0.18em" }}>
                {d.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        <polygon points={toPath(baseline)} fill="hsl(var(--muted-foreground) / 0.05)" stroke="hsl(var(--muted-foreground) / 0.35)" strokeWidth="0.4" strokeDasharray="1.5 1.5" />

        <motion.polygon
          points={toPath(dims.map((d) => d.value))}
          fill="hsl(var(--primary) / 0.18)"
          stroke="url(#uStroke)"
          strokeWidth="1.2"
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "100px 100px", filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.45))" }}
        />

        {dims.map((d, i) => {
          const [x, y] = point(i, d.value);
          return (
            <g key={d.label}>
              <motion.circle
                cx={x} cy={y} r={3} fill="hsl(var(--primary) / 0.2)"
                animate={{ r: [2.5, 5.5, 2.5], opacity: [0.7, 0.1, 0.7] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25 }}
              />
              <circle cx={x} cy={y} r={1.6} fill="hsl(var(--primary))" />
            </g>
          );
        })}

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <path d={`M${cx} ${cy} L ${cx + R} ${cy} A ${R} ${R} 0 0 0 ${cx + R * Math.cos(-Math.PI / 3)} ${cy + R * Math.sin(-Math.PI / 3)} Z`}
                fill="url(#uSweep)" opacity="0.5" />
        </motion.g>

        <circle cx={cx} cy={cy} r={2.4} fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="0.8" />
      </svg>

      <div className="pointer-events-none absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
          Intent · <span className="text-foreground">0.92</span>
        </span>
        <span>Confidence <span className="text-foreground">98.4%</span></span>
      </div>
    </div>
  );
}

function PredictVis() {
  const past = [
    [0, 46], [10, 42], [20, 38], [30, 36], [40, 32], [50, 30], [60, 27],
  ];
  const future = [
    [60, 27], [70, 22], [80, 16], [90, 11], [100, 7],
  ];
  const bandTop = [
    [60, 27], [70, 18], [80, 11], [90, 5], [100, 1],
  ];
  const bandBot = [
    [60, 27], [70, 26], [80, 22], [90, 18], [100, 14],
  ];
  const toLine = (pts: number[][]) => pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const bandPath = `${toLine(bandTop)} L ${bandBot.slice().reverse().map(([x, y]) => `${x} ${y}`).join(" L ")} Z`;

  const bars = [
    {
      label: "Convert",
      v: 0.72,
      tone: "primary",
      icon: TrendingUp,
      headline: "72% likely to convert in the next 60 minutes",
      summary:
        "Model confidence that this visitor completes the primary goal (signup, checkout, booked demo) before the session ends.",
      drivers: [
        { name: "Intent score", value: "0.92 · high" },
        { name: "Pricing dwell", value: "3× visits, 42s avg" },
        { name: "Return visitor", value: "4th session this week" },
        { name: "Time-to-CTA", value: "−38% vs baseline" },
      ],
    },
    {
      label: "Return",
      v: 0.41,
      tone: "accent",
      icon: RotateCcw,
      headline: "41% likely to return within 7 days",
      summary:
        "Probability the visitor comes back organically — a signal to nurture with email, retargeting, or a saved-progress state.",
      drivers: [
        { name: "Content depth", value: "6 pages, 4m 18s" },
        { name: "Bookmarked page", value: "Yes · docs/api" },
        { name: "Referrer quality", value: "Direct + branded search" },
        { name: "Session recency", value: "First visit today" },
      ],
    },
    {
      label: "Churn",
      v: 0.12,
      tone: "muted",
      icon: TrendingDown,
      headline: "12% risk of drop-off in this session",
      summary:
        "Chance the visitor abandons within the next few minutes. Low risk here — but Alistine surfaces friction before it compounds.",
      drivers: [
        { name: "Rage clicks", value: "0 detected" },
        { name: "Scroll fatigue", value: "None" },
        { name: "Form friction", value: "Not engaged yet" },
        { name: "Exit-intent", value: "No cursor exit" },
      ],
    },
  ];

  return (
    <div className="absolute inset-6 top-12 flex flex-col">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/70" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Forecast · next 60 min
        </span>
        <span>Horizon <span className="text-foreground">T+60</span></span>
      </div>

      <div className="relative mt-3 flex-1">
        <svg viewBox="0 0 100 55" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="predLine" x1="0" x2="1">
              <stop offset="0" stopColor="hsl(var(--primary))" />
              <stop offset="1" stopColor="hsl(var(--accent))" />
            </linearGradient>
            <linearGradient id="predFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.35)" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
            </linearGradient>
          </defs>

          {[10, 20, 30, 40].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="hsl(var(--border))" strokeWidth="0.2" strokeDasharray="0.6 1.2" />
          ))}

          <line x1="60" y1="0" x2="60" y2="55" stroke="hsl(var(--border))" strokeWidth="0.3" strokeDasharray="1 1.2" />
          <text x="61" y="6" fontSize="3" fill="hsl(var(--muted-foreground))" style={{ letterSpacing: "0.2em" }}>NOW</text>

          <motion.path d={bandPath} fill="url(#predFill)"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }} />

          <motion.path d={toLine(past)}
            stroke="hsl(var(--muted-foreground) / 0.85)" strokeWidth="0.9" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.1 }} />

          <motion.path d={toLine(future)}
            stroke="url(#predLine)" strokeWidth="1.4" fill="none" strokeDasharray="2 1.6" strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.6 }}
            style={{ filter: "drop-shadow(0 0 4px hsl(var(--primary) / 0.6))" }} />

          <motion.circle cx="60" cy="27" r="3.4" fill="hsl(var(--primary) / 0.18)"
            animate={{ r: [2.6, 5, 2.6], opacity: [0.9, 0.1, 0.9] }}
            transition={{ duration: 2.2, repeat: Infinity }} />
          <circle cx="60" cy="27" r="1.6" fill="hsl(var(--primary))" />

          <circle cx="100" cy="7" r="1.4" fill="hsl(var(--accent))" />
          <text x="98" y="4" fontSize="3.4" fill="hsl(var(--primary))" textAnchor="end" fontWeight="600">+34%</text>
        </svg>
      </div>

      <TooltipProvider delayDuration={120}>
        <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label="Outcome probabilities for the current visitor">
          {bars.map((b, i) => {
            const Icon = b.icon;
            const pct = Math.round(b.v * 100);
            return (
              <Tooltip key={b.label}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label={`${b.label}: ${pct} percent. ${b.headline}. Press to see contributing signals.`}
                    className="group rounded-md border border-border/60 bg-white/[0.02] p-2 text-left transition-colors hover:border-primary/50 hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Icon className="h-2.5 w-2.5" aria-hidden="true" />
                        {b.label}
                      </span>
                      <span className="inline-flex items-center gap-1 text-foreground/85">
                        {pct}%
                        <Info className="h-2.5 w-2.5 opacity-60 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }} whileInView={{ width: `${b.v * 100}%` }} viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-full rounded-full ${
                          b.tone === "primary" ? "bg-gradient-primary" :
                          b.tone === "accent" ? "bg-accent" : "bg-muted-foreground/60"
                        }`}
                      />
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={10} className="max-w-[17rem] border-border/70 bg-background/95 p-0 shadow-card backdrop-blur">
                  <div className="p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        <Icon className="h-3 w-3 text-primary" aria-hidden="true" />
                        {b.label} probability
                      </div>
                      <span className="font-display text-sm text-foreground">{pct}%</span>
                    </div>
                    <p className="mt-2 text-[12px] leading-snug text-foreground">{b.headline}</p>
                    <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">{b.summary}</p>

                    <div className="mt-3 border-t border-border/60 pt-2">
                      <div className="mb-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                        Top contributing signals
                      </div>
                      <ul className="space-y-1">
                        {b.drivers.map((d) => (
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
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
}
