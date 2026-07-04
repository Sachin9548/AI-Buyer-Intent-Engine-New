"use client";
import { Reveal, SectionHeader } from "./primitives";
import { Quote } from "lucide-react";

const items = [
  {
    q: "Alistine replaced four tools and our weekly analytics meeting. It tells us what to do.",
    n: "Marielle Chen", r: "Head of Growth, Octave",
  },
  {
    q: "The first time it predicted a drop-off, I refreshed the page twice. It was already right.",
    n: "Theo Nakamura", r: "Founder, Northwave",
  },
  {
    q: "Our conversion is up 31%. Our analyst is finally working on strategy, not dashboards.",
    n: "Liv Andersen", r: "VP Product, Parallel",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="container">
        <Reveal>
          <SectionHeader
            eyebrow="Voices"
            title={<>Loved by the teams that obsess over conversion.</>}
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.1}>
              <figure className="glass relative h-full rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1">
                <Quote className="h-5 w-5 text-primary/60" />
                <blockquote className="mt-5 font-display text-xl leading-snug text-foreground/95">"{t.q}"</blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-border/60 pt-5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-sm font-medium text-primary-foreground">
                    {t.n.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                  </span>
                  <div>
                    <div className="text-sm">{t.n}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.r}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
