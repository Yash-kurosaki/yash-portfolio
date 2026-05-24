"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function Portrait() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 60,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 60,
    damping: 20,
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.05);

      mouseY.set((e.clientY - window.innerHeight / 2) * 0.05);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 1.2,
        delay: 0.3,
      }}
      className="pointer-events-none absolute right-[-8%] top-[45%] z-[5] hidden md:block -translate-y-1/2"
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        {/* Purple Glow */}
        <div className="absolute inset-0 rounded-full bg-purple-800/5 blur-[120px] scale-110" />

        {/* Image */}
        <Image
          src="/image.png"
          alt="Yash Chauhan"
          width={700}
          height={900}
          className="object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
