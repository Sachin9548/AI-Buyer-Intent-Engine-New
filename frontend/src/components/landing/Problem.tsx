"use client";
import { motion } from "framer-motion";
import { Reveal, SectionHeader } from "./primitives";

export function Problem() {
  return (
    <section className="relative py-32">
      <div className="container">
        <Reveal>
          <SectionHeader
            eyebrow="The problem"
            title={<>Analytics counted clicks.<br/> <em className="italic">Nobody asked who clicked.</em></>}
            subtitle="A decade of dashboards taught us to admire numbers. Alistine asks the only question that matters: why did this human just leave?"
          />
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 items-stretch gap-px overflow-hidden rounded-3xl border border-border/70 bg-border/70 md:grid-cols-2">
          {/* Traditional */}
          <div className="bg-background p-8 md:p-10">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Traditional analytics</span>
            <p className="mt-4 font-display text-3xl text-foreground/80 md:text-4xl">12,840 visitors today.</p>
            <div className="mt-6 grid grid-cols-12 items-end gap-1 h-32">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.02 }}
                  style={{ height: `${(20 + Math.sin(i / 1.7) * 30 + 50).toFixed(2)}%`, transformOrigin: "bottom" }}
                  className="col-span-1 rounded-sm bg-muted-foreground/40"
                />
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">A number. A chart. Silence about what to do next.</p>
          </div>

          {/* AI understanding */}
          <div className="relative bg-card p-8 md:p-10">
            <div className="absolute inset-0 bg-gradient-aurora opacity-30" />
            <div className="relative">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">AI understanding</span>
              <p className="mt-4 font-display text-3xl text-gradient md:text-4xl">412 of them came to convert.</p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  ["High intent · pricing aware", "← 184 sessions"],
                  ["Returning · ready to upgrade", "← 96 sessions"],
                  ["Hesitating · needs reassurance", "← 132 sessions"],
                ].map(([t, c], i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-white/[0.02] px-3 py-2"
                  >
                    <span className="text-foreground/90">{t}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{c}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-foreground/85">A story. A reason. A next action.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
