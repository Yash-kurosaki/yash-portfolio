"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  const cleanupRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move, { passive: true });

    const hoverables = document.querySelectorAll("button, a, .group");
    const enterHandler = () => setIsHovering(true);
    const leaveHandler = () => setIsHovering(false);

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", enterHandler);
      el.addEventListener("mouseleave", leaveHandler);
      cleanupRef.current.push(() => {
        el.removeEventListener("mouseenter", enterHandler);
        el.removeEventListener("mouseleave", leaveHandler);
      });
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cleanupRef.current.forEach((fn) => fn());
      cleanupRef.current = [];
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        animate={{ width: isHovering ? 70 : 28, height: isHovering ? 70 : 28 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-white/40 mix-blend-difference"
        style={{ translateX: cursorX, translateY: cursorY, x: "-50%", y: "-50%" }}
      />
      <motion.div
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-5 w-5 rounded-full bg-white mix-blend-difference"
        style={{ translateX: cursorX, translateY: cursorY, x: "-50%", y: "-50%" }}
      />
    </>
  );
}
