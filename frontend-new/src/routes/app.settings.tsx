import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader } from "@/components/cv/Shell";
import { Modal } from "@/components/cv/overlays";
import {
  Button,
  Field,
  GlassCard,
  Input,
  SectionTitle,
  Select,
  Tabs,
  Textarea,
  Toggle,
} from "@/components/cv/ui";
import { cvToast } from "@/lib/cv-toast";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Claarvia" },
      {
        name: "description",
        content: "Workspace profile, detection sensitivity, notifications, privacy and data retention.",
      },
      { property: "og:title", content: "Settings — Claarvia" },
      { property: "og:description", content: "Tune how Claarvia watches, alerts and stores data." },
    ],
  }),
  component: Settings,
});

const TABS = ["Workspace", "Detection", "Notifications", "Privacy"] as const;

function SettingToggle({ initial = false, label }: { initial?: boolean; label: string }) {
  const [on, setOn] = useState(initial);
  return <Toggle checked={on} onChange={setOn} label={label} />;
}

function Row({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-[rgba(255,255,255,0.06)] py-4 last:border-0">
      <div className="min-w-0">
        <p className="text-sm text-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Settings() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Workspace");
  const [sensitivity, setSensitivity] = useState(62);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  return (
    <>
      <PageHeader
        title="Settings"
        description="Workspace configuration, detection thresholds and data handling."
        actions={<Tabs tabs={TABS} value={tab} onChange={setTab} size="sm" />}
      />

      {tab === "Workspace" ? (
        <GlassCard className="p-6">
          <SectionTitle title="Workspace profile" subtitle="Shown on reports and shared links." />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Workspace name">
              <Input defaultValue="Northwind Supply Co." />
            </Field>
            <Field label="Primary storefront">
              <Input defaultValue="https://northwind.store" />
            </Field>
            <Field label="Timezone">
              <Select className="w-full" defaultValue="Europe/London">
                <option>Europe/London</option>
                <option>America/New_York</option>
                <option>Asia/Singapore</option>
              </Select>
            </Field>
            <Field label="Reporting currency">
              <Select className="w-full" defaultValue="USD">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </Select>
            </Field>
          </div>
          <div className="mt-5 flex justify-end">
            <Button variant="primary" onClick={() => cvToast.success("Workspace saved")}>
              Save changes
            </Button>
          </div>
        </GlassCard>
      ) : null}

      {tab === "Detection" ? (
        <GlassCard className="p-6">
          <SectionTitle
            title="Hesitation sensitivity"
            subtitle="Higher sensitivity triggers earlier, but fires more often."
          />
          <div className="mt-6">
            <input
              type="range"
              min={0}
              max={100}
              value={sensitivity}
              aria-label="Hesitation sensitivity"
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[rgba(255,255,255,0.12)] accent-[#7C6CFF]"
            />
            <div className="num mt-2 flex justify-between text-[11px] text-muted-foreground">
              <span>Conservative</span>
              <span className="text-violet">{sensitivity}</span>
              <span>Aggressive</span>
            </div>
          </div>
          <div className="mt-6">
            <Row title="Detect price doubt" desc="Repeated price-element dwell and comparison scrolls.">
              <SettingToggle initial label="Detect price doubt" />
            </Row>
            <Row title="Detect shipping doubt" desc="Shipping/returns tab opens before checkout.">
              <SettingToggle initial label="Detect shipping doubt" />
            </Row>
            <Row title="Detect checkout friction" desc="Field re-edits, idle time and back-navigation.">
              <SettingToggle initial label="Detect checkout friction" />
            </Row>
            <Row title="Quiet hours" desc="Suppress interventions between 01:00 and 06:00 local time.">
              <SettingToggle label="Quiet hours" />
            </Row>
          </div>
        </GlassCard>
      ) : null}

      {tab === "Notifications" ? (
        <GlassCard className="p-6">
          <SectionTitle title="Alerts" subtitle="Where Claarvia reaches you." />
          <div className="mt-4">
            <Row title="High-value session at risk" desc="Cart above $250 shows strong hesitation.">
              <SettingToggle initial label="High-value alerts" />
            </Row>
            <Row title="Intervention performance drop" desc="Conversion falls 20%+ week over week.">
              <SettingToggle initial label="Performance alerts" />
            </Row>
            <Row title="Weekly digest email" desc="Monday morning summary of recovered revenue.">
              <SettingToggle initial label="Weekly digest" />
            </Row>
            <Row title="Slack channel" desc="Post alerts to #revenue-recovery.">
              <SettingToggle label="Slack alerts" />
            </Row>
          </div>
        </GlassCard>
      ) : null}

      {tab === "Privacy" ? (
        <>
          <GlassCard className="p-6">
            <SectionTitle title="Privacy & data" subtitle="Claarvia never records keystrokes in form fields." />
            <div className="mt-4">
              <Row title="Anonymize IP addresses" desc="Truncate the final octet before storage.">
                <SettingToggle initial label="Anonymize IPs" />
              </Row>
              <Row title="Mask cart contents" desc="Store totals only, not line items.">
                <SettingToggle label="Mask cart contents" />
              </Row>
              <Row title="Session retention" desc="How long raw session timelines are kept.">
                <Select defaultValue="90 days">
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>12 months</option>
                </Select>
              </Row>
            </div>
            <div className="mt-5">
              <Field label="Data processing notes (internal)">
                <Textarea rows={3} defaultValue="DPA signed 2026-01-12. EU data residency enabled." />
              </Field>
            </div>
          </GlassCard>

          <GlassCard className="mt-4 border-[rgba(248,113,113,0.35)] p-6">
            <SectionTitle title="Danger zone" subtitle="This cannot be undone." />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Delete this workspace and all collected intent data.
              </p>
              <Button variant="danger" onClick={() => setConfirmDelete(true)}>
                Delete workspace
              </Button>
            </div>
          </GlassCard>
        </>
      ) : null}

      <Modal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete workspace"
        description="Type DELETE to confirm. All sessions, interventions and reports are removed."
        footer={
          <>
            <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
            <Button
              variant="danger"
              disabled={confirmText !== "DELETE"}
              onClick={() => {
                setConfirmDelete(false);
                setConfirmText("");
                cvToast.error("Deletion scheduled", "Workspace removal in 24 hours");
              }}
            >
              Permanently delete
            </Button>
          </>
        }
      >
        <Field label="Confirmation">
          <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="DELETE" />
        </Field>
      </Modal>
    </>
  );
}
