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
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={800}
          height={450}
          className="w-full h-[240px] object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="text-xs border border-white/10 rounded-full px-3 py-1 text-zinc-500"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white bg-white/10 rounded-full px-5 py-2 transition hover:bg-white/20"
            >
              Live Demo
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 border border-white/10 rounded-full px-5 py-2 transition hover:text-white hover:border-white/30"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
