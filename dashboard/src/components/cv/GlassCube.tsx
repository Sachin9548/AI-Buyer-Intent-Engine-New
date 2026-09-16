import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Lightformer, Environment, RoundedBox, Text } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { useReducedMotion } from "./charts";
import { cn } from "@/lib/utils";

export type CubeMetric = { label: string; value: string };

/* --------------------------------------------------------------- motes */

function Motes({ excited }: { excited: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = 90;
  const { positions, seeds } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 1.7 + Math.random() * 1.5;
      const t = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      p[i * 3] = r * Math.sqrt(1 - u * u) * Math.cos(t);
      p[i * 3 + 1] = r * u * 0.7;
      p[i * 3 + 2] = r * Math.sqrt(1 - u * u) * Math.sin(t);
      s[i] = 0.4 + Math.random();
    }
    return { positions: p, seeds: s };
  }, []);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const speed = excited ? 0.55 : 0.16;
    pts.rotation.y += delta * speed;
    const arr = pts.geometry.attributes["position"] as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr.array[i * 3 + 1] =
        (positions[i * 3 + 1] ?? 0) + Math.sin(t * (seeds[i] ?? 1) + i) * 0.08;
    }
    arr.needsUpdate = true;
    const mat = pts.material as THREE.PointsMaterial;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, excited ? 0.95 : 0.55, 0.08);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#22D3EE"
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------------------------------------------------------------- cube */

const FACE_POS: [number, number, number][] = [
  [0, 0, 0.76],
  [0.76, 0, 0],
  [0, 0, -0.76],
  [-0.76, 0, 0],
];
const FACE_ROT: [number, number, number][] = [
  [0, 0, 0],
  [0, Math.PI / 2, 0],
  [0, Math.PI, 0],
  [0, -Math.PI / 2, 0],
];

function Cube({
  metrics,
  targetFace,
  pointer,
  interactive,
  onFace,
}: {
  metrics: CubeMetric[];
  targetFace: number;
  pointer: { x: number; y: number };
  interactive: boolean;
  onFace: (i: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const vel = useRef({ x: 0, y: 0 });
  const { invalidate } = useThree();

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const baseY = -(targetFace * Math.PI) / 2 + 0.18;
    const targetY = baseY + (interactive ? pointer.x * 0.2 : Math.sin(t * 0.25) * 0.08);
    const targetX = -0.12 + (interactive ? -pointer.y * 0.14 : Math.sin(t * 0.4) * 0.04);

    // spring physics with slight overshoot
    const k = 9;
    const damp = 3.2;
    vel.current.y += (targetY - g.rotation.y) * k * delta - vel.current.y * damp * delta;
    vel.current.x += (targetX - g.rotation.x) * k * delta - vel.current.x * damp * delta;
    g.rotation.y += vel.current.y * delta;
    g.rotation.x += vel.current.x * delta;
    g.position.y = Math.sin(t * 0.8) * 0.08;
    invalidate();
  });

  return (
    <group ref={group} rotation={[-0.12, 0.18, 0]}>
      <RoundedBox
        args={[1.5, 1.5, 1.5]}
        radius={0.045}
        smoothness={5}
        onPointerDown={(e) => {
          e.stopPropagation();
          onFace((targetFace + 1) % 4);
        }}
      >
        <meshPhysicalMaterial
          color="#7C6CFF"
          transparent
          opacity={0.72}
          roughness={0.24}
          metalness={0.18}
          transmission={0.18}
          thickness={0.8}
          ior={1.38}
          clearcoat={1}
          clearcoatRoughness={0.16}
        />
      </RoundedBox>
      {metrics.slice(0, 4).map((m, i) => (
        <group
          key={m.label}
          position={[
            (FACE_POS[i]?.[0] ?? 0) * 1.04,
            FACE_POS[i]?.[1] ?? 0,
            (FACE_POS[i]?.[2] ?? 0) * 1.04,
          ]}
          rotation={FACE_ROT[i] ?? [0, 0, 0]}
        >
          <Text
            position={[0, 0.18, 0]}
            fontSize={0.15}
            color="#94A3B8"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.3}
          >
            {m.label.toUpperCase()}
          </Text>
          <Text
            position={[0, -0.06, 0]}
            fontSize={0.26}
            color="#F5F7FA"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.3}
          >
            {m.value}
          </Text>
        </group>
      ))}
      <pointLight position={[2.4, 2.8, 3]} intensity={16} color="#F5F7FA" distance={9} />
      <pointLight position={[-2.5, 0.5, 2]} intensity={9} color="#22D3EE" distance={8} />
      <pointLight position={[1.5, -2, -2]} intensity={7} color="#7C6CFF" distance={7} />
    </group>
  );
}

/* -------------------------------------------------------------- widget */

export function GlassCube({
  metrics,
  className,
  height = 240,
}: {
  metrics: CubeMetric[];
  className?: string;
  height?: number;
}) {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [face, setFace] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [excited, setExcited] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((e) => setVisible(!!e[0]?.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = metrics[face % Math.max(1, metrics.length)] ?? metrics[0];

  if (reduced) {
    return (
      <div
        className={cn(
          "glass relative grid place-items-center rounded-2xl p-6 text-center",
          className,
        )}
        style={{ height }}
      >
        <div>
          <p className="num text-xs uppercase tracking-wide text-muted-foreground">
            {active?.label}
          </p>
          <p className="num mt-1 text-2xl text-foreground">{active?.value}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={hostRef}
      className={cn("glass lift relative overflow-hidden rounded-2xl", className)}
      style={{ height }}
      onPointerMove={(e) => {
        if (isTouch) return;
        const r = e.currentTarget.getBoundingClientRect();
        setPointer({
          x: ((e.clientX - r.left) / r.width) * 2 - 1,
          y: ((e.clientY - r.top) / r.height) * 2 - 1,
        });
      }}
      onPointerEnter={() => !isTouch && setExcited(true)}
      onPointerLeave={() => {
        setExcited(false);
        setPointer({ x: 0, y: 0 });
      }}
      onClick={() => isTouch && setFace((f) => (f + 1) % 4)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(124,108,255,0.22),transparent_65%)]" />
      {visible ? (
        <Canvas
          dpr={[1, 1.6]}
          frameloop="always"
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        >
          <ambientLight intensity={0.9} />
          <Environment resolution={64}>
            <Lightformer intensity={2.4} position={[0, 4, 2]} scale={[5, 1, 1]} />
            <Lightformer
              intensity={1.4}
              color="#22D3EE"
              position={[-4, 0, 1]}
              rotation-y={Math.PI / 2}
              scale={[4, 1, 1]}
            />
          </Environment>
          <Cube
            metrics={metrics}
            targetFace={face}
            pointer={pointer}
            interactive={!isTouch}
            onFace={setFace}
          />
          <Motes excited={excited} />
        </Canvas>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3">
        <span className="num text-[10px] uppercase tracking-wide text-muted-foreground">
          {isTouch ? "tap to flip" : "move cursor to rotate"}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={active?.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="num text-[10px] text-violet"
          >
            {active?.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default GlassCube;
