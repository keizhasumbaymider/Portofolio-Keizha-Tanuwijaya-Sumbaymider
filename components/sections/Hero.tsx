"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { fadeUpVariants, staggerContainer } from "@/lib/motion";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="min-h-[100dvh] pt-24 pb-16 px-6 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <motion.div
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial={shouldReduceMotion ? "visible" : "hidden"}
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-8 flex flex-col items-start">
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="mb-4 inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden="true"
            />
            Software Engineering · BINUS University
          </motion.div>

          <motion.h1
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[var(--color-text)] leading-[1.05] mb-6"
          >
            {site.fullName}
          </motion.h1>

          <motion.p
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="text-lg sm:text-xl text-[var(--color-text-muted)] font-light max-w-[55ch] leading-relaxed mb-8"
          >
            {site.heroIntro ||
              "Undergraduate student exploring software engineering, machine learning systems, and deliberate interface design. Preparing for Semester 6 internship opportunities."}
          </motion.p>

          <motion.div
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="flex flex-wrap items-center gap-4"
          >
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
          </motion.div>
        </div>

        {/* Right Column: Portrait Photo with Next.js Image */}
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          className="lg:col-span-4 flex justify-start lg:justify-end"
        >
          <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm group">
            <Image
              src="/images/portrait/keizha.jpg"
              alt="Keizha Tanuwijaya Sumbaymider"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 320px"
              className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
            />
            {/* Subtle gradient vignette at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-3 left-4 right-4 text-white pointer-events-none">
              <p className="text-xs font-mono font-medium tracking-tight">
                Keizha Tanuwijaya S.
              </p>
              <p className="text-[10px] font-mono text-neutral-300">
                Jakarta, Indonesia
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
