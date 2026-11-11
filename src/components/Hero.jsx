"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Magnetic, RotatingWords } from "./motion";

const ease = [0.22, 1, 0.36, 1];

function CircleBadge() {
  const text = "AVAILABLE NOW · IMMEDIATE JOINER · ";
  return (
    <svg viewBox="0 0 200 200" className="animate-spin-slow h-full w-full" aria-hidden>
      <defs>
        <path id="circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
      </defs>
      <text className="fill-foreground font-mono text-[13px] tracking-[0.25em]">
        <textPath href="#circle" textLength="500" lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

export default function Hero(p) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  return (
    <section
      ref={ref}
      id="top"
      className="grid-lines relative flex min-h-svh flex-col justify-between overflow-hidden pt-24"
    >
      {/* meta row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 px-4 font-mono text-[11px] uppercase tracking-widest text-muted sm:px-8 md:grid-cols-4"
      >
        <span>Portfolio — 2026</span>
        <span className="text-right md:text-left">{p.location}</span>
        <span className="hidden md:block">Audit · Reporting · IFRS</span>
        <span className="hidden items-center justify-end gap-2 md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available now
        </span>
      </motion.div>

      {/* middle */}
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-muted"
          >
            ({p.prefix})
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease }}
            className="mt-6 text-3xl font-medium tracking-tight sm:text-5xl"
          >
            Your next <RotatingWords words={p.roles} className="font-semibold text-accent" />
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.9, ease }}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            3.5+ years turning ledgers into clear, IFRS‑compliant financial statements — including
            Big Four experience at EY Sri Lanka.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background"
              >
                <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative">Start a conversation</span>
                <span className="relative transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/cv.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/30 px-7 py-4 text-sm font-medium transition-colors hover:border-foreground"
              >
                Download CV ↓
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease }}
          className="relative mx-auto aspect-square w-64 sm:w-80 lg:w-88"
        >
          <div className="absolute inset-0">
            <CircleBadge />
          </div>
          <div className="absolute inset-[14%] overflow-hidden rounded-full bg-foreground">
            {p.photo ? (
              <Image
                src={p.photo}
                alt={`${p.first} ${p.last}`}
                fill
                priority
                sizes="(max-width: 640px) 200px, 280px"
                className="object-cover object-[50%_18%] grayscale transition duration-700 hover:scale-105 hover:grayscale-0"
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-7xl font-semibold tracking-tighter text-background">
                {p.initials}
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 right-4 h-16 w-16 rounded-full bg-accent sm:h-20 sm:w-20" />
        </motion.div>
      </div>

      {/* giant name */}
      <motion.div style={{ opacity: fade }} className="pb-6 leading-[0.85]">
        <motion.h1
          aria-label={`${p.first} ${p.last}`}
          className="select-none whitespace-nowrap font-semibold uppercase tracking-tighter"
        >
          <motion.span
            style={{ x: x1 }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.1 }}
            className="block px-3 text-[17vw] sm:px-6"
          >
            {p.first}
          </motion.span>
          <motion.span
            style={{ x: x2 }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.25 }}
            className="text-outline block pr-3 text-right text-[17vw] sm:pr-6"
          >
            {p.last}
            <span className="text-accent [-webkit-text-stroke:0]">.</span>
          </motion.span>
        </motion.h1>
      </motion.div>
    </section>
  );
}
