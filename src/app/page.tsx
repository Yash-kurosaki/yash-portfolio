"use client";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import GridBackground from "@/components/GridBackground";
import Reveal from "@/components/Reveal";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import SectionDivider from "@/components/SectionDivider";
import HorizontalScroll from "@/components/HorizontalScroll";

import dynamic from "next/dynamic";
const MouseGlow = dynamic(() => import("@/components/MouseGlow"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const Particles = dynamic(() => import("@/components/Particles"), {
  ssr: false,
});
const OrbScene = dynamic(() => import("@/components/OrbScene"), { ssr: false });
const Portrait = dynamic(() => import("@/components/Portrait"), { ssr: false });

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-black text-white">
      <MouseGlow />
      <CustomCursor />
      <GridBackground />
      <Navbar />
      <Particles />

      {/* Background Glow */}
      <div className="absolute left-1/2 top-[35%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[140px]" />

      {/* Noise Texture */}
      <div className="noise" />

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-start px-6 pt-32 md:pt-25">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="tracking-[0.4em] uppercase text-zinc-500 text-sm mb-6"
        >
          FULL STACK ENGINEER • AI SYSTEMS • CINEMATIC EXPERIENCES
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[4rem] md:text-[8rem] font-black text-center leading-none"
        >
          <span className="block bg-gradient-to-b from-white via-zinc-500 to-zinc-950 bg-clip-text text-transparent hover:to-purple-500 hover:drop-shadow-[0_0_40px_rgba(168,85,247,0.6)] transition duration-500">
            YASH
          </span>
          <span className="block bg-gradient-to-b from-white via-zinc-500 to-zinc-950 bg-clip-text text-transparent hover:to-purple-500 hover:drop-shadow-[0_0_40px_rgba(168,85,247,0.6)] transition duration-500">
            CHAUHAN
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 text-zinc-400 text-center max-w-xl text-lg leading-relaxed"
        >
          Building scalable full stack systems, immersive frontend experiences,
          AI-powered products, and modern backend architectures focused on
          performance and interaction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 flex flex-col gap-10 sm:flex-row sm:gap-6 "
        >
          <MagneticButton>
            <a
              href="#projects"
              className="relative z-10 flex w-[220px] sm:w-[190px] items-center justify-center rounded-full bg-white py-4 font-semibold text-black transition duration-300 hover:scale-105 hover:font-bold"
            >
              Explore Work
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#contact"
              className="relative z-10 flex w-[220px] sm:w-[190px] items-center justify-center rounded-full border border-zinc-700 py-4 transition duration-300 hover:border-zinc-200 hover:font-semibold"
            >
              Contact Me
            </a>
          </MagneticButton>
        </motion.div>
      </section>

      <section
        id="about"
        className="relative z-10 overflow-hidden px-6 py-30 border-t border-zinc-900"
      >
        <OrbScene />
        <Portrait />
        <Reveal>
          {/* About */}
          <div className="relative z-10 mx-auto flex max-w-7xl gap-16">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-zinc-500 uppercase tracking-[0.3em] mb-6"
              >
                About
              </motion.p>

              <div className="mt-10 flex flex-wrap gap-3 hover:">
                {[
                  "Node.js",
                  "Express",
                  "PostgreSQL",
                  "MongoDB",
                  "FastAPI",
                  "Docker",
                  "Redis",
                  "Neo4j",
                  "Solidity",
                  "AWS",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-400 backdrop-blur-xl hover:scale-110 transition duration-300"
                  >
                    {tech}
                  </div>
                ))}
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-7xl font-bold leading-tight max-w-5xl"
              >
                I create visually immersive products focused on interaction,
                storytelling, and premium frontend engineering.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-10 text-zinc-400 text-lg max-w-3xl leading-relaxed"
              >
                My focus is building modern digital experiences using advanced
                animation systems, scalable frontend architecture, and cinematic
                UI design principles.
              </motion.p>
            </div>
          </div>
        </Reveal>
      </section>

      <SectionDivider />

      <Reveal>
        {/* Projects */}
        <section
          id="projects"
          className="relative z-10 border-t border-zinc-900 px-6 py-20"
        >
          {/* Ambient Glow */}
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/10 blur-[180px]" />

          <div className="relative z-10 mx-auto max-w-7xl">
            <p className="mb-6 uppercase tracking-[0.3em] text-zinc-500">
              Projects
            </p>

            <h2 className="mb-8 text-5xl font-black tracking-[-0.04em] md:text-7xl">
              Selected Work.
            </h2>

            <p className="mb-16 max-w-xl text-lg leading-relaxed text-zinc-500">
              A curated collection of immersive digital products, cinematic
              interfaces, and experimental engineering systems.
            </p>

            <HorizontalScroll>
              <div className="min-w-[800px] snap-center">
                <ProjectCard
                  title="CryptoLance"
                  description="A decentralized full stack freelancing infrastructure powered by smart-contract escrow, wallet-based identity systems, and scalable modern frontend architecture."
                  image="/projects/CryptoLance.png"
                  stack={["Next.js", "Solidity", "Tailwind", "TypeScript"]}
                  github="https://github.com/Yash-kurosaki"
                  live="https://project.vercel.app"
                />
              </div>

              <div className="min-w-[800px] snap-center">
                <ProjectCard
                  title="GraphRAG Benchmark Lab"
                  description="An advanced GraphRAG evaluation platform focused on retrieval accuracy, contextual benchmarking, and LLM-powered evaluation systems."
                  image="/projects/GraphRAG-Benchmark-Lab.png"
                  stack={["Python", "Neo4j", "FastAPI", "LLM"]}
                  github="https://github.com/Yash-kurosaki/Memory-Web"
                  live="https://memory-web-sigma.vercel.app/"
                />
              </div>

              <div className="min-w-[800px] snap-center">
                <ProjectCard
                  title="NOIR"
                  description="A futuristic AI website builder featuring prompt-driven generation, cinematic UI systems, Google authentication, and immersive frontend architecture."
                  image="/projects/Noir.png"
                  stack={["React", "AI", "Motion", "Firebase"]}
                  github="https://github.com/Yash-kurosaki"
                  live="https://project.vercel.app"
                />
              </div>
            </HorizontalScroll>
          </div>
        </section>
      </Reveal>

      <SectionDivider />

      <Reveal>
        {/* Contact */}
        <section
          id="contact"
          className="relative overflow-hidden border-t border-zinc-900 px-6 py-24 md:py-40"
        >
          {/* Ambient Glow */}
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/10 blur-[160px]" />

          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
            <p className="mb-6 uppercase tracking-[0.4em] text-zinc-500">
              Contact
            </p>

            <h2 className="max-w-4xl text-3xl sm:text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
              Let’s build something unforgettable.
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-500">
              Focused on building scalable full stack products, AI systems,
              immersive interfaces, and engineering experiences that merge
              technology with cinematic interaction design.
            </p>

            {/* CTA Buttons */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
              <a
                href="mailto:chauhanyash20006@gmail.com"
                className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition duration-300 hover:scale-105"
              >
                Get In Touch
              </a>

              <a
                href="https://github.com/Yash-kurosaki"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-sm text-white backdrop-blur-xl transition duration-300 hover:border-purple-500/40 hover:bg-purple-500/10"
              >
                GitHub
              </a>
            </div>

            {/* Availability */}
            <div className="mt-16 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.9)]" />

              <span className="text-sm tracking-[0.2em] text-zinc-500 uppercase">
                Available For Projects
              </span>
            </div>
          </div>
        </section>
      </Reveal>

      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black to-transparent" />
      <footer className="relative border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 flex-col md:flex-row">
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-12 w-12 rounded-full bg-purple-500/20 blur-2xl" />

              <img
                src="/white-logo.png"
                alt="YC Logo"
                className="relative z-10 h-10 w-10 object-contain"
              />
            </div>

            <p className="text-sm text-zinc-600">
              Designed & engineered by Yash Chauhan
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6 text-sm uppercase tracking-[0.2em] text-zinc-500">
            <a
              href="https://github.com/Yash-kurosaki"
              target="_blank"
              rel="noopener noreferrer"
              className="transition duration-300 hover:text-white"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition duration-300 hover:text-white"
            >
              LinkedIn
            </a>

            <a
              href="mailto:your@email.com"
              className="transition duration-300 hover:text-white"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
