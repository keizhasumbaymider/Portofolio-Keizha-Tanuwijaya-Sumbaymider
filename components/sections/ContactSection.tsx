"use client";

import { site } from "@/content/site";
import { CopyButton } from "@/components/ui/CopyButton";
import { useGoldPointer } from "@/components/ui/useGoldPointer";
import { ArrowUpRight } from "@phosphor-icons/react";

export function ContactSection() {
  const displayEmail = site.email || "keizhasumbaymider@gmail.com";
  const github = site.github || "https://github.com/keizhasumbaymider";
  const linkedin =
    site.linkedin || "https://www.linkedin.com/in/keizha-sumbaymider/";
  const { gradientRef, handlePointerMove, handlePointerLeave } =
    useGoldPointer<HTMLHeadingElement>();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#050505] px-6 pb-16 pt-12 text-white sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid w-full min-w-0 grid-cols-1 max-w-[1440px] items-center gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
        <div className="flex min-w-0 flex-col justify-center">
          <span className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-neutral-400">
            Initiate Contact
          </span>

          <h2
            id="contact-heading"
            onPointerEnter={handlePointerMove}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="relative max-w-[760px] text-[1.8rem] font-medium leading-[0.8] tracking-[-0.065em] text-white sm:text-[2.7rem] md:text-[3.5rem] lg:text-[4.2rem]"
            style={{ fontFamily: "'Iowan Old Style', 'Georgia', serif" }}
          >
            Looking for an
            <span className="mt-1 block">engineering intern with</span>
            <span className="mt-1 block">an eye for craft?</span>
            <span
              ref={gradientRef}
              aria-hidden="true"
              className="hero-name-gold-gradient hero-name-gold-gradient--compact pointer-events-none absolute inset-0 bg-clip-text text-transparent"
            >
              Looking for an
              <span className="mt-1 block">engineering intern with</span>
              <span className="mt-1 block">an eye for craft?</span>
            </span>
          </h2>

          <p className="mt-6 max-w-[700px] text-base leading-[1.45] text-neutral-300 sm:text-[1rem] sm:leading-[1.]">
            Open for technical discussions, engineering internship roles, and
            software collaboration. Let&apos;s build durable, well-reasoned
            systems together.
          </p>
        </div>

        <div className="w-full min-w-0 max-w-[500px] justify-self-end">
          <div className="rounded-[18px] border border-white/10 bg-[#1a1a1a] p-3 shadow-[0_18px_48px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-neutral-300">
                Official transmission
              </span>
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-neutral-300">
                Jakarta UTC+7
              </span>
            </div>

            <div className="mt-4 rounded-[5px] border border-white/10 bg-[#f2f2f0] p-2 text-[#0d0d0d] shadow-inner sm:p-3.5">
              <div className="flex items-center justify-between gap-1 sm:gap-2">
                <span className="min-w-0 flex-1 break-all text-[0.58rem] font-bold uppercase tracking-[0.04em] text-neutral-700 sm:text-[0.72rem] sm:tracking-[0.14em]">
                  {displayEmail}
                </span>
                <CopyButton textToCopy={displayEmail} label="" iconOnly />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-between rounded-[9px] border border-white/10 bg-[#2a2a2a] px-3.5 py-3 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#333333]"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
              </a>

              <a
                href={github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-between rounded-[9px] border border-white/10 bg-[#2a2a2a] px-3.5 py-3 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#333333]"
              >
                <span>Github</span>
                <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-4 flex items-center justify-end border-t border-white/10 pt-3 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-neutral-300">
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.15em] text-neutral-200">
                <span className="h-2 w-2 rounded-full bg-[#1ead49] shadow-[0_0_12px_rgba(77,163,255,0.8)]" />
                +62 877 7070 7147
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
