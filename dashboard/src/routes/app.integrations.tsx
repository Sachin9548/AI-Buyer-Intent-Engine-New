import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Copy, Plug } from "lucide-react";
import { useEffect, useState } from "react";

import { PageHeader } from "@/components/cv/Shell";
import { SlideOver } from "@/components/cv/overlays";
import {
  Button,
  Chip,
  GlassCard,
  LivePulse,
  SectionTitle,
  spring,
} from "@/components/cv/ui";
import { cvToast } from "@/lib/cv-toast";
import { integrationsList } from "@/lib/claarvia-data";

export const Route = createFileRoute("/app/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — Claarvia" },
      {
        name: "description",
        content: "Connect Shopify, WooCommerce, Slack, Klaviyo, GA4 or drop in the Claarvia snippet.",
      },
      { property: "og:title", content: "Integrations — Claarvia" },
      { property: "og:description", content: "Connect your storefront and start detecting hesitation." },
    ],
  }),
  component: Integrations,
});

const SNIPPET = `<script async src="https://cdn.claarvia.io/c.js"
  data-workspace="nw_8f21c4"
  data-mode="auto"></script>`;

function SnippetBlock() {
  return (
    <div className="relative rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(5,6,11,0.7)] p-4">
      <pre className="num overflow-x-auto text-xs leading-relaxed text-foreground">{SNIPPET}</pre>
      <Button
        size="sm"
        className="absolute right-2 top-2"
        onClick={() => {
          void navigator.clipboard?.writeText(SNIPPET);
          cvToast.success("Snippet copied");
        }}
      >
        <Copy className="h-3.5 w-3.5" /> Copy
      </Button>
    </div>
  );
}

function Integrations() {
  const [items, setItems] = useState(integrationsList);
  const [configure, setConfigure] = useState<(typeof integrationsList)[number] | null>(null);
  const [installer, setInstaller] = useState(false);
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    if (!installer) {
      setDetected(false);
      return;
    }
    const t = setTimeout(() => setDetected(true), 4200);
    return () => clearTimeout(t);
  }, [installer]);

  return (
    <>
      <PageHeader
        title="Integrations"
        description="Where Claarvia listens, and where it sends what it learns."
        actions={
          <Button variant="primary" onClick={() => setInstaller(true)}>
            <Plug className="h-4 w-4" /> Install snippet
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((it, i) => (
          <GlassCard key={it.id} transition={{ ...spring, delay: i * 0.04 }} className="p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-base text-foreground">{it.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{it.desc}</p>
              </div>
              <Chip tone={it.connected ? "success" : "muted"} dot>
                {it.connected ? "Connected" : "Not connected"}
              </Chip>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={it.connected ? "outline" : "primary"}
                onClick={() => {
                  setItems((prev) =>
                    prev.map((p) => (p.id === it.id ? { ...p, connected: !p.connected } : p)),
                  );
                  cvToast.success(
                    it.connected ? "Disconnected" : "Connected",
                    it.name,
                    () =>
                      setItems((prev) =>
                        prev.map((p) => (p.id === it.id ? { ...p, connected: it.connected } : p)),
                      ),
                  );
                }}
              >
                {it.connected ? "Disconnect" : "Connect"}
              </Button>
              <Button size="sm" onClick={() => setConfigure(it)}>
                Configure
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      <SlideOver
        open={!!configure}
        onClose={() => setConfigure(null)}
        title={configure ? `Configure ${configure.name}` : ""}
        subtitle="Three steps and you're live."
      >
        <ol className="space-y-4">
          {[
            "Authorize Claarvia to read storefront session events.",
            "Map your checkout and cart pages so hesitation is scoped correctly.",
            "Paste the snippet below into your theme's <head>.",
          ].map((step, i) => (
            <li key={step} className="glass rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="num grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[rgba(124,108,255,0.16)] text-xs text-violet">
                  {i + 1}
                </span>
                <p className="text-sm text-muted-foreground">{step}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-5">
          <SectionTitle title="Snippet" />
          <div className="mt-3">
            <SnippetBlock />
          </div>
        </div>
      </SlideOver>

      <SlideOver
        open={installer}
        onClose={() => setInstaller(false)}
        title="Install the Claarvia snippet"
        subtitle="Paste once — intent tracking starts immediately."
      >
        <SnippetBlock />
        <GlassCard className="mt-5 p-5 text-center">
          {detected ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={spring}>
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[rgba(52,211,153,0.16)] text-success shadow-[0_0_28px_rgba(52,211,153,0.45)]">
                <Check className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm text-foreground">First event received</p>
              <p className="num mt-1 text-xs text-muted-foreground">page_view · /checkout · 214ms</p>
            </motion.div>
          ) : (
            <>
              <LivePulse label="Waiting for first event…" />
              <p className="mt-3 text-xs text-muted-foreground">
                Load any page of your store — we'll detect it within seconds.
              </p>
            </>
          )}
        </GlassCard>
      </SlideOver>
    </>
  );
}
