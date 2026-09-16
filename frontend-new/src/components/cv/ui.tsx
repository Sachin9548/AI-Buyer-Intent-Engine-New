import { motion, type HTMLMotionProps } from "framer-motion";
import { Info, X } from "lucide-react";
import { type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export const spring = { type: "spring" as const, stiffness: 260, damping: 26, mass: 0.7 };

/* ---------------------------------------------------------------- Card */

export function GlassCard({
  className,
  children,
  glint = false,
  ...rest
}: HTMLMotionProps<"div"> & { glint?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className={cn(
        "glass lift relative overflow-hidden rounded-2xl",
        glint && "shimmer",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
      <div className="min-w-0">
        <h2 className="truncate text-lg text-foreground sm:text-xl">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

/* -------------------------------------------------------------- Button */

type Variant = "primary" | "ghost" | "outline" | "danger" | "subtle";
type Size = "sm" | "md" | "icon";

export function Button({
  variant = "outline",
  size = "md",
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  const variants: Record<Variant, string> = {
    primary:
      "grad-accent text-[#05060B] font-semibold shadow-[0_10px_30px_-10px_rgba(124,108,255,0.7)] hover:brightness-110",
    outline:
      "glass text-foreground hover:bg-[rgba(255,255,255,0.09)] hover:border-[rgba(124,108,255,0.45)]",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.06)]",
    subtle: "bg-[rgba(255,255,255,0.06)] text-foreground hover:bg-[rgba(255,255,255,0.1)]",
    danger:
      "border border-[rgba(248,113,113,0.4)] bg-[rgba(248,113,113,0.1)] text-danger hover:bg-[rgba(248,113,113,0.18)]",
  };
  const sizes: Record<Size, string> = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    icon: "h-10 w-10",
  };
  return (
    <button
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl transition-all duration-300 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

/* --------------------------------------------------------------- Input */

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-[rgba(124,108,255,0.6)] focus:ring-2 focus:ring-violet/40",
        className,
      )}
      {...rest}
    />
  );
}

export function Textarea({
  className,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] p-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-[rgba(124,108,255,0.6)] focus:ring-2 focus:ring-violet/40",
        className,
      )}
      {...rest}
    />
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Select({
  className,
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-10 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-3 text-sm text-foreground outline-none transition-all duration-300 focus:border-[rgba(124,108,255,0.6)] [&>option]:bg-[#0B0F1E]",
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  );
}

/* ---------------------------------------------------------------- Chip */

export type Tone = "accent" | "success" | "warn" | "danger" | "muted";

const toneClass: Record<Tone, string> = {
  accent: "border-[rgba(124,108,255,0.4)] bg-[rgba(124,108,255,0.14)] text-[#C7C0FF]",
  success: "border-[rgba(52,211,153,0.35)] bg-[rgba(52,211,153,0.12)] text-success",
  warn: "border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.12)] text-warn",
  danger: "border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.12)] text-danger",
  muted: "border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] text-muted-foreground",
};

export function Chip({
  tone = "muted",
  children,
  onRemove,
  className,
  dot = false,
}: {
  tone?: Tone;
  children: ReactNode;
  onRemove?: () => void;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs backdrop-blur-xl transition-all duration-300",
        toneClass[tone],
        className,
      )}
    >
      {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current" /> : null}
      {children}
      {onRemove ? (
        <button
          onClick={onRemove}
          aria-label="Remove filter"
          className="opacity-70 transition hover:opacity-100"
        >
          <X className="h-3 w-3" />
        </button>
      ) : null}
    </span>
  );
}

/* ------------------------------------------------------------- Numbers */

export function useCountUp(value: number, duration = 900) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      prev.current = value;
      return;
    }
    const from = prev.current;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (value - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return display;
}

export function Num({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  animate = true,
}: {
  value: number;
  prefix?: string | undefined;
  suffix?: string | undefined;
  decimals?: number | undefined;
  className?: string | undefined;
  animate?: boolean | undefined;
}) {
  const animated = useCountUp(animate ? value : 0);
  const shown = animate ? animated : value;
  return (
    <span className={cn("num", className)}>
      {prefix}
      {shown.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* --------------------------------------------------- Progress / rings */

export function ProgressBar({
  value,
  tone = "accent",
  className,
}: {
  value: number;
  tone?: Tone;
  className?: string;
}) {
  const fill =
    tone === "accent"
      ? "grad-accent"
      : tone === "success"
        ? "bg-success"
        : tone === "warn"
          ? "bg-warn"
          : "bg-danger";
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]", className)}>
      <motion.div
        className={cn("h-full rounded-full", fill)}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}

export function ConfidenceRing({
  value,
  size = 44,
  label,
}: {
  value: number;
  size?: number;
  label?: string;
}) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`ring-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C6CFF" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#ring-${size})`}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <span className="num absolute text-[10px] text-foreground">{label ?? `${Math.round(value)}%`}</span>
    </div>
  );
}

/* -------------------------------------------------------- Skeleton/EMP */

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "shimmer rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)]",
        className,
      )}
    />
  );
}

export function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}: {
  icon?: ReactNode;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <GlassCard className="flex flex-col items-center gap-3 px-6 py-12 text-center">
      {icon ? (
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[rgba(124,108,255,0.14)] text-violet">
          {icon}
        </div>
      ) : null}
      <h3 className="text-base text-foreground">{title}</h3>
      <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      {actionLabel ? (
        <Button variant="primary" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      ) : null}
    </GlassCard>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <GlassCard className="flex flex-col items-center gap-3 px-6 py-10 text-center">
      <h3 className="text-base text-danger">Something went wrong</h3>
      <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      {onRetry ? <Button onClick={onRetry}>Try again</Button> : null}
    </GlassCard>
  );
}

/* --------------------------------------------------------------- Misc */

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label ?? "Toggle"}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full border transition-all duration-300",
        checked
          ? "grad-accent border-transparent"
          : "border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.06)]",
      )}
    >
      <motion.span
        layout
        transition={spring}
        className="absolute top-0.5 h-5 w-5 rounded-full bg-[#F5F7FA] shadow"
        style={{ left: checked ? 22 : 2 }}
      />
    </button>
  );
}

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  size = "md",
}: {
  tabs: readonly T[];
  value: T;
  onChange: (v: T) => void;
  size?: "sm" | "md";
}) {
  return (
    <div className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] p-1 backdrop-blur-xl">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={cn(
            "relative rounded-lg transition-colors duration-300",
            size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
            value === t ? "text-[#05060B]" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {value === t ? (
            <motion.span
              layoutId={`tab-${tabs.join("")}`}
              transition={spring}
              className="grad-accent absolute inset-0 rounded-lg"
            />
          ) : null}
          <span className="relative z-10 whitespace-nowrap">{t}</span>
        </button>
      ))}
    </div>
  );
}

export function Delta({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const up = value >= 0;
  return (
    <span className={cn("num text-xs", up ? "text-success" : "text-danger")}>
      {up ? "▲" : "▼"} {Math.abs(value).toFixed(1)}
      {suffix}
    </span>
  );
}

export { Sparkline, AreaTrend, BarTrend } from "./charts";

/* ------------------------------------------------------- Tooltip/help */

export function Tip({
  label,
  children,
  side = "top",
  className,
}: {
  label: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}) {
  const pos: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };
  return (
    <span className={cn("group/tip relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "glass pointer-events-none absolute z-50 hidden whitespace-nowrap rounded-lg px-2 py-1 text-[11px] text-foreground opacity-0 transition-opacity duration-200 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100 md:block",
          pos[side],
        )}
      >
        {label}
      </span>
    </span>
  );
}

export function IconButton({
  label,
  children,
  className,
  variant = "ghost",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; variant?: Variant }) {
  return (
    <Tip label={label}>
      <Button
        variant={variant}
        size="icon"
        aria-label={label}
        title={label}
        className={cn("min-h-11 min-w-11", className)}
        {...rest}
      >
        {children}
      </Button>
    </Tip>
  );
}

export function InlineHelp({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
      <Info className="mt-[1px] h-3.5 w-3.5 shrink-0 text-violet" />
      <span>{children}</span>
    </p>
  );
}

/* -------------------------------------------------------------- Stepper */

export function Stepper({
  steps,
  current,
  onSelect,
}: {
  steps: readonly string[];
  current: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <ol className="scrollbar-none -mx-1 flex snap-x items-center gap-2 overflow-x-auto px-1 pb-1">
      {steps.map((s, i) => {
        const state = i === current ? "current" : i < current ? "done" : "todo";
        return (
          <li key={s} className="flex shrink-0 snap-start items-center gap-2">
            <button
              onClick={() => onSelect?.(i)}
              aria-current={state === "current" ? "step" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-3 py-2 text-xs transition-all duration-300",
                state === "current"
                  ? "border-[rgba(124,108,255,0.6)] bg-[rgba(124,108,255,0.18)] text-foreground shadow-[0_0_24px_-6px_rgba(124,108,255,0.8)]"
                  : state === "done"
                    ? "border-[rgba(52,211,153,0.35)] bg-[rgba(52,211,153,0.1)] text-success"
                    : "border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="num text-[10px] opacity-80">{i + 1}</span>
              <span className="whitespace-nowrap">{s}</span>
            </button>
            {i < steps.length - 1 ? (
              <span className="h-px w-4 bg-[rgba(255,255,255,0.14)] sm:w-6" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------ Mobile carousel */

export function SnapCarousel({ children }: { children: ReactNode[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [idx, setIdx] = useState(0);
  return (
    <div className="sm:hidden">
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
          const w = el.clientWidth * 0.82;
          setIdx(Math.round(el.scrollLeft / w));
        }}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1"
      >
        {children.map((c, i) => (
          <div key={i} className="w-[82%] shrink-0 snap-start">
            {c}
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {children.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === Math.min(idx, children.length - 1)
                ? "w-5 bg-[rgba(124,108,255,0.9)]"
                : "w-1.5 bg-[rgba(255,255,255,0.2)]",
            )}
          />
        ))}
      </div>
    </div>
  );
}


export function LivePulse({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
      </span>
      {label}
    </span>
  );
}
