"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import PortraitCanvas from "@/components/portrait/PortraitCanvas";

const CinematicScene = dynamic(
  () => import("@/components/scene/CinematicScene"),
  { ssr: false }
);

const projects = [
  {
    title: "Company Memory AI",
    description:
      "An AI-powered company knowledge management system that captures, organizes, and retrieves institutional memory using intelligent search and contextual understanding.",
    image: "/projects/Company-Memory-AI.png",
    stack: ["Next.js", "AI", "TypeScript", "Tailwind"],
    github: "https://github.com/Yash-kurosaki/Company-Memory-AI",
    live: "https://company-memory-ai.vercel.app/",
    color: "#a78bfa",
  },
  {
    title: "BurnerX",
    description:
      "A multi-chain devnet session wallet platform creating temporary wallets on Solana, Ethereum, Base, and Arbitrum.",
    image: "/projects/BurnerX.png",
    stack: ["Solana", "Ethereum", "Base", "Arbitrum"],
    github: "https://github.com/Yash-kurosaki/BurnerX",
    live: "https://burner-x-one-gamma.vercel.app/",
    color: "#60a5fa",
  },
  {
    title: "CryptoLance",
    description:
      "A decentralized full stack freelancing infrastructure powered by smart-contract escrow, wallet-based identity systems, and scalable modern frontend architecture.",
    image: "/projects/CryptoLance.png",
    stack: ["Next.js", "Solidity", "Tailwind", "TypeScript"],
    github: "https://github.com/Yash-kurosaki",
    live: "https://github.com/Yash-kurosaki/decentralised-freelancing",
    color: "#f59e0b",
  },
  {
    title: "NOIR",
    description:
      "A futuristic AI website builder featuring prompt-driven generation, cinematic UI systems, Google authentication, and immersive frontend architecture.",
    image: "/projects/Noir.png",
    stack: ["React", "AI", "Motion", "Firebase"],
    github: "https://github.com/Yash-kurosaki",
    live: "https://project.vercel.app",
    color: "#e879f9",
  },
];

export default function HomePage() {
  return (
    <>
      <CinematicScene />
      <SmoothScroll />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-sm tracking-[0.4em] uppercase text-zinc-500">
          Full Stack Engineer &bull; AI Systems &bull; Cinematic Experiences
        </p>
        <h1 className="text-[4rem] md:text-[8rem] font-black leading-none">
          <span className="block bg-gradient-to-b from-white via-zinc-400 to-zinc-800 bg-clip-text text-transparent">
            YASH
          </span>
          <span className="block bg-gradient-to-b from-white via-zinc-400 to-zinc-800 bg-clip-text text-transparent">
            CHAUHAN
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
          Building scalable full stack systems, immersive frontend experiences,
          AI-powered products, and modern backend architectures focused on
          performance and interaction.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <a
            href="#projects"
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:scale-105"
          >
            Explore Work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 px-8 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 px-6 pt-32 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="lg:w-3/5">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
                About
              </p>
              <h1 className="mb-10 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                I create visually immersive products focused on interaction,
                storytelling, and premium frontend engineering.
              </h1>
              <p className="mb-10 max-w-3xl text-lg leading-relaxed text-zinc-400">
                My focus is building modern digital experiences using advanced
                animation systems, scalable frontend architecture, and cinematic
                UI design principles.
              </p>
              <div className="flex flex-wrap gap-2">
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
                  "Next.js",
                  "TypeScript",
                  "React",
                  "Tailwind",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:sticky lg:top-24 lg:flex lg:w-2/5 lg:justify-center">
              <PortraitCanvas
                src="/portait.png"
                className="h-[400px] w-full max-w-sm rounded-2xl border border-white/5 bg-[#0a0a0a]/80 lg:h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="relative z-10 border-t border-zinc-900 px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
            Projects
          </p>
          <h2 className="mb-12 text-4xl font-black tracking-tight md:text-6xl">
            Selected Work<span className="text-purple-500">.</span>
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/20"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="mb-4 h-48 w-full rounded-xl object-cover object-top opacity-60"
                />
                <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                  {project.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-500"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-500 transition hover:text-white"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-500 transition hover:text-white"
                  >
                    Live →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative z-10 border-t border-zinc-900 px-6 py-24"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
            Contact
          </p>
          <h2 className="mb-6 text-4xl font-black tracking-tight md:text-6xl">
            Let&apos;s work together<span className="text-purple-500">.</span>
          </h2>
          <p className="mb-10 text-lg text-zinc-400">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:chauhanyash20006@gmail.com"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:scale-105"
            >
              Get In Touch
            </a>
            <a
              href="https://github.com/Yash-kurosaki"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-8 py-3 text-sm text-white transition hover:bg-white/10"
            >
              GitHub
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs uppercase tracking-widest text-zinc-500">
              Available for projects
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-900 px-6 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-sm text-zinc-600">
          <p>Designed &amp; engineered by Yash Chauhan</p>
          <div className="flex gap-6">
            <a
              href="https://github.com/Yash-kurosaki"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/yash1111"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="mailto:chauhanyash20006@gmail.com"
              className="transition hover:text-white"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
