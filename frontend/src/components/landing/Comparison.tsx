"use client";
import { motion } from "framer-motion";
import { Eye, Star, Zap } from "lucide-react";
import { Reveal } from "./primitives";

/* ── Narrative section ── */
export function Comparison() {
  return (
    <>
      {/* Section 1 — Narrative: analytics vs grothfy */}
      <section id="comparison" className="relative py-28">
        <div className="container mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
                A Product Page, Decoded
              </p>
              <h2 className="font-display text-4xl leading-tight text-foreground balance md:text-6xl">
                Analytics shows{" "}
                <em className="italic text-primary">what</em>{" "}
                happened.
                <br />
                Grothfy shows you{" "}
                <em className="italic text-primary">why</em>
                , while there&apos;s still time to act.
              </h2>
            </div>
          </Reveal>

          {/* Compare cards */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Without */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-border/60 bg-white/[0.02] p-8 md:p-10"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Without Grothfy
                </p>
                <p className="mt-4 font-display text-2xl text-foreground/80 md:text-3xl">
                  Numbers without meaning
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;98% of visitors leave without buying.&rdquo; You know the drop-off happened.
                  You have no idea if it was price, shipping, trust, or fit — so every fix is a guess.
                </p>
              </motion.div>

              {/* With */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/[0.04] p-8 md:p-10"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-aurora opacity-20" />
                <div className="relative">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                    With Grothfy
                  </p>
                  <p className="mt-4 font-display text-2xl text-foreground md:text-3xl">
                    Understanding, with a plan
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                    &ldquo;62% of today&apos;s drop-off was price hesitation on the Ring collection.&rdquo;
                    Grothfy names the reason and acts on it in the same second — before the tab closes.
                  </p>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2 — Product: what it is + trio */}
      <section id="product" className="relative py-28 border-t border-border/40">
        <div className="container mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-14 text-center max-w-3xl mx-auto">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-5">
                What It Is
              </p>
              <h2 className="font-display text-4xl leading-tight text-foreground balance md:text-5xl">
                An intent layer that sits on your store
                <br />
                and helps each visitor over the line.
              </h2>
              <p className="mt-5 text-base text-muted-foreground">
                One script, no theme edits. Grothfy watches how people actually move through a product
                page — and steps in only when it matters.
              </p>
            </div>
          </Reveal>

          {/* Trio cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                icon: Eye,
                title: "Reads real behavior",
                body: "Scroll speed, price re-checks, cursor dwell — the small signals humans give off right before they decide to leave or buy.",
                delay: 0,
              },
              {
                icon: Star,
                title: "Names the objection",
                body: 'Not just "at risk" — Grothfy classifies the exact hesitation: price, shipping cost, trust, or fit, so the response actually fits the doubt.',
                delay: 0.1,
              },
              {
                icon: Zap,
                title: "Acts in the moment",
                body: "The right nudge — a capped discount, a trust badge, a size guide — fires inside the hesitation window, not five minutes later in an email.",
                delay: 0.2,
              },
            ].map((card) => (
              <Reveal key={card.title} delay={card.delay}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "hsl(var(--primary) / 0.4)" }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-white/[0.02] p-7 h-full"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl text-foreground">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
