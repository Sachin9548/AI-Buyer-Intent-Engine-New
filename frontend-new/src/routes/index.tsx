import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ScrollStory } from "@/components/landing/ScrollStory";
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  ChevronDown,
  CircleDollarSign,
  Code2,
  Cpu,
  Eye,
  Gauge,
  Globe,
  Lock,
  MousePointerClick,
  Play,
  Plug,
  Sparkles,
  Store,
  Timer,
  TrendingUp,
  Truck,
  Wand2,
  Zap,
  ShieldCheck,
  Layers,
  Boxes,
  ShoppingBag,
  ScanLine,
  ShoppingCart,
  Server,
  XCircle,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

/* ============================================================
   utilities
   ============================================================ */

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Section({
  id,
  eyebrow,
  title,
  sub,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        {(eyebrow || title || sub) && (
          <div className="mx-auto mb-14 max-w-3xl text-center reveal">
            {eyebrow && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2
                className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {title}
              </h2>
            )}
            {sub && (
              <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
                {sub}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/* ============================================================
   Landing — final IA
   1. Nav
   2. Hero
   3. Trusted-by / stack strip
   4. The Problem  (silent drop-off + 5 reasons)
   5. Why traditional analytics fail  (past vs. present)
   6. How Claarvia works  (6-step flow)
   7. Live AI Decision Engine  (signature interactive)
   8. Interactive walkthrough  (one visitor journey)
   9. Dashboard preview  (control room)
  10. Competitor comparison  (GA/Clarity/Hotjar/Optimizely)
  11. Revenue impact  (before→after + ROI calculator)
  12. Integrations  (stack + live-in-1-day)
  13. Privacy & security
  14. FAQ
  15. Final CTA
   ============================================================ */

function Landing() {
  useReveal();
  return (
    <div className="min-h-screen bg-ambient text-foreground">
      <Nav />
      <Hero />
      <ScrollStory />
      <Problem />
      <DecisionEngine />
      <Walkthrough />
      <ProductSurface />
      <VsAnalytics />
      <RevenueImpact />
      <Integrations />
      <Security />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ============================================================
   1. Nav
   ============================================================ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#how", label: "How it works" },
    { href: "#engine", label: "AI engine" },
    { href: "#dashboard", label: "Dashboard" },
    { href: "#vs", label: "vs. Analytics" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-xl bg-background/60 border-b border-border" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg glass-strong">
            <span className="absolute inset-0 rounded-lg opacity-70 blur-md bg-primary/40" />
            <Sparkles className="relative h-3.5 w-3.5 text-primary" />
          </span>
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Claarvia
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          style={{
            boxShadow:
              "0 0 0 1px oklch(1 0 0 / 0.1), 0 8px 40px oklch(0.78 0.16 288 / 0.35)",
          }}
        >
          Book a demo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

/* ============================================================
   2. Hero
   ============================================================ */

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-12 sm:pt-36 sm:pb-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
      {/* Subtle connective flow between copy and live dashboard */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-[46%] -translate-y-8 lg:block"
        style={{ transform: "translateY(-2rem)" }}
      >
        <div className="h-full w-full flow-line opacity-60" />
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-glow" />
              Autonomous decision-intelligence for commerce
            </div>
            <h1
              className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Know <span className="text-gradient">why</span> visitors hesitate —
              and convert them before they leave.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Claarvia watches visitor behavior, detects hesitation in real time,
              and triggers the right intervention before they leave — automatically.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#book"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                style={{
                  boxShadow:
                    "0 0 0 1px oklch(1 0 0 / 0.12), 0 10px 60px oklch(0.78 0.16 288 / 0.45)",
                }}
              >
                Book a demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#engine"
                className="group inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/5"
              >
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-primary/70 pulse-glow" />
                  <span className="relative m-auto h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Watch AI in action
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <TrustChip icon={<ShoppingBag className="h-3.5 w-3.5" />}>
                Shopify &amp; WooCommerce
              </TrustChip>
              <TrustChip icon={<Lock className="h-3.5 w-3.5" />}>
                Cookieless mode
              </TrustChip>
              <TrustChip icon={<ShieldCheck className="h-3.5 w-3.5" />}>
                GDPR-ready
              </TrustChip>
              <TrustChip icon={<Timer className="h-3.5 w-3.5" />}>
                Live in 1 day
              </TrustChip>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <HeroDashboardTile />
        </div>
      </div>
    </section>
  );
}

function TrustChip({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-primary/80">{icon}</span>
      {children}
    </span>
  );
}

function HeroDashboardTile() {
  // Deterministic tick sequence — no Math.random in render/effect to avoid hydration jitter.
  const seq = useMemo(() => [64, 71, 66, 78, 82, 74, 69, 76, 84, 88, 81, 73], []);
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % seq.length), 1400);
    return () => clearInterval(id);
  }, [seq.length]);
  const score = seq[i];

  const events = [
    { t: "00:02", label: "Visitor #8412 · price hover ×3", tone: "warn" as const },
    { t: "00:03", label: "Hesitation classified: price shock", tone: "warn" as const },
    { t: "00:04", label: "Intervention fired: capped 6% nudge", tone: "ok" as const },
    { t: "00:07", label: "Checkout started · +$184 recovered", tone: "good" as const },
  ];

  return (
    <div className="relative reveal float-y">
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[36px] opacity-70 blur-3xl"
        style={{
          background:
            "conic-gradient(from 210deg, oklch(0.5 0.22 288 / 0.55), oklch(0.5 0.2 250 / 0.35), transparent 60%)",
        }}
      />
      <div className="glass-strong rounded-2xl p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_oklch(0.75_0.18_150/0.8)]" />
            Live intent · today
          </div>
          <span className="rounded-full glass px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            Claarvia
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <MiniStat
            label="Recovered today"
            value="$18,420"
            delta="+12.4%"
            hint="Revenue attributed to sessions where a Claarvia intervention preceded checkout."
          />
          <MiniStat
            label="Avg. nudge"
            value="6.1%"
            delta="capped"
            tone="neutral"
            hint="Average discount offered. Capped by your margin rules — Claarvia only spends what it must to convert."
          />
        </div>

        <div className="mt-4 rounded-xl glass p-4">
          <div className="flex items-baseline justify-between">
            <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>Intent score · Visitor #8412</span>
              <Hint text="0–100 read of how likely this visitor is to buy right now, updated every second from live behavior signals." />
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className="rounded-full glass px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground"
                title="How sure Claarvia is about the classification. Below the threshold, no intervention fires."
              >
                Confidence 92%
              </span>
              <div
                key={score}
                className="tick text-2xl font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {score}
              </div>
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full transition-[width] duration-700"
              style={{
                width: `${score}%`,
                background:
                  "linear-gradient(90deg, oklch(0.75 0.18 288), oklch(0.72 0.19 250))",
                boxShadow: "0 0 20px oklch(0.78 0.16 288 / 0.6)",
              }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
            <span>Idle</span>
            <span>Browsing</span>
            <span>Hesitating</span>
            <span>Buying</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {events.map((e, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-lg glass px-3 py-2 text-xs"
              style={{ animation: `tick 0.5s ease-out ${idx * 120}ms both` }}
            >
              <span className="w-10 text-muted-foreground">{e.t}</span>
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  e.tone === "warn"
                    ? "bg-amber-400"
                    : e.tone === "ok"
                      ? "bg-primary"
                      : "bg-emerald-400"
                }`}
              />
              <span className="flex-1">{e.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  delta,
  tone = "up",
  hint,
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "up" | "neutral";
  hint?: string;
}) {
  return (
    <div className="rounded-xl glass p-3">
      <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        {hint && <Hint text={hint} />}
      </div>
      <div
        className="mt-1 text-xl font-semibold tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </div>
      {delta && (
        <div
          className={`mt-1 text-[11px] ${
            tone === "up" ? "text-emerald-300" : "text-muted-foreground"
          }`}
        >
          {delta}
        </div>
      )}
    </div>
  );
}

function Hint({ text }: { text: string }) {
  return (
    <span
      title={text}
      aria-label={text}
      className="inline-flex h-3.5 w-3.5 cursor-help items-center justify-center rounded-full border border-white/15 text-[9px] leading-none text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
    >
      ?
    </span>
  );
}

/* ============================================================
   3. Stack strip — honest "built for the stack you already run"
   ============================================================ */

function StackStrip() {
  const items = [
    { icon: ShoppingBag, label: "Shopify" },
    { icon: Store, label: "WooCommerce" },
    { icon: ShoppingCart, label: "Magento" },
    { icon: Layers, label: "Headless" },
    { icon: Code2, label: "Custom SDK" },
    { icon: Server, label: "REST API" },
  ];
  return (
    <section className="relative -mt-4 py-8">
      <div className="mx-auto max-w-6xl px-6 reveal">
        <div className="mb-5 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Built for the stack you already run
        </div>
        <div className="glass rounded-2xl px-4 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            {items.map((it) => (
              <span
                key={it.label}
                className="inline-flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
              >
                <it.icon className="h-4 w-4 text-primary/80" />
                {it.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   4. The Problem — silent drop-off + 5 hesitation reasons
   ============================================================ */

function Problem() {
  const reasons = [
    {
      icon: CircleDollarSign,
      title: "Price shock",
      body: "Repeated price hovers, jump-back to product tile.",
    },
    {
      icon: Truck,
      title: "Shipping surprise",
      body: "Cart abandoned at the shipping step.",
    },
    {
      icon: BadgeCheck,
      title: "Trust doubt",
      body: "Dwell on reviews, brand-name Google search opened.",
    },
    {
      icon: Boxes,
      title: "Size / fit doubt",
      body: "Bounces between variants, opens the size chart twice.",
    },
    {
      icon: Layers,
      title: "Decision fatigue",
      body: "10+ product views, no cart action, slowing scroll.",
    },
  ];
  return (
    <Section
      eyebrow="The problem"
      title={
        <>
          98% of your visitors leave.{" "}
          <span className="text-muted-foreground">
            None of them tell you why.
          </span>
        </>
      }
      sub="Behind every drop-off is a human, not a funnel step. There are only five reasons carts get abandoned — and none of them show up in your analytics on time."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {reasons.map((it, i) => (
          <div
            key={it.title}
            className="reveal group relative overflow-hidden rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:border-primary/30"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(closest-side, oklch(0.78 0.16 288 / 0.35), transparent)",
              }}
            />
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl glass-strong">
              <it.icon className="h-5 w-5 text-primary" />
            </div>
            <div
              className="text-base font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {it.title}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   5. Why analytics fail — past vs. present
   ============================================================ */

function WhyAnalyticsFail() {
  return (
    <Section
      eyebrow="Why traditional analytics fail"
      title={
        <>
          Analytics tells you what happened.{" "}
          <span className="text-muted-foreground">By then it's too late.</span>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass rounded-2xl p-6 sm:p-8 reveal opacity-80">
          <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Eye className="h-4 w-4" /> Traditional analytics
          </div>
          <div
            className="text-2xl font-semibold text-muted-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;98% of visitors left without buying.&rdquo;
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            You see the drop-off after the fact. Every fix is a guess: price?
            shipping? trust? fit? You ship a test, wait two weeks, and hope.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
            {["Days to insight", "Manual analysis", "One-size-fits-all"].map((t) => (
              <span
                key={t}
                className="rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1.5 text-center"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div
          className="relative glass-strong rounded-2xl p-6 sm:p-8 reveal"
          style={{
            boxShadow:
              "0 0 0 1px oklch(0.78 0.16 288 / 0.25), 0 30px 80px -30px oklch(0.78 0.16 288 / 0.5)",
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary">
            <Brain className="h-4 w-4" /> Claarvia
          </div>
          <div
            className="text-2xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;<span className="text-gradient">62% of today's drop-off</span>{" "}
            is price hesitation on the Ring collection.&rdquo;
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Claarvia names the reason and acts on it in the same second — before
            the tab closes. No waiting. No guessing. Revenue moves this
            afternoon.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2 text-[11px]">
            {["60s to insight", "Autonomous action", "Per-visitor profile"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-lg border border-primary/20 bg-primary/[0.08] px-2 py-1.5 text-center text-primary"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   6. How it works — 6-step flow
   ============================================================ */

function HowItWorks() {
  const steps = [
    {
      icon: MousePointerClick,
      label: "Behavior Tracking",
      sub: "Scroll, dwell, price re-checks, cursor pauses.",
    },
    {
      icon: Brain,
      label: "Intent Prediction",
      sub: "Per-visitor score, updated 4× per second.",
    },
    {
      icon: ScanLine,
      label: "Psychology Detection",
      sub: "Price · shipping · trust · fit · fatigue.",
    },
    {
      icon: Cpu,
      label: "Decision Engine",
      sub: "Smallest intervention that still converts.",
    },
    {
      icon: Wand2,
      label: "Smart Intervention",
      sub: "Fired inside the hesitation window.",
    },
    {
      icon: TrendingUp,
      label: "Revenue Growth",
      sub: "Recovered carts, protected margin, measured lift.",
    },
  ];

  return (
    <Section
      id="how"
      eyebrow="How Claarvia works"
      title={<>One layer. Six steps. Zero guesswork.</>}
      sub="Not a replacement for your stack — a layer above it. GA, Klaviyo, Hotjar and Shopify keep running exactly as they are."
    >
      <div className="relative">
        <div
          aria-hidden
          className="absolute left-0 right-0 top-[46px] mx-auto hidden h-px w-[85%] flow-line md:block"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-3">
          {steps.map((s, i) => (
            <div
              key={i}
              className="reveal group relative"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="glass rounded-2xl p-4 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl glass-strong">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Step {i + 1}
                </div>
                <div
                  className="mt-1 text-sm font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.label}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {s.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   7. Live AI Decision Engine — signature interactive
       Visitor pauses → Confidence → Intent → Hesitation
       → Recommended action → Expected lift → Intervention
   ============================================================ */

function DecisionEngine() {
  const frames = useMemo(
    () => [
      {
        signal: "Cursor drift toward close-tab",
        confidence: 62,
        intent: "Exit imminent",
        hesitation: "—",
        action: "Observe",
        lift: 0,
      },
      {
        signal: "3rd price re-check in 8s",
        confidence: 81,
        intent: "Purchase intent, blocked",
        hesitation: "Price shock",
        action: "Cap 4% nudge · 12s",
        lift: 14,
      },
      {
        signal: "Reviews dwell 11s · brand search opened",
        confidence: 88,
        intent: "Purchase intent, blocked",
        hesitation: "Trust doubt",
        action: "Surface reviews + guarantee",
        lift: 17,
      },
      {
        signal: "Bounce between 3 sizes · size chart ×2",
        confidence: 92,
        intent: "Purchase intent, blocked",
        hesitation: "Size / fit doubt",
        action: "Inline fit guide · past-buyer note",
        lift: 22,
      },
      {
        signal: "Cart abandoned at shipping step",
        confidence: 94,
        intent: "Purchase intent, blocked",
        hesitation: "Shipping surprise",
        action: "Free-ship threshold cue",
        lift: 19,
      },
    ],
    [],
  );

  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setI((v) => (v + 1) % frames.length), 3200);
    return () => clearInterval(id);
  }, [playing, frames.length]);
  const f = frames[i];

  return (
    <Section
      id="engine"
      eyebrow="Live AI decision engine"
      title={
        <>
          Watch the AI <span className="text-gradient">think</span>.
        </>
      }
      sub="Every second, on every visitor. Claarvia reads the signal, names the doubt, chooses the smallest intervention that still converts — and stays silent when confidence is low."
    >
      <div className="relative reveal">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, oklch(0.5 0.22 288 / 0.4), transparent 70%)",
          }}
        />
        <div className="glass-strong overflow-hidden rounded-3xl">
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-glow" />
              claarvia · decision engine
            </div>
            <button
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Play className={`h-3 w-3 ${playing ? "text-primary" : ""}`} />
              {playing ? "Streaming" : "Paused"}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-5">
            {/* Left: signal + confidence */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl glass p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Signal detected
                </div>
                <div
                  key={`sig-${i}`}
                  className="tick mt-2 text-base font-medium"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {f.signal}
                </div>
              </div>
              <div className="rounded-2xl glass p-4">
                <div className="flex items-baseline justify-between">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    AI confidence
                  </div>
                  <div
                    key={`c-${i}`}
                    className="tick text-2xl font-semibold tabular-nums"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {f.confidence}%
                  </div>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full transition-[width] duration-700"
                    style={{
                      width: `${f.confidence}%`,
                      background:
                        "linear-gradient(90deg, oklch(0.75 0.18 288), oklch(0.72 0.19 250))",
                      boxShadow: "0 0 20px oklch(0.78 0.16 288 / 0.6)",
                    }}
                  />
                </div>
                <div className="mt-3 text-[11px] text-muted-foreground">
                  Below 85%, Claarvia does not intervene.
                </div>
              </div>
            </div>

            {/* Middle: reasoning cascade */}
            <div className="lg:col-span-2 rounded-2xl glass p-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Reasoning cascade
              </div>
              <ul key={`r-${i}`} className="mt-3 space-y-2">
                {[
                  { k: "Intent", v: f.intent, Icon: Brain },
                  { k: "Hesitation", v: f.hesitation, Icon: ScanLine },
                  { k: "Recommended action", v: f.action, Icon: Wand2 },
                ].map((row, idx) => (
                  <li
                    key={row.k}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 text-sm"
                    style={{ animation: `tick 0.5s ease-out ${idx * 120}ms both` }}
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg glass-strong">
                      <row.Icon className="h-3.5 w-3.5 text-primary" />
                    </span>
                    <span className="w-32 text-[11px] uppercase tracking-wider text-muted-foreground">
                      {row.k}
                    </span>
                    <span className="flex-1 font-medium">{row.v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: outcome */}
            <div
              className="lg:col-span-1 rounded-2xl p-4"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.78 0.16 288 / 0.14), oklch(0.78 0.16 288 / 0.02))",
                border: "1px solid oklch(0.78 0.16 288 / 0.3)",
              }}
            >
              <div className="text-[10px] uppercase tracking-wider text-primary">
                Expected lift
              </div>
              <div
                key={`l-${i}`}
                className="tick mt-2 text-4xl font-semibold tabular-nums text-gradient"
                style={{ fontFamily: "var(--font-display)" }}
              >
                +{f.lift}%
              </div>
              <div className="mt-2 text-[11px] text-muted-foreground">
                On this session, modeled from priors.
              </div>
              <div className="mt-6 text-[10px] uppercase tracking-wider text-muted-foreground">
                Outcome
              </div>
              <div className="mt-1 text-sm font-medium">
                {f.lift === 0 ? "Stay silent" : "Fire intervention"}
              </div>
            </div>
          </div>

          {/* Frame indicators */}
          <div className="flex items-center gap-2 border-t border-white/5 px-5 py-3">
            {frames.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setI(idx);
                  setPlaying(false);
                }}
                aria-label={`Frame ${idx + 1}`}
                className={`h-1 flex-1 rounded-full transition-all ${
                  idx === i ? "bg-primary" : "bg-white/10 hover:bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   8. Interactive walkthrough — one visitor becomes revenue
   ============================================================ */

function Walkthrough() {
  const stages = useMemo(
    () => [
      {
        icon: MousePointerClick,
        label: "Visitor arrives",
        detail: "Anonymous session · no cookies required",
      },
      {
        icon: Eye,
        label: "Browses product",
        detail: "Scrolls, hovers, checks price twice",
      },
      {
        icon: Timer,
        label: "Hesitates",
        detail: "Cursor drifts to close-tab · dwell rises",
      },
      {
        icon: Brain,
        label: "AI detects hesitation",
        detail: "Reason classified: price shock · 92% confidence",
      },
      {
        icon: Cpu,
        label: "Decision engine evaluates",
        detail: "Smallest nudge that still converts",
      },
      {
        icon: Wand2,
        label: "Smart intervention",
        detail: "Capped 6% offer · shown for 12s",
      },
      {
        icon: ShoppingBag,
        label: "Visitor purchases",
        detail: "Checkout completed · margin protected",
      },
      {
        icon: TrendingUp,
        label: "Revenue recovered",
        detail: "+$184 · logged, attributed, learned from",
      },
    ],
    [],
  );
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % stages.length);
    }, 1800);
    return () => clearInterval(id);
  }, [playing, stages.length]);

  const Active = stages[active].icon;

  return (
    <Section
      eyebrow="Interactive walkthrough"
      title={<>Watch a single visitor become revenue.</>}
      sub="One session, eight moments. Every step is what Claarvia actually does — not a metaphor."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 reveal">
          <div className="glass rounded-2xl p-2">
            {stages.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.label}
                  onClick={() => {
                    setActive(i);
                    setPlaying(false);
                  }}
                  className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                    isActive
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg glass-strong transition-transform ${
                      isActive ? "scale-105" : ""
                    }`}
                  >
                    <s.icon
                      className={`h-4 w-4 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </span>
                  <span className="flex-1 text-sm font-medium">{s.label}</span>
                  <span className="text-[10px] tabular-nums text-muted-foreground/70">
                    0{i + 1}
                  </span>
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-primary shadow-[0_0_12px_oklch(0.78_0.16_288/0.8)]"
                    />
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="mt-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Play className={`h-3 w-3 ${playing ? "text-primary" : ""}`} />
            {playing ? "Auto-playing" : "Play walkthrough"}
          </button>
        </div>

        <div className="lg:col-span-3 reveal">
          <div className="relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 opacity-70 blur-3xl transition-all"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, oklch(0.5 0.22 288 / 0.35), transparent 70%)",
              }}
            />
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Step {active + 1} of {stages.length}
              </div>
              <div className="text-[11px] tabular-nums text-muted-foreground">
                t = 0:0{active}s
              </div>
            </div>

            <div key={active} className="tick mt-8 flex flex-col items-center text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl glass">
                <Active className="h-7 w-7 text-primary" />
              </span>
              <h3
                className="mt-6 text-2xl font-semibold sm:text-3xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stages[active].label}
              </h3>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                {stages[active].detail}
              </p>
            </div>

            <div className="mt-10 h-1 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{
                  width: `${((active + 1) / stages.length) * 100}%`,
                  background:
                    "linear-gradient(90deg, oklch(0.78 0.16 288), oklch(0.72 0.19 250))",
                  boxShadow: "0 0 20px oklch(0.78 0.16 288 / 0.6)",
                }}
              />
            </div>
            <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>Arrive</span>
              <span>Hesitate</span>
              <span>Decide</span>
              <span>Convert</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   9. Dashboard preview — the control room
   ============================================================ */

function ProductSurface() {
  return (
    <Section
      id="dashboard"
      eyebrow="Dashboard"
      title={<>One screen. Everything visible.</>}
      sub="Intent, hesitation and interventions in a single live view. No dashboards to stitch together, no CSVs to reconcile."
    >
      <div className="reveal relative rounded-3xl p-1">
        <div
          aria-hidden
          className="absolute -inset-6 -z-10 rounded-[40px] opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, oklch(0.5 0.22 288 / 0.35), transparent 70%)",
          }}
        />
        <div className="glass-strong overflow-hidden rounded-3xl">
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="ml-3">claarvia · store overview</span>
            </div>
            <div className="hidden gap-2 sm:flex">
              {["Today", "7d", "30d"].map((t, i) => (
                <span
                  key={t}
                  className={`rounded-full px-2.5 py-1 text-[11px] ${
                    i === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-3 gap-3">
                <BigStat
                  label="Recovered revenue"
                  value="$142,308"
                  delta="+18.4% vs. last 7d"
                />
                <BigStat
                  label="Hesitation caught"
                  value="24,196"
                  delta="83% classified"
                />
                <BigStat
                  label="Avg. nudge"
                  value="5.7%"
                  delta="capped at 10%"
                  tone="neutral"
                />
              </div>

              <div className="mt-4 rounded-2xl glass p-4">
                <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Recovered revenue · 7 days</span>
                  <span className="text-emerald-300">▲ 18.4%</span>
                </div>
                <FakeChart />
              </div>
            </div>

            <div className="rounded-2xl glass p-4">
              <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Live visitors</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-glow" />
                  1,284 online
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { id: "#8412", stage: "Hesitating · price", act: "Cap 6% nudge" },
                  { id: "#8408", stage: "Hesitating · fit", act: "Show size guide" },
                  { id: "#8399", stage: "Buying", act: "No action" },
                  { id: "#8391", stage: "Hesitating · trust", act: "Reviews overlay" },
                  { id: "#8386", stage: "Hesitating · shipping", act: "Free-ship cue" },
                ].map((r, i) => (
                  <div
                    key={r.id}
                    className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs"
                    style={{ animation: `tick 0.5s ease-out ${i * 100}ms both` }}
                  >
                    <span className="w-12 text-muted-foreground">{r.id}</span>
                    <span className="flex-1 truncate">{r.stage}</span>
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                      {r.act}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs">
        {["Decision timeline", "Confidence score", "Intent heatmap", "Opportunity feed"].map(
          (c) => (
            <span
              key={c}
              className="rounded-full glass px-3 py-1.5 text-muted-foreground"
            >
              {c}
            </span>
          ),
        )}
      </div>
    </Section>
  );
}

function BigStat({
  label,
  value,
  delta,
  tone = "up",
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "up" | "neutral";
}) {
  return (
    <div className="rounded-2xl glass p-4">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div
        className="mt-1 text-2xl font-semibold tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </div>
      {delta && (
        <div
          className={`mt-1 text-[11px] ${
            tone === "up" ? "text-emerald-300" : "text-muted-foreground"
          }`}
        >
          {delta}
        </div>
      )}
    </div>
  );
}

function FakeChart() {
  const points = [12, 22, 18, 34, 28, 46, 52, 44, 60, 66, 58, 78];
  const max = 80;
  const w = 560;
  const h = 140;
  const step = w / (points.length - 1);
  const path = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (v / max) * h}`)
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-32 w-full">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.16 288)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.78 0.16 288)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.78 0.16 288)" />
          <stop offset="100%" stopColor="oklch(0.72 0.19 250)" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#g1)" />
      <path
        d={path}
        fill="none"
        stroke="url(#g2)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ============================================================
   10. Competitor comparison
   ============================================================ */

function VsAnalytics() {
  const rows = [
    { r: "Tells you what happened", ga: true, cl: true, hj: true, op: true, cv: true },
    {
      r: "Tells you why a visitor hesitated",
      ga: false,
      cl: false,
      hj: "Partial",
      op: false,
      cv: true,
    },
    { r: "Detects intent in real time", ga: false, cl: false, hj: false, op: false, cv: true },
    {
      r: "Acts inside the hesitation window",
      ga: false,
      cl: false,
      hj: false,
      op: "Test-based",
      cv: true,
    },
    {
      r: "Protects margin (smallest nudge)",
      ga: false,
      cl: false,
      hj: false,
      op: false,
      cv: true,
    },
    {
      r: "Time to first insight",
      ga: "Days",
      cl: "Hours",
      hj: "Hours",
      op: "Weeks",
      cv: "60s",
    },
  ];
  const cell = (v: boolean | string) => {
    if (v === true) return <span className="text-primary">●</span>;
    if (v === false) return <span className="text-muted-foreground/40">—</span>;
    return <span className="text-xs text-muted-foreground">{v}</span>;
  };
  return (
    <Section
      id="vs"
      eyebrow="vs. Traditional analytics"
      title={<>Why Claarvia isn't another analytics tool.</>}
      sub="Google Analytics, Clarity, Hotjar and Optimizely report the past. Claarvia understands the present — and helps decide what to do next."
    >
      <div className="relative reveal overflow-hidden rounded-2xl glass-strong">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/5"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.78 0.16 288 / 0.14), transparent)",
          }}
        />
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4 font-medium"></th>
                <th className="px-4 py-4 text-center font-medium">Google Analytics</th>
                <th className="px-4 py-4 text-center font-medium">MS Clarity</th>
                <th className="px-4 py-4 text-center font-medium">Hotjar</th>
                <th className="px-4 py-4 text-center font-medium">Optimizely</th>
                <th className="px-4 py-4 text-center font-medium text-primary">
                  Claarvia
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.r}
                  className="row-in border-t border-white/5"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <td className="px-6 py-4 text-muted-foreground">{r.r}</td>
                  <td className="px-4 py-4 text-center">{cell(r.ga)}</td>
                  <td className="px-4 py-4 text-center">{cell(r.cl)}</td>
                  <td className="px-4 py-4 text-center">{cell(r.hj)}</td>
                  <td className="px-4 py-4 text-center">{cell(r.op)}</td>
                  <td className="px-4 py-4 text-center font-medium">{cell(r.cv)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground reveal">
        Not a replacement. A layer above — the one that actually moves revenue.
      </p>
    </Section>
  );
}

/* ============================================================
   11. Revenue impact — before/after flow + ROI calculator
   ============================================================ */

function RevenueImpact() {
  const [visitors, setVisitors] = useState(120_000);
  const [aov, setAov] = useState(85);
  const [conv, setConv] = useState(2.1);

  const { baseline, recovered, uplift } = useMemo(() => {
    const baseline = visitors * (conv / 100) * aov;
    const nonConverters = visitors * (1 - conv / 100);
    const recoveredCarts = nonConverters * 0.11;
    const netAOV = aov * (1 - 0.04);
    const recovered = recoveredCarts * netAOV;
    const uplift = (recovered / Math.max(1, baseline)) * 100;
    return { baseline, recovered, uplift };
  }, [visitors, aov, conv]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  return (
    <Section
      eyebrow="Revenue impact"
      title={<>The same visitor. Two very different endings.</>}
      sub="Nothing changes on your side. What changes is whether the store notices — and responds — while the visitor is still there."
    >
      {/* Before / after flows */}
      <div className="grid gap-6 md:grid-cols-2">
        <FlowColumn
          title="Without Claarvia"
          badge="Silent drop-off"
          icon={<XCircle className="h-4 w-4" />}
          items={[
            { label: "Visitor arrives", tone: "n" },
            { label: "Gets confused / hesitates", tone: "n" },
            { label: "No signal, no response", tone: "b" },
            { label: "Leaves silently", tone: "b" },
            { label: "Revenue lost", tone: "b" },
          ]}
          tone="dim"
        />
        <FlowColumn
          title="With Claarvia"
          badge="Revenue recovered"
          icon={<CheckCircle2 className="h-4 w-4" />}
          items={[
            { label: "Visitor arrives", tone: "n" },
            { label: "AI reads intent in real time", tone: "g" },
            { label: "Hesitation classified · reason known", tone: "g" },
            { label: "Smallest nudge fired in-window", tone: "g" },
            { label: "Purchase · revenue recovered", tone: "g" },
          ]}
          tone="bright"
        />
      </div>

      {/* ROI calculator */}
      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="reveal glass rounded-2xl p-6 sm:p-8">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Model it on your traffic
          </div>
          <div className="mt-6 space-y-6">
            <RangeInput
              label="Monthly visitors"
              value={visitors}
              min={10_000}
              max={2_000_000}
              step={5_000}
              onChange={setVisitors}
              format={(v) => v.toLocaleString("en-US")}
            />
            <RangeInput
              label="Average order value (USD)"
              value={aov}
              min={20}
              max={500}
              step={5}
              onChange={setAov}
              format={(v) => `$${v}`}
            />
            <RangeInput
              label="Current conversion rate"
              value={conv}
              min={0.5}
              max={6}
              step={0.1}
              onChange={setConv}
              format={(v) => `${v.toFixed(1)}%`}
            />
          </div>
        </div>

        <div className="reveal grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ImpactCard
            label="Baseline monthly revenue"
            value={fmt(baseline)}
            hint="Visitors × Conv. × AOV"
            tone="muted"
          />
          <ImpactCard
            label="Recovered by Claarvia"
            value={fmt(recovered)}
            hint="Hesitation-window recovery, modeled"
            tone="primary"
          />
          <ImpactCard
            label="Effective uplift"
            value={`+${uplift.toFixed(1)}%`}
            hint="On top of baseline revenue"
            tone="primary"
          />
          <ImpactCard
            label="Margin protected"
            value="≤ 4%"
            hint="Average capped nudge"
            tone="muted"
          />
          <div className="sm:col-span-2 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-muted-foreground">
            Modeled from an 11% recovery on non-converting sessions with a 4%
            average nudge. Directional, not a guarantee — a demo maps this to
            your own store data.
          </div>
        </div>
      </div>
    </Section>
  );
}

function FlowColumn({
  title,
  badge,
  icon,
  items,
  tone,
}: {
  title: string;
  badge: string;
  icon: ReactNode;
  items: { label: string; tone: "n" | "g" | "b" }[];
  tone: "dim" | "bright";
}) {
  return (
    <div
      className={`reveal relative overflow-hidden rounded-2xl p-6 sm:p-8 ${
        tone === "bright" ? "glass-strong" : "glass opacity-90"
      }`}
      style={
        tone === "bright"
          ? {
              boxShadow:
                "0 0 0 1px oklch(0.78 0.16 288 / 0.25), 0 30px 80px -30px oklch(0.78 0.16 288 / 0.5)",
            }
          : undefined
      }
    >
      <div className="flex items-center justify-between">
        <div
          className="text-lg font-semibold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] ${
            tone === "bright"
              ? "bg-primary/15 text-primary"
              : "border border-white/5 bg-white/[0.03] text-muted-foreground"
          }`}
        >
          {icon}
          {badge}
        </span>
      </div>
      <ol className="mt-6 space-y-2">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 text-sm"
            style={{ animation: `tick 0.5s ease-out ${i * 90}ms both` }}
          >
            <span className="w-5 text-[11px] tabular-nums text-muted-foreground">
              {i + 1}
            </span>
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                it.tone === "g"
                  ? "bg-emerald-400"
                  : it.tone === "b"
                    ? "bg-white/20"
                    : "bg-primary/70"
              }`}
            />
            <span
              className={
                it.tone === "b" ? "text-muted-foreground/80" : "text-foreground"
              }
            >
              {it.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RangeInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
        <span
          className="text-lg font-semibold tabular-nums"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-primary"
      />
    </div>
  );
}

function ImpactCard({
  label,
  value,
  hint,
  tone = "muted",
}: {
  label: string;
  value: string;
  hint: string;
  tone?: "primary" | "muted";
}) {
  return (
    <div
      className={`relative rounded-2xl p-5 ${
        tone === "primary"
          ? "glass-strong"
          : "glass"
      }`}
      style={
        tone === "primary"
          ? { boxShadow: "0 0 0 1px oklch(0.78 0.16 288 / 0.25)" }
          : undefined
      }
    >
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div
        className={`mt-2 text-3xl font-semibold tabular-nums tracking-tight ${
          tone === "primary" ? "text-gradient" : ""
        }`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </div>
      <div className="mt-2 text-xs text-muted-foreground">{hint}</div>
    </div>
  );
}

/* ============================================================
   12. Integrations — stack + live in a day
   ============================================================ */

function Integrations() {
  const items = [
    { icon: ShoppingBag, name: "Shopify", body: "One-click app install. Works with any theme." },
    { icon: Store, name: "WooCommerce", body: "Plugin drops into any WordPress store." },
    { icon: ShoppingCart, name: "Magento", body: "Adobe Commerce module, live in a day." },
    { icon: Layers, name: "Headless", body: "Framework-agnostic. Next, Nuxt, Remix, Astro." },
    { icon: Code2, name: "Custom SDK", body: "TypeScript-first. Fully typed events." },
    { icon: Server, name: "REST API", body: "Server-side intent scoring for any stack." },
  ];
  return (
    <Section
      eyebrow="Integrations"
      title={<>Live in a day. Not a quarter.</>}
      sub="One snippet. No re-platform. No engineering sprint. Claarvia sits above your existing tools and lets them keep doing their job."
    >
      {/* Timeline */}
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        {[
          { t: "2 min", l: "Drop one snippet" },
          { t: "≤ 24h", l: "Claarvia calibrates" },
          { t: "Day 1", l: "Interventions go live" },
        ].map((s, i) => (
          <div
            key={s.l}
            className="reveal flex items-center gap-4 rounded-2xl glass px-5 py-4"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span
              className="text-2xl font-semibold tabular-nums text-gradient"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {s.t}
            </span>
            <div className="h-8 w-px bg-white/10" />
            <span className="text-sm text-muted-foreground">
              {i + 1}. {s.l}
            </span>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <div
            key={it.name}
            className="reveal group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:border-primary/30"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl glass-strong">
                <it.icon className="h-5 w-5 text-primary" />
              </span>
              <div
                className="text-base font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {it.name}
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{it.body}</p>
            <div className="mt-5 inline-flex items-center gap-1.5 text-xs text-primary/90">
              <Plug className="h-3.5 w-3.5" />
              Live in &lt; 1 day
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   13. Security
   ============================================================ */

function Security() {
  const items = [
    {
      icon: ShieldCheck,
      title: "GDPR & CCPA ready",
      body: "Consent-aware, purposeful data, honour-by-design.",
    },
    {
      icon: Lock,
      title: "Cookieless mode",
      body: "Runs without third-party cookies when required.",
    },
    {
      icon: Gauge,
      title: "SOC 2 in progress",
      body: "Controls, logging and access reviews from day one.",
    },
    {
      icon: Globe,
      title: "EU / US residency",
      body: "Choose where your data is stored and processed.",
    },
  ];
  return (
    <Section
      id="security"
      eyebrow="Privacy & security"
      title={<>Built for the teams your legal team says yes to.</>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <div
            key={it.title}
            className="reveal glass rounded-2xl p-6"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl glass-strong">
              <it.icon className="h-5 w-5 text-primary" />
            </div>
            <div
              className="text-base font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {it.title}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground reveal">
        No PII stored by default. You control retention, exports and deletion.
      </p>
    </Section>
  );
}

/* ============================================================
   14. FAQ
   ============================================================ */

function FAQ() {
  const qs = [
    {
      q: "How is Claarvia different from Google Analytics or Hotjar?",
      a: "GA and Hotjar tell you the past. Claarvia acts on the present — it detects the reason a visitor is hesitating and intervenes before they leave.",
    },
    {
      q: "How long does setup take?",
      a: "One snippet, about 2 minutes. First insights within 60 seconds; full calibration inside 24 hours.",
    },
    {
      q: "Is Claarvia privacy-friendly?",
      a: "Yes. Cookieless mode, GDPR/CCPA-ready, no PII stored by default. You control retention and deletion.",
    },
    {
      q: "Can the AI act on its own?",
      a: "Only within limits you set. You approve which interventions are allowed and cap the maximum discount.",
    },
    {
      q: "What about my existing stack?",
      a: "Claarvia sits above it. GA, Hotjar, Klaviyo, Shopify — everything keeps running exactly as it is.",
    },
    {
      q: "Do you offer a pilot?",
      a: "Yes, via a design-partner pilot. Book a demo and we'll scope it to your store.",
    },
  ];
  return (
    <Section id="faq" eyebrow="FAQ" title={<>Objections, answered.</>}>
      <div className="mx-auto max-w-3xl divide-y divide-white/5 rounded-2xl glass">
        {qs.map((it, i) => (
          <FAQItem key={i} q={it.q} a={it.a} defaultOpen={i === 0} />
        ))}
      </div>
    </Section>
  );
}

function FAQItem({
  q,
  a,
  defaultOpen = false,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="reveal">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
      >
        <span className="text-base font-medium">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="grid overflow-hidden px-6 transition-all"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <p className="pb-5 text-sm text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   15. Final CTA
   ============================================================ */

function FinalCTA() {
  return (
    <section id="book" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="reveal relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 100%, oklch(0.5 0.22 288 / 0.4), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2
              className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Stop guessing why{" "}
              <span className="text-gradient">they leave.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              See Claarvia intervene on your own store, live, in a 20-minute demo.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="mailto:hello@claarvia.com?subject=Book%20a%20Claarvia%20demo"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                style={{
                  boxShadow:
                    "0 0 0 1px oklch(1 0 0 / 0.12), 0 10px 80px oklch(0.78 0.16 288 / 0.55)",
                }}
              >
                Book a demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              No credit card. No install required for the demo. 20 minutes.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Footer
   ============================================================ */

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-md glass-strong">
            <Sparkles className="h-3 w-3 text-primary" />
          </span>
          <span
            className="text-sm font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Claarvia
          </span>
          <span className="text-xs text-muted-foreground">
            · The silent intelligence behind every smart store.
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <a href="#how" className="hover:text-foreground">
            Product
          </a>
          <a href="#vs" className="hover:text-foreground">
            Compare
          </a>
          <a href="#security" className="hover:text-foreground">
            Security
          </a>
          <a href="#book" className="hover:text-foreground">
            Contact
          </a>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Claarvia
        </div>
      </div>
    </footer>
  );
}
