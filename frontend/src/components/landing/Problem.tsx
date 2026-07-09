"use client";
import { motion } from "framer-motion";
import { ArrowRight, Star, AlignJustify, Shield, Square, Plus } from "lucide-react";
import { Reveal, SectionHeader } from "./primitives";

const problems = [
  {
    num: "01",
    title: "Price shock",
    desc: "They open the price, hesitate, and go quiet",
    solution: "Grothfy offers the smallest discount that still converts them",
    icon: Star,
  },
  {
    num: "02",
    title: "Shipping surprise",
    desc: "Cost appears late, cart gets abandoned",
    solution: "Grothfy surfaces free-shipping threshold before checkout",
    icon: AlignJustify,
  },
  {
    num: "03",
    title: "Trust doubt",
    desc: "New visitor, unsure the brand is legit",
    solution: "Grothfy shows reviews, guarantees, and returns at the right second",
    icon: Shield,
  },
  {
    num: "04",
    title: "Size or fit doubt",
    desc: "They re-open the sizing chart twice, then leave",
    solution: "Grothfy surfaces the fit guide and past-buyer sizing notes",
    icon: Square,
  },
  {
    num: "05",
    title: "Decision fatigue",
    desc: "Too many similar options, no clear pick",
    solution: "Grothfy recommends the single best-fit variant based on behavior",
    icon: Plus,
  },
];

export function Problem() {
  return (
    <section className="relative py-32 mx-auto">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <SectionHeader
            eyebrow="The Problem"
            title={
              <>
                Most visitors leave for reasons
                <br />
                <em className="italic text-primary">you never see.</em>
              </>
            }
            subtitle="Five quiet reasons carts get abandoned — and how Grothfy answers each, in real time."
          />
        </Reveal>

        {/* Problem rows */}
        <div className="mt-16 flex flex-col divide-y divide-border/50">
          {problems.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.08}>
              <motion.div
                whileHover={{ backgroundColor: "hsl(var(--card))" }}
                transition={{ duration: 0.2 }}
                className="group grid grid-cols-1 items-center gap-4 rounded-2xl px-4 py-7 md:grid-cols-[1fr_auto_1fr] md:gap-8 md:px-6"
              >
                {/* Left — problem */}
                <div className="flex items-start gap-5">
                  <span className="font-mono text-[13px] font-medium tabular-nums text-muted-foreground/60 pt-0.5 shrink-0">
                    {p.num}
                  </span>
                  <div>
                    <div className="font-display text-xl text-foreground md:text-2xl">{p.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{p.desc}</div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-white/[0.03] text-muted-foreground group-hover:border-primary/40 group-hover:text-primary transition-colors duration-300"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>

                {/* Right — solution */}
                <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-white/[0.02] px-4 py-3 group-hover:border-primary/30 group-hover:bg-primary/[0.04] transition-colors duration-300">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <p.icon className="h-4 w-4" />
                  </span>
                  <p className="text-sm text-foreground/85 leading-snug">{p.solution}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
