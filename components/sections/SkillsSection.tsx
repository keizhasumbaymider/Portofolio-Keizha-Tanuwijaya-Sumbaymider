"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { skillGroups } from "@/content/skills";

// ---------------------------------------------------------------------------
// Animation helpers
// ---------------------------------------------------------------------------
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

function RevealLine({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Tag chip — subtle hover lift
// ---------------------------------------------------------------------------
function SkillTag({ name }: { name: string }) {
  return (
    <motion.span
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18, ease: EASE }}
      className="inline-block font-mono text-xs px-2.5 py-1 rounded
                 border border-[var(--color-border)]
                 text-[var(--color-text-muted)]
                 hover:text-[var(--color-text)]
                 hover:border-[var(--color-text-muted)]
                 transition-colors duration-150 cursor-default select-none"
    >
      {name}
    </motion.span>
  );
}

// ---------------------------------------------------------------------------
// Single category row
// ---------------------------------------------------------------------------
function CategoryRow({
  label,
  skills,
  index,
}: {
  label: string;
  skills: { name: string }[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, ease: EASE, delay: index * 0.06 }}
      className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-3 sm:gap-6
                 py-5 border-b border-[var(--color-border)] items-start"
    >
      {/* Category label */}
      <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--color-text)] pt-0.5 shrink-0">
        {label}
      </span>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag key={skill.name} name={skill.name} />
        ))}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-16 px-6 sm:py-24 max-w-6xl mx-auto border-t border-[var(--color-border)]"
    >
      {/* Header */}
      <div className="mb-12 sm:mb-16">
        <RevealLine>
          <h2
            id="skills-heading"
            className="text-3xl sm:text-5xl font-medium tracking-tight text-[var(--color-text)] mb-4"
            style={{ fontFamily: "'Iowan Old Style', 'Georgia', serif" }}
          >
            Skills &amp; Tools
          </h2>
        </RevealLine>

        <RevealLine delay={0.08}>
          <p className="text-sm text-[var(--color-text-muted)] font-normal leading-relaxed max-w-[55ch]">
            Grouped transparently by practical application and coursework experience.
            No inflated mastery ratings or decorative percentage bars.
          </p>
        </RevealLine>
      </div>

      {/* Top border of the index table */}
      <RevealLine delay={0.12}>
        <div className="border-t border-[var(--color-border)]" />
      </RevealLine>

      {/* Category rows */}
      {skillGroups.map((group, i) => (
        <CategoryRow
          key={group.label}
          label={group.label}
          skills={group.skills}
          index={i}
        />
      ))}
    </section>
  );
}
