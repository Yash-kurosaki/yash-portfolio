"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: Math.random() * 100,
  duration: Math.random() * 10 + 10,
  delay: Math.random() * 0,
}));

export default function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            y: "110vh",
            opacity: 0,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
          className="absolute rounded-full bg-white/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
          }}
        />
      ))}
    </div>
  );
}