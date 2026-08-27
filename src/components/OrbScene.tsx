"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
  });

  return (
    <Sphere ref={meshRef} args={[1.4, 64, 64]}>
      <MeshDistortMaterial
        color="#581c87"
        distort={0.35}
        speed={2}
        roughness={0}
      />
    </Sphere>
  );
}

export default function OrbScene() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.04);
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.04);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 0.5, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.4, delay: 0.2 }}
      className="pointer-events-none absolute right-[-20%] top-[42%] -translate-y-1/2 h-[1000px] w-[1000px] z-[1] opacity-50 blur-[30px]"
    >
      <motion.div style={{ x: smoothX, y: smoothY }} className="h-full w-full">
        {isVisible && (
          <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 1.5]}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[2, 2, 5]} />
            <AnimatedSphere />
          </Canvas>
        )}
      </motion.div>
    </motion.div>
  );
}
