"use client";
import { Sparkles } from "lucide-react";

const cols = [
  { title: "Product", links: ["Overview", "AI assistant", "Funnels", "Heatmaps", "Integrations", "Changelog"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Press kit", "Contact"] },
  { title: "Resources", links: ["Docs", "API reference", "Guides", "Security", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "DPA", "Cookies"] },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/70">
      <div className="container py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-primary shadow-glow">
                <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
              </span>
              <span className="font-display text-xl">Alistine</span>
            </a>
            <p className="mt-5 max-w-xs text-sm text-muted-foreground">
              Visitor intelligence for teams who'd rather know than guess.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              All systems operational
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.title}</div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="text-foreground/80 transition-colors hover:text-foreground">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Alistine, Inc. Designed in low light.</span>
          <span className="font-mono uppercase tracking-widest">v2.0 · made with intent</span>
        </div>
      </div>

      {/* huge wordmark */}
      <div className="pointer-events-none select-none overflow-hidden">
        <div className="-mb-16 bg-gradient-text bg-clip-text px-4 text-center font-display text-[18vw] leading-none tracking-tight text-transparent opacity-20">
          alistine
        </div>
      </div>
    </footer>
  );
}
