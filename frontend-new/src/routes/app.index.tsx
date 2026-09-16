import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  MousePointerClick,
  Plug,
  Radio,
  Sparkles,
  UserPlus,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import { PageHeader } from "@/components/cv/Shell";
import { AreaTrend } from "@/components/cv/charts";
import { SignalField } from "@/components/cv/SignalField";
import { SlideOver } from "@/components/cv/overlays";
import {
  Button,
  Chip,
  Delta,
  GlassCard,
  LivePulse,
  Num,
  ProgressBar,
  SectionTitle,
  Skeleton,
  Tabs,
  spring,
} from "@/components/cv/ui";
import { cvToast } from "@/lib/cv-toast";
import { signalSound } from "@/lib/signal-sound";
import { feedTemplates, hesitationBreakdown, revenueSeries, type Session } from "@/lib/claarvia-data";

export const Route = createFileRoute("/app/")({
  validateSearch: z.object({ firstRun: z.boolean().optional() }).parse,
  head: () => ({
    meta: [
      { title: "Overview — Claarvia" },
      {
        name: "description",
        content: "Live revenue recovered, active sessions, conversion lift and AI insights.",
      },
      { property: "og:title", content: "Overview — Claarvia" },
      { property: "og:description", content: "Your real-time hesitation-recovery command center." },
    ],
  }),
  component: Overview,
});

const RANGES = ["Today", "7d", "30d"] as const;

type Kpi = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta: number;
  spark: number[];
};

const KPI: Record<(typeof RANGES)[number], Kpi[]> = {
  Today: [
    { label: "Revenue recovered", value: 8412.5, prefix: "$", decimals: 2, delta: 12.4, spark: [3, 5, 4, 7, 6, 9, 11] },
    { label: "Active sessions now", value: 134, delta: 4.1, spark: [90, 104, 96, 120, 118, 129, 134] },
    { label: "Conversion lift", value: 18.2, suffix: "%", decimals: 1, delta: 2.3, spark: [11, 12, 14, 13, 16, 17, 18] },
    { label: "Interventions triggered", value: 1284, delta: -3.2, spark: [1400, 1350, 1310, 1290, 1300, 1288, 1284] },
  ],
  "7d": [
    { label: "Revenue recovered", value: 41208.75, prefix: "$", decimals: 2, delta: 18.9, spark: [12, 18, 16, 22, 27, 31, 41] },
    { label: "Active sessions now", value: 134, delta: 6.7, spark: [88, 101, 112, 121, 126, 130, 134] },
    { label: "Conversion lift", value: 17.4, suffix: "%", decimals: 1, delta: 1.8, spark: [10, 12, 13, 15, 16, 17, 17] },
    { label: "Interventions triggered", value: 9420, delta: 7.5, spark: [7100, 7600, 8100, 8600, 8900, 9200, 9420] },
  ],
  "30d": [
    { label: "Revenue recovered", value: 168904.2, prefix: "$", decimals: 2, delta: 24.6, spark: [60, 78, 92, 110, 128, 149, 168] },
    { label: "Active sessions now", value: 134, delta: 9.2, spark: [70, 85, 96, 108, 118, 128, 134] },
    { label: "Conversion lift", value: 16.1, suffix: "%", decimals: 1, delta: 3.4, spark: [9, 10, 12, 13, 14, 15, 16] },
    { label: "Interventions triggered", value: 38120, delta: 11.2, spark: [24000, 27000, 30000, 32500, 34800, 36600, 38120] },
  ],
};

type FeedItem = { id: number; visitor: string; text: string; kind: string; tag: string; amount?: number };

function useLiveFeed(enabled: boolean) {
  const [items, setItems] = useState<FeedItem[]>([]);
  useEffect(() => {
    if (!enabled) return;
    let n = 0;
    const push = () => {
      const t = feedTemplates[Math.floor(Math.random() * feedTemplates.length)]!;
      n += 1;
      setItems((prev) =>
        [
          {
            id: Date.now() + n * 1000 + Math.floor(Math.random() * 999),

            visitor: `#${7000 + Math.floor(Math.random() * 2900)}`,
            text: t.text,
            kind: t.kind,
            tag: t.tag,
            amount: t.kind === "convert" ? Math.round((30 + Math.random() * 220) * 100) / 100 : 0,
          },
          ...prev,
        ].slice(0, 14),
      );
    };
    push();
    push();
    push();
    const iv = setInterval(push, 3200);
    return () => clearInterval(iv);
  }, [enabled]);
  return items;
}

const INSIGHTS = [
  {
    id: 1,
    text: "23% of hesitating visitors this week paused at shipping cost — consider adding a free-shipping-threshold intervention.",
  },
  {
    id: 2,
    text: "Mobile visitors from instagram hesitate 1.7× longer at checkout. A corner-card reassurance converts best for this cohort.",
  },
  {
    id: 3,
    text: "“Price-match reassurance” variant B is up 12.4% at 93% statistical confidence — promote it to 100% traffic.",
  },
];

const CHECKLIST = [
  { id: "snippet", label: "Install the tracking snippet", to: "/app/integrations", icon: Plug },
  { id: "intervention", label: "Create your first intervention", to: "/app/interventions/builder", icon: MousePointerClick },
  { id: "team", label: "Invite your team", to: "/app/team", icon: UserPlus },
];

function Overview() {
  const { firstRun } = Route.useSearch();
  const navigate = useNavigate();
  const [range, setRange] = useState<(typeof RANGES)[number]>("7d");
  const [loading, setLoading] = useState(true);
  const [compare, setCompare] = useState(true);
  const [insight, setInsight] = useState(0);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Session | null>(null);
  const [recovered, setRecovered] = useState(8412);
  const [aiOpen, setAiOpen] = useState(true);
  const [sound, setSound] = useState(false);
  const feed = useLiveFeed(!firstRun);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setInsight((i) => (i + 1) % INSIGHTS.length), 12000);
    return () => clearInterval(iv);
  }, []);

  const kpis = useMemo(() => KPI[range], [range]);

  if (loading) {
    return (
      <>
        <PageHeader title="Overview" description="Loading your live telemetry…" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Overview"
        description="What your shoppers are doing right now — and what Claarvia is doing about it."
        actions={
          <>
            <Tabs tabs={RANGES} value={range} onChange={setRange} size="sm" />
            <Button
              size="sm"
              onClick={() => setSound(signalSound.toggle())}
              aria-pressed={sound}
              title="Ambient sound for conversions and hesitation spikes"
            >
              {sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              {sound ? "Sound on" : "Sound off"}
            </Button>
            <Button variant="primary" onClick={() => navigate({ to: "/app/interventions/builder" })}>
              <Zap className="h-4 w-4" /> Create intervention
            </Button>
          </>
        }
      />

      {firstRun ? (
        <GlassCard glint className="mb-4 p-5">
          <SectionTitle
            title="Let's get you set up"
            subtitle="No data yet — three steps and your first hesitation signal lands within minutes."
          />
          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
            {CHECKLIST.map((c) => {
              const Icon = c.icon;
              const isDone = !!done[c.id];
              return (
                <li key={c.id}>
                  <Link
                    to={c.to}
                    onClick={() => setDone((d) => ({ ...d, [c.id]: true }))}
                    className="glass flex items-center gap-3 rounded-xl p-3 transition-all duration-300 hover:border-[rgba(124,108,255,0.45)]"
                  >
                    <span
                      className={
                        isDone
                          ? "grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[rgba(52,211,153,0.16)] text-success shadow-[0_0_16px_rgba(52,211,153,0.5)]"
                          : "grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[rgba(124,108,255,0.14)] text-violet"
                      }
                    >
                      {isDone ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </span>
                    <span className="min-w-0 truncate text-sm text-foreground">{c.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </GlassCard>
      ) : null}

      {/* Signal Field — the living canvas that IS the data */}
      <div className="relative">
        <SignalField
          onSelectSession={setSelected}
          recovered={recovered}
          onRecover={(a) => setRecovered((v) => v + a)}
        />

        {/* floating HUD readouts */}
        <div className="pointer-events-none absolute inset-0 p-3 sm:p-4">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Active sessions", value: kpis[1]!.value, delta: kpis[1]!.delta },
              { label: "Conversion lift", value: kpis[2]!.value, suffix: "%", delta: kpis[2]!.delta },
              { label: "Interventions", value: kpis[3]!.value, delta: kpis[3]!.delta },
            ].map((s) => (
              <div key={s.label} className="hud pointer-events-auto rounded-full px-3 py-1.5">
                <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {s.label}
                </span>
                <span className="ml-2 inline-flex items-center gap-2">
                  <Num
                    value={firstRun ? 0 : s.value}
                    suffix={s.suffix}
                    decimals={s.suffix ? 1 : 0}
                    className="text-sm text-foreground"
                  />
                  {!firstRun ? <Delta value={s.delta} /> : null}
                </span>
              </div>
            ))}
            <div className="hud pointer-events-auto ml-auto flex items-center gap-2 rounded-full px-3 py-1.5">
              <LivePulse label="signal field live" />
            </div>
          </div>

          {/* floating AI panel */}
          <AnimatePresence>
            {aiOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={spring}
                className="hud pointer-events-auto absolute bottom-3 left-3 right-3 max-w-md rounded-2xl p-4 sm:bottom-4 sm:left-4 sm:right-auto"
              >
                <div className="flex items-center gap-2">
                  <span className="grad-accent grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[#05060B]">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-foreground">AI has something to say</span>
                  <button
                    type="button"
                    onClick={() => setAiOpen(false)}
                    aria-label="Dismiss AI insight"
                    className="ml-auto grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {INSIGHTS[insight]!.text}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => navigate({ to: "/app/interventions/builder" })}
                  >
                    Act on this
                  </Button>
                  <Button size="sm" onClick={() => setInsight((i) => (i + 1) % INSIGHTS.length)}>
                    Next
                  </Button>
                </div>
              </motion.div>
            ) : (
              <button
                type="button"
                onClick={() => setAiOpen(true)}
                className="hud pointer-events-auto absolute bottom-3 left-3 flex items-center gap-2 rounded-full px-3 py-2 text-xs text-foreground sm:bottom-4 sm:left-4"
              >
                <Sparkles className="h-3.5 w-3.5 text-violet" /> AI insight
              </button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Every thread is a live visitor. Amber flicker means hesitation — tap any thread to open that
        session.
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.55fr_1fr]">
        {/* revenue chart */}
        <GlassCard className="p-5">
          <SectionTitle
            title="Revenue recovered over time"
            subtitle={compare ? "Compared against the “without Claarvia” baseline" : "Claarvia-attributed recovery"}
            action={
              <Button size="sm" onClick={() => setCompare((c) => !c)}>
                {compare ? "Hide baseline" : "Compare to baseline"}
              </Button>
            }
          />
          <div className="mt-5">
            <AreaTrend
              data={revenueSeries.map((r) => ({
                label: r.label,
                value: r.claarvia,
                ...(compare ? { compare: r.baseline } : {}),
              }))}
              live
              height={260}
              compareLabel="Without Claarvia"
              valueLabel="Revenue recovered"
              format={(v) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${Math.round(v)}`)}
            />
          </div>
        </GlassCard>

        <div className="flex min-w-0 flex-col gap-4">
        <GlassCard className="flex max-h-[26rem] min-h-[18rem] flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg text-foreground">Live activity</h2>
            <LivePulse label="live" />
          </div>
          <ul className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {feed.length === 0 ? (
                <li className="py-8 text-center text-sm text-muted-foreground">
                  No live sessions yet — install the Claarvia snippet to start tracking →
                </li>
              ) : null}
              {feed.map((f) => (
                <motion.li
                  key={f.id}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={spring}
                  className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-3"
                >
                  <div className="flex flex-wrap items-center gap-2 text-sm text-foreground">
                    <span className="num text-violet">Visitor {f.visitor}</span>
                    <span className="text-muted-foreground">{f.text}</span>
                    {f.amount ? (
                      <span className="num text-success">${f.amount.toFixed(2)} recovered</span>
                    ) : null}
                  </div>
                  <div className="mt-2">
                    <Chip
                      tone={f.kind === "convert" ? "success" : f.kind === "hesitate" ? "warn" : "accent"}
                    >
                      {f.tag}
                    </Chip>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </GlassCard>
        </div>
      </div>


      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {/* hesitation breakdown */}
        <GlassCard className="p-5">
          <SectionTitle title="Top hesitation reasons" subtitle="Share of hesitating sessions" />
          <ul className="mt-5 space-y-4">
            {hesitationBreakdown.map((h, i) => (
              <li key={h.reason}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">{h.reason}</span>
                  <Num value={h.value} suffix="%" className="text-foreground" />
                </div>
                <ProgressBar className="mt-2" value={h.value * 2.4} tone={i === 0 ? "accent" : "accent"} />
              </li>
            ))}
          </ul>
        </GlassCard>

      </div>


      {/* quick actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => navigate({ to: "/app/interventions/builder" })}>
          <Zap className="h-4 w-4" /> Create intervention
        </Button>
        <Button onClick={() => navigate({ to: "/app/sessions" })}>
          <Radio className="h-4 w-4" /> View live sessions
        </Button>
        <Button onClick={() => navigate({ to: "/app/team" })}>
          <UserPlus className="h-4 w-4" /> Invite teammate
        </Button>
        <Button
          onClick={() => {
            navigate({ to: "/app/integrations" });
            cvToast.info("Snippet installer opened");
          }}
        >
          <Plug className="h-4 w-4" /> Install snippet
        </Button>
      </div>

      {/* session detail from a tapped thread */}
      <SlideOver
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `Visitor ${selected.id}` : ""}
        subtitle={
          selected ? (
            <span className="num text-xs">
              {selected.device} · {selected.location} · {selected.source}
            </span>
          ) : null
        }
      >
        {selected ? (
          <div className="space-y-5">
            <GlassCard className="p-4">
              <p className="text-sm text-foreground">
                AI read:{" "}
                <span className="text-warn">
                  {selected.reason
                    ? `hesitating on ${selected.reason}`
                    : `${selected.state.toLowerCase()} — no hesitation detected`}
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Confidence <span className="num">{selected.confidence}%</span> · cart value{" "}
                <span className="num">${selected.value.toFixed(2)}</span> · {selected.timeOnSite} on
                site
              </p>
            </GlassCard>
            <GlassCard className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Journey</p>
              <p className="num mt-2 text-sm text-foreground">{selected.entryPage}</p>
              <p className="mt-2 text-sm text-muted-foreground">{selected.lastAction}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip tone="muted">{selected.segment}</Chip>
                <Chip tone={selected.outcome === "Converted" ? "success" : "accent"}>
                  {selected.intervention ?? "No intervention yet"}
                </Chip>
              </div>
            </GlassCard>
            <Button variant="primary" onClick={() => navigate({ to: "/app/sessions" })}>
              Open in Live Sessions
            </Button>
          </div>
        ) : null}
      </SlideOver>
    </>
  );
}

