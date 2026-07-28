"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { Aurora } from "./primitives";

const beats = [
  { t: "They came.", s: "A visitor lands. Curious." },
  { t: "They explored.", s: "Three pages. A pricing tab. A scroll." },
  { t: "They hesitated.", s: "The cursor pauses near the CTA." },
  { t: "They left.", s: "No event fired. No reason given." },
];

export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const beatIndex = useTransform(scrollYProgress, [0, 0.13, 0.27, 0.4, 0.55], [0, 1, 2, 3, 3.99]);
  const pause = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const glow = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const reveal = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const hintY = useTransform(scrollYProgress, [0, 0.08], [0, 10]);

  return (
    <section ref={ref} className="relative" style={{ height: "800vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <Aurora className="opacity-40" />
        <motion.div style={{ opacity: pause }} className="absolute inset-0 bg-background" />
        <motion.div style={{ opacity: glow }} className="absolute inset-0" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl" />
        </motion.div>

        <div className="container relative z-10 px-6 text-center">
          {beats.map((b, i) => (
            <BeatLine key={i} index={i} progress={beatIndex} text={b.t} sub={b.s} />
          ))}

          <motion.div style={{ opacity: glow }} className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <p className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-foreground/90 sm:text-5xl">
              Until Claarvia started watching.
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: hintOpacity, y: hintY }}
            className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground/80 sm:bottom-10"
          >
            <span>Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.div>

{/*
          <motion.div
            style={{ opacity: reveal, y: useTransform(reveal, [0, 1], [40, 0]) }}
            className="absolute inset-x-0 bottom-10"
          >
            <div className="mx-auto max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Dashboard assembling…</p>
              <div className="mt-4 grid grid-cols-6 gap-2">
                {Array.from({ length: 18 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={false}
                    style={{ opacity: useTransform(reveal, [0, 1], [0, 1]) }}
                    className="h-3 rounded-full bg-gradient-primary"
                  />
                ))}
              </div>
            </div>
          </motion.div>

            */}

        </div>
      </div>
    </section>
  );
}

function BeatLine({ index, progress, text, sub }: { index: number; progress: any; text: string; sub: string }) {
  const opacity = useTransform(progress, [index - 0.5, index, index + 0.5], [0, 1, 0]);
  const y = useTransform(progress, [index - 0.5, index, index + 0.5], [40, 0, -40]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-1/2 -translate-y-1/2">
      <p className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">{text}</p>
      <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">{sub}</p>
    </motion.div>
  );
}
