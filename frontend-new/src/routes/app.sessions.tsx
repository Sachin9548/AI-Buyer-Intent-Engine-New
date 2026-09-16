import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Radio, Zap } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/cv/Shell";
import { Modal, SlideOver } from "@/components/cv/overlays";
import {
  Button,
  Chip,
  ConfidenceRing,
  EmptyState,
  GlassCard,
  LivePulse,
  Num,
  Select,
  SectionTitle,
  spring,
} from "@/components/cv/ui";
import { cvToast } from "@/lib/cv-toast";
import {
  buildSessions,
  interventions,
  stateTone,
  type IntentState,
  type Session,
} from "@/lib/claarvia-data";

export const Route = createFileRoute("/app/sessions")({
  head: () => ({
    meta: [
      { title: "Live Sessions — Claarvia" },
      {
        name: "description",
        content: "Watch live visitor intent, hesitation reasons and intervention outcomes session by session.",
      },
      { property: "og:title", content: "Live Sessions — Claarvia" },
      { property: "og:description", content: "Real-time visitor intent, one row per shopper." },
    ],
  }),
  component: Sessions,
});

const STATES: (IntentState | "All")[] = ["All", "Idle", "Browsing", "Hesitating", "Buying", "Converted", "Lost"];
const DEVICES = ["All", "Desktop", "Mobile", "Tablet"] as const;
const SOURCES = ["All", "google / cpc", "instagram", "direct", "klaviyo / email", "tiktok"] as const;

const TIMELINE = [
  { t: "00:00", label: "Landed on /collections/new", kind: "view" },
  { t: "00:34", label: "Viewed product · Aero Runner", kind: "view" },
  { t: "01:12", label: "Scroll depth 80% · read reviews", kind: "scroll" },
  { t: "02:05", label: "Added to cart · $128.00", kind: "cart" },
  { t: "03:41", label: "Opened shipping estimate twice", kind: "hesitate" },
  { t: "04:10", label: "Idle 44s on payment step", kind: "hesitate" },
  { t: "04:31", label: "Intervention shown · Free shipping nudge", kind: "intervene" },
];

function Sessions() {
  const all = useMemo(() => buildSessions(48), []);
  const [state, setState] = useState<(typeof STATES)[number]>("All");
  const [device, setDevice] = useState<(typeof DEVICES)[number]>("All");
  const [source, setSource] = useState<(typeof SOURCES)[number]>("All");
  const [selected, setSelected] = useState<Session | null>(null);
  const [triggerFor, setTriggerFor] = useState<Session | null>(null);
  const [pick, setPick] = useState(interventions[0]!.name);

  const rows = all.filter(
    (s) =>
      (state === "All" || s.state === state) &&
      (device === "All" || s.device === device) &&
      (source === "All" || s.source === source),
  );

  const activeFilters = [
    state !== "All" ? { key: "state", label: `state: ${state}`, clear: () => setState("All") } : null,
    device !== "All" ? { key: "device", label: `device: ${device}`, clear: () => setDevice("All") } : null,
    source !== "All" ? { key: "source", label: `source: ${source}`, clear: () => setSource("All") } : null,
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  return (
    <>
      <PageHeader
        title="Live Sessions"
        description="Every visitor, their intent state and the AI's read on why they're stalling."
        actions={
          <GlassCard className="flex items-center gap-3 px-4 py-2">
            <LivePulse label="" />
            <Num value={134} className="text-sm text-foreground" />
            <span className="text-xs text-muted-foreground">active right now</span>
          </GlassCard>
        }
      />

      <GlassCard className="mb-4 p-4">
        <div className="flex flex-wrap items-end gap-3">
          <Select value={state} onChange={(e) => setState(e.target.value as IntentState)} aria-label="Intent state">
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All intent states" : s}
              </option>
            ))}
          </Select>
          <Select value={device} onChange={(e) => setDevice(e.target.value as "All")} aria-label="Device">
            {DEVICES.map((d) => (
              <option key={d} value={d}>
                {d === "All" ? "All devices" : d}
              </option>
            ))}
          </Select>
          <Select value={source} onChange={(e) => setSource(e.target.value as "All")} aria-label="Source">
            {SOURCES.map((d) => (
              <option key={d} value={d}>
                {d === "All" ? "All sources" : d}
              </option>
            ))}
          </Select>
          <span className="num ml-auto text-xs text-muted-foreground">{rows.length} sessions</span>
        </div>
        {activeFilters.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {activeFilters.map((f) => (
              <Chip key={f.key} tone="accent" onRemove={f.clear}>
                {f.label}
              </Chip>
            ))}
          </div>
        ) : null}
      </GlassCard>

      {rows.length === 0 ? (
        <EmptyState
          icon={<Radio className="h-5 w-5" />}
          title="No sessions match these filters"
          message="Try widening the intent state or clearing device and source filters."
          actionLabel="Clear filters"
          onAction={() => {
            setState("All");
            setDevice("All");
            setSource("All");
          }}
        />
      ) : (
        <>
          {/* desktop table */}
          <GlassCard className="hidden overflow-hidden p-0 lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.1)] text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3">Visitor</th>
                  <th className="px-4 py-3">Entry page</th>
                  <th className="px-4 py-3">Intent</th>
                  <th className="px-4 py-3">Confidence</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Device / location</th>
                  <th className="px-4 py-3">Last action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((s, i) => (
                  <motion.tr
                    key={`${s.id}-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: Math.min(i * 0.012, 0.3) }}
                    onClick={() => setSelected(s)}
                    className="cursor-pointer border-b border-[rgba(255,255,255,0.06)] transition-colors duration-300 last:border-0 hover:bg-[rgba(255,255,255,0.05)]"
                  >
                    <td className="num px-4 py-3 text-violet">{s.id}</td>
                    <td className="num px-4 py-3 text-muted-foreground">{s.entryPage}</td>
                    <td className="px-4 py-3">
                      <Chip tone={stateTone[s.state]} dot>
                        {s.state}
                        {s.reason ? ` · ${s.reason}` : ""}
                      </Chip>
                    </td>
                    <td className="px-4 py-3">
                      <ConfidenceRing value={s.confidence} size={36} />
                    </td>
                    <td className="num px-4 py-3 text-muted-foreground">{s.timeOnSite}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {s.device} · {s.location}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{s.lastAction}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </GlassCard>

          {/* mobile cards */}
          <div className="space-y-3 lg:hidden">
            {rows.map((s, i) => (
              <GlassCard key={`${s.id}-m-${i}`} className="p-4" onClick={() => setSelected(s)}>
                <div className="flex items-center justify-between gap-3">
                  <span className="num text-violet">{s.id}</span>
                  <Chip tone={stateTone[s.state]} dot>
                    {s.state}
                  </Chip>
                </div>
                <p className="num mt-2 text-xs text-muted-foreground">{s.entryPage}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.lastAction}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="num text-xs text-muted-foreground">
                    {s.timeOnSite} · {s.device}
                  </span>
                  <ConfidenceRing value={s.confidence} size={34} />
                </div>
              </GlassCard>
            ))}
          </div>
        </>
      )}

      {/* session detail */}
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
          <div className="space-y-6">
            <GlassCard className="p-4">
              <div className="flex items-start gap-4">
                <ConfidenceRing value={selected.confidence} size={64} />
                <div className="min-w-0">
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
                    <span className="num">${selected.value.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </GlassCard>

            <section>
              <SectionTitle title="Journey timeline" subtitle="Key events in this session" />
              <ol className="relative mt-4 space-y-3 border-l border-[rgba(255,255,255,0.12)] pl-5">
                {TIMELINE.map((e, i) => (
                  <motion.li
                    key={e.t}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...spring, delay: i * 0.06 }}
                    className="relative"
                  >
                    <span
                      className={
                        e.kind === "hesitate"
                          ? "absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-warn shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                          : e.kind === "intervene"
                            ? "grad-accent absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full"
                            : "absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.3)]"
                      }
                    />
                    <p className="text-sm text-foreground">{e.label}</p>
                    <p className="num text-[11px] text-muted-foreground">{e.t}</p>
                  </motion.li>
                ))}
              </ol>
            </section>

            <section>
              <SectionTitle title="Intervention" />
              <GlassCard className="mt-3 p-4">
                {selected.intervention ? (
                  <>
                    <p className="text-sm text-foreground">{selected.intervention}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Chip tone={selected.outcome === "Converted" ? "success" : "accent"}>
                        {selected.outcome ?? "Pending"}
                      </Chip>
                      <Chip tone="muted">{selected.segment}</Chip>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No intervention shown yet for this session.
                  </p>
                )}
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={() => setTriggerFor(selected)}
                >
                  <Zap className="h-4 w-4" /> Trigger intervention now
                </Button>
              </GlassCard>
            </section>
          </div>
        ) : null}
      </SlideOver>

      <Modal
        open={!!triggerFor}
        onClose={() => setTriggerFor(null)}
        title="Trigger an intervention"
        description={triggerFor ? `This will show instantly to visitor ${triggerFor.id}.` : ""}
        footer={
          <>
            <Button onClick={() => setTriggerFor(null)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={() => {
                cvToast.success("Intervention triggered", `${pick} → visitor ${triggerFor?.id}`);
                setTriggerFor(null);
              }}
            >
              Trigger now
            </Button>
          </>
        }
      >
        <Select value={pick} onChange={(e) => setPick(e.target.value)} className="w-full" aria-label="Intervention">
          {interventions.map((iv) => (
            <option key={iv.id} value={iv.name}>
              {iv.name}
            </option>
          ))}
        </Select>
      </Modal>
    </>
  );
}
