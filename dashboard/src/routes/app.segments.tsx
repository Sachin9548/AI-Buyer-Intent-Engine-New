import { createFileRoute } from "@tanstack/react-router";
import { Plus, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/cv/Shell";
import { Modal, SlideOver } from "@/components/cv/overlays";
import {
  Button,
  Chip,
  Field,
  GlassCard,
  Input,
  Num,
  SectionTitle,
  Select,
  spring,
} from "@/components/cv/ui";
import { cvToast } from "@/lib/cv-toast";
import { buildSessions, segmentsList } from "@/lib/claarvia-data";

export const Route = createFileRoute("/app/segments")({
  head: () => ({
    meta: [
      { title: "Audience & Segments — Claarvia" },
      {
        name: "description",
        content: "Build rule-based shopper segments and see which interventions target each one.",
      },
      { property: "og:title", content: "Audience & Segments — Claarvia" },
      { property: "og:description", content: "Rule-based segments with live member counts." },
    ],
  }),
  component: Segments,
});

function Segments() {
  const [items, setItems] = useState(segmentsList);
  const [create, setCreate] = useState(false);
  const [preview, setPreview] = useState<(typeof segmentsList)[number] | null>(null);
  const [name, setName] = useState("");
  const sample = useMemo(() => buildSessions(8), []);

  return (
    <>
      <PageHeader
        title="Audience & Segments"
        description="Group shoppers by behaviour, then point interventions at exactly the right ones."
        actions={
          <Button variant="primary" onClick={() => setCreate(true)}>
            <Plus className="h-4 w-4" /> New segment
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((s, i) => (
          <GlassCard key={s.id} transition={{ ...spring, delay: i * 0.04 }} className="p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-base text-foreground">{s.name}</h3>
                <p className="num mt-1 text-xs text-muted-foreground">{s.rule}</p>
              </div>
              <div className="shrink-0 text-right">
                <Num value={s.members} className="text-lg text-foreground" />
                <p className="text-[11px] text-muted-foreground">members</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {s.interventions.length ? (
                s.interventions.map((iv) => (
                  <Chip key={iv} tone="accent">
                    {iv}
                  </Chip>
                ))
              ) : (
                <Chip tone="warn">no interventions targeting this</Chip>
              )}
              <Button size="sm" className="ml-auto" onClick={() => setPreview(s)}>
                Preview members
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      <Modal
        open={create}
        onClose={() => setCreate(false)}
        title="New segment"
        description="Same readable condition chips used by interventions."
        footer={
          <>
            <Button onClick={() => setCreate(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={() => {
                setItems((prev) => [
                  ...prev,
                  {
                    id: `sg${prev.length + 1}`,
                    name: name || "Untitled segment",
                    rule: "Returning visitor AND pricing page views ≥ 2 in last 7d",
                    members: 0,
                    interventions: [],
                  },
                ]);
                setCreate(false);
                setName("");
                cvToast.success("Segment saved", name || "Untitled segment");
              }}
            >
              Save segment
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Segment name">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="High-intent returning" />
          </Field>
          <div className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] p-3">
            <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">When</p>
            <div className="flex flex-wrap items-center gap-2">
              <Select aria-label="Field">
                <option>Visitor type</option>
                <option>Page views</option>
                <option>Hesitation reason</option>
              </Select>
              <Select aria-label="Operator">
                <option>is</option>
                <option>≥</option>
              </Select>
              <Input className="w-36" defaultValue="Returning" aria-label="Value" />
            </div>
          </div>
        </div>
      </Modal>

      <SlideOver
        open={!!preview}
        onClose={() => setPreview(null)}
        title={preview ? preview.name : ""}
        subtitle={preview ? <span className="num text-xs">{preview.members} members</span> : null}
      >
        <SectionTitle title="Sample members" subtitle="A slice of who currently matches." />
        <ul className="mt-4 space-y-2">
          {sample.map((s, i) => (
            <li
              key={`${s.id}-${i}`}
              className="flex items-center justify-between gap-3 rounded-xl bg-[rgba(255,255,255,0.05)] p-3"
            >
              <span className="num text-sm text-violet">{s.id}</span>
              <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
                {s.device} · {s.location} · {s.source}
              </span>
              <Chip tone="muted">{s.state}</Chip>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Users className="h-4 w-4" /> Counts refresh every 60 seconds.
        </div>
      </SlideOver>
    </>
  );
}
