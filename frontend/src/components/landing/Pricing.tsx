"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MagneticButton, Reveal, SectionHeader } from "./primitives";

const plans = [
  {
    name: "Starter",
    price: { m: 0, y: 0 },
    blurb: "Everything you need to start understanding visitors.",
    features: ["10k monthly visitors", "Intent scoring (lite)", "Heatmaps · 3 pages", "Email support"],
    cta: "Start free",
  },
  {
    name: "Studio",
    price: { m: 89, y: 71 },
    blurb: "For ambitious teams ready to act on AI insights.",
    features: ["250k visitors", "Full intent engine", "Predictive funnels", "AI assistant", "Live nudges", "Priority support"],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Atelier",
    price: { m: null, y: null },
    blurb: "Custom infrastructure, dedicated models, white-glove onboarding.",
    features: ["Unlimited visitors", "Custom AI models", "Dedicated CSM", "SSO · SOC 2", "On-prem option"],
    cta: "Talk to sales",
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <section id="pricing" className="relative py-32">
      <div className="container">
        <Reveal>
          <SectionHeader
            eyebrow="Pricing"
            title={<>Calm pricing. <em className="italic">Loud results.</em></>}
            subtitle="No seat games. No surprise overages. Cancel any time."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex w-fit items-center gap-2 rounded-full border border-border/70 bg-white/[0.02] p-1 text-sm">
            <button onClick={() => setYearly(false)} className={`relative rounded-full px-4 py-1.5 ${!yearly ? "text-foreground" : "text-muted-foreground"}`}>
              {!yearly && <motion.span layoutId="bill-pill" className="absolute inset-0 rounded-full bg-white/10" />}
              <span className="relative">Monthly</span>
            </button>
            <button onClick={() => setYearly(true)} className={`relative rounded-full px-4 py-1.5 ${yearly ? "text-foreground" : "text-muted-foreground"}`}>
              {yearly && <motion.span layoutId="bill-pill" className="absolute inset-0 rounded-full bg-white/10" />}
              <span className="relative">Yearly · <span className="text-primary">−20%</span></span>
            </button>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className={`group relative h-full overflow-hidden rounded-3xl border p-7 transition-all duration-500 ${
                p.featured ? "border-primary/40 bg-card shadow-elegant" : "border-border/70 bg-card hover:-translate-y-1 hover:border-primary/30"
              }`}>
                {p.featured && <div className="absolute inset-0 -z-10 bg-gradient-aurora opacity-30" />}
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  {p.featured && (
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-primary">Most loved</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  {p.price.m === null ? (
                    <span className="font-display text-5xl">Custom</span>
                  ) : (
                    <>
                      <span className="font-display text-6xl">${yearly ? p.price.y : p.price.m}</span>
                      <span className="text-muted-foreground">/mo</span>
                    </>
                  )}
                </div>
                <MagneticButton
                  variant={p.featured ? "primary" : "ghost"}
                  className="mt-6 w-full"
                >
                  {p.cta}
                </MagneticButton>
                <ul className="mt-8 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 text-primary" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
