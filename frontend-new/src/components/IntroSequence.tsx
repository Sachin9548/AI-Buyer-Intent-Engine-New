import { useEffect, useState } from "react";

const LINES = ["They came.", "They explored.", "They hesitated.", "Until Claarvia started watching."];

export function IntroSequence({
  onDone,
  duration,
}: {
  onDone: () => void;
  duration: number;
}) {
  const [step, setStep] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const per = duration / (LINES.length + 1);

  useEffect(() => {
    const timers: number[] = [];
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStep(i + 1), per * i));
    });
    timers.push(window.setTimeout(() => setShowSkip(true), 1000));
    timers.push(window.setTimeout(() => setLeaving(true), duration - 500));
    timers.push(window.setTimeout(onDone, duration));
    return () => timers.forEach(window.clearTimeout);
  }, [duration, per, onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05060b] transition-opacity duration-500"
      style={{ opacity: leaving ? 0 : 1 }}
    >
      <div
        aria-hidden
        className="absolute h-2 w-2 rounded-full bg-[color:var(--auth-cyan)]"
        style={{
          boxShadow: "0 0 18px 6px rgba(34,211,238,0.55)",
          animation: "claarvia-drift-in 1.6s cubic-bezier(0.2,0.7,0.2,1) forwards",
          top: "46%",
          left: "50%",
        }}
      />

      <div className="relative z-10 px-6 text-center">
        {LINES.map((line, i) => {
          const isLast = i === LINES.length - 1;
          const past = step > i + 1;
          if (step < i + 1) return null;
          return (
            <p
              key={line}
              className={
                isLast
                  ? "auth-gradient-text font-display text-2xl font-bold tracking-tight sm:text-4xl"
                  : "font-mono text-sm tracking-[0.28em] text-[color:var(--muted-foreground)] uppercase sm:text-base"
              }
              style={{
                position: isLast ? "relative" : "absolute",
                inset: isLast ? undefined : 0,
                margin: "auto",
                height: isLast ? undefined : "1.5em",
                animation: `claarvia-line-in 520ms ease-out both${
                  past && !isLast ? `, claarvia-line-out 420ms ease-in forwards` : ""
                }`,
                opacity: !isLast && past ? 0 : 1,
                textShadow: isLast ? "0 0 34px rgba(124,108,255,0.55)" : undefined,
              }}
            >
              {line}
            </p>
          );
        })}
      </div>

      {showSkip && (
        <button
          onClick={onDone}
          className="absolute bottom-10 font-mono text-xs tracking-[0.2em] text-[color:var(--muted-foreground)] uppercase transition-colors duration-300 hover:text-[color:var(--foreground)]"
          style={{ animation: "claarvia-fade-up 600ms ease-out both" }}
        >
          Skip
        </button>
      )}
    </div>
  );
}
