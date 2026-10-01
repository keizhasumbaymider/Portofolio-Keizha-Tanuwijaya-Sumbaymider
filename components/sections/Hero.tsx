"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="min-h-[100dvh] pt-24 pb-16 px-6 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="lg:col-span-8 flex flex-col items-start"
        >
          <div className="mb-4 inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden="true"
            />
            Software Engineering · BINUS University
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[var(--color-text)] leading-[1.05] mb-6">
            {site.fullName}
          </h1>

          <p className="text-lg sm:text-xl text-[var(--color-text-muted)] font-light max-w-[55ch] leading-relaxed mb-8">
            {site.heroIntro ||
              "Undergraduate student exploring software engineering, machine learning systems, and deliberate interface design. Preparing for Semester 6 internship opportunities."}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-[var(--color-text)] text-[var(--color-bg)] font-medium text-sm hover:opacity-90 transition-opacity focus-visible:outline-2"
            >
              <span>View selected work</span>
              <ArrowDown size={16} weight="bold" aria-hidden="true" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded border border-[var(--color-border)] text-[var(--color-text)] font-normal text-sm hover:bg-[var(--color-surface)] transition-colors focus-visible:outline-2"
            >
              <span>Get in touch</span>
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Keizha's Real Portrait Photo */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="lg:col-span-4 flex justify-start lg:justify-end"
        >
          <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm group">
            <Image
              src="/images/portrait/keizha.jpg"
              alt="Keizha Tanuwijaya Sumbaymider"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-cover object-[center_22%] transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {/* Subtle soft gradient overlay at the bottom for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
              <p className="text-sm font-medium tracking-tight drop-shadow-sm">
                Keizha Tanuwijaya S.
              </p>
              <p className="text-xs font-mono text-neutral-300 drop-shadow-sm">
                Software Engineering · BINUS
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
