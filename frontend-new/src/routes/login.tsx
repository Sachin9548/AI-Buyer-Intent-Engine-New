import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NeuralMesh } from "@/components/NeuralMesh";
import { IntroSequence } from "@/components/IntroSequence";
import { AmbientChips } from "@/components/AmbientChips";
import { AuthCard } from "@/components/AuthCard";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Claarvia — Log in to behavioral intelligence for commerce" },
      {
        name: "description",
        content:
          "Log in or create your Claarvia account. Detect visitor hesitation in real time and recover lost e-commerce sales with AI behavioral intelligence.",
      },
      { property: "og:title", content: "Claarvia — Behavioral intelligence for commerce" },
      {
        property: "og:description",
        content:
          "Real-time hesitation detection that recovers lost sales. Log in or start with Claarvia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [introDone, setIntroDone] = useState(true);
  const [duration, setDuration] = useState(4600);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    setDuration(window.innerWidth < 768 ? 2500 : 4600);
    setIntroDone(false);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(160deg,#05060b_0%,#0b0f1e_100%)]">
      {/* Ambient colour blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 -left-32 h-[46rem] w-[46rem] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(109,93,252,0.15), transparent 65%)",
            animation: "claarvia-bloom 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -right-40 -bottom-56 h-[42rem] w-[42rem] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(34,211,238,0.11), transparent 65%)",
            animation: "claarvia-bloom 22s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Neural mesh canvas — fades in after intro */}
      <div
        aria-hidden
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: introDone ? 0.7 : 0 }}
      >
        <NeuralMesh />
      </div>

      {/* Floating stat chips */}
      <AmbientChips active={introDone} />

      {/* Auth card */}
      <div
        className="relative flex min-h-screen items-center justify-center py-16 transition-all duration-1000"
        style={{
          opacity: introDone ? 1 : 0,
          transform: introDone ? "scale(1)" : "scale(1.04)",
        }}
      >
        <h1 className="sr-only">Claarvia — log in or sign up</h1>
        <AuthCard />
      </div>

      {/* Cinematic intro sequence */}
      {!introDone && (
        <IntroSequence duration={duration} onDone={() => setIntroDone(true)} />
      )}
    </main>
  );
}
