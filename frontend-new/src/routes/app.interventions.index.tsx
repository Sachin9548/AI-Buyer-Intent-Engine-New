import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MousePointerClick, Plus } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/cv/Shell";
import {
  Button,
  Chip,
  GlassCard,
  Num,
  SectionTitle,
  Tabs,
  Toggle,
  spring,
} from "@/components/cv/ui";
import { cvToast } from "@/lib/cv-toast";
import { interventions as seed, templates } from "@/lib/claarvia-data";

export const Route = createFileRoute("/app/interventions/")({
  head: () => ({
    meta: [
      { title: "Interventions — Claarvia" },
      {
        name: "description",
        content: "Build, publish and measure the popups and nudges that recover hesitating shoppers.",
      },
      { property: "og:title", content: "Interventions — Claarvia" },
      { property: "og:description", content: "Trigger rules, A/B variants and recovered revenue per intervention." },
    ],
  }),
  component: InterventionsList,
});

const FILTERS = ["All", "Active", "Paused", "Draft"] as const;

export function TemplatePreview({
  tone,
  headline,
  body,
  cta = "Keep my cart",
  compact = false,
}: {
  tone: "accent" | "success" | "warn";
  headline: string;
  body: string;
  cta?: string;
  compact?: boolean;
}) {
  const accent =
    tone === "success"
      ? "bg-success text-[#05060B]"
      : tone === "warn"
        ? "bg-warn text-[#05060B]"
        : "grad-accent text-[#05060B]";
  return (
    <div className="glass rounded-xl p-4">
      <p className={compact ? "font-display text-sm text-foreground" : "font-display text-lg text-foreground"}>
        {headline}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{body}</p>
      <span className={`mt-3 inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold ${accent}`}>{cta}</span>
    </div>
  );
}

function InterventionsList() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [items, setItems] = useState(seed);

  const rows = items.filter((i) => filter === "All" || i.status === filter);

  return (
    <>
      <PageHeader
        title="Interventions"
        description="Every nudge, its trigger rules and the revenue it brought back."
        actions={
          <>
            <Tabs tabs={FILTERS} value={filter} onChange={setFilter} size="sm" />
            <Button variant="primary" onClick={() => navigate({ to: "/app/interventions/builder" })}>
              <Plus className="h-4 w-4" /> New intervention
            </Button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {rows.map((iv, i) => (
          <GlassCard key={iv.id} transition={{ ...spring, delay: i * 0.04 }} className="p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <h3 className="truncate text-base text-foreground">{iv.name}</h3>
                <p className="num mt-1 truncate text-xs text-muted-foreground">{iv.trigger}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Chip
                  tone={iv.status === "Active" ? "success" : iv.status === "Paused" ? "warn" : "muted"}
                  dot
                >
                  {iv.status}
                </Chip>
                <Toggle
                  label={`Toggle ${iv.name}`}
                  checked={iv.status === "Active"}
                  onChange={(v) => {
                    setItems((prev) =>
                      prev.map((p) =>
                        p.id === iv.id ? { ...p, status: v ? "Active" : "Paused" } : p,
                      ),
                    );
                    cvToast.success(v ? "Intervention activated" : "Intervention paused", iv.name);
                  }}
                />
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-3">
              {[
                ["Shown", iv.shown, ""],
                ["Converted", iv.converted, ""],
                ["Recovered", iv.recovered, "$"],
              ].map(([label, value, prefix]) => (
                <div key={label as string} className="rounded-xl bg-[rgba(255,255,255,0.05)] p-3">
                  <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</dt>
                  <dd>
                    <Num
                      value={value as number}
                      prefix={prefix as string}
                      decimals={prefix ? 2 : 0}
                      className={prefix ? "text-sm text-success" : "text-sm text-foreground"}
                    />
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Chip tone="muted">{iv.template}</Chip>
              <Chip tone="accent">
                {iv.variants} variant{iv.variants > 1 ? "s" : ""}
              </Chip>
              <Link
                to="/app/interventions/builder"
                className="ml-auto text-xs text-violet transition hover:opacity-80"
              >
                Open builder →
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>

      <section className="mt-8">
        <SectionTitle
          title="Template gallery"
          subtitle="Start from a proven pattern and tune it in the builder."
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {templates.map((t, i) => (
            <GlassCard key={t.id} transition={{ ...spring, delay: i * 0.04 }} className="p-4">
              <motion.div whileHover={{ y: -3 }} transition={spring}>
                <TemplatePreview tone={t.tone} headline={t.headline} body={t.body} compact />
              </motion.div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="min-w-0 truncate text-sm text-foreground">{t.name}</p>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    cvToast.success("Template loaded", t.name);
                    navigate({ to: "/app/interventions/builder", search: { template: t.id } });
                  }}
                >
                  Use this
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {rows.length === 0 ? (
        <GlassCard className="mt-6 flex flex-col items-center gap-3 p-10 text-center">
          <MousePointerClick className="h-5 w-5 text-violet" />
          <p className="text-sm text-muted-foreground">No interventions with this status yet.</p>
        </GlassCard>
      ) : null}
    </>
  );
}
