"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function HorizontalScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -820 : 820,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />

      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.03] p-4 backdrop-blur-2xl transition duration-300 hover:scale-110 hover:bg-white/10"
      >
        <ChevronLeft className="text-white" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.03] p-4 backdrop-blur-2xl transition duration-300 hover:scale-110 hover:bg-white/10"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Scroll Area */}
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth"
      >
        <div className="flex w-max gap-10 px-20 py-4 snap-x snap-mandatory">
          {children}
        </div>
      </div>
    </div>
  );
}
