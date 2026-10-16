"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  "Software Engineer",
  "Front-End Developer",
  "UI/UX Designer",
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    const typingSpeed = isDeleting ? 45 : 85;

    const timer = setTimeout(() => {
      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 1700);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setText(
          isDeleting
            ? current.substring(0, text.length - 1)
            : current.substring(0, text.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(".hero-action-row a", { scale: 0.85, opacity: 0, y: 15 });

      tl.from(".hero-title-line", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
      })
        .from(
          ".hero-role-bar",
          {
            opacity: 0,
            scale: 0.94,
            y: 20,
            duration: 0.7,
            ease: "back.out(1.5)",
          },
          "-=0.5"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 25,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          ".hero-action-row a",
          {
            scale: 0.85,
            opacity: 0,
            y: 15,
            stagger: 0.1,
            duration: 0.65,
            ease: "back.out(1.8)",
          },
          "-=0.4"
        )
        .from(
          ".hero-social-pill",
          {
            opacity: 0,
            y: 12,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        );

      // Subtle parallax drift on background grid
      gsap.to(".hero-grid-bg", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Subtle floating ambient aura
      gsap.to(".hero-ambient-glow", {
        scale: 1.25,
        x: 40,
        y: -20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[100dvh] flex flex-col justify-between pt-36 pb-14 px-6 sm:px-12 lg:px-24 overflow-hidden border-b border-[#111114]/8"
    >
      {/* Background Matrix & Subtle Gradient */}
      <div
        className="hero-grid-bg pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(17,17,20,0.065)_1.5px,transparent_1.5px)] [background-size:36px_36px]"
        style={{
          maskImage: "radial-gradient(ellipse at center, white 45%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, white 45%, transparent 95%)",
        }}
      />

      {/* Ambient Red Glow in Background */}
      <div
        aria-hidden="true"
        className="hero-ambient-glow pointer-events-none absolute -top-40 right-1/4 w-[500px] h-[500px] bg-red-500/[0.04] rounded-full blur-3xl"
      />

      {/* Main Content Area: FULL-WIDTH CINEMATIC */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto flex flex-col items-start gap-8">
        {/* Large Editorial Headline (No Photo, Full Width Impact) */}
        <div className="space-y-2">
          <div className="hero-title-line flex items-center gap-3">
            <span className="h-px w-6 sm:w-10 bg-[#DC2626]/40" />
            <p className="font-mono text-base sm:text-xl lg:text-2xl font-bold tracking-[0.18em] uppercase text-[#DC2626]">
              Keizha Tanuwijaya Sumbaymider
            </p>
          </div>
          <h1 className="hero-title-line font-serif text-[clamp(3.8rem,9vw,9.5rem)] leading-[0.92] tracking-[-0.035em] text-[#111114]">
            Engineering <span className="italic font-normal">interfaces</span> <br className="hidden sm:inline" />
            with precision.
          </h1>
        </div>

        {/* Dynamic Typewriter Role */}
        <div className="hero-role-bar flex items-center min-h-[2.5rem] sm:min-h-[3rem] px-5 py-2 rounded-2xl bg-[#111114] text-[#f4f4f1] shadow-xl">
          <span className="font-mono text-xs text-[#DC2626] mr-3 font-semibold uppercase tracking-wider">
            Current Focus //
          </span>
          <p className="font-mono text-sm sm:text-base tracking-wide text-white">
            {text}
            <span className="ml-1 inline-block animate-cursor-blink text-[#DC2626]">
              █
            </span>
          </p>
        </div>

        {/* Concise Context Description */}
        <p className="hero-description text-base sm:text-xl text-[#111114]/70 max-w-3xl leading-relaxed font-light">
          Undergraduate Software Engineering student at <span className="text-[#111114] font-medium">BINUS University</span> interested in software engineering, front-end development, and creating intuitive user experiences through thoughtful UI/UX design.
        </p>

        {/* Actions & Links Bar */}
        <div className="hero-action-row flex flex-wrap items-center gap-4 pt-2">
           <a
             href="#projects"
             className="px-7 py-3.5 rounded-full bg-[#111114] hover:bg-[#DC2626] text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 will-change-transform"
             style={{ transform: "scale(0.85)", opacity: 0 }}
           >
            Explore Projects ↓
          </a>

          {site.cvPath && (
             <a
               href={site.cvPath}
               target="_blank"
               rel="noopener noreferrer"
               className="px-7 py-3.5 rounded-full border border-[#111114]/20 bg-white/60 hover:bg-[#111114] hover:text-white text-[#111114] font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-sm hover:-translate-y-0.5 will-change-transform"
               style={{ transform: "scale(0.85)", opacity: 0 }}
             >
              Curriculum Vitae ↗
            </a>
          )}

           <a
             href="#contact"
             className="px-6 py-3.5 rounded-full border border-transparent hover:border-[#111114]/20 text-[#111114]/70 hover:text-[#111114] font-mono text-xs uppercase tracking-widest transition-colors will-change-transform"
             style={{ transform: "scale(0.85)", opacity: 0 }}
           >
            Get In Touch →
          </a>
        </div>
      </div>

      {/* Bottom Bar: Social Pills + Scroll Prompt */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#111114]/10 text-xs font-mono text-[#111114]/55">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[#111114]/40 uppercase tracking-wider text-[10px]">
            Connect:
          </span>
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-pill hover:text-[#DC2626] transition-colors"
            >
              GitHub ↗
            </a>
          )}
          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-pill hover:text-[#DC2626] transition-colors"
            >
              LinkedIn ↗
            </a>
          )}
          <a
            href="mailto:keizhasumbaymider@gmail.com"
            className="hero-social-pill hover:text-[#DC2626] transition-colors"
          >
            Email ↗
          </a>
        </div>

        <div className="flex items-center gap-2 text-[#111114]/60">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
          <span className="uppercase tracking-widest text-[11px]">Scroll to navigate</span>
        </div>
      </div>
    </section>
  );
}
