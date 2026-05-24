"use client";

import { motion } from "framer-motion";

export default function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Animated Glow */}
      <motion.div
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/10 blur-[140px]"
      />
    </div>
  );
}