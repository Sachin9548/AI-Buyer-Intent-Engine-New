import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { type ReactNode, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button, spring } from "./ui";

function Backdrop({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-40 bg-[#05060B]/70 backdrop-blur-sm"
    />
  );
}

function useEscape(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  width?: string;
}) {
  useEscape(open, onClose);
  return (
    <AnimatePresence>
      {open ? (
        <>
          <Backdrop onClose={onClose} />
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={title}
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={spring}
              className={cn("glass w-full rounded-2xl p-6", width)}
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg text-foreground">{title}</h3>
                  {description ? (
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                  ) : null}
                </div>
                <Button variant="ghost" size="icon" aria-label="Close dialog" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {children ? <div className="mt-5">{children}</div> : null}
              {footer ? <div className="mt-6 flex flex-wrap justify-end gap-2">{footer}</div> : null}
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export function SlideOver({
  open,
  onClose,
  title,
  subtitle,
  children,
  width = "max-w-xl",
  side = "right",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  width?: string;
  side?: "right" | "left";
}) {
  useEscape(open, onClose);
  return (
    <AnimatePresence>
      {open ? (
        <>
          <Backdrop onClose={onClose} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={spring}
            className={cn(
              "glass fixed inset-y-0 z-50 flex w-full flex-col rounded-none sm:rounded-l-3xl",
              side === "right" ? "right-0" : "left-0",
              width,
            )}
          >
            <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-[rgba(255,255,255,0.1)] p-5">
              <div className="min-w-0">
                <h3 className="truncate text-lg text-foreground">{title}</h3>
                {subtitle ? <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div> : null}
              </div>
              <Button variant="ghost" size="icon" aria-label="Close panel" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
