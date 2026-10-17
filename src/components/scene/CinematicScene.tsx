"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useCallback } from "react";
import * as THREE from "three";
import { scroll } from "@/lib/store";
import {
  scatteredField,
  fibonacciSphere,
  organicTree,
  neuralCluster,
  hexGrid,
  networkGraph,
  spiralFlow,
  ringExpand,
} from "./formations";

const formationFns = [
  scatteredField,
  fibonacciSphere,
  organicTree,
  neuralCluster,
  hexGrid,
  networkGraph,
  spiralFlow,
  ringExpand,
];

const BASE_OPACITY = 0.55;
const VARIANT_OPACITY = 0.25;
const DIM_OPACITY = 0.2;
const LOW_OPACITY = 0.3;

const opacityBands: ReadonlyArray<{ from: number; to: number; value: number }> = [
  { from: 0.15, to: 0.35, value: VARIANT_OPACITY },
  { from: 0.4, to: 0.65, value: DIM_OPACITY },
  { from: 0.75, to: 1, value: LOW_OPACITY },
];

function opacityForProgress(p: number): number {
  const band = opacityBands.find((b) => p > b.from && p < b.to);
  return band ? band.value : BASE_OPACITY;
}

const POSITION_EPSILON = 0.0005;

function ParticleField() {
  const lastProgress = useRef(-1);

  const count = useMemo(
    () => (window.innerWidth < 768 ? 4000 : 10000),
    []
  );

  const allFormations = useMemo(() => {
    return formationFns.map((fn) => fn(count));
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(allFormations[0]), 3)
    );
    return geo;
  }, [allFormations]);

  const materialRef = useRef<THREE.PointsMaterial>(null);

  useFrame((state) => {
    scroll.progress += (scroll.target - scroll.progress) * 0.06;
    scroll.smoothMouse.x += (scroll.mouse.x - scroll.smoothMouse.x) * 0.04;
    scroll.smoothMouse.y += (scroll.mouse.y - scroll.smoothMouse.y) * 0.04;

    if (Math.abs(scroll.progress - lastProgress.current) > POSITION_EPSILON) {
      const total = allFormations.length;
      const segment = scroll.progress * (total - 1);
      const currentIdx = Math.min(Math.floor(segment), total - 2);
      let t = segment - currentIdx;
      t = t * t * (3 - 2 * t);

      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const from = allFormations[currentIdx];
      const to = allFormations[currentIdx + 1];
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < arr.length; i++) {
        arr[i] = from[i] + (to[i] - from[i]) * t;
      }
      posAttr.needsUpdate = true;
      lastProgress.current = scroll.progress;
    }

    const cam = state.camera;
    const targetZ = 28 - scroll.progress * 22;
    cam.position.z += (targetZ - cam.position.z) * 0.04;
    cam.position.x += (scroll.smoothMouse.x * 2.5 - cam.position.x) * 0.03;
    cam.position.y += (scroll.smoothMouse.y * 1.5 + 1 - cam.position.y) * 0.03;
    cam.lookAt(0, 0, 0);

    const material = materialRef.current;
    if (material) {
      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        opacityForProgress(scroll.progress),
        0.03
      );
    }
  });

  return (
    <points geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        color={0xddddf8}
        size={0.1}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function CinematicScene() {
  const handleMouseMove = useCallback((e: MouseEvent) => {
    scroll.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    scroll.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1, 28], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        style={{ background: "#050505" }}
      >
        <color attach="background" args={["#050505"]} />
        <ParticleField />
      </Canvas>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.5) 85%)",
        }}
      />
    </div>
  );
}
