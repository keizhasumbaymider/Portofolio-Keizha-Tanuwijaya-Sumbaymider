"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const email = site.email ?? "keizhasumbaymider@gmail.com";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Watermark floating parallax
      gsap.to(watermarkRef.current, {
        y: -90,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // 2. Header block reveal with stagger
      gsap.from(".contact-header-text", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // 3. Contact Card entrance with smooth bounce
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.7,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 75%",
        },
      });

      // 4. Row-by-row stagger reveal inside card
      const rows = gsap.utils.toArray<HTMLElement>(".contact-row");
      rows.forEach((row, i) => {
        gsap.from(row, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: 0.2 + i * 0.1,
          ease: "power2.out",
        });
      });

      // 5. Hover effects on contact links
      const links = gsap.utils.toArray<HTMLElement>(".contact-link");
      links.forEach((link) => {
        const onEnter = () => {
          gsap.to(link, { scale: 1.04, color: "#DC2626", duration: 0.3, ease: "back.out(1.7)" });
        };
        const onLeave = () => {
          gsap.to(link, { scale: 1, color: "inherit", duration: 0.3 });
        };

        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("mouseleave", onLeave);

        return () => {
          link.removeEventListener("mouseenter", onEnter);
          link.removeEventListener("mouseleave", onLeave);
        };
      });

      gsap.to(".contact-glow-pulse", {
        scale: 1.3,
        opacity: 0.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-30 bg-[#0d0d0f] text-[#f4f4f1] px-6 sm:px-12 lg:px-24 py-28 sm:py-36 overflow-hidden border-t border-white/5"
    >
      {/* Background Watermark */}
      <div
        ref={watermarkRef}
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 select-none font-bold text-[clamp(6rem,22vw,22rem)] tracking-tighter text-white/[0.025] blur-[3px]"
        aria-hidden="true"
      >
        CONNECT
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Header Text */}
        <div className="contact-header-text text-center max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#aeb8b0]">
            <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
            <span>05 // Let&apos;s Build Together</span>
          </div>

          <h2
            id="contact-heading"
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold tracking-tight text-white leading-[1.02]"
          >
            Let&apos;s build something <br />
            <span className="font-serif italic font-normal text-[#DC2626]">
              remarkable together.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/60 font-light max-w-xl mx-auto leading-relaxed">
            Open for technical discussions, software engineering internships, and product collaborations. Let&apos;s create durable systems together.
          </p>
        </div>

        {/* ALL-IN-ONE UNIFIED CONTACT CARD */}
        <div
          ref={cardRef}
          className="w-full rounded-[2.5rem] border border-white/12 bg-gradient-to-b from-[#18181c] via-[#121215] to-[#0c0c0e] p-8 sm:p-14 shadow-[0_24px_80px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-xl group hover:border-white/25 transition-all duration-500"
        >
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-[#DC2626] to-transparent" />

          {/* Ambient card background glow */}
          <div
             aria-hidden="true"
             className="contact-glow-pulse pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl"
           />

          <div className="relative z-10 flex flex-col gap-10">
            {/* Row 1: Direct Mail + Copy Button in one action unit */}
            <div className="contact-row flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-white/40 block mb-2">
                  Direct Mailbox
                </span>
                <a
                  href={`mailto:${email}`}
                  className="contact-link text-lg sm:text-xl lg:text-2xl font-mono font-medium text-white hover:text-[#DC2626] transition-colors whitespace-nowrap overflow-hidden text-ellipsis block"
                >
                  {email}
                </a>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleCopyEmail}
                  className="px-5 py-3 rounded-2xl border border-white/15 bg-white/[0.05] hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <span>Copy Address</span>
                      <span className="text-white/40 text-[10px]">⧉</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${email}`}
                  className="px-6 py-3 rounded-2xl bg-[#DC2626] hover:bg-[#EF4444] text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-red-950/50 flex items-center gap-2"
                >
                  <span>Send Mail</span>
                  <span className="text-sm">↗</span>
                </a>
              </div>
            </div>

            {/* Row 2: Grid of verified details within the card */}
            <div className="contact-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* LinkedIn */}
              {site.linkedin && (
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 group/link flex flex-col justify-between h-28"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                      LinkedIn
                    </span>
                    <span className="text-white/30 group-hover/link:text-[#DC2626] transition-colors">
                      ↗
                    </span>
                  </div>
                  <span className="text-sm font-medium text-white truncate">
                    Keizha Sumbaymider
                  </span>
                </a>
              )}

              {/* GitHub */}
              {site.github && (
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 group/link flex flex-col justify-between h-28"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                      GitHub
                    </span>
                    <span className="text-white/30 group-hover/link:text-[#DC2626] transition-colors">
                      ↗
                    </span>
                  </div>
                  <span className="text-sm font-medium text-white truncate">
                    @keizhasumbaymider
                  </span>
                </a>
              )}

              {/* Phone */}
              <a
                href="tel:+6287770707147"
                className="contact-link p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 group/link flex flex-col justify-between h-28"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                    Phone &amp; WA
                  </span>
                  <span className="text-white/30 group-hover/link:text-[#DC2626] transition-colors">
                    ↗
                  </span>
                </div>
                <span className="text-sm font-medium text-white">
                  +62 877 7070 7147
                </span>
              </a>

              {/* CV Download */}
              {site.cvPath && (
                <a
                  href={site.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link p-5 rounded-2xl bg-red-950/20 border border-red-800/30 hover:border-red-600/50 hover:bg-red-950/40 transition-all duration-300 group/link flex flex-col justify-between h-28"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-red-400">
                      Curriculum Vitae
                    </span>
                    <span className="text-red-400">↓</span>
                  </div>
                  <span className="text-sm font-medium text-white">
                    Download PDF Document
                  </span>
                </a>
              )}
            </div>

            {/* Row 3: Card Status Footer info */}
            <div className="contact-row pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-white/45">
              <div>© {new Date().getFullYear()} {site.fullName}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
