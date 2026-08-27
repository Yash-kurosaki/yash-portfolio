"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function ProgressMark({
  mark,
  scrollYProgress,
}: {
  mark: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = Math.max(0, mark - 0.1);
  const end = Math.min(1, mark + 0.1);
  const scaleY = useTransform(scrollYProgress, [start, mark, end], [1, 2, 1]);
  const opacity = useTransform(scrollYProgress, [start, mark, end], [0.2, 1, 0.2]);

  return (
    <motion.div
      style={{ scaleY, opacity }}
      className="w-[2px] h-6 rounded-full bg-purple-500 origin-center"
    />
  );
}

export default function ScrollZoom() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const text1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.35, 0.45], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.05, 0.15, 0.35, 0.45], [30, 0, 0, -30]);

  const text2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [30, 0, 0, -30]);

  const text3Opacity = useTransform(scrollYProgress, [0.55, 0.65, 0.85, 0.95], [0, 1, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.55, 0.65, 0.85, 0.95], [30, 0, 0, -30]);

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const marks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient glow */}
        <motion.div
          style={{ scale, opacity }}
          className="absolute w-[600px] h-[600px] rounded-full bg-purple-700/15 blur-[160px]"
        />

        {/* Moving grid */}
        <motion.div style={{ y: gridY, opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />
        </motion.div>

        {/* Fading text */}
        <div className="relative z-10 text-center px-6 w-full">
          <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-zinc-500 uppercase tracking-[0.4em] text-sm mb-6">Experience</p>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">Scroll Deeper</h2>
          </motion.div>

          <motion.div style={{ opacity: text2Opacity, y: text2Y }} className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-purple-400 uppercase tracking-[0.4em] text-sm mb-6">Interact</p>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">Feel Every Pixel</h2>
          </motion.div>

          <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-zinc-500 uppercase tracking-[0.4em] text-sm mb-6">Create</p>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">Build the Future</h2>
          </motion.div>
        </div>

        {/* Side progress marks */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden md:block">
          <div className="flex flex-col items-center gap-3">
            {marks.map((mark, i) => (
              <ProgressMark key={i} mark={mark} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* Bottom scroll hint */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-zinc-600 text-xs uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-zinc-500 to-transparent origin-top"
          />
        </motion.div>
      </div>
    </div>
  );
}
