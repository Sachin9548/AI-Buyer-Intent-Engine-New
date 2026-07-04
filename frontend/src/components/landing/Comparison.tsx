"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal, SectionHeader } from "./primitives";

const pairs = [
  {
    a: { title: "Sessions", body: "1,284 sessions today.", muted: "A number with no meaning." },
    b: { title: "Intent", body: "412 sessions show high purchase intent.", muted: "Predicted in real time." },
  },
  {
    a: { title: "Bounce Rate", body: "58% of visitors leave.", muted: "But you don't know why." },
    b: { title: "Behavior", body: "Visitors bounced after the pricing tier reveal.", muted: "Cause identified." },
  },
  {
    a: { title: "Clicks", body: "412 CTA clicks.", muted: "A flat count." },
    b: { title: "Predictions", body: "Of those, 184 will convert in 48h.", muted: "Forecast included." },
  },
  {
    a: { title: "Reports", body: "Weekly PDF, 32 pages.", muted: "You'll get to it." },
    b: { title: "Recommendations", body: "Simplify pricing to 2 tiers → +9% conv.", muted: "Action, not data." },
  },
];

export function Comparison() {
  const [active, setActive] = useState(0);
  return (
    <section id="comparison" className="relative py-32">
      <div className="container">
        <Reveal>
          <SectionHeader
            eyebrow="Traditional analytics vs Alistine"
            title={<>Numbers tell you <em className="italic">what</em>. Alistine tells you <em className="italic">why</em>.</>}
            subtitle="Every metric you've come to accept as 'analytics' has an AI-native counterpart. Click through to see the difference."
          />
        </Reveal>

        <div className="mx-auto mt-14 max-w-5xl">
          {/* tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {pairs.map((p, i) => (
              <button
                key={p.a.title}
                onClick={() => setActive(i)}
                className={`group relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="cmp-pill"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    className="absolute inset-0 rounded-full bg-white/5 ring-1 ring-border"
                  />
                )}
                <span className="relative font-mono text-xs uppercase tracking-widest">
                  {p.a.title} <span className="opacity-40">vs</span> {p.b.title}
                </span>
              </button>
            ))}
          </div>

          {/* compare card */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 md:grid-cols-2"
          >
            <Side side="before" t={pairs[active].a.title} body={pairs[active].a.body} muted={pairs[active].a.muted} />
            <Side side="after" t={pairs[active].b.title} body={pairs[active].b.body} muted={pairs[active].b.muted} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Side({ side, t, body, muted }: { side: "before" | "after"; t: string; body: string; muted: string }) {
  const isAfter = side === "after";
  return (
    <div className={`relative p-8 md:p-10 ${isAfter ? "bg-card" : "bg-background"}`}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {isAfter ? "With Alistine" : "Without"}
        </span>
        {isAfter && (
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-primary">
            AI <ArrowRight className="h-2.5 w-2.5" />
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl text-foreground md:text-3xl">{t}</p>
      <p className={`mt-3 text-lg ${isAfter ? "text-foreground" : "text-muted-foreground"}`}>{body}</p>
      <p className="mt-2 text-sm text-muted-foreground">{muted}</p>
      {isAfter && (
        <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-aurora opacity-30 mix-blend-screen" />
      )}
    </div>
  );
}
