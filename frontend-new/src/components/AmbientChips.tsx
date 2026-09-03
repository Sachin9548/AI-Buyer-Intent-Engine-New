import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

function useCountUp(target: number, run: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let frame = 0;
    const total = 90;
    const id = window.setInterval(() => {
      frame += 1;
      const t = Math.min(frame / total, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t === 1) window.clearInterval(id);
    }, 24);
    return () => window.clearInterval(id);
  }, [target, run]);
  return value;
}

function Chip({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
}) {
  return (
    <div
      className={`auth-glass-panel pointer-events-none absolute rounded-2xl px-4 py-3 ${className}`}
      style={{
        animation: `claarvia-fade-up 700ms ease-out ${delay}ms both, claarvia-float 7s ease-in-out ${delay}ms infinite`,
      }}
    >
      {children}
    </div>
  );
}

export function AmbientChips({ active }: { active: boolean }) {
  const isMobile = useIsMobile();
  const recovered = useCountUp(18420, active);
  const [confidence, setConfidence] = useState(92);

  useEffect(() => {
    const id = window.setInterval(() => {
      setConfidence(90 + Math.floor(Math.random() * 5));
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  if (!active) return null;

  const circumference = 2 * Math.PI * 16;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <Chip className="top-[12%] left-[6%] hidden items-center gap-3 lg:flex" delay={200}>
        <svg width="44" height="44" viewBox="0 0 40 40" className="-rotate-90">
          <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - confidence / 100)}
            style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.34,1.2,0.5,1)" }}
          />
          <defs>
            <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7c6cff" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <div>
          <div className="font-mono text-sm text-[color:var(--foreground)]">{confidence}%</div>
          <div className="text-[11px] text-[color:var(--muted-foreground)]">confidence</div>
        </div>
      </Chip>

      <Chip className="top-[18%] right-[6%] hidden lg:block" delay={500}>
        <div className="font-mono text-sm text-[color:var(--foreground)]">
          ${recovered.toLocaleString()}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[color:var(--muted-foreground)]">
          recovered
          <span className="font-mono text-[color:var(--auth-signal)]">+12.4%</span>
        </div>
      </Chip>

      <Chip
        className={`bottom-[10%] left-1/2 -translate-x-1/2 lg:right-[10%] lg:bottom-[16%] lg:left-auto lg:translate-x-0 ${
          isMobile ? "" : ""
        }`}
        delay={800}
      >
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[color:var(--auth-hesitation)]"
            style={{ animation: "claarvia-flicker 2.4s ease-in-out infinite" }}
          />
          <span className="font-mono text-[11px] tracking-wide text-[color:var(--foreground)]">
            Hesitation classified: price shock
          </span>
        </div>
      </Chip>
    </div>
  );
}
