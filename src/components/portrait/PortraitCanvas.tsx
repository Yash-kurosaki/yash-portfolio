"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { sampleImage, Dot } from "./sampleImage";

interface PortraitCanvasProps {
  src: string;
  className?: string;
}

export default function PortraitCanvas({ src, className = "" }: PortraitCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<Dot[]>([]);
  const [loaded, setLoaded] = useState(false);
  const progressRef = useRef(0);
  const currentProgress = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const sampled = sampleImage(img, 300, 400, 3);
      setDots(sampled);
      setLoaded(true);
    };
    img.onerror = () => setLoaded(false);
    img.src = src;
  }, [src]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = 1 - rect.bottom / (vh + rect.height);
      progressRef.current = Math.max(0, Math.min(1, raw * 2));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const handleLeave = () => {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };
    el.addEventListener("mousemove", handleMove, { passive: true });
    el.addEventListener("mouseleave", handleLeave, { passive: true });
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || dots.length === 0) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr)) {
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    currentProgress.current += (progressRef.current - currentProgress.current) * 0.04;
    const progress = currentProgress.current;

    smoothMouse.current.x += (mouseRef.current.x - smoothMouse.current.x) * 0.06;
    smoothMouse.current.y += (mouseRef.current.y - smoothMouse.current.y) * 0.06;

      const mx = smoothMouse.current.x;
      const my = smoothMouse.current.y;

      const visibleCount = Math.floor(dots.length * Math.min(progress * 1.5, 1));

      for (let i = 0; i < visibleCount; i++) {
        const dot = dots[i];
        const localProgress = Math.max(0, Math.min(1, (progress * 1.5 - (i / dots.length) * 0.6) * 2));

        const finalX = dot.x * w;
        const finalY = dot.y * h;
        const seed1 = Math.sin(i * 127.1 + 311.7);
        const seed2 = Math.cos(i * 269.5 + 183.3);
        const scatteredX = (seed1 * 0.5 + 0.5) * w;
        const scatteredY = (seed2 * 0.5 + 0.5) * h;

        const ease = localProgress * localProgress * (3 - 2 * localProgress);

        const x = scatteredX + (finalX - scatteredX) * ease;
        const y = scatteredY + (finalY - scatteredY) * ease;

        const dx = dot.x - 0.5;
        const dy = dot.y - 0.5;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const depth = (1 - dot.brightness) * 18 + 6;

        const ripple = Math.sin(dist * 10 - Date.now() * 0.003) * 0.5 + 0.5;
        const cursorDist = Math.sqrt(
          Math.pow(dot.x - (0.5 + mx * 0.3), 2) + Math.pow(dot.y - (0.5 + my * 0.3), 2)
        );
        const proximity = Math.max(0, 1 - cursorDist * 2.5);

        const pushX = dx * mx * depth + mx * ripple * 3;
        const pushY = dy * my * depth + my * ripple * 3;
        const popX = proximity * mx * 15;
        const popY = proximity * my * 15;

        const finalPx = x + pushX + popX;
        const finalPy = y + pushY + popY;

        const alpha = ease * (0.3 + dot.brightness * 0.7);
        const size = dot.size * ease * (1 + proximity * 0.4);

        ctx.beginPath();
        ctx.arc(finalPx, finalPy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 220, 240, ${alpha})`;
        ctx.fill();
      }

    ctx.restore();
    rafRef.current = requestAnimationFrame(draw);
  }, [dots]);

  useEffect(() => {
    if (dots.length === 0) return;
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dots, draw]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-24 w-24 rounded-full border border-white/10 bg-white/5" />
            <p className="text-xs text-zinc-600">Drop portrait.png in public/</p>
          </div>
        </div>
      )}
    </div>
  );
}
