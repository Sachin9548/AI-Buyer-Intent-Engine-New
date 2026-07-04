"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Product", href: "#pillars" },
  { label: "Comparison", href: "#comparison" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full border border-border/70 px-4 py-2 transition-all duration-500",
          scrolled ? "glass shadow-card" : "bg-transparent",
        )}
      >
        <a href="#top" className="group flex items-center gap-2.5 px-2">
          <span className="relative grid h-7 w-7 place-items-center rounded-md bg-gradient-primary shadow-glow">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </span>
          <span className="font-display text-xl tracking-tight">Alistine</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#" className="hidden text-sm text-muted-foreground hover:text-foreground md:inline">Sign in</a>
          <a
            href="#cta"
            className="magnetic-btn inline-flex h-9 items-center gap-2 rounded-full bg-gradient-primary px-4 text-sm font-medium text-primary-foreground shadow-glow"
          >
            Start free
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border/70 md:hidden"
          >
            <span className="block h-0.5 w-4 bg-foreground" />
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-4 right-4 top-20 z-50 rounded-2xl glass p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a onClick={() => setOpen(false)} href={l.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-white/5">{l.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
