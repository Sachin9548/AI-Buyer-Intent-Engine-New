import { useRef, useState, type FormEvent } from "react";
import { AtSign, Building2, Eye, EyeOff, Lock, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type Mode = "login" | "signup";

function Field({
  id,
  label,
  type = "text",
  icon,
  value,
  onChange,
  trailing,
}: {
  id: string;
  label: string;
  type?: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  trailing?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div
      className="relative rounded-xl border bg-[rgba(255,255,255,0.04)] auth-spring transition-all"
      style={{
        borderColor: focused ? "transparent" : "var(--auth-glass-border)",
        boxShadow: focused
          ? "0 0 0 1.5px rgba(124,108,255,0.9), 0 0 0 4px rgba(34,211,238,0.14), 0 0 26px -6px rgba(124,108,255,0.6)"
          : "none",
      }}
    >
      <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[color:var(--muted-foreground)]">
        {icon}
      </span>
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-11 auth-spring transition-all"
        style={{
          top: lifted ? "7px" : "50%",
          transform: lifted ? "none" : "translateY(-50%)",
          fontSize: lifted ? "10px" : "13px",
          letterSpacing: lifted ? "0.12em" : "0",
          textTransform: lifted ? "uppercase" : "none",
          color: focused ? "var(--auth-cyan)" : "var(--muted-foreground)",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent pt-5 pr-11 pb-2 pl-11 text-sm text-[color:var(--foreground)] outline-none"
      />
      {trailing && <div className="absolute top-1/2 right-3 -translate-y-1/2">{trailing}</div>}
    </div>
  );
}

function strengthOf(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export function AuthCard({ onSubmitted }: { onSubmitted?: () => void }) {
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<Mode>("login");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [granted, setGranted] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [exiting, setExiting] = useState(false);

  const [fields, setFields] = useState({
    email: "",
    password: "",
    name: "",
    company: "",
    confirm: "",
  });
  const set = (k: keyof typeof fields) => (v: string) => setFields((f) => ({ ...f, [k]: v }));

  const onMove = (e: React.MouseEvent) => {
    if (isMobile || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 7, y: px * 9 });
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setPulse(true);
      setGranted(true);
      window.setTimeout(() => setExiting(true), 1100);
      window.setTimeout(() => onSubmitted?.(), 1800);
    }, 1400);
  };

  const strength = strengthOf(fields.password);

  return (
    <div
      className="relative z-20 w-full max-w-[420px] px-5 sm:px-0"
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ perspective: "1200px" }}
    >
      <div
        ref={cardRef}
        className="auth-glass-panel relative overflow-hidden rounded-3xl p-7 sm:p-8"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 320ms cubic-bezier(0.34,1.3,0.5,1)",
          animation: exiting
            ? "claarvia-exit 600ms ease-in forwards"
            : "claarvia-card-in 900ms cubic-bezier(0.2,0.9,0.2,1) both",
        }}
      >
        {/* Shimmer sweep */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)]"
          style={{ animation: "claarvia-shimmer 3.5s ease-out 700ms infinite both" }}
        />

        {/* Access granted badge */}
        {granted && (
          <div
            className="absolute top-4 left-1/2 z-30 -translate-x-1/2 rounded-full border border-[rgba(52,211,153,0.4)] bg-[rgba(52,211,153,0.12)] px-3 py-1 font-mono text-[11px] text-[color:var(--auth-signal)]"
            style={{ animation: "claarvia-fade-up 400ms ease-out both" }}
          >
            + Access granted
          </div>
        )}

        {/* Brand header */}
        <div className="mb-7 text-center">
          <div className="font-display inline-flex items-baseline gap-1 text-xl font-bold tracking-[0.22em] text-[color:var(--foreground)]">
            CLAARVIA
            <span
              className="h-1.5 w-1.5 rounded-full bg-[color:var(--auth-cyan)]"
              style={{ boxShadow: "0 0 12px 3px rgba(34,211,238,0.6)" }}
            />
          </div>
          <p className="mt-2 text-xs text-[color:var(--muted-foreground)]">
            Behavioral intelligence for modern commerce
          </p>
        </div>

        {/* Login / Signup tab switcher */}
        <div className="relative mb-6 grid grid-cols-2 rounded-full border border-[color:var(--auth-glass-border)] bg-[rgba(255,255,255,0.04)] p-1">
          <span
            className="auth-gradient-fill absolute inset-y-1 w-[calc(50%-4px)] rounded-full opacity-90"
            style={{
              left: mode === "login" ? "4px" : "calc(50%)",
              transition: "left 320ms cubic-bezier(0.34,1.3,0.5,1)",
              boxShadow: "0 0 32px -6px rgba(124,108,255,0.5)",
            }}
          />
          {(["login", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className="relative z-10 rounded-full py-2 text-xs font-medium tracking-wide auth-spring transition-colors"
              style={{ color: mode === m ? "#05060b" : "var(--muted-foreground)" }}
            >
              {m === "login" ? "Log in" : "Sign up"}
            </button>
          ))}
        </div>

        <form
          key={mode}
          onSubmit={submit}
          className="space-y-3.5"
          style={{ animation: "claarvia-fade-up 340ms ease-out both" }}
        >
          {mode === "signup" && (
            <>
              <Field
                id="name"
                label="Name"
                icon={<User size={16} />}
                value={fields.name}
                onChange={set("name")}
              />
              <Field
                id="company"
                label="Company / store name"
                icon={<Building2 size={16} />}
                value={fields.company}
                onChange={set("company")}
              />
            </>
          )}

          <Field
            id="email"
            label={mode === "signup" ? "Work email" : "Email"}
            type="email"
            icon={<AtSign size={16} />}
            value={fields.email}
            onChange={set("email")}
          />

          <Field
            id="password"
            label="Password"
            type={showPw ? "text" : "password"}
            icon={<Lock size={16} />}
            value={fields.password}
            onChange={set("password")}
            trailing={
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          {mode === "signup" && (
            <>
              {/* Password strength bar */}
              <div className="h-1 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
                <div
                  className="auth-gradient-fill h-full rounded-full"
                  style={{
                    width: `${(strength / 4) * 100}%`,
                    transition: "width 300ms cubic-bezier(0.34,1.3,0.5,1)",
                  }}
                />
              </div>
              <Field
                id="confirm"
                label="Confirm password"
                type="password"
                icon={<Lock size={16} />}
                value={fields.confirm}
                onChange={set("confirm")}
              />
            </>
          )}

          {mode === "login" && (
            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                type="button"
                onClick={() => setRemember((r) => !r)}
                className="flex items-center gap-2 text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]"
              >
                <span
                  className="grid h-4 w-4 place-items-center rounded-[6px] border auth-spring transition-all"
                  style={{
                    borderColor: remember ? "transparent" : "var(--auth-glass-border)",
                    backgroundImage: remember ? "var(--auth-gradient-primary)" : "none",
                    transform: remember ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6.4 4.6 9 10 3.2"
                      stroke="#05060b"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        strokeDasharray: 14,
                        strokeDashoffset: remember ? 0 : 14,
                        transition: "stroke-dashoffset 260ms ease-out",
                      }}
                    />
                  </svg>
                </span>
                Remember me
              </button>
              <a href="#" className="text-[color:var(--muted-foreground)] hover:text-[color:var(--auth-cyan)]">
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit button */}
          <div className="relative pt-2">
            {pulse && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl border border-[rgba(52,211,153,0.6)]"
                style={{ animation: "claarvia-pulse-ring 900ms ease-out forwards" }}
              />
            )}
            <button
              type="submit"
              disabled={loading}
              className="auth-gradient-fill relative w-full overflow-hidden rounded-xl py-3 text-sm font-semibold text-[#05060b] auth-spring transition-all hover:-translate-y-0.5"
              style={{
                animation: "claarvia-sweep 6s linear infinite alternate",
                boxShadow: "0 10px 30px -10px rgba(124,108,255,0.7)",
              }}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#05060b]/30 border-t-[#05060b]" />
                  Analyzing signal…
                </span>
              ) : mode === "login" ? (
                "Log in"
              ) : (
                "Create account"
              )}
            </button>
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[color:var(--auth-glass-border)] bg-[rgba(255,255,255,0.04)] py-3 text-sm text-[color:var(--foreground)] auth-spring transition-colors hover:bg-[rgba(255,255,255,0.08)]"
          >
            <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
              <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
              <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
              <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C36.9 40.2 44 35 44 24c0-1.3-.1-2.6-.4-3.9z" />
            </svg>
            Continue with Google
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] text-[color:var(--muted-foreground)]">
          Built for modern commerce · SOC2-minded · GDPR ready
        </p>
      </div>

      <p className="mt-5 text-center text-xs text-[color:var(--muted-foreground)]">
        {mode === "login" ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="text-[color:var(--auth-cyan)] transition-opacity hover:opacity-80"
        >
          {mode === "login" ? "Sign up" : "Log in"}
        </button>
      </p>
    </div>
  );
}
