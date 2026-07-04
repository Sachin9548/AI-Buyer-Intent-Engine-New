"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Play,
  Activity,
  Eye,
  MousePointer2,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Aurora, MagneticButton, Particles, Tilt } from "./primitives";

/* A live miniature dashboard for the hero. Updated with dynamic bars and fixed visibility. */
function LiveDashboard() {
  // Math.random() useEffect mein — hydration mismatch avoid karne ke liye
  const [barData, setBarData] = useState<{ h: number; t: string }[]>([]);

  useEffect(() => {
    const labels = ["9am", "", "", "12pm", "", "", "3pm", "", "", "6pm", "", "", "9pm", "", ""];
    setBarData(
      Array.from({ length: 15 }, (_, i) => ({
        h: Math.floor(Math.random() * 60) + 20,
        t: labels[i] || "",
      }))
    );
  }, []);

  return (
    <Tilt max={5} className="w-full">
      <div className="relative">
        {/* halo */}
        <div
          className="absolute -inset-10 -z-10 bg-gradient-aurora opacity-60 blur-3xl"
          aria-hidden
        />
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="glass relative w-full overflow-hidden rounded-2xl p-4 shadow-card md:rounded-3xl md:p-6"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* Window Chrome / Header */}
          <div className="flex items-center justify-between border-b border-border/70 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                grothfy.app / dashboard / live
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live
            </div>
          </div>

          {/* Top Stats Grid */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "VISITORS TRACKED", value: "3,842" },
              { label: "HESITATION CAUGHT", value: "614" },
              { label: "RECOVERED", value: "$18.4k", badge: "+22%" },
              { label: "AVG DISCOUNT TO CONVERT", value: "6.4%", sub: "protects margin" },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-white/[0.02] p-4">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-2xl md:text-3xl">{stat.value}</span>
                  {stat.badge && (
                    <span className="text-[10px] font-medium text-emerald-400">{stat.badge}</span>
                  )}
                </div>
                {stat.sub && <div className="mt-1 text-[10px] text-muted-foreground">{stat.sub}</div>}
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-12 gap-6">
            {/* Left Column: Chart & Reasons */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              {/* Hesitation Windows Chart */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    Hesitation Windows Detected — Today
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">
                    Peak 4–6PM
                  </div>
                </div>
                {/* FIXED BAR CONTAINER */}
                <div className="mt-4 flex items-end justify-between h-40 gap-2 px-2 border-b border-border/40">
                  {(barData.length > 0 ? barData : Array.from({ length: 15 }, (_, i) => ({ h: 20, t: "" }))).map((bar, i) => (
                    <div key={i} className="flex flex-col items-center flex-1 group relative h-full justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${bar.h}%` }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.8, ease: "easeOut" }}
                        className="w-full max-w-[40px] rounded-t-sm bg-gradient-to-t from-indigo-600 to-purple-400 opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      <span className="absolute -bottom-6 font-mono text-[9px] text-muted-foreground/60">
                        {bar.t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Visitors are Hesitating */}
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
                  Why visitors are hesitating
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[
                    { label: "Price feels high", val: "70%", color: "bg-red-500", dot: "text-red-500" },
                    { label: "Shipping cost shown", val: "26%", color: "bg-orange-400", dot: "text-orange-400" },
                    { label: "Trust / reviews check", val: "18%", color: "bg-blue-400", dot: "text-blue-400" },
                    { label: "Size / fit unsure", val: "15%", color: "bg-purple-500", dot: "text-purple-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
                      <span className="text-[13px] text-foreground/80 min-w-[140px]">{item.label}</span>
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: item.val }}
                          transition={{ delay: 1 + i * 0.1, duration: 1 }}
                          className={`h-full ${item.color}`} 
                        />
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground w-8 text-right">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Live Activity Feed */}
            <div className="col-span-12 lg:col-span-4">
              <div className="h-full rounded-xl border border-border/60 bg-white/[0.02] p-4">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
                  Live Activity
                </div>
                <div className="space-y-4">
                  {[
                    { id: "#4821", msg: "paused on price for 14s → offered 8% → converted", status: "success" },
                    { id: "#4822", msg: "re-read shipping line twice → nudge sent, watching", status: "pending" },
                    { id: "#4819", msg: "checked reviews 3x → trust badge shown → converted", status: "success" },
                    { id: "#4815", msg: "compared 2 variants by price → 5% offer → converted", status: "success" },
                  ].map((act, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + i * 0.2 }}
                      className="flex gap-3 text-[12px] leading-relaxed"
                    >
                      <div className="mt-1">
                        {act.status === "success" ? (
                          <span className="text-emerald-400">✓</span>
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 inline-block" />
                        )}
                      </div>
                      <p className="text-foreground/80">
                        <span className="font-semibold text-foreground">Visitor {act.id}</span> {act.msg}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* floating ornament cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="pointer-events-none absolute -left-6 top-1/3 hidden -rotate-3 md:block"
        >
          <div className="glass animate-float rounded-2xl px-4 py-3 shadow-card">
            <div className="flex items-center gap-2 text-xs">
              <Eye className="h-3.5 w-3.5 text-primary" />
              <span className="text-muted-foreground">Visitor #8412</span>
            </div>
            <div className="mt-1 font-display text-lg">
              Hesitating on pricing
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="pointer-events-none absolute -right-4 bottom-10 hidden rotate-2 md:block"
        >
          <div
            className="glass rounded-2xl px-4 py-3 shadow-card"
            style={{
              animation: "float 7s ease-in-out infinite",
              animationDelay: "1s",
            }}
          >
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp className="h-3.5 w-3.5 text-accent" />
              <span className="text-muted-foreground">Recommendation</span>
            </div>
            <div className="mt-1 font-display text-lg">Show 14-day trial</div>
          </div>
        </motion.div>
      </div>
    </Tilt>
  );
}

function AIInsightCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="rounded-xl border border-primary/30 bg-primary/5 p-3"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary/90">
          AI Insight
        </span>
      </div>
      <p className="mt-2 text-[13px] leading-snug text-foreground/90">
        72% of mobile visitors abandon after the 3rd pricing tier.
        <span className="text-muted-foreground">
          {" "}
          Suggested: simplify to 2 plans.
        </span>
      </p>
    </motion.div>
  );
}

function VisitorTicker() {
  const items = [
    { c: "🇺🇸", t: "New visitor · Pricing", i: "high intent" },
    { c: "🇫🇷", t: "Returning · Docs", i: "exploring" },
    { c: "🇯🇵", t: "Visitor · Checkout", i: "friction" },
    { c: "🇩🇪", t: "New visitor · Home", i: "browsing" },
  ];
  return (
    <div className="rounded-xl border border-border/60 bg-white/[0.02] p-3">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Activity
      </div>
      <ul className="mt-2 space-y-2">
        {items.map((x, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 + i * 0.15 }}
            className="flex items-center justify-between text-[12px]"
          >
            <span className="flex items-center gap-2">
              <span>{x.c}</span>
              <span className="text-foreground/90">{x.t}</span>
            </span>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground">
              {x.i}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Cursor parallax wrapper (mouse tilt on dashboard) ---------- */
function MouseParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 14 });
  const sy = useSpring(y, { stiffness: 60, damping: 14 });
  const tx = useTransform(sx, (v) => v * 14);
  const ty = useTransform(sy, (v) => v * 8);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth,
        h = window.innerHeight;
      x.set((e.clientX / w - 0.5) * 2);
      y.set((e.clientY / h - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div ref={ref} style={{ x: tx, y: ty }} className="w-full">
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28"
    >
      <Aurora />
      <Particles count={40} />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/[0.02] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Now reading intent, not just clicks
          </span>

          <h1 className="font-display text-[44px] leading-[0.98] tracking-tight text-gradient balance md:text-[88px]">
            Know why they hesitate
            <br />
            <span className="italic text-foreground/90">
              before they leave.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground pretty md:text-lg">
            Grothfy watches how shoppers actually behave on your store — where
            they pause, what they re-read, what they abandon — and steps in with
            the exact nudge each visitor needs to buy.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <MagneticButton size="lg">
              Install on your store
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton size="lg" variant="ghost">
              <Play className="h-3.5 w-3.5 fill-current" />
              See the dashboard
            </MagneticButton>
          </div>

          <div className="mt-6 flex items-center gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Activity className="h-3 w-3 text-primary" />{"2-minute install"}
            </span>
            <span className="flex items-center gap-1.5">
              <MousePointer2 className="h-3 w-3 text-primary" />{"No theme code changes"}
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Sparkles className="h-3 w-3 text-primary" />{"Works with Shopify & WooCommerce"}
            </span>
          </div>
        </motion.div>

        <div className="relative mx-auto mt-14 max-w-6xl">
          <MouseParallax>
            <LiveDashboard />
          </MouseParallax>
        </div>

        {/* Logos */}
        <div className="mt-20 overflow-hidden">
          <p className="text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Trusted by ambitious teams
          </p>

          <div className="relative mt-8 overflow-hidden">
            {/* Left Fade */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />

            {/* Right Fade */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

            <div className="flex w-max animate-marquee whitespace-nowrap">
              {[
                "LUMEN",
                "OCTAVE",
                "NORTHWAVE",
                "PARALLEL",
                "AETHER",
                "VANTA·LABS",
                // Duplicate for seamless looping
                "LUMEN",
                "OCTAVE",
                "NORTHWAVE",
                "PARALLEL",
                "AETHER",
                "VANTA·LABS",
              ].map((brand, index) => (
                <div
                  key={`${brand}-${index}`}
                  className="mx-10 flex items-center justify-center font-display text-xl tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
