import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Lock, Mail, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { Ambience } from "@/components/cv/NeuralMesh";
import { Button, Chip, Field, Input, spring } from "@/components/cv/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — Claarvia" },
      {
        name: "description",
        content:
          "Sign in to Claarvia to watch live shopper intent, detect hesitation and recover sales in real time.",
      },
      { property: "og:title", content: "Sign in — Claarvia" },
      {
        property: "og:description",
        content: "Access your real-time hesitation-recovery dashboard.",
      },
    ],
  }),
  component: AuthScreen,
});

const BEATS = ["They came.", "They explored.", "They hesitated."];

function AuthScreen() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [beat, setBeat] = useState(0);
  const [intro, setIntro] = useState(true);
  const [granted, setGranted] = useState(false);
  const [workspace, setWorkspace] = useState("");
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) {
      setIntro(false);
      return;
    }
    const timers = [
      setTimeout(() => setBeat(1), 1100),
      setTimeout(() => setBeat(2), 2200),
      setTimeout(() => setIntro(false), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setGranted(true);
    setTimeout(
      () => {
        if (mode === "signup") {
          navigate({ to: "/onboarding", search: { workspace: workspace || "Your workspace" } });
        } else {
          navigate({ to: "/app" });
        }
      },
      reduced ? 0 : 900,
    );
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <Ambience meshOpacity={0.45} />

      <AnimatePresence>
        {intro ? (
          <motion.div
            key="intro"
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 z-20 grid place-items-center"
          >
            <div className="text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={beat}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45 }}
                  className="font-display text-3xl font-bold tracking-tight text-foreground drop-shadow-[0_0_24px_rgba(124,108,255,0.5)] sm:text-5xl"
                >
                  {BEATS[beat]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!intro ? (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: granted ? 0 : 1, y: 0, scale: 1 }}
          transition={spring}
          className="glass shimmer relative z-10 w-full max-w-md rounded-3xl p-7 sm:p-8"
        >
          <div className="flex items-center gap-2.5">
            <span className="grad-accent grid h-9 w-9 place-items-center rounded-xl text-[#05060B]">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              Claarvia
            </span>
          </div>

          <h1 className="mt-6 text-2xl text-foreground">
            {mode === "signin" ? "Welcome back." : "Start recovering sales."}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Your visitors are hesitating right now. Let's step in."
              : "Create your workspace and watch intent live in minutes."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" ? (
              <Field label="Workspace / company">
                <Input
                  required
                  value={workspace}
                  onChange={(e) => setWorkspace(e.target.value)}
                  placeholder="Northwind Supply"
                />
              </Field>
            ) : null}
            <Field label="Work email">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input required type="email" placeholder="ava@store.com" className="pl-9" />
              </div>
            </Field>
            <Field label="Password">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input required type="password" placeholder="••••••••" className="pl-9" />
              </div>
            </Field>
            <Button type="submit" variant="primary" className="w-full">
              {mode === "signin" ? "Sign in" : "Create workspace"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-5 flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-violet transition hover:opacity-80"
            >
              {mode === "signin" ? "Create an account" : "I already have an account"}
            </button>
            <Link to="/app" className="transition hover:text-foreground">
              Explore the dashboard →
            </Link>
          </div>
        </motion.div>
      ) : null}

      <AnimatePresence>
        {granted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring}
            className="absolute z-30"
          >
            <Chip tone="success" dot>
              Access granted
            </Chip>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
