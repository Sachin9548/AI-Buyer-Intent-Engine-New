import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, Share2 } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/cv/Shell";
import { AreaTrend, BarTrend } from "@/components/cv/charts";
import {
  Button,
  Chip,
  Delta,
  GlassCard,
  Num,
  ProgressBar,
  SectionTitle,
  Tabs,
  Toggle,
  spring,
} from "@/components/cv/ui";
import { cvToast } from "@/lib/cv-toast";
import { funnel, interventions, revenueSeries, segmentsList } from "@/lib/claarvia-data";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics & Reports — Claarvia" },
      {
        name: "description",
        content: "Funnel breakdown, intervention leaderboard, cohort comparison and exportable reports.",
      },
      { property: "og:title", content: "Analytics & Reports — Claarvia" },
      { property: "og:description", content: "Deep reporting on recovered revenue and conversion lift." },
    ],
  }),
  component: Analytics,
});

const PRESETS = ["Today", "7d", "30d", "Custom"] as const;
type SortKey = "recovered" | "converted" | "shown";

function Analytics() {
  const [range, setRange] = useState<(typeof PRESETS)[number]>("30d");
  const [compare, setCompare] = useState(true);
  const [sort, setSort] = useState<SortKey>("recovered");
  const [digest, setDigest] = useState(true);

  const leaderboard = [...interventions].sort((a, b) => b[sort] - a[sort]);
  const max = funnel[0]!.value;

  return (
    <>
      <PageHeader
        title="Analytics & Reports"
        description="Where hesitation turns into revenue — and where it still doesn't."
        actions={
          <>
            <Tabs tabs={PRESETS} value={range} onChange={setRange} size="sm" />
            <Button onClick={() => cvToast.success("CSV export ready", "claarvia-report.csv")}>
              <Download className="h-4 w-4" /> Export CSV
            </Button>
            <Button
              variant="primary"
              onClick={() => cvToast.success("Share link copied", "Read-only report link")}
            >
              <Share2 className="h-4 w-4" /> Share report
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Revenue recovered", value: 168904.2, prefix: "$", decimals: 2, delta: 24.6 },
          { label: "Conversion lift", value: 16.1, suffix: "%", decimals: 1, delta: 3.4 },
          { label: "Avg. recovery value", value: 78.4, prefix: "$", decimals: 2, delta: -1.9 },
        ].map((k, i) => (
          <GlassCard key={k.label} transition={{ ...spring, delay: i * 0.05 }} className="p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{k.label}</p>
            <div className="mt-2 flex items-end justify-between gap-2">
              <Num
                value={k.value}
                prefix={k.prefix}
                suffix={k.suffix}
                decimals={k.decimals}
                className="text-2xl text-foreground"
              />
              <Delta value={k.delta} />
            </div>
            {compare ? (
              <p className="num mt-2 text-[11px] text-muted-foreground">vs previous period</p>
            ) : null}
          </GlassCard>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <GlassCard className="p-5">
          <SectionTitle
            title="Intent funnel"
            subtitle="Idle → Browsing → Hesitating → Converted / Lost"
            action={
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                Compare
                <Toggle checked={compare} onChange={setCompare} label="Compare to previous period" />
              </label>
            }
          />
          <ul className="mt-5 space-y-3">
            {funnel.map((f, i) => (
              <motion.li
                key={f.stage}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...spring, delay: i * 0.06 }}
              >
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">{f.stage}</span>
                  <Num value={f.value} className="text-foreground" />
                </div>
                <ProgressBar
                  className="mt-2"
                  value={(f.value / max) * 100}
                  tone={f.stage === "Converted" ? "success" : f.stage === "Lost" ? "danger" : "accent"}
                />
              </motion.li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle title="Recovered revenue by day" subtitle="Claarvia-attributed" />
          <div className="mt-5">
            <BarTrend
              data={revenueSeries.map((r) => ({ label: r.label, value: r.claarvia }))}
              height={240}
              format={(v) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${Math.round(v)}`)}
            />
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-4 p-5">
        <SectionTitle
          title="Conversion lift trend"
          subtitle="Claarvia-attributed lift vs the baseline cohort"
        />
        <div className="mt-5">
          <AreaTrend
            data={revenueSeries.map((r, i) => ({
              label: r.label,
              value: Math.round((r.claarvia / Math.max(1, r.baseline)) * 100) / 10 + i * 0.2,
              compare: 10,
            }))}
            height={240}
            compareLabel="Baseline"
            valueLabel="Conversion lift"
            format={(v) => `${v.toFixed(1)}%`}
          />
        </div>
      </GlassCard>

      <GlassCard className="mt-4 p-5">
        <SectionTitle
          title="Intervention leaderboard"
          subtitle="Sortable by impact"
          action={
            <Tabs
              size="sm"
              tabs={["recovered", "converted", "shown"] as const}
              value={sort}
              onChange={(v) => setSort(v as SortKey)}
            />
          }
        />
        <ul className="mt-4 space-y-3 md:hidden">
          {leaderboard.map((iv) => (
            <li
              key={iv.id}
              className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="min-w-0 text-sm text-foreground">{iv.name}</span>
                <Chip tone={iv.status === "Active" ? "success" : iv.status === "Paused" ? "warn" : "muted"}>
                  {iv.status}
                </Chip>
              </div>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <dt className="text-muted-foreground">Shown</dt>
                  <dd className="num text-foreground">{iv.shown.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Converted</dt>
                  <dd className="num text-foreground">{iv.converted.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Recovered</dt>
                  <dd className="num text-success">${iv.recovered.toLocaleString()}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
        <div className="mt-4 hidden md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.1)] text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2">Intervention</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Shown</th>
                <th className="px-3 py-2">Converted</th>
                <th className="px-3 py-2">Recovered</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((iv) => (
                <tr
                  key={iv.id}
                  className="border-b border-[rgba(255,255,255,0.06)] transition-colors duration-300 last:border-0 hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <td className="px-3 py-3 text-foreground">{iv.name}</td>
                  <td className="px-3 py-3">
                    <Chip tone={iv.status === "Active" ? "success" : iv.status === "Paused" ? "warn" : "muted"}>
                      {iv.status}
                    </Chip>
                  </td>
                  <td className="num px-3 py-3 text-muted-foreground">{iv.shown.toLocaleString()}</td>
                  <td className="num px-3 py-3 text-muted-foreground">{iv.converted.toLocaleString()}</td>
                  <td className="num px-3 py-3 text-success">${iv.recovered.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <SectionTitle title="Cohort comparison" subtitle="Recovery rate by segment" />
          <ul className="mt-5 space-y-4">
            {segmentsList.map((s, i) => (
              <li key={s.id}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate text-muted-foreground">{s.name}</span>
                  <Num value={9 + i * 3.4} suffix="%" decimals={1} className="text-foreground" />
                </div>
                <ProgressBar className="mt-2" value={(9 + i * 3.4) * 4} />
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle title="Scheduled reports" subtitle="Delivered to your team inbox." />
          <label className="mt-5 flex items-center justify-between gap-3 text-sm text-muted-foreground">
            Weekly digest email (Mondays, 09:00)
            <Toggle
              checked={digest}
              onChange={(v) => {
                setDigest(v);
                cvToast.success(v ? "Weekly digest on" : "Weekly digest off");
              }}
              label="Weekly digest"
            />
          </label>
          <p className="mt-4 text-xs text-muted-foreground">
            Digest recipients follow your notification preferences in Settings.
          </p>
        </GlassCard>
      </div>
    </>
  );
}
