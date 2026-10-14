"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { skillGroups } from "@/content/skills";

export function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  const allSkills = skillGroups.flatMap((g) => g.skills);
  const half = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, half);
  const row2 = allSkills.slice(half);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !marquee1Ref.current || !marquee2Ref.current) return;

    const row1El = marquee1Ref.current;
    const row2El = marquee2Ref.current;

    const width1 = row1El.scrollWidth / 2;
    const width2 = row2El.scrollWidth / 2;

    const tl1 = gsap.to(row1El, {
      x: -width1,
      duration: 35,
      ease: "none",
      repeat: -1,
    });

    const tl2 = gsap.fromTo(
      row2El,
      { x: -width2 },
      {
        x: 0,
        duration: 40,
        ease: "none",
        repeat: -1,
      }
    );

      const skillItems = gsap.utils.toArray<HTMLElement>(".skill-item");
      skillItems.forEach((item, idx) => {
        const spark = item.querySelector(".spark-divider");

        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            scale: 1.15,
            opacity: 1,
            color: "#DC2626",
            duration: 0.3,
            ease: "back.out(1.8)",
            overwrite: "auto",
          });

          if (spark) {
            gsap.to(spark, {
              opacity: 1,
              scale: 1.4,
              textShadow: "0 0 20px rgba(220, 38, 38, 0.8)",
              duration: 0.3,
              ease: "back.out(1.8)",
            });
          }
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            scale: 1,
            opacity: idx % 2 === 0 ? 1 : 0.7,
            color: idx % 2 === 0 ? "#F5F5F5" : "#A3A3A3",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });

          if (spark) {
            gsap.to(spark, {
              opacity: idx % 2 === 0 ? 1 : 0.6,
              scale: 1,
              textShadow: "none",
              duration: 0.3,
            });
          }
        });

        gsap.fromTo(
          item,
          { opacity: 0.5, scale: 0.95 },
          {
            opacity: idx % 2 === 0 ? 1 : 0.7,
            scale: 1,
            duration: 0.6,
            delay: idx * 0.05,
            ease: "back.out(1.2)",
          }
        );
      });

    return () => {
      tl1.kill();
      tl2.kill();
      skillItems.forEach((item) => {
        item.removeEventListener("mouseenter", () => {});
        item.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="py-24 sm:py-32 border-t border-[#262626]/50 overflow-hidden bg-[#0D0D0D]"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12">
        <div className="flex items-center justify-between pb-4 border-b border-[#262626] font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            <span className="text-[#A3A3A3] uppercase tracking-wider">
              Skills & Technologies
            </span>
          </div>
          <span className="text-[#525252]">03 / 05</span>
        </div>
      </div>

      {/* Infinite Marquee Rows with ✦ spark divider like iqmal.dev */}
      <div className="space-y-3 sm:space-y-2">
        {/* Row 1 */}
        <div className="overflow-hidden flex">
          <div ref={marquee1Ref} className="flex shrink-0 items-center gap-8">
            {[...row1, ...row1, ...row1, ...row1].map((skill, index) => (
              <div
                key={`r1-${skill.name}-${index}`}
                className="skill-item flex items-center gap-8 shrink-0 cursor-default"
              >
                <span className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#F5F5F5] transition-all duration-300">
                  {skill.name}
                </span>
                <span className="spark-divider text-xl sm:text-2xl text-[#DC2626] transition-all duration-300">
                  ✦
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="overflow-hidden flex">
          <div ref={marquee2Ref} className="flex shrink-0 items-center gap-8">
            {[...row2, ...row2, ...row2, ...row2].map((skill, index) => (
              <div
                key={`r2-${skill.name}-${index}`}
                className="skill-item flex items-center gap-8 shrink-0 cursor-default"
              >
                <span className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#A3A3A3] transition-all duration-300">
                  {skill.name}
                </span>
                <span className="spark-divider text-xl sm:text-2xl text-[#DC2626]/60 transition-all duration-300">
                  ✦
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grouped overview cards below the marquee */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#404040] transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#DC2626]">
                {group.label}
              </h3>
              <span className="font-mono text-xs text-[#525252]">
                {group.skills.length} tools
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1.5 rounded-lg bg-[#1F1F1F] text-xs font-mono text-[#D4D4D4] border border-[#2B2B2B]"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
