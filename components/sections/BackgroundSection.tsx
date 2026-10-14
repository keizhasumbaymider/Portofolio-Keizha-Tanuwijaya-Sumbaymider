"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/content/background";

gsap.registerPlugin(ScrollTrigger);

const courseworkList = [
  "Data Structures & Algorithm Analysis",
  "Object-Oriented Software Engineering",
  "Computer Networks & Protocols",
  "Database Systems & Query Optimization",
  "Machine Learning & Computer Vision Application",
];

export function BackgroundSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(watermarkRef.current, {
        y: -100,
        x: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.from(".edu-header-block", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".edu-card-container", {
        opacity: 0,
        y: 60,
        scale: 0.96,
        duration: 1.2,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".edu-card-container",
          start: "top 80%",
        },
      });

      gsap.fromTo(
        ".edu-coursework-item",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reset",
          },
        }
      );

      const courseItems = gsap.utils.toArray<HTMLElement>(".edu-coursework-item");
      courseItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            scale: 1.05,
            x: 8,
            duration: 0.3,
            ease: "back.out(1.7)",
          });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            scale: 1,
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      gsap.to(".edu-floating-glow", {
        y: -30,
        x: 40,
        scale: 1.2,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="background"
      className="relative bg-[#0e0e10] text-[#f4f4f1] px-6 sm:px-12 lg:px-24 py-28 overflow-hidden border-t border-white/5"
    >
      {/* Background Watermark with red hint */}
      <div
        ref={watermarkRef}
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 select-none font-bold text-[clamp(6rem,18vw,18rem)] tracking-tighter text-white/[0.025] blur-[3px]"
        aria-hidden="true"
      >
        EDUCATION
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="edu-header-block flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#aeb8b0] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
              <span>03 // Academic Career</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
              Education &amp; Background
            </h2>
          </div>
          <span className="font-mono text-xs text-white/40">
            BINUS University · 2024 - 2028
          </span>
        </div>

        {/* Education Timeline Card */}
        <div className="edu-card-container rounded-3xl border border-white/10 bg-[#141416]/90 p-8 sm:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          <div className="edu-floating-glow pointer-events-none absolute -right-32 -top-32 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" aria-hidden="true" />
          {/* Subtle top red glow bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-transparent" />

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-8 border-b border-white/10">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#DC2626]">
                Bachelor of Computer Science
              </span>
              <h3 className="text-3xl sm:text-4xl font-semibold text-white mt-4">
                {education.institution}
              </h3>
              <p className="font-mono text-base text-[#aeb8b0] mt-1">
                Major in {education.field}
              </p>
            </div>

            <div className="flex flex-col sm:items-end font-mono text-xs text-white/50 space-y-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white/80">
                Expected Graduation: 2028
              </div>
              <p className="text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Undergraduate
              </p>
            </div>
          </div>

          <div className="pt-8">
            <p className="font-mono text-xs uppercase tracking-wider text-white/50 mb-4">
              Curriculum &amp; Verified Coursework
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
              {courseworkList.map((course, idx) => (
                <div
                  key={course}
                  className="edu-coursework-item flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/8 hover:border-red-900/40 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <span className="text-[#DC2626] font-bold">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/85">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
