import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Blocks,
  ChevronLeft,
  CreditCard,
  Gauge,
  LayoutGrid,
  LogOut,
  Menu,
  MousePointerClick,
  Radio,
  Search,
  Settings,
  Sparkles,
  UserCog,
  Users,
} from "lucide-react";
import { type ReactNode, useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { Ambience } from "./NeuralMesh";
import { SlideOver } from "./overlays";
import { Button, Chip, GlassCard, LivePulse, Toggle, spring } from "./ui";

export const NAV = [
  { to: "/app", label: "Overview", icon: Gauge, exact: true },
  { to: "/app/analytics", label: "Analytics", icon: LayoutGrid, exact: false },

  { to: "/app/sessions", label: "Live Sessions", icon: Radio, exact: false },
  {
    to: "/app/interventions",
    label: "Interventions",
    icon: MousePointerClick,
    exact: false,
  },
  { to: "/app/segments", label: "Audience", icon: Users, exact: false },
  {
    to: "/app/integrations",
    label: "Integrations",
    icon: Blocks,
    exact: false,
  },
  { to: "/app/team", label: "Team", icon: UserCog, exact: false },
  { to: "/app/settings", label: "Settings", icon: Settings, exact: false },
  { to: "/app/billing", label: "Billing", icon: CreditCard, exact: false },
] as const;

export function Wordmark({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span className="grad-accent grid h-8 w-8 shrink-0 place-items-center rounded-xl text-[#05060B]">
        <Sparkles className="h-4 w-4" />
      </span>
      {!collapsed ? (
        <span className="truncate font-display text-lg font-bold tracking-tight text-foreground">
          Claarvia
        </span>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------- Command palette */

const COMMANDS = [
  { group: "Navigate", label: "Overview", to: "/app", hint: "⌘1" },
  {
    group: "Navigate",
    label: "Live Sessions",
    to: "/app/sessions",
    hint: "⌘2",
  },
  {
    group: "Navigate",
    label: "Interventions",
    to: "/app/interventions",
    hint: "⌘3",
  },
  {
    group: "Navigate",
    label: "Intervention builder",
    to: "/app/interventions/builder",
  },
  { group: "Navigate", label: "Audience & Segments", to: "/app/segments" },
  { group: "Navigate", label: "Analytics & Reports", to: "/app/analytics" },
  { group: "Navigate", label: "Integrations", to: "/app/integrations" },
  { group: "Navigate", label: "Team & Roles", to: "/app/team" },
  { group: "Navigate", label: "Settings", to: "/app/settings" },
  { group: "Navigate", label: "Billing", to: "/app/billing" },
  {
    group: "Sessions",
    label: "Visitor #8532 · hesitating · price",
    to: "/app/sessions",
  },
  { group: "Sessions", label: "Visitor #9012 · buying", to: "/app/sessions" },
  {
    group: "Sessions",
    label: "Visitor #7744 · converted $84.00",
    to: "/app/sessions",
  },
  {
    group: "Interventions",
    label: "Free shipping nudge",
    to: "/app/interventions",
  },
  {
    group: "Interventions",
    label: "Cart abandonment save",
    to: "/app/interventions",
  },
  {
    group: "Docs",
    label: "Install the tracking snippet",
    to: "/app/integrations",
  },
];

function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return COMMANDS.slice(0, 8);
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(needle)).slice(
      0,
      10,
    );
  }, [q]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(results.length - 1, a + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose, results.length]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#05060B]/70 backdrop-blur-sm"
          />
          <div className="fixed inset-x-0 top-[12vh] z-50 mx-auto w-[min(42rem,92vw)]">
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={spring}
              className="glass overflow-hidden rounded-2xl"
              role="dialog"
              aria-label="Command palette"
            >
              <div className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.1)] px-4">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search sessions, interventions, reports, settings…"
                  className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <kbd className="num shrink-0 rounded border border-[rgba(255,255,255,0.14)] px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  ESC
                </kbd>
              </div>
              <ul className="max-h-[52vh] overflow-y-auto p-2">
                {results.length === 0 ? (
                  <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No matches for “{q}”
                  </li>
                ) : (
                  results.map((c, i) => (
                    <li key={`${c.group}-${c.label}`}>
                      <Link
                        to={c.to}
                        onClick={onClose}
                        onMouseEnter={() => setActive(i)}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200",
                          i === active
                            ? "bg-[rgba(124,108,255,0.16)] text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <span className="min-w-0 truncate">
                          <span className="num mr-2 text-[10px] uppercase tracking-wide text-muted-foreground">
                            {c.group}
                          </span>
                          {c.label}
                        </span>
                        {c.hint ? (
                          <span className="num text-[10px] text-muted-foreground">
                            {c.hint}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

/* --------------------------------------------------- Notification center */

type Note = {
  id: string;
  cat: "Alerts" | "Weekly digest" | "Product updates" | "Team activity";
  title: string;
  body: string;
  time: string;
  unread: boolean;
  to: string;
};

const NOTES: Note[] = [
  {
    id: "n1",
    cat: "Alerts",
    title: "High-value hesitation spike",
    body: "18 visitors hesitated at shipping cost in the last hour.",
    time: "14:52",
    unread: true,
    to: "/app/sessions",
  },
  {
    id: "n2",
    cat: "Alerts",
    title: "Variant B is winning",
    body: "“Price-match reassurance” B leads by 12.4% at 93% confidence.",
    time: "13:20",
    unread: true,
    to: "/app/interventions",
  },
  {
    id: "n3",
    cat: "Weekly digest",
    title: "Week of Aug 24",
    body: "$41,208 recovered · conversion lift +18.2%.",
    time: "09:00",
    unread: false,
    to: "/app/analytics",
  },
  {
    id: "n4",
    cat: "Product updates",
    title: "Sankey funnel view",
    body: "Analytics now supports stage-to-stage flow comparison.",
    time: "Aug 28",
    unread: false,
    to: "/app/analytics",
  },
  {
    id: "n5",
    cat: "Team activity",
    title: "Priya published v4",
    body: "“Free shipping nudge” went live.",
    time: "Aug 30",
    unread: true,
    to: "/app/team",
  },
];

function NotificationCenter({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [notes, setNotes] = useState(NOTES);
  const [muted, setMuted] = useState<Record<string, boolean>>({});
  const cats = [
    "Alerts",
    "Weekly digest",
    "Product updates",
    "Team activity",
  ] as const;

  return (
    <SlideOver
      open={open}
      onClose={onClose}
      title="Notifications"
      width="max-w-md"
      subtitle={
        <button
          onClick={() =>
            setNotes((n) => n.map((x) => ({ ...x, unread: false })))
          }
          className="text-xs text-violet transition hover:opacity-80"
        >
          Mark all as read
        </button>
      }
    >
      <div className="space-y-6">
        {cats.map((cat) => (
          <section key={cat} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-xs uppercase tracking-wide text-muted-foreground">
                {cat}
              </h4>
              <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
                Mute
                <Toggle
                  label={`Mute ${cat}`}
                  checked={!!muted[cat]}
                  onChange={(v) => setMuted((m) => ({ ...m, [cat]: v }))}
                />
              </label>
            </div>
            {notes
              .filter((n) => n.cat === cat)
              .map((n) => (
                <Link
                  key={n.id}
                  to={n.to}
                  onClick={onClose}
                  className="glass block rounded-xl p-3 transition-all duration-300 hover:border-[rgba(124,108,255,0.4)]"
                >
                  <div className="flex items-start gap-3">
                    {n.unread ? (
                      <span className="grad-accent mt-1.5 h-2 w-2 shrink-0 rounded-full shadow-[0_0_10px_rgba(124,108,255,0.9)]" />
                    ) : (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[rgba(255,255,255,0.18)]" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="truncate text-sm text-foreground">
                          {n.title}
                        </p>
                        <span className="num shrink-0 text-[10px] text-muted-foreground">
                          {n.time}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {n.body}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </section>
        ))}
      </div>
    </SlideOver>
  );
}

/* -------------------------------------------------------------- Sidebar */

function NavList({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = item.exact
          ? pathname === item.to
          : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            title={item.label}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300",
              active
                ? "bg-[rgba(124,108,255,0.13)] text-foreground"
                : "text-muted-foreground hover:bg-[rgba(255,255,255,0.05)] hover:text-foreground",
            )}
          >
            {active ? (
              <motion.span
                layoutId="nav-active"
                transition={spring}
                className="grad-accent absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full shadow-[0_0_12px_rgba(124,108,255,0.9)]"
              />
            ) : null}
            <Icon
              className={cn(
                "h-4 w-4 shrink-0 transition-colors duration-300",
                active ? "text-violet" : "",
              )}
            />
            {!collapsed ? <span className="truncate">{item.label}</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}

/* ---------------------------------------------------------------- Shell */

export function Shell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [palette, setPalette] = useState(false);
  const [notif, setNotif] = useState(false);
  const [status, setStatus] = useState(false);
  const [account, setAccount] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Ambience meshOpacity={0.1} />

      <div className="flex min-h-screen">
        {/* desktop sidebar */}
        <aside
          className={cn(
            "sticky top-0 hidden h-screen shrink-0 flex-col justify-between border-r border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] p-3 backdrop-blur-2xl transition-[width] duration-300 lg:flex",
            collapsed ? "w-[76px]" : "w-[248px]",
          )}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-2 px-1 py-2">
              <Wordmark collapsed={collapsed} />
              <Button
                variant="ghost"
                size="icon"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="h-8 w-8"
                onClick={() => setCollapsed((c) => !c)}
              >
                <ChevronLeft
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    collapsed && "rotate-180",
                  )}
                />
              </Button>
            </div>
            <NavList collapsed={collapsed} />
          </div>
          {!collapsed ? (
            <GlassCard className="p-3">
              <p className="text-xs text-muted-foreground">
                Sessions this cycle
              </p>
              <p className="num mt-1 text-sm text-foreground">
                184,220 / 250,000
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
                <div className="grad-accent h-full w-[73%]" />
              </div>
              <Link
                to="/app/billing"
                className="mt-3 block text-xs text-violet hover:opacity-80"
              >
                Manage plan →
              </Link>
            </GlassCard>
          ) : null}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* top bar */}
          <header className="sticky top-0 z-30 border-b border-[rgba(255,255,255,0.1)] bg-[rgba(5,6,11,0.55)] backdrop-blur-2xl">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 sm:px-5">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation"
                  className="lg:hidden"
                  onClick={() => setMobileNav(true)}
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <div className="lg:hidden">
                  <Wordmark collapsed />
                </div>
              </div>

              <button
                onClick={() => setPalette(true)}
                className="glass flex h-10 min-w-0 items-center gap-3 rounded-xl px-3 text-left text-sm text-muted-foreground transition-all duration-300 hover:border-[rgba(124,108,255,0.4)]"
              >
                <Search className="h-4 w-4 shrink-0" />
                <span className="truncate">
                  Search sessions, interventions, reports…
                </span>
                <kbd className="num ml-auto hidden shrink-0 rounded border border-[rgba(255,255,255,0.14)] px-1.5 py-0.5 text-[10px] sm:block">
                  ⌘K
                </kbd>
              </button>

              <div className="flex items-center gap-1.5">
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setStatus((s) => !s)}
                    className="glass flex h-9 items-center gap-2 rounded-full px-3 text-xs text-foreground transition-all duration-300 hover:border-[rgba(52,211,153,0.4)]"
                  >
                    <LivePulse label="All systems operational" />
                  </button>
                  <AnimatePresence>
                    {status ? (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={spring}
                        className="glass absolute right-0 top-11 w-72 rounded-2xl p-4"
                      >
                        <h4 className="text-sm text-foreground">
                          System status
                        </h4>
                        <ul className="mt-3 space-y-2 text-xs">
                          {[
                            ["Event ingestion", "99.99%"],
                            ["Intent engine", "99.97%"],
                            ["Intervention delivery", "100%"],
                            ["Dashboard API", "99.98%"],
                          ].map(([k, v]) => (
                            <li
                              key={k}
                              className="flex items-center justify-between gap-3"
                            >
                              <span className="text-muted-foreground">{k}</span>
                              <span className="num text-success">{v}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open notifications"
                  className="relative"
                  onClick={() => setNotif(true)}
                >
                  <Bell className="h-4 w-4" />
                  <span className="grad-accent num absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-bold text-[#05060B]">
                    3
                  </span>
                </Button>

                <div className="relative">
                  <button
                    onClick={() => setAccount((a) => !a)}
                    aria-label="Account menu"
                    className="grad-accent grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold text-[#05060B] transition-transform duration-300 hover:scale-105"
                  >
                    AM
                  </button>
                  <AnimatePresence>
                    {account ? (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={spring}
                        className="glass absolute right-0 top-11 w-60 rounded-2xl p-2"
                      >
                        <div className="px-3 py-2">
                          <p className="text-sm text-foreground">Ava Mercer</p>
                          <p className="text-xs text-muted-foreground">
                            Northwind Supply · Owner
                          </p>
                        </div>
                        <div className="my-1 h-px bg-[rgba(255,255,255,0.1)]" />
                        <Link
                          to="/app/settings"
                          onClick={() => setAccount(false)}
                          className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
                        >
                          Profile & workspace
                        </Link>
                        <Link
                          to="/app/billing"
                          onClick={() => setAccount(false)}
                          className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
                        >
                          Billing
                        </Link>
                        <Link
                          to="/"
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground"
                        >
                          <LogOut className="h-3.5 w-3.5" /> Log out
                        </Link>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto px-3 pb-2 md:hidden">
              <Chip tone="success" dot>
                All systems operational
              </Chip>
              <Chip tone="accent">Northwind Supply</Chip>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-3 py-5 pb-24 sm:px-5 lg:pb-8">
            {children}
          </main>

          {/* mobile bottom nav */}
          <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-[rgba(255,255,255,0.1)] bg-[rgba(5,6,11,0.8)] px-2 py-2 backdrop-blur-2xl lg:hidden">
            {NAV.slice(0, 5).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-label={item.label}
                  className="flex flex-col items-center gap-1 rounded-lg px-3 py-1 text-[10px] text-muted-foreground transition-colors duration-300 [&.active]:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: item.exact }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label.split(" ")[0]}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <SlideOver
        open={mobileNav}
        onClose={() => setMobileNav(false)}
        title="Claarvia"
        side="left"
        width="max-w-xs"
      >
        <NavList collapsed={false} onNavigate={() => setMobileNav(false)} />
      </SlideOver>
      <CommandPalette open={palette} onClose={() => setPalette(false)} />
      <NotificationCenter open={notif} onClose={() => setNotif(false)} />
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
    >
      <div className="min-w-0">
        <h1 className="text-2xl text-foreground sm:truncate sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </motion.div>
  );
}
