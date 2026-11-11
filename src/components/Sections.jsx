"use client";

import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Counter, Magnetic, Reveal, SplitText } from "./motion";

const ease = [0.22, 1, 0.36, 1];
/* ---------- shared ---------- */

export function SectionHead({ index, label, title }) {
  return (
    <div className="mb-14 grid gap-6 border-t border-foreground pt-6 md:grid-cols-[1fr_3fr]">
      <Reveal y={20} className="flex gap-4 font-mono text-xs uppercase tracking-widest text-muted">
        <span className="text-accent">{index}</span>
        <span>{label}</span>
      </Reveal>
      <SplitText
        as="h2"
        text={title}
        className="text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
      />
    </div>
  );
}
/* ---------- marquee ---------- */

export function Marquee({ items, reverse, outline }) {
  const row = [...items, ...items];
  return (
    <div className="flex overflow-hidden whitespace-nowrap" aria-hidden>
      <div className={`flex shrink-0 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {row.map((t, i) => (
          <span
            key={i}
            className={`flex items-center gap-8 px-4 text-5xl font-semibold uppercase tracking-tight sm:text-7xl ${outline ? "text-outline" : ""}`}
          >
            {t}
            <span className="inline-block h-4 w-4 rotate-45 bg-accent sm:h-5 sm:w-5" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stats({ stats }) {
  return (
    <div className="grid grid-cols-2 border-l border-t border-border lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i * 0.1}
          className="group relative overflow-hidden border-b border-r border-border p-6 sm:p-10"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 ease-out group-hover:scale-y-100" />
          <div className="relative transition-colors duration-500 group-hover:text-background">
            <p className="font-mono text-[11px] text-accent">0{i + 1}</p>
            <p className="mt-6 text-6xl font-semibold tracking-tighter sm:text-8xl">
              <Counter to={s.value} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-4 max-w-56 text-sm leading-snug text-muted transition-colors duration-500 group-hover:text-background/70">
              {s.label}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Experience({ jobs }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <div ref={ref} className="relative">
      <div className="absolute left-0 top-0 hidden h-full w-px bg-border md:left-[calc(25%-1px)] md:block">
        <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-accent" />
      </div>

      <div className="space-y-24">
        {jobs.map((job, j) => (
          <div key={job.company} className="grid gap-8 md:grid-cols-[1fr_3fr]">
            <div className="md:sticky md:top-28 md:self-start md:pr-10">
              <Reveal>
                <p className="text-8xl font-semibold leading-none tracking-tighter text-outline">
                  0{j + 1}
                </p>
                <p className="mt-4 font-mono text-xs uppercase tracking-widest text-accent">
                  {job.period}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                  {job.location}
                </p>
              </Reveal>
            </div>

            <div className="md:pl-12">
              <Reveal>
                <h3 className="text-3xl font-semibold tracking-tight sm:text-5xl">{job.company}</h3>
                <p className="mt-2 inline-block rounded-full bg-foreground px-4 py-1.5 text-sm text-background">
                  {job.role}
                </p>
              </Reveal>
              <ul className="mt-10 border-t border-border">
                {job.points.map((pt, i) => (
                  <motion.li
                    key={pt}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, ease, delay: i * 0.05 }}
                    className="group grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-5 transition-colors hover:bg-surface"
                  >
                    <span className="pl-2 font-mono text-xs text-muted transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed transition-transform duration-500 group-hover:translate-x-2">
                      {pt}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
/* ---------- expertise ---------- */

function SpotlightCard({ index, title, body }) {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const bg = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)`;
  return (
    <motion.div
      data-cursor
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay: (index % 3) * 0.1 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        mx.set(-200);
        my.set(-200);
      }}
      className="group relative flex min-h-72 flex-col justify-between overflow-hidden border-b border-r border-border p-8"
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: bg }} />
      <div className="relative flex items-start justify-between">
        <span className="font-mono text-xs text-muted">/{String(index + 1).padStart(2, "0")}</span>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-border transition-all duration-500 group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-background">
          →
        </span>
      </div>
      <div className="relative">
        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </motion.div>
  );
}

export function Expertise({ items }) {
  return (
    <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {items.map((e, i) => (
        <SpotlightCard key={e.title} index={i} {...e} />
      ))}
    </div>
  );
}
/* ---------- skills chips ---------- */

export function Chips({ items }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((s, i) => (
        <motion.li
          key={s}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.05 }}
          whileHover={{ y: -4, rotate: i % 2 ? 2 : -2 }}
          className="cursor-default rounded-full border border-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
        >
          {s}
        </motion.li>
      ))}
    </ul>
  );
}

export function Education({ items }) {
  return (
    <ul className="border-t border-foreground">
      {items.map((ed, i) => (
        <motion.li
          key={ed.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease, delay: i * 0.08 }}
          className="group relative overflow-hidden border-b border-foreground"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
          <div className="relative grid gap-2 px-2 py-8 transition-colors duration-500 group-hover:text-background md:grid-cols-[1fr_5fr_3fr_auto] md:items-center md:gap-8">
            <span className="font-mono text-xs text-accent">0{i + 1}</span>
            <span className="text-2xl font-semibold tracking-tight sm:text-3xl">{ed.title}</span>
            <span className="text-sm text-muted transition-colors group-hover:text-background/70">
              {ed.org}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest">{ed.period}</span>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}

export function Contact(c) {
  const rows = [
    { label: "Email", value: c.email, href: `mailto:${c.email}` },
    { label: "Phone", value: c.phone, href: `tel:${c.phoneHref}` },
    { label: "LinkedIn", value: "Connect on LinkedIn", href: c.linkedin },
    { label: "Based in", value: `${c.location} · Available immediately`, href: undefined },
  ];
  return (
    <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:items-end">
      <div>
        <SplitText
          as="h2"
          text="Let's balance the books together."
          className="text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl"
        />
        <div className="mt-12">
          <Magnetic strength={0.5} className="inline-block">
            <a
              href={`mailto:${c.email}`}
              className="group relative grid h-40 w-40 place-items-center overflow-hidden rounded-full bg-accent text-center text-sm font-semibold uppercase tracking-widest text-paper sm:h-48 sm:w-48"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-paper transition-transform duration-500 group-hover:scale-100" />
              <span className="relative transition-colors duration-500 group-hover:text-ink">
                Get in
                <br />
                touch ↗
              </span>
            </a>
          </Magnetic>
        </div>
      </div>

      <ul className="border-t border-paper/30">
        {rows.map((r, i) => (
          <motion.li
            key={r.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: i * 0.08 }}
            className="border-b border-paper/30"
          >
            {r.href ? (
              <a
                href={r.href}
                target={r.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
                  {r.label}
                </span>
                <span className="flex items-center gap-3 text-right text-base font-medium sm:text-lg">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1px] bg-bottom-left bg-no-repeat transition-[background-size] duration-500 group-hover:bg-size-[100%_1px]">
                    {r.value}
                  </span>
                  <span className="text-accent transition-transform duration-500 group-hover:rotate-45">
                    ↗
                  </span>
                </span>
              </a>
            ) : (
              <div className="flex items-center justify-between gap-4 py-6">
                <span className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
                  {r.label}
                </span>
                <span className="text-right text-base font-medium sm:text-lg">{r.value}</span>
              </div>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
