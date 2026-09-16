import { createFileRoute } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/cv/Shell";
import { Modal } from "@/components/cv/overlays";
import {
  Button,
  Chip,
  Field,
  GlassCard,
  Input,
  SectionTitle,
  Select,
  spring,
} from "@/components/cv/ui";
import { cvToast } from "@/lib/cv-toast";
import { activityLog, teamMembers } from "@/lib/claarvia-data";

export const Route = createFileRoute("/app/team")({
  head: () => ({
    meta: [
      { title: "Team & Roles — Claarvia" },
      {
        name: "description",
        content: "Invite teammates, manage Owner/Admin/Editor/Viewer roles and audit who changed what.",
      },
      { property: "og:title", content: "Team & Roles — Claarvia" },
      { property: "og:description", content: "Roles, invites and a full activity log." },
    ],
  }),
  component: Team,
});

const ROLES = ["Owner", "Admin", "Editor", "Viewer"] as const;

function Team() {
  const [members, setMembers] = useState(teamMembers);
  const [invite, setInvite] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<(typeof ROLES)[number]>("Editor");

  return (
    <>
      <PageHeader
        title="Team & Roles"
        description="Who can see intent data, and who can publish interventions."
        actions={
          <Button variant="primary" onClick={() => setInvite(true)}>
            <UserPlus className="h-4 w-4" /> Invite teammate
          </Button>
        }
      />

      <GlassCard className="overflow-hidden p-0">
        <ul>
          {members.map((m, i) => (
            <li
              key={m.id}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-[rgba(255,255,255,0.06)] p-4 last:border-0 transition-colors duration-300 hover:bg-[rgba(255,255,255,0.04)]"
              style={{ transitionDelay: `${i * 10}ms` }}
            >
              <span className="grad-accent grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-bold text-[#05060B]">
                {m.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm text-foreground">{m.name}</p>
                <p className="num truncate text-xs text-muted-foreground">{m.email}</p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                {m.status === "Pending" ? <Chip tone="warn">Pending invite</Chip> : null}
                <Select
                  value={m.role}
                  aria-label={`Role for ${m.name}`}
                  onChange={(e) => {
                    setMembers((prev) =>
                      prev.map((p) => (p.id === m.id ? { ...p, role: e.target.value } : p)),
                    );
                    cvToast.success("Role updated", `${m.name} → ${e.target.value}`);
                  }}
                >
                  {ROLES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </Select>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    const removed = m;
                    setMembers((prev) => prev.filter((p) => p.id !== m.id));
                    cvToast.success("Member removed", m.name, () =>
                      setMembers((prev) => [...prev, removed]),
                    );
                  }}
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </GlassCard>

      <section className="mt-8">
        <SectionTitle title="Activity log" subtitle="Every publish, pause and permission change." />
        <GlassCard transition={spring} className="mt-4 p-0">
          <ul>
            {activityLog.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[rgba(255,255,255,0.06)] p-4 text-sm last:border-0"
              >
                <span className="text-foreground">
                  <span className="text-violet">{a.who}</span> {a.what}
                </span>
                <span className="num text-xs text-muted-foreground">{a.when}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </section>

      <Modal
        open={invite}
        onClose={() => setInvite(false)}
        title="Invite a teammate"
        description="They'll get an email link that expires in 7 days."
        footer={
          <>
            <Button onClick={() => setInvite(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={() => {
                if (!email) return;
                setMembers((prev) => [
                  ...prev,
                  {
                    id: `u${prev.length + 1}`,
                    name: email.split("@")[0] ?? email,
                    email,
                    role,
                    status: "Pending",
                    initials: email.slice(0, 2).toUpperCase(),
                  },
                ]);
                setInvite(false);
                cvToast.success("Invite sent", `${email} · ${role}`);
                setEmail("");
              }}
            >
              Send invite
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Email">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teammate@store.com"
            />
          </Field>
          <Field label="Role">
            <Select
              className="w-full"
              value={role}
              onChange={(e) => setRole(e.target.value as (typeof ROLES)[number])}
            >
              {ROLES.filter((r) => r !== "Owner").map((r) => (
                <option key={r}>{r}</option>
              ))}
            </Select>
          </Field>
        </div>
      </Modal>
    </>
  );
}
