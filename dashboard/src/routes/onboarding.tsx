import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

import { Ambience } from "@/components/cv/NeuralMesh";
import { Chip, GlassCard, Num, spring } from "@/components/cv/ui";

export const Route = createFileRoute("/onboarding")({
  validateSearch: z.object({ workspace: z.string().optional() }).parse,
  head: () => ({
    meta: [
      { title: "Welcome to Claarvia" },
      {
        name: "description",
        content: "Your Claarvia workspace is live — see how hesitation becomes recovered revenue.",
      },
      { property: "og:title", content: "Welcome to Claarvia" },
      { property: "og:description", content: "Chapter two: from hesitation to recovered sale." },
    ],
  }),
  component: Onboarding,
});

const SCENES = [
  { text: "We're watching for hesitation…", kind: "hesitate" as const },
  { text: "We step in at the right moment…", kind: "intervene" as const },
  { text: "You recover the sale.", kind: "recover" as const },
];

function Onboarding() {
  const navigate = useNavigate();
  const { workspace } = Route.useSearch();
  const [scene, setScene] = useState(-1);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      localStorage.setItem("claarvia:onboarded", "1");
    } catch {
      /* storage unavailable */
    }
    if (reduced) {
      navigate({ to: "/app", search: { firstRun: true } });
      return;
    }
    const timers = [
      setTimeout(() => setShowSkip(true), 1000),
      setTimeout(() => setScene(0), 1800),
      setTimeout(() => setScene(1), 4000),
      setTimeout(() => setScene(2), 6200),
      setTimeout(() => navigate({ to: "/app", search: { firstRun: true } }), 9000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <Ambience meshOpacity={0.55} />

      <AnimatePresence>
        {showSkip ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate({ to: "/app", search: { firstRun: true } })}
            className="absolute right-5 top-5 z-20 text-xs text-muted-foreground transition hover:text-foreground"
          >
            Skip →
          </motion.button>
        ) : null}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-2xl text-center">
        <AnimatePresence mode="wait">
          {scene < 0 ? (
            <motion.div
              key="wordmark"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
            >
              <div className="shimmer inline-flex items-center gap-3 rounded-2xl px-4 py-2">
                <span className="grad-accent grid h-10 w-10 place-items-center rounded-xl text-[#05060B]">
                  <Sparkles className="h-5 w-5" />
                </span>
                <span className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Welcome to Claarvia
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{workspace ?? "Your workspace"}</p>
            </motion.div>
          ) : (
            <motion.div
              key={scene}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
              transition={{ duration: 0.55 }}
              className="space-y-7"
            >
              <p className="font-display text-2xl font-bold tracking-tight text-foreground drop-shadow-[0_0_24px_rgba(124,108,255,0.45)] sm:text-4xl">
                {SCENES[scene]!.text}
              </p>

              {SCENES[scene]!.kind === "hesitate" ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={spring}>
                  <Chip tone="warn" dot className="animate-pulse">
                    Visitor #8532 · hesitating · price
                  </Chip>
                </motion.div>
              ) : null}

              {SCENES[scene]!.kind === "intervene" ? (
                <GlassCard className="mx-auto max-w-sm p-5 text-left" glint>
                  <p className="font-display text-lg text-foreground">We price-match. Always.</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Find it cheaper within 30 days and we refund the difference.
                  </p>
                  <span className="grad-accent mt-4 inline-flex rounded-xl px-3 py-1.5 text-xs font-semibold text-[#05060B]">
                    Keep my cart
                  </span>
                </GlassCard>
              ) : null}

              {SCENES[scene]!.kind === "recover" ? (
                <div className="relative mx-auto grid h-32 w-32 place-items-center">
                  <motion.span
                    initial={{ opacity: 0.5, scale: 0.6 }}
                    animate={{ opacity: 0, scale: 1.8 }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(52,211,153,0.4), transparent 65%)" }}
                  />
                  <Num value={1284.5} prefix="$" decimals={2} className="relative text-2xl text-success" />
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
