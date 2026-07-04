"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ============================== Aurora background ============================ */
export function Aurora({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0 aurora-bg animate-aurora-pan" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}

/* ============================== Particle field ============================== */
export function Particles({ count = 36 }: { count?: number }) {
  // useEffect mein generate karo — Next.js mein Math.random() sirf browser mein
  // chalna chahiye, server pe nahi, warna hydration mismatch hota hai
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; d: number; s: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: 6 + Math.random() * 10,
        s: 1 + Math.random() * 2,
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute block rounded-full bg-primary/60"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, filter: "blur(0.5px)" }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: p.id * 0.07 }}
        />
      ))}
    </div>
  );
}

/* ============================== Magnetic button ============================= */
type MagneticProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
};
export function MagneticButton({ variant = "primary", size = "md", className, children, ...props }: MagneticProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  };
  const reset = () => { x.set(0); y.set(0); };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300 magnetic-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const sizes = size === "lg" ? "h-14 px-8 text-[15px]" : "h-12 px-6 text-sm";
  const variants =
    variant === "primary"
      ? "bg-gradient-primary text-primary-foreground shadow-elegant"
      : "border border-border/70 bg-white/[0.02] text-foreground hover:bg-white/[0.05]";
  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn(base, sizes, variants, className)}
      {...(props as any)}
    >
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(60% 80% at 50% 0%, hsl(var(--primary-glow)/0.6), transparent 70%)" }} />
      )}
      {children}
    </motion.button>
  );
}

/* ============================== Section header ============================== */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/[0.02] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow, title, subtitle, align = "center",
}: { eyebrow?: string; title: React.ReactNode; subtitle?: React.ReactNode; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-3xl space-y-5", align === "center" ? "mx-auto text-center" : "")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-4xl leading-[1.05] text-gradient balance md:text-6xl">{title}</h2>
      {subtitle && <p className="text-base text-muted-foreground pretty md:text-lg">{subtitle}</p>}
    </div>
  );
}

/* ============================== Reveal on scroll ============================ */
export function Reveal({ children, delay = 0, y = 24, className }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================== Animated number ============================= */
export function AnimatedNumber({ value, suffix = "", duration = 1.6 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (n) => Math.round(n).toLocaleString());

  useEffect(() => {
    const node = ref.current; if (!node) return;
    let started = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const controls = mv.set(0);
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / (duration * 1000));
            const eased = 1 - Math.pow(1 - p, 3);
            mv.set(value * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          return controls;
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [value, duration, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

/* ============================== Tilt wrapper ================================ */
export function Tilt({ children, max = 6, className }: { children: React.ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sy = useSpring(ry, { stiffness: 120, damping: 14 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max); rx.set(-py * max);
  };
  const reset = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: sx, rotateY: sy, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
