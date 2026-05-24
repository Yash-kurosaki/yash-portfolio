"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, {
    stiffness: 500,
    damping: 28,
  });

  const cursorY = useSpring(mouseY, {
    stiffness: 500,
    damping: 28,
  });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);

    const hoverables = document.querySelectorAll(
      "button, a, .group"
    );

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        setIsHovering(true)
      );

      el.addEventListener("mouseleave", () =>
        setIsHovering(false)
      );
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        animate={{
          width: isHovering ? 70 : 28,
          height: isHovering ? 70 : 28,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-white/40 mix-blend-difference"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%",
          y: "-50%",
        }}
      />

      {/* Inner Dot */}
      <motion.div
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-5 w-5 rounded-full bg-white mix-blend-difference"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%",
          y: "-50%",
        }}
      />
    </>
  );
}