import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MousePointerClick, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { PageHeader } from "@/components/cv/Shell";
import {
  Button,
  Chip,
  GlassCard,
  Num,
  SectionTitle,
  Skeleton,
  Tabs,
  Toggle,
  spring,
} from "@/components/cv/ui";
import { cvToast } from "@/lib/cv-toast";
import { apiFetch } from "@/lib/api";

export const Route = createFileRoute("/app/interventions/")({
  head: () => ({
    meta: [
      { title: "Interventions — Claarvia" },
      {
        name: "description",
        content:
          "Manage the real-time behavioral nudges that recover hesitating shoppers.",
      },
      { property: "og:title", content: "Interventions — Claarvia" },
      {
        property: "og:description",
        content: "Active trigger rules and recovered revenue per intervention.",
      },
    ],
  }),
  component: InterventionsList,
});

const FILTERS = ["All", "Active", "Paused"] as const;

export interface InterventionItem {
  id: string; // 'show_size_quiz' | 'show_discount' | 'show_trust'
  name: string;
  description: string;
  active: boolean;
  times_shown: number;
  conversions: number;
  conversion_rate_pct: number;
  discount_code?: string;
  discount_pct?: number;
}

const TEMPLATES_FALLBACK = [
  {
    id: "size",
    name: "Interactive Fit & Sizing Quiz",
    tone: "accent" as const,
    headline: "📏 Not sure about your size?",
    body: "Calculates instant fit recommendations using buyer height and weight.",
    tag: "Conversion Lift +18%",
  },
  {
    id: "discount",
    name: "5-Minute Exit Countdown",
    tone: "warn" as const,
    headline: "🏷️ Complete order & save 10%",
    body: "Time-limited urgency coupon auto-copied on exit intent or price doubts.",
    tag: "High Revenue Driver",
  },
  {
    id: "trust",
    name: "Risk-Reversal Trust Badges",
    tone: "success" as const,
    headline: "🛡️ 100% Verified & Hassle-Free Returns",
    body: "Assures hesitant shoppers with COD, fast delivery and return policies.",
    tag: "Zero-Discount Margin Saver",
  },
];

function InterventionsList() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [items, setItems] = useState<InterventionItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Real Interventions from Live Backend
  async function loadInterventions() {
    try {
      setLoading(true);
      const data = await apiFetch<InterventionItem[]>("/interventions");
      setItems(data || []);
    } catch (err: any) {
      cvToast.error(
        "Failed to load interventions",
        err.message || "Network error",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInterventions();
  }, []);

  // 2. Real-Time Toggle Handler with Optimistic UI & Revert
  const handleToggle = async (
    id: string,
    currentActive: boolean,
    name: string,
  ) => {
    const nextActive = !currentActive;

    // Optimistic UI Update
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: nextActive } : item,
      ),
    );

    try {
      await apiFetch(`/interventions/${id}/toggle`, {
        method: "PATCH",
        body: JSON.stringify({ active: nextActive }),
      });

      cvToast.success(
        nextActive ? "Intervention Activated" : "Intervention Paused",
        `${name} is now ${nextActive ? "live on store" : "suppressed"}.`,
      );
    } catch (err: any) {
      // Revert if API fails
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, active: currentActive } : item,
        ),
      );
      cvToast.error(
        "Update Failed",
        err.message || "Could not sync status with server.",
      );
    }
  };

  const rows = items.filter((i) => {
    if (filter === "All") return true;
    if (filter === "Active") return i.active;
    if (filter === "Paused") return !i.active;
    return true;
  });

  return (
    <>
      <PageHeader
        title="Interventions"
        description="Autonomous behavioral playbooks that detect shopper hesitation and trigger real-time actions."
        actions={
          <Tabs tabs={FILTERS} value={filter} onChange={setFilter} size="sm" />
        }
      />

      {loading ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {rows.map((iv, i) => (
            <GlassCard
              key={iv.id}
              transition={{ ...spring, delay: i * 0.04 }}
              className="p-5"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-base font-medium text-foreground">
                      {iv.name}
                    </h3>
                    {iv.discount_code && (
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {iv.discount_code} ({iv.discount_pct}% OFF)
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {iv.description}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2.5">
                  <Chip tone={iv.active ? "success" : "warn"} dot>
                    {iv.active ? "Active" : "Paused"}
                  </Chip>
                  <Toggle
                    label={`Toggle ${iv.name}`}
                    checked={iv.active}
                    onChange={() => handleToggle(iv.id, iv.active, iv.name)}
                  />
                </div>
              </div>

              {/* Performance Metrics DL */}
              <dl className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-[rgba(255,255,255,0.04)] border border-white/[0.05] p-3">
                  <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Times Shown
                  </dt>
                  <dd className="mt-1">
                    <Num
                      value={iv.times_shown}
                      className="text-base text-foreground font-semibold"
                    />
                  </dd>
                </div>

                <div className="rounded-xl bg-[rgba(255,255,255,0.04)] border border-white/[0.05] p-3">
                  <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Engaged / Converted
                  </dt>
                  <dd className="mt-1">
                    <Num
                      value={iv.conversions}
                      className="text-base text-success font-semibold"
                    />
                  </dd>
                </div>

                <div className="rounded-xl bg-[rgba(255,255,255,0.04)] border border-white/[0.05] p-3">
                  <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Conversion Rate
                  </dt>
                  <dd className="mt-1">
                    <Num
                      value={iv.conversion_rate_pct}
                      suffix="%"
                      decimals={0}
                      className="text-base text-foreground font-semibold"
                    />
                  </dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06]">
                <span className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-mono">
                  <Sparkles size={13} className="text-cyan-400" />
                  Autonomous Trigger ID:{" "}
                  <code className="text-slate-300">{iv.id}</code>
                </span>

                <span className="text-xs text-muted-foreground">
                  {iv.active ? "🟢 Live in SDK" : "⚪ Suppressed"}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Template Strategy Guide */}
      <section className="mt-8">
        <SectionTitle
          title="Playbook Architecture"
          subtitle="Pre-configured high-converting treatments optimized for mobile & desktop."
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {TEMPLATES_FALLBACK.map((t, i) => (
            <GlassCard
              key={t.id}
              transition={{ ...spring, delay: i * 0.04 }}
              className="p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">
                  {t.name}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/20">
                  {t.tag}
                </span>
              </div>
              <div className="glass rounded-xl p-3.5 mt-2 bg-white/[0.02]">
                <p className="font-display text-sm text-foreground font-medium">
                  {t.headline}
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {t.body}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {!loading && rows.length === 0 ? (
        <GlassCard className="mt-6 flex flex-col items-center gap-3 p-10 text-center">
          <MousePointerClick className="h-5 w-5 text-violet" />
          <p className="text-sm text-muted-foreground">
            No interventions match this filter.
          </p>
        </GlassCard>
      ) : null}
    </>
  );
}
