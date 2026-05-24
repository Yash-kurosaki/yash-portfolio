"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

const links = [
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map((link) => document.querySelector(link.href));

      sections.forEach((section) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 200 && rect.bottom >= 200) {
          setActive(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      className="fixed left-1/2 top-6 z-50 flex -translate-x-1/2 items-center gap-8 rounded-full border border-white/10 bg-white/[0.03] px-4 backdrop-blur-xl"
    >
      <div className="relative flex items-center justify-center">
        {/* Purple Glow */}
        <div className="absolute h-20 w-10 rounded-full bg-purple-500/50 blur-2xl" />

        {/* Logo */}
        <Image
          src="/white-logo.png"
          alt="YC Logo"
          width={62}
          height={62}
          className="relative top-[6px] left-[6px] z-10 object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.6)] hover:scale-110 transition duration-300"
        />
      </div>

      <div className="flex items-center gap-6">
        {links.map((link) => (
          <MagneticButton key={link.name}>
            <a
              href={link.href}
              className={clsx(
                "relative text-sm transition duration-300",
                active === link.href.replace("#", "")
                  ? "text-white"
                  : "text-zinc-500 hover:text-white",
              )}
            >
              {link.name}

              {active === link.href.replace("#", "") && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-2 left-0 h-px w-full bg-purple-500"
                />
              )}
            </a>
          </MagneticButton>
        ))}
      </div>
    </motion.nav>
  );
}
