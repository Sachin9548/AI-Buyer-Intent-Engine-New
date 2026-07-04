"use client";
import { ArrowRight } from "lucide-react";
import { Aurora, MagneticButton, Particles, Reveal } from "./primitives";

export function FinalCTA() {
  return (
    <section id="cta" className="relative isolate flex min-h-[90svh] items-center overflow-hidden py-32">
      <Aurora />
      <Particles count={30} />
      <div className="container relative z-10">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/[0.02] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              60 seconds to live insights
            </span>
            <h2 className="mt-8 font-display text-[44px] leading-[1] text-gradient balance md:text-[96px]">
              Stop guessing.<br/>
              <em className="italic text-foreground/90">Start knowing.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
              Join the teams already turning curiosity into conversion with Alistine.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticButton size="lg">Start free <ArrowRight className="h-4 w-4" /></MagneticButton>
              <MagneticButton size="lg" variant="ghost">Book a demo</MagneticButton>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">No credit card · 14-day Studio trial · Cancel any time</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
