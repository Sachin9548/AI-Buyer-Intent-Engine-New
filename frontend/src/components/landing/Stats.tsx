"use client";
import { AnimatedNumber, Reveal } from "./primitives";

const stats = [
  { v: 38, s: "%", l: "Average conversion lift" },
  { v: 9, s: "B+", l: "Sessions modeled" },
  { v: 60, s: "s", l: "Time to first insight" },
  { v: 99.99, s: "%", l: "Uptime SLA" },
];

export function Stats() {
  return (
    <section className="relative py-24">
      <div className="container">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/70 bg-border/70 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="bg-background p-8 md:p-10">
                <div className="font-display text-5xl text-gradient md:text-6xl">
                  <AnimatedNumber value={s.v} suffix={s.s} />
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
