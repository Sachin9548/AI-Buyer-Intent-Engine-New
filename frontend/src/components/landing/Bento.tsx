"use client";
import { motion } from "framer-motion";
import { LineChart, Brain, ShieldCheck, Zap, Globe2, Webhook, Clock, Layers } from "lucide-react";
import { Reveal, SectionHeader } from "./primitives";

const bento = [
  {
    span: "md:col-span-3 md:row-span-2",
    icon: Brain,
    title: "Intent engine",
    body: "Per-visitor scoring updated 4× per second. Trained on 9B sessions.",
    accent: true,
  },
  { span: "md:col-span-3", icon: LineChart, title: "Predictive funnels", body: "Forecast next-step conversion before the click." },
  { span: "md:col-span-3", icon: Zap, title: "Live nudges", body: "Trigger a perfectly-timed offer the moment hesitation begins." },
  { span: "md:col-span-2", icon: ShieldCheck, title: "Privacy-first", body: "GDPR, CCPA, SOC 2. Cookieless mode included." },
  { span: "md:col-span-2", icon: Webhook, title: "Plug into anything", body: "120+ integrations. Webhooks. SDKs in 6 languages." },
  { span: "md:col-span-2", icon: Layers, title: "Sessions, replayed", body: "Smart replay surfaces only the moments that matter." },
  { span: "md:col-span-3", icon: Globe2, title: "Global edge", body: "Sub-50ms ingestion from every continent. 99.99% uptime." },
  { span: "md:col-span-3", icon: Clock, title: "Time-to-insight: 60s", body: "Drop one snippet. Watch the dashboard come alive." },
];

export function Bento() {
  return (
    <section className="relative py-32">
      <div className="container">
        <Reveal>
          <SectionHeader
            eyebrow="Capabilities"
            title={<>The full intelligence stack.</>}
            subtitle="A complete platform — engineered to feel like a single, calm surface."
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-6xl auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-6">
          {bento.map((c, i) => (
            <Card key={c.title} {...c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ span, icon: Icon, title, body, accent, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant ${span}`}
    >
      {accent && <div className="absolute inset-0 -z-10 bg-gradient-aurora opacity-40" />}
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.04] ring-1 ring-border">
          <Icon className={`h-4 w-4 ${accent ? "text-primary" : "text-foreground/80"}`} />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">0{index + 1}</span>
      </div>
      <h3 className={`mt-6 font-display text-2xl ${accent ? "text-gradient-primary" : "text-foreground"}`}>{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{body}</p>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}
