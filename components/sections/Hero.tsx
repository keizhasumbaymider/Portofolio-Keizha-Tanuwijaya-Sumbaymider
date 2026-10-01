import Image from "next/image";
import { site } from "@/content/site";
import { ArrowDown, ArrowUpRight } from "@/components/ui/Icons";
import { AnimatedName } from "@/components/sections/AnimatedName";
import { HeroIntro } from "@/components/sections/HeroIntro";

export function Hero() {
  const heroIntro =
    site.heroIntro ||
    "Undergraduate student exploring software engineering, machine learning systems, and deliberate interface design. Preparing for internship opportunities.";

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="min-h-[100dvh] pt-28 pb-16 px-6 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-8 flex flex-col items-start">
          <div className="mb-4 inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden="true"
            />
            Software Engineering · BINUS University
          </div>

          <p className="mb-1 text-sm sm:text-base font-medium tracking-[0.12em] uppercase text-[var(--color-text-muted)] leading-none">
            Hi, I&apos;m
          </p>

          <AnimatedName
            name={site.fullName}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--color-text)] leading-[0.95] mb-6"
          />

          <HeroIntro
            text={heroIntro}
            className="text-lg sm:text-xl text-[var(--color-text-muted)] font-normal max-w-[55ch] leading-relaxed mb-8"
          />

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-[var(--color-text)] text-[var(--color-bg)] font-medium text-sm hover:opacity-90 transition-opacity focus-visible:outline-2"
            >
              <span>View selected projects</span>
              <ArrowDown size={16} weight="bold" aria-hidden="true" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded border border-[var(--color-border)] text-[var(--color-text)] font-normal text-sm hover:bg-[var(--color-surface)] transition-colors focus-visible:outline-2"
            >
              <span>Get in touch</span>
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
            </a>

            <a
              href={
                site.cvPath || "/cv/CV%20Keizha%20Tanuwijaya%20Sumbaymider.pdf"
              }
              target={site.cvPath ? "_blank" : undefined}
              rel={site.cvPath ? "noreferrer noopener" : undefined}
              download={
                site.cvPath ? undefined : "CV Keizha Tanuwijaya Sumbaymider.pdf"
              }
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded border border-[var(--color-border)] text-[var(--color-text)] font-normal text-sm hover:bg-[var(--color-surface)] transition-colors focus-visible:outline-2"
            >
              <span>Download CV</span>
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Right Column: Keizha's Real Portrait Photo */}
        <div className="lg:col-span-4 flex justify-start lg:justify-end">
          <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm group">
            <Image
              src="/images/portrait/Keizha Foto.jpeg"
              alt="Keizha Tanuwijaya Sumbaymider"
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {/* Soft gradient overlay at the bottom for caption contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
              <p className="text-sm font-medium tracking-tight drop-shadow-sm">
                Keizha Tanuwijaya S.
              </p>
              <p className="text-xs font-mono text-neutral-300 drop-shadow-sm">
                Software Engineering · BINUS University
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
