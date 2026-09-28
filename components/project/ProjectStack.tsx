"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { Project } from "@/types/project";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechTag } from "@/components/ui/TechTag";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";

interface ProjectStackProps {
  projects: Project[];
}

export function ProjectStack({ projects }: ProjectStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  if (!projects.length) return null;

  const currentProject = projects[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      handleNext();
    } else if (e.key === "ArrowLeft") {
      handlePrev();
    }
  };

  return (
    <div
      className="w-full flex flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Interactive project document stack. Use arrow keys to navigate."
    >
      {/* Semantic Accessible List for Screen Readers & Reduced Motion */}
      <ol className="sr-only">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`}>
              {p.title}: {p.summary} ({p.status})
            </Link>
          </li>
        ))}
      </ol>

      {/* Desktop Stack Controls Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--color-text-muted)]">
            DOC_0{activeIndex + 1} / 0{projects.length}
          </span>
          <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
            {currentProject.type}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="w-9 h-9 flex items-center justify-center rounded border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors focus-visible:outline-2"
            aria-label="Previous project"
          >
            <ArrowLeft size={16} weight="regular" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-9 h-9 flex items-center justify-center rounded border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors focus-visible:outline-2"
            aria-label="Next project"
          >
            <ArrowRight size={16} weight="regular" />
          </button>
        </div>
      </div>

      {/* Project Selector Tabs */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6"
        role="tablist"
      >
        {projects.map((project, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={project.slug}
              role="tab"
              aria-selected={isSelected}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`p-3 text-left rounded border transition-all ${
                isSelected
                  ? "border-[var(--color-text)] bg-[var(--color-surface)] shadow-sm"
                  : "border-[var(--color-border)] hover:border-[var(--color-text-muted)] text-[var(--color-text-muted)]"
              }`}
            >
              <div className="text-[10px] font-mono opacity-70">
                0{idx + 1} · {project.year}
              </div>
              <div className="text-sm font-medium tracking-tight truncate text-[var(--color-text)]">
                {project.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Document Card Presentation */}
      <div className="relative min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.slug}
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-border)]/70">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[var(--color-text)]">
                    {currentProject.title}
                  </h3>
                  <StatusBadge status={currentProject.status} />
                </div>
                <span className="font-mono text-xs text-[var(--color-text-muted)]">
                  {currentProject.year}
                </span>
              </div>

              <p className="text-base sm:text-lg text-[var(--color-text)] font-light leading-relaxed mb-6 max-w-[65ch]">
                {currentProject.summary}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-8">
                {currentProject.technologies.map((tech) => (
                  <TechTag key={tech.name} name={tech.name} />
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--color-border)]/70">
              <Link
                href={`/projects/${currentProject.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text)] hover:opacity-75 transition-opacity"
              >
                <span>Read project overview</span>
                <ArrowRight size={16} weight="bold" />
              </Link>

              {currentProject.links && currentProject.links.length > 0 && (
                <div className="flex items-center gap-4">
                  {currentProject.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight size={14} weight="regular" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
