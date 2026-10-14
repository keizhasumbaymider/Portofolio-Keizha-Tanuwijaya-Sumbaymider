"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/types/project";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Watermark Parallax Drift
      gsap.to(watermarkRef.current, {
        y: -110,
        x: 40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Fast, responsive project card reveal
      const cards = gsap.utils.toArray<HTMLElement>(".project-display-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reset",
            },
          }
        );

        const img = card.querySelector(".project-image");
        if (img) {
          gsap.to(img, {
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        card.addEventListener("mouseenter", () => {
          gsap.to(card, { rotationY: 2, rotationX: -1, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.4, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-20 rounded-t-[3rem] bg-[#f7f7f5] text-[#111114] px-6 sm:px-12 lg:px-24 py-28 shadow-[0_-30px_70px_rgba(0,0,0,0.18)] -mt-10 overflow-hidden"
    >
      {/* Background Watermark */}
      <div
        ref={watermarkRef}
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 select-none font-bold text-[clamp(6rem,20vw,20rem)] tracking-tighter text-[#111114]/[0.03] blur-[3px]"
        aria-hidden="true"
      >
        PORTFOLIO
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#111114]/12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#111114]/60 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
              <span>04 // Selected Works</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif tracking-tight text-[#111114]">
              Featured <span className="italic">projects.</span>
            </h2>
          </div>
          <span className="font-mono text-xs text-[#111114]/60">
            {projects.length} Case Studies Published
          </span>
        </div>

        {/* Project List */}
        <div className="space-y-24">
          {projects.map((project, idx) => {
            const indexStr = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={project.slug}
                className="project-display-card group rounded-3xl border border-[#111114]/12 bg-white p-6 sm:p-10 shadow-lg hover:shadow-2xl hover:border-red-500/30 transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Media Browser Mockup */}
                  <div className="lg:col-span-7">
                    {project.media?.[0] && (
                      <div className="rounded-2xl overflow-hidden border border-[#111114]/12 bg-[#0b0b0d] shadow-md group-hover:scale-[1.015] transition-transform duration-500">
                        {/* Browser Topbar */}
                        <div className="px-4 py-2.5 bg-[#171719] border-b border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          </div>
                          <span className="truncate max-w-[200px] text-[10px]">
                            {project.links?.[0]?.url ?? project.slug}
                          </span>
                          <span className="text-emerald-400 text-[10px]">● {project.status}</span>
                        </div>

                        {/* Image */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                          <Image
                            src={project.media[0].src}
                            alt={project.media[0].alt}
                            fill
                            className="project-image object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 640px"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Project Details */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center justify-between font-mono text-xs text-[#111114]/50 mb-3">
                        <span className="font-bold text-[#DC2626]">
                          PROJ // {indexStr}
                        </span>
                        <span className="capitalize">{project.type} Project</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111114] group-hover:text-[#DC2626] transition-colors">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm text-[#111114]/70 leading-relaxed font-light">
                        {project.summary}
                      </p>
                    </div>

                    {/* Scope & Highlights */}
                    <div className="space-y-2 border-t border-[#111114]/10 pt-4">
                      <p className="font-mono text-[0.65rem] uppercase tracking-wider text-[#111114]/50">
                        Technical Highlights
                      </p>
                      <ul className="space-y-1.5 font-mono text-xs text-[#111114]/85">
                        <li className="flex items-start gap-2">
                          <span className="text-[#DC2626] font-bold">●</span>
                          <span>{project.description.slice(0, 110)}...</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#DC2626] font-bold">●</span>
                          <span>
                            Tech Stack: {project.technologies.slice(0, 4).map((t) => t.name).join(", ")}
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <span
                          key={t.name}
                          className="px-2.5 py-1 rounded-md bg-[#111114]/5 text-[11px] font-mono text-[#111114]/75 border border-[#111114]/10 hover:border-[#111114]/30 transition-colors"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-[#111114]/10 font-mono text-xs">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="px-5 py-2.5 rounded-full bg-[#111114] text-[#f4f4f1] hover:bg-[#DC2626] transition-all hover:scale-105"
                      >
                        Project Details →
                      </Link>

                      {project.links?.[0] && (
                        <a
                          href={project.links[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-full border border-[#111114]/20 hover:border-[#111114] text-[#111114] transition-all hover:scale-105"
                        >
                          Live Preview ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
