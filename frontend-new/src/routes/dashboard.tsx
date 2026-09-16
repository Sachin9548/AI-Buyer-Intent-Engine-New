// frontend-new/src/routes/dashboard.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Building2, Mail, Phone, User, LogOut, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

// 1. Mandatory TanStack Route Registration
export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

interface UserProfile {
  name: string;
  email: string;
  store_url: string;
  whatsapp_number: string;
}

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Backend API URL
  const API_URL =
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) ||
    "https://api.claarvia.com/api";

  useEffect(() => {
    const token = localStorage.getItem("claarvia_token");

    // Token nahi hai toh redirect to login
    if (!token) {
      navigate({ to: "/login" });
      return;
    }

    // Fetch verified profile from EC2 backend
    fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("claarvia_token");
        navigate({ to: "/login" });
      });
  }, [navigate, API_URL]);

  const handleLogout = () => {
    localStorage.removeItem("claarvia_token");
    navigate({ to: "/login" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05060b] flex flex-col items-center justify-center text-slate-400 font-sans">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500/30 border-t-indigo-500 mb-4" />
        <p className="text-sm font-medium tracking-wide animate-pulse text-slate-300">
          Loading your verified merchant dashboard…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060b] text-slate-100 font-sans px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow effects matching Claarvia theme */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Top Header Navbar */}
        <header className="flex items-center justify-between pb-8 border-b border-white/[0.08]">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-bold tracking-[0.22em] text-white">
              CLAARVIA
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              BIME 3.0
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.07] transition"
          >
            <LogOut size={14} />
            Log out
          </button>
        </header>

        {/* Welcome & Success Card */}
        <main className="mt-8 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden">
            {/* Shimmer sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)]"
            />

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-4">
              <CheckCircle2 size={13} />
              Merchant Account Verified & Active
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome aboard, {user?.name || "Merchant"}! 🎉
            </h1>

            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Thank you for choosing <strong className="text-indigo-400">Claarvia BIME</strong>. Your merchant account has been activated successfully. Our specialized e-commerce onboarding team is reviewing your store setup and will connect with you shortly on your registered WhatsApp number to assist with zero-friction integration.
            </p>

            <div className="mt-6 p-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] flex items-start gap-3.5">
              <Sparkles className="text-indigo-400 shrink-0 mt-0.5" size={18} />
              <div className="text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-white block mb-0.5">Autonomous Setup In Progress</span>
                Your unique AI buyer intent engine models are being configured for your store domain. No action required from your side right now.
              </div>
            </div>
          </div>

          {/* Registered Details Grid */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-7 shadow-xl">
            <h2 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-5 flex items-center gap-2">
              <ShieldCheck size={14} className="text-cyan-400" />
              Verified Store Profile
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                  <User size={14} /> Full Name
                </div>
                <div className="text-sm font-semibold text-slate-100">{user?.name}</div>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                  <Mail size={14} /> Registered Email
                </div>
                <div className="text-sm font-semibold text-slate-100">{user?.email}</div>
              </div>

              {/* Store URL */}
              <div className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                  <Building2 size={14} /> Store Website
                </div>
                <a
                  href={user?.store_url?.startsWith("http") ? user.store_url : `https://${user?.store_url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-cyan-400 hover:underline truncate block"
                >
                  {user?.store_url}
                </a>
              </div>

              {/* WhatsApp */}
              <div className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                  <Phone size={14} /> WhatsApp Number
                </div>
                <div className="text-sm font-semibold text-slate-100">{user?.whatsapp_number}</div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <footer className="text-center pt-2">
            <p className="text-xs text-slate-500">
              Questions or immediate assistance? Contact us at{" "}
              <a
                href="mailto:support.claarvia@gmail.com"
                className="text-slate-400 underline hover:text-white transition"
              >
                support.claarvia@gmail.com
              </a>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}