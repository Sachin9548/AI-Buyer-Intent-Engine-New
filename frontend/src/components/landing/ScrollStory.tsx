"use client";
import { motion, useScroll, useTransform } from "framer-motion";
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

  // 0..0.55 beats, 0.55..0.7 dark pause, 0.7..0.85 blue glow, 0.85..1 reveal
  const beatIndex = useTransform(scrollYProgress, [0, 0.13, 0.27, 0.4, 0.55], [0, 1, 2, 3, 3.99]);
  const pause = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const glow = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const reveal = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <section ref={ref} className="relative" style={{ height: "800vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <Aurora className="opacity-40" />
        {/* dark pause overlay */}
        <motion.div style={{ opacity: pause }} className="absolute inset-0 bg-background" />
        {/* blue glow */}
        <motion.div
          style={{ opacity: glow }}
          className="absolute inset-0"
          aria-hidden
        >
          <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl" />
        </motion.div>

        <div className="container relative z-10 text-center">
          {beats.map((b, i) => (
            <BeatLine key={i} index={i} progress={beatIndex} text={b.t} sub={b.s} />
          ))}

          <motion.div style={{ opacity: glow }} className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <p className="mx-auto max-w-xl font-display text-3xl text-gradient-primary md:text-5xl">
              Until Alistine started watching.
            </p>
          </motion.div>

          {/* <motion.div style={{ opacity: reveal, y: useTransform(reveal, [0, 1], [40, 0]) }}
            className="absolute inset-x-0 bottom-10">
            <div className="mx-auto max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Dashboard assembling…</p>
              <div className="mt-4 grid grid-cols-6 gap-2">
                {Array.from({ length: 18 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={false}
                    style={{
                      opacity: useTransform(reveal, [0, 1], [0, 1]),
                    }}
                    className="h-3 rounded-full bg-gradient-primary"
                  />
                ))}
              </div>
            </div>
          </motion.div> */}
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
      <p className="font-display text-5xl text-gradient balance md:text-7xl">{text}</p>
      <p className="mt-4 text-muted-foreground">{sub}</p>
    </motion.div>
  );
}
