"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, ArrowUp } from "lucide-react";
import { Reveal, SectionHeader } from "./primitives";

const conversation = [
  { role: "user", text: "Why are visitors leaving the pricing page today?" },
  {
    role: "ai",
    text:
      "Three reasons drive 72% of today's drop-off: (1) the 3rd pricing tier reveals an annual-only toggle that mobile visitors miss, (2) the CTA color matches the trust badge above it, (3) intent scores collapse after the FAQ scroll. Recommended action: simplify to two tiers and reveal the trial CTA at 60% scroll depth.",
  },
];

export function AIAssistant() {
  return (
    <section className="relative py-32">
      <div className="container">
        <Reveal>
          <SectionHeader
            eyebrow="AI assistant"
            title={<>Ask anything. <em className="italic">Get the why.</em></>}
            subtitle="Type a question. Alistine answers in plain language — and updates every chart in the dashboard to match."
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-12">
          {/* Chat */}
          <Reveal className="md:col-span-7" delay={0.1}>
            <div className="glass rounded-3xl p-5 shadow-card md:p-6">
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Alistine · assistant</span>
              </div>

              <div className="mt-4 space-y-4">
                {conversation.map((m, i) => (
                  <Bubble key={i} role={m.role as any} text={m.text} delay={i * 0.6} />
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-full border border-border/70 bg-white/[0.02] p-2 pl-4">
                <input
                  className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                  placeholder="Ask Alistine why visitors leave…"
                />
                <button className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Updating viz */}
          <Reveal className="md:col-span-5" delay={0.2}>
            <ReactiveViz />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Bubble({ role, text, delay = 0 }: { role: "user" | "ai"; text: string; delay?: number }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (role === "user") { setShown(text); return; }
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i += 3;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, 16);
    }, delay * 1000);
    return () => clearTimeout(start);
  }, [text, delay, role]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        role === "user" ? "border border-border bg-white/[0.04] text-foreground" : "bg-gradient-primary/10 ring-1 ring-primary/30 text-foreground"
      }`}>
        {shown}
        {role === "ai" && shown.length < text.length && <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-primary align-middle" />}
      </div>
    </motion.div>
  );
}

function ReactiveViz() {
  return (
    <div className="glass relative h-full rounded-3xl p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Pricing page · today</div>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-primary">
          updating
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {[
          { l: "3rd tier (mobile)", v: 72, c: "hsl(var(--primary))" },
          { l: "Trust badge collision", v: 51, c: "hsl(var(--accent))" },
          { l: "FAQ collapse", v: 38, c: "hsl(195 100% 55%)" },
          { l: "Footer abandonment", v: 17, c: "hsl(220 10% 60%)" },
        ].map((row, i) => (
          <div key={row.l}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-foreground/85">{row.l}</span>
              <span className="font-mono text-muted-foreground">{row.v}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }} whileInView={{ width: `${row.v}%` }} viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: row.c }}
                className="h-full rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-primary">Recommendation</div>
        <p className="mt-1 text-sm text-foreground/90">
          Move trial CTA to 60% scroll depth. Forecast: <span className="text-primary">+9.2%</span> conversion in 14 days.
        </p>
      </div>
    </div>
  );
}
