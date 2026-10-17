"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const CinematicScene = dynamic(
  () => import("@/components/scene/CinematicScene"),
  { ssr: false }
);

export default function SceneBackground() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, #0b0b12 0%, #050505 70%)",
        }}
      />
    );
  }

  return <CinematicScene />;
}
