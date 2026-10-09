import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Copy, KeyRound, Plug } from "lucide-react";
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
import { apiFetch } from "@/lib/api";

export const Route = createFileRoute("/app/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — Claarvia" },
      {
        name: "description",
        content:
          "Connect Shopify, WooCommerce, or drop in the Claarvia universal snippet.",
      },
      { property: "og:title", content: "Integrations — Claarvia" },
      {
        property: "og:description",
        content: "Connect your storefront and start detecting hesitation.",
      },
    ],
  }),
  component: Integrations,
});

export interface StoreSetupData {
  store_id: string;
  store_name: string;
  store_url: string;
  api_key: string;
  status: string;
  connected: boolean;
  first_event_at: string | null;
  last_event_at: string | null;
  script_tag: string;
}

const FALLBACK_SNIPPET = `<script src="https://bime-sdk.s3.ap-south-1.amazonaws.com/bime-sdk.js" data-store-id="wa-automation" async></script>`;

function SnippetBlock({
  snippet,
  apiKey,
}: {
  snippet: string;
  apiKey?: string;
}) {
  return (
    <div className="space-y-3">
      {/* 1-Line Script Snippet Box */}
      <div className="relative rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(5,6,11,0.7)] p-4">
        <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
          Universal HTML Script Tag
        </p>
        <pre className="num overflow-x-auto text-xs leading-relaxed text-foreground whitespace-pre-wrap break-all pr-16">
          {snippet}
        </pre>
        <Button
          size="sm"
          className="absolute right-2 top-2"
          onClick={() => {
            void navigator.clipboard?.writeText(snippet);
            cvToast.success("Script tag copied to clipboard");
          }}
        >
          <Copy className="h-3.5 w-3.5" /> Copy
        </Button>
      </div>

      {/* API Key Box */}
      {apiKey && (
        <div className="relative flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-xs">
          <div className="flex items-center gap-2 truncate pr-2">
            <KeyRound size={14} className="text-cyan-400 shrink-0" />
            <span className="text-muted-foreground shrink-0">API Key:</span>
            <code className="font-mono text-slate-200 truncate">{apiKey}</code>
          </div>
          <button
            type="button"
            className="text-cyan-400 hover:text-cyan-300 font-medium shrink-0 ml-2"
            onClick={() => {
              void navigator.clipboard?.writeText(apiKey);
              cvToast.success("API key copied");
            }}
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}

function Integrations() {
  const [items, setItems] = useState(integrationsList);
  const [configure, setConfigure] = useState<
    (typeof integrationsList)[number] | null
  >(null);
  const [installer, setInstaller] = useState(false);

  // Real backend store setup state
  const [storeData, setStoreData] = useState<StoreSetupData | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch real store setup, API key & connection status from backend
  useEffect(() => {
    async function loadStoreSetup() {
      try {
        setLoading(true);
        // ✅ Live backend endpoint
        const data = await apiFetch<StoreSetupData>("/stores/me");
        setStoreData(data);

        // Update real connection status on Shopify & Custom Snippet items
        if (data) {
          setItems((prev) =>
            prev.map((it) => {
              if (
                it.id === "shopify" ||
                it.id === "snippet" ||
                it.name.toLowerCase().includes("snippet")
              ) {
                return { ...it, connected: data.connected };
              }
              return it;
            }),
          );
        }
      } catch (err) {
        console.warn("Failed to load store setup details, using fallback.");
      } finally {
        setLoading(false);
      }
    }

    loadStoreSetup();
  }, []);

  const activeSnippet = storeData?.script_tag || FALLBACK_SNIPPET;
  const isConnected = Boolean(storeData?.connected);

  // Format relative last event time
  const formatTime = (isoString?: string | null) => {
    if (!isoString) return null;
    const diffSec = Math.max(
      1,
      Math.round((Date.now() - new Date(isoString).getTime()) / 1000),
    );
    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    return `${Math.floor(diffSec / 3600)}h ago`;
  };

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
          <GlassCard
            key={it.id}
            transition={{ ...spring, delay: i * 0.04 }}
            className="p-5"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-base text-foreground">
                  {it.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{it.desc}</p>
              </div>
              <Chip tone={it.connected ? "success" : "muted"} dot>
                {it.connected ? "Connected" : "Not connected"}
              </Chip>
            </div>

            {/* If connected from backend, show last active telemetry */}
            {it.connected && storeData?.last_event_at && (
              <p className="mt-2 text-[11px] font-mono text-emerald-400/80">
                ● Telemetry active · {formatTime(storeData.last_event_at)}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={it.connected ? "outline" : "primary"}
                onClick={() => {
                  setItems((prev) =>
                    prev.map((p) =>
                      p.id === it.id ? { ...p, connected: !p.connected } : p,
                    ),
                  );
                  cvToast.success(
                    it.connected ? "Disconnected" : "Connected",
                    it.name,
                    () =>
                      setItems((prev) =>
                        prev.map((p) =>
                          p.id === it.id
                            ? { ...p, connected: it.connected }
                            : p,
                        ),
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

      {/* Configure SlideOver */}
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
            <SnippetBlock snippet={activeSnippet} apiKey={storeData?.api_key} />
          </div>
        </div>
      </SlideOver>

      {/* Installer SlideOver with Real Backend Connection Status */}
      <SlideOver
        open={installer}
        onClose={() => setInstaller(false)}
        title="Install the Claarvia snippet"
        subtitle="Paste once — intent tracking starts immediately."
      >
        <SnippetBlock snippet={activeSnippet} apiKey={storeData?.api_key} />

        <GlassCard className="mt-5 p-5 text-center">
          {isConnected ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={spring}
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[rgba(52,211,153,0.16)] text-success shadow-[0_0_28px_rgba(52,211,153,0.45)]">
                <Check className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-medium text-foreground">
                SDK Connected & Active
              </p>
              <p className="num mt-1 text-xs text-muted-foreground font-mono">
                Store ID: {storeData?.store_id} · Last event:{" "}
                {formatTime(storeData?.last_event_at) || "Recently"}
              </p>
            </motion.div>
          ) : (
            <>
              <LivePulse label="Waiting for first event…" />
              <p className="mt-3 text-xs text-muted-foreground">
                Paste the snippet into your store's theme — we'll automatically
                detect when the first event lands.
              </p>
            </>
          )}
        </GlassCard>
      </SlideOver>
    </>
  );
}
