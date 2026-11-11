import { MotionConfig } from "motion/react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Cursor from "@/components/Cursor";
import { Reveal } from "@/components/motion";
import {
  Chips,
  Contact,
  Education,
  Experience,
  Expertise,
  Marquee,
  SectionHead,
  Stats,
} from "@/components/Sections";
import {
  profile,
  roles,
  stats,
  experience,
  expertise,
  skills,
  tools,
  education,
  languages,
} from "@/data/profile";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <Cursor />
      <Nav name={profile.shortName} />

      <main>
        <Hero
          prefix="Ahamathu Lebbai"
          first="Muhammad"
          last="Ranoos"
          roles={roles}
          location={profile.location}
          photo={profile.photo}
          initials={profile.initials}
          email={profile.email}
        />

        {/* Ticker */}
        <div className="-rotate-1 border-y border-foreground bg-foreground py-5 text-background">
          <Marquee items={profile.tagline} />
        </div>

        {/* About */}
        <section id="about" className="mx-auto max-w-7xl px-4 py-28 sm:px-8 sm:py-40">
          <SectionHead
            index="01"
            label="About"
            title="Precision in every ledger, clarity in every report."
          />
          <div className="grid gap-12 md:grid-cols-[1fr_3fr]">
            <Reveal className="font-mono text-xs uppercase leading-loose tracking-widest text-muted">
              <p>Languages</p>
              {languages.map((l) => (
                <p key={l} className="text-foreground">
                  — {l}
                </p>
              ))}
            </Reveal>
            <div>
              <Reveal>
                <p className="text-2xl font-medium leading-snug tracking-tight sm:text-4xl">
                  {profile.summary}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
                  {profile.summary2}
                </p>
              </Reveal>
            </div>
          </div>
          <div className="mt-24">
            <Stats stats={stats} />
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mx-auto max-w-7xl px-4 pb-28 sm:px-8 sm:pb-40">
          <SectionHead index="02" label="Experience" title="Where I've done the work." />
          <Experience jobs={experience} />
        </section>

        {/* Expertise */}
        <section id="expertise" className="mx-auto max-w-7xl px-4 pb-28 sm:px-8 sm:pb-40">
          <SectionHead index="03" label="Expertise" title="What I bring to the table." />
          <Expertise items={expertise} />
          <div className="mt-16 grid gap-8 md:grid-cols-[1fr_3fr]">
            <Reveal className="font-mono text-xs uppercase tracking-widest text-muted">
              Core skills
            </Reveal>
            <Chips items={skills} />
          </div>
        </section>

        {/* Tools ticker */}
        <section aria-label="Systems and tools" className="space-y-4 overflow-hidden py-10">
          <p className="mx-auto max-w-7xl px-4 font-mono text-xs uppercase tracking-widest text-muted sm:px-8">
            <span className="text-accent">↳</span> Systems & tools I work in
          </p>
          <Marquee items={tools} outline />
          <Marquee items={[...tools].reverse()} reverse />
        </section>

        {/* Education */}
        <section id="education" className="mx-auto max-w-7xl px-4 py-28 sm:px-8 sm:py-40">
          <SectionHead index="04" label="Education" title="Qualified, and still climbing." />
          <Education items={education} />
        </section>

        {/* Contact */}
        <section id="contact" className="relative overflow-hidden bg-ink text-paper">
          <div className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-8 sm:py-40">
            <div className="mb-16 flex gap-4 border-t border-paper/30 pt-6 font-mono text-xs uppercase tracking-widest text-paper/50">
              <span className="text-accent">05</span>
              <span>Contact</span>
            </div>
            <Contact
              email={profile.email}
              phone={profile.phone}
              phoneHref={profile.phoneHref}
              linkedin={profile.linkedin}
              location={profile.location}
            />
          </div>
          <footer className="relative border-t border-paper/15">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 font-mono text-[11px] uppercase tracking-widest text-paper/50 sm:flex-row sm:px-8">
              <span>© 2026 {profile.name}</span>
              <a href="#top" className="transition-colors hover:text-accent">
                Back to top ↑
              </a>
            </div>
          </footer>
        </section>
      </main>
    </MotionConfig>
  );
}
