"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  stack: string[];
  github?: string;
  live?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  stack,
  github,
  live,
}: ProjectCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 120,
    damping: 20,
  });

  const smoothRotateY = useSpring(rotateY, {
    stiffness: 120,
    damping: 20,
  });

  const glowX = useTransform(smoothRotateY, [-10, 10], ["40%", "60%"]);

  const glowY = useTransform(smoothRotateX, [-10, 10], ["60%", "40%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;

    const y = (e.clientY - rect.top) / rect.height;

    rotateY.set((x - 0.5) * 12);
    rotateX.set(-(y - 0.5) * 12);

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const resetRotation = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 2000,
      }}
      className="group relative w-[800px] h-[620px] overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl"
    >
      {/* Mouse Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(168,85,247,0.18),
              transparent 70%
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
          Featured Project
        </p>

        <h3 className="text-4xl font-bold text-white">{title}</h3>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {stack.map((tech) => (
            <div
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-400 backdrop-blur-xl transition duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white"
            >
              {tech}
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-4">
          {live && (
            <a
              href={live}
              target="_blank"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition duration-300 hover:scale-105"
            >
              Live Demo
            </a>
          )}

          {github && (
            <a
              href={github}
              target="_blank"
              className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-white backdrop-blur-xl transition duration-300 hover:border-purple-500/40 hover:bg-purple-500/10"
            >
              GitHub
            </a>
          )}
        </div>
        <div className="relative mt-10 overflow-hidden rounded-[30px] border border-white/10">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={700}
            className="h-[260px] w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        </div>
      </div>

      {/* Hover line */}
      <motion.div
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-0 left-0 h-[2px] bg-purple-500"
      />
    </motion.div>
  );
}
