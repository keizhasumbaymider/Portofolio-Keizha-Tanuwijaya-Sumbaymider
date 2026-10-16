"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups } from "@/content/skills";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const allSkills = skillGroups.flatMap((g) => g.skills);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Section tag entrance with bounce
      gsap.from(".about-section-tag", {
        opacity: 0,
        y: -20,
        duration: 1.5,
        ease: "back.out(1.8)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // 2. Watermark Parallax Drift + rotation
      gsap.to(watermarkRef.current, {
        y: -120,
        rotation: 2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // 3. Simple word-level reveal with smooth animation
      const words = gsap.utils.toArray<HTMLElement>(".about-word");
      words.forEach((word, idx) => {
        gsap.fromTo(
          word,
          { opacity: 0, y: 20, filter: "blur(3px)" },
          {
            opacity: word.classList.contains("highlight-word") ? 1 : 0.4,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
            delay: idx * 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 20%",
              toggleActions: "play none none reset",
            },
          }
        );
      });

      // 4. Seamless infinite marquee with micro-interactions
      if (marqueeRef.current) {
        const el = marqueeRef.current;
        const totalWidth = el.scrollWidth;
        const halfWidth = totalWidth / 2;

        const tween = gsap.fromTo(
          el,
          { x: 0 },
          {
            x: -halfWidth,
            duration: 30,
            ease: "none",
            repeat: -1,
          }
        );

        const onEnter = () => {
          gsap.to(tween, { timeScale: 0.2, duration: 0.6, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(tween, { timeScale: 1, duration: 0.6, ease: "power2.out" });
        };

        el.parentElement?.addEventListener("mouseenter", onEnter);
        el.parentElement?.addEventListener("mouseleave", onLeave);

        // Enhanced marquee item hover with ripple effect
        const marqueeItems = gsap.utils.toArray<HTMLElement>(".skill-marquee-item span:first-child");
        marqueeItems.forEach((item) => {
          item.addEventListener("mouseenter", () => {
            gsap.to(item, {
              color: "#DC2626",
              letterSpacing: "0.05em",
              duration: 0.3,
              ease: "power2.out",
            });
          });

          item.addEventListener("mouseleave", () => {
            gsap.to(item, {
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "0",
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });

        return () => {
          el.parentElement?.removeEventListener("mouseenter", onEnter);
          el.parentElement?.removeEventListener("mouseleave", onLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bioStatements = [
    { text: "I'm a", highlight: false },
    { text: "Computer Science", highlight: true },
    { text: "student at", highlight: false },
    { text: "BINUS University,", highlight: true },
    { text: "focusing on", highlight: false },
    { text: "Software Engineering", highlight: true },
    { text: "and modern digital products.", highlight: false },
    { text: "I combine", highlight: false },
    { text: "structured programming", highlight: false },
    { text: "with", highlight: false },
    { text: "deliberate UI/UX", highlight: true },
    { text: "to turn complex ideas", highlight: false },
    { text: "into", highlight: false },
    { text: "reliable, intuitive experiences.", highlight: true },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative flex flex-col items-center justify-center gap-16 bg-[#161618] text-[#f4f4f1] px-6 sm:px-12 lg:px-24 py-28 overflow-hidden"
    >
      <h2 id="about-heading" className="sr-only">
        About Keizha Tanuwijaya Sumbaymider
      </h2>

      {/* Background Watermark */}
      <div
        ref={watermarkRef}
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 select-none font-bold text-[clamp(6rem,20vw,20rem)] tracking-tighter text-white/[0.02] blur-[3px]"
        aria-hidden="true"
      >
        ABOUT
      </div>

      {/* Decorative top curved border separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

      {/* Section Tag */}
      <div className="about-section-tag flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#aeb8b0]">
        <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
        <span>02 // Philosophy &amp; Background</span>
      </div>

      {/* Interactive Statement */}
      <div className="max-w-5xl text-center font-sans text-[clamp(1.75rem,3.8vw,3.5rem)] leading-[1.28] tracking-[-0.03em] relative z-10">
        <p className="flex flex-wrap justify-center gap-x-[0.2em] gap-y-[0.3em]">
          {bioStatements.map((item, idx) => (
            <span
              key={idx}
              className={`about-word inline-block transition-colors ${
                item.highlight
                  ? "text-white font-semibold highlight-word"
                  : "text-white/40 font-normal"
              }`}
            >
              {item.text}
            </span>
          ))}
        </p>
      </div>

      {/* Infinite Tech Marquee placed right below Statement */}
      <div className="w-full border-y border-white/10 py-5 overflow-hidden relative z-10">
        <div className="flex overflow-hidden">
          <div ref={marqueeRef} className="flex shrink-0 items-center gap-8 will-change-transform">
            {[...allSkills, ...allSkills].map((skill, index) => (
               <div
                 key={`marquee-${skill.name}-${index}`}
                 className="skill-marquee-item flex items-center gap-8 shrink-0 cursor-default"
               >
                 <span className="text-lg sm:text-xl font-mono tracking-tight text-white/80">
                   {skill.name}
                 </span>
                <span className="text-sm text-[#DC2626]">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
