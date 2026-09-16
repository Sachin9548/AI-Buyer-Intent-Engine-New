import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

/**
 * Lightweight canvas neural-mesh: drifting particle nodes + thin glowing links.
 * Reused on login, onboarding cinematic and (very low opacity) dashboard chrome.
 */
export function NeuralMesh({
  density = 44,
  opacity = 0.35,
  interactive = true,
  className = "",
}: {
  density?: number;
  opacity?: number;
  interactive?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const count = Math.round(density * Math.min(1.6, Math.max(0.5, (w * h) / 900000)));
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
        }
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!;
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > 150) continue;
          let alpha = (1 - d / 150) * 0.5;
          if (interactive && !touch) {
            const mx = (a.x + b.x) / 2 - mouse.x;
            const my = (a.y + b.y) / 2 - mouse.y;
            const md = Math.hypot(mx, my);
            if (md < 170) alpha += (1 - md / 170) * 0.45;
          }
          ctx.strokeStyle = `rgba(124,108,255,${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = "rgba(34,211,238,0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    draw();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    if (interactive && !touch) window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [density, interactive]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    />
  );
}

/** Slow drifting violet/cyan radial glow blooms + optional mesh. */
export function Ambience({
  mesh = true,
  meshOpacity = 0.16,
  className = "",
}: {
  mesh?: boolean;
  meshOpacity?: number;
  className?: string;
}) {
  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`}>
      <div
        className="bloom absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(109,93,252,0.15), transparent 65%)" }}
      />
      <div
        className="bloom absolute -right-52 top-1/3 h-[34rem] w-[34rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.12), transparent 65%)",
          animationDelay: "-9s",
        }}
      />
      <div
        className="bloom absolute bottom-[-14rem] left-1/3 h-[30rem] w-[30rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,108,255,0.1), transparent 65%)",
          animationDelay: "-16s",
        }}
      />
      {mesh ? <NeuralMesh opacity={meshOpacity} /> : null}
    </div>
  );
}
