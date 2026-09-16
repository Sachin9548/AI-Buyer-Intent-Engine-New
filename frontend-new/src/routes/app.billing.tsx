import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Download } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/cv/Shell";
import { Modal } from "@/components/cv/overlays";
import {
  Button,
  Chip,
  GlassCard,
  Num,
  ProgressBar,
  SectionTitle,
  spring,
} from "@/components/cv/ui";
import { cvToast } from "@/lib/cv-toast";
import { invoices, plans } from "@/lib/claarvia-data";

export const Route = createFileRoute("/app/billing")({
  head: () => ({
    meta: [
      { title: "Billing & Plan — Claarvia" },
      {
        name: "description",
        content: "Track sessions used, compare plans and download invoices for your Claarvia workspace.",
      },
      { property: "og:title", content: "Billing & Plan — Claarvia" },
      { property: "og:description", content: "Usage, plans and invoice history." },
    ],
  }),
  component: Billing,
});

function Billing() {
  const [current, setCurrent] = useState("Growth");
  const [target, setTarget] = useState<string | null>(null);
  const used = 184_320;
  const limit = 250_000;

  return (
    <>
      <PageHeader
        title="Billing & Plan"
        description="Usage-based pricing tied to sessions watched, not seats."
        actions={
          <Button onClick={() => cvToast.success("Payment method updated")}>
            <CreditCard className="h-4 w-4" /> Update card
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <GlassCard className="p-6">
          <SectionTitle
            title="Sessions this cycle"
            subtitle="Resets 1 March 2026"
            action={<Chip tone="accent">{current} plan</Chip>}
          />
          <div className="mt-5 flex items-end justify-between gap-3">
            <Num value={used} className="text-3xl text-foreground" />
            <span className="num text-sm text-muted-foreground">/ {limit.toLocaleString()}</span>
          </div>
          <ProgressBar className="mt-3" value={(used / limit) * 100} />
          <p className="mt-3 text-xs text-muted-foreground">
            At the current rate you'll reach ~92% of your allowance. Overage is billed at $0.40 per 1,000
            sessions.
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionTitle title="Next invoice" subtitle="Auto-charged to Visa •••• 4242" />
          <div className="mt-5 space-y-3 text-sm">
            {[
              ["Growth plan", "$490.00"],
              ["Session overage", "$0.00"],
              ["Tax (VAT 20%)", "$98.00"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-muted-foreground">{k}</span>
                <span className="num text-foreground">{v}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-[rgba(255,255,255,0.1)] pt-3">
              <span className="text-foreground">Total due 1 Mar</span>
              <span className="num text-violet">$588.00</span>
            </div>
          </div>
        </GlassCard>
      </div>

      <section className="mt-8">
        <SectionTitle title="Plans" subtitle="Change any time — prorated to the day." />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {plans.map((p, i) => {
            const active = p.name === current;
            return (
              <GlassCard
                key={p.name}
                transition={{ ...spring, delay: i * 0.05 }}
                className={`p-6 ${active ? "border-[rgba(124,108,255,0.5)] shadow-[0_0_40px_rgba(124,108,255,0.18)]" : ""}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base text-foreground">{p.name}</h3>
                  {active ? <Chip tone="accent">Current</Chip> : null}
                </div>
                <p className="num mt-3 text-2xl text-foreground">
                  ${p.price}
                  <span className="text-sm text-muted-foreground">/mo</span>
                </p>
                <p className="num mt-1 text-xs text-muted-foreground">
                  {p.sessions.toLocaleString()} sessions included
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-cyan">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-5 w-full justify-center"
                  variant={active ? "outline" : "primary"}
                  disabled={active}
                  onClick={() => setTarget(p.name)}
                >
                  {active ? "Current plan" : `Switch to ${p.name}`}
                </Button>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <SectionTitle title="Invoice history" />
        <GlassCard className="mt-4 overflow-x-auto p-0">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.1)] text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">PDF</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-[rgba(255,255,255,0.06)] last:border-0 transition-colors duration-300 hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <td className="num px-4 py-3 text-foreground">{inv.id}</td>
                  <td className="num px-4 py-3 text-muted-foreground">{inv.date}</td>
                  <td className="num px-4 py-3 text-muted-foreground">${inv.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <Chip tone={inv.status === "Paid" ? "success" : "warn"}>{inv.status}</Chip>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" onClick={() => cvToast.success("Invoice downloaded", inv.id)}>
                      <Download className="h-3.5 w-3.5" /> PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </section>

      <Modal
        open={!!target}
        onClose={() => setTarget(null)}
        title={`Switch to ${target ?? ""}`}
        description="Your new allowance applies immediately and today's invoice is prorated."
        footer={
          <>
            <Button onClick={() => setTarget(null)}>Keep current plan</Button>
            <Button
              variant="primary"
              onClick={() => {
                if (target) setCurrent(target);
                cvToast.success("Plan updated", `${target} plan is now active`);
                setTarget(null);
              }}
            >
              Confirm switch
            </Button>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">
          Nothing about your live interventions changes — only your session allowance and monthly rate.
        </p>
      </Modal>
    </>
  );
}
