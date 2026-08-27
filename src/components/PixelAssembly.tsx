"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const wordData = [
  { word: "Designed.", start: 0, end: 0.3 },
  { word: "Engineered.", start: 0.25, end: 0.55 },
  { word: "Perfected.", start: 0.5, end: 0.8 },
];

function RevealWord({
  word,
  start,
  end,
  scrollYProgress,
}: {
  word: string;
  start: number;
  end: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(scrollYProgress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [start, start + 0.08], [60, 0]);

  return (
    <motion.span
      style={{ opacity, x }}
      className="block text-6xl md:text-8xl font-black text-white"
    >
      {word}
    </motion.span>
  );
}

export default function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bottomOpacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95], [0, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="text-center px-6">
          <div className="space-y-4">
            {wordData.map((w) => (
              <RevealWord
                key={w.word}
                word={w.word}
                start={w.start}
                end={w.end}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          <motion.p
            style={{ opacity: bottomOpacity }}
            className="mt-12 text-zinc-500 text-lg"
          >
            Every detail, intentional.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
