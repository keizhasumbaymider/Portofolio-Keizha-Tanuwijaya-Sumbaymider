"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/content/site";

const HELLO_WORDS = [
  "Hello",
  "Halo",
  "Ciao",
  "Namaste",
  "Bonjour",
  "Olá",
  "Привет",
  "Konnichiwa",
  "Hola",
  "Guten Tag",
  "你好",
  "안녕하세요",
  "مرحبا",
  "Hej",
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const navButtonsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
  const isAnimating = useRef(false);
  const isText1Active = useRef(true);
  const wordIndex = useRef(0);

  // Entrance animation for navigation bar
  useEffect(() => {
    if (navContainerRef.current) {
      gsap.fromTo(
        navContainerRef.current,
        { y: -30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  // 3D rolling slot-machine GSAP animation for greetings
  const cycleHello = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const currentEl = isText1Active.current ? text1Ref.current : text2Ref.current;
    const nextEl = isText1Active.current ? text2Ref.current : text1Ref.current;
    if (!currentEl || !nextEl) {
      isAnimating.current = false;
      return;
    }

    wordIndex.current = (wordIndex.current + 1) % HELLO_WORDS.length;
    nextEl.textContent = HELLO_WORDS[wordIndex.current];

    const tl = gsap.timeline({
      onComplete: () => {
        isText1Active.current = !isText1Active.current;
        isAnimating.current = false;
      },
    });

    tl.to(currentEl, {
      yPercent: -120,
      opacity: 0,
      rotateX: 70,
      filter: "blur(3px)",
      duration: 0.45,
      ease: "power2.in",
    }).fromTo(
      nextEl,
      {
        yPercent: 120,
        opacity: 0,
        rotateX: -70,
        filter: "blur(3px)",
      },
      {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.2"
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      cycleHello();
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["home", "about", "background", "projects", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    
    const button = navButtonsRef.current.get(id);
    if (button) {
      const ripple = document.createElement("span");
      ripple.className = "absolute inset-0 rounded-full pointer-events-none";
      ripple.style.background = "radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)";
      ripple.style.transform = "scale(0)";
      button.appendChild(ripple);

      gsap.timeline({
        onComplete: () => ripple.remove(),
      })
        .fromTo(
          ripple,
          { scale: 0, opacity: 1 },
          { scale: 2.5, opacity: 0, duration: 0.6, ease: "power2.out" }
        )
        .to(
          button,
          {
            scale: 1.15,
            duration: 0.15,
            ease: "power2.out",
          },
          0
        )
        .to(
          button,
          {
            yoyo: true,
            repeat: 1,
            y: -2,
            duration: 0.08,
            ease: "power1.inOut",
          },
          0.1
        )
        .to(
          button,
          {
            scale: 1,
            duration: 0.25,
            ease: "elastic.out(1, 0.5)",
          },
          0.3
        );
    }

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "background", label: "Background" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center p-4 sm:p-6 transition-all duration-300">
      <div
        ref={navContainerRef}
        className={`pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-[#141416]/90 backdrop-blur-xl border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.25)] text-white"
            : "bg-white/80 backdrop-blur-md border-[#111114]/12 shadow-[0_8px_24px_rgba(0,0,0,0.06)] text-[#111114]"
        }`}
      >
        {/* Brand Hello Rotating Text with 3D roll */}
        <button
          onClick={() => {
            scrollTo("home");
            cycleHello();
          }}
          className="relative group flex items-center justify-center px-4 py-2 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ perspective: "400px" }}
          aria-label="Scroll to top"
        >
          <div className="relative h-4 w-24 overflow-hidden flex items-center justify-center pointer-events-none">
            <span
              ref={text1Ref}
              className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold tracking-wider uppercase text-[#DC2626]"
            >
              {HELLO_WORDS[0]}
            </span>
            <span
              ref={text2Ref}
              className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold tracking-wider uppercase text-[#DC2626] opacity-0"
            >
              {HELLO_WORDS[1]}
            </span>
          </div>
        </button>

        {/* Desktop Navigation links with animated pill indicator */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  if (el) navButtonsRef.current.set(item.id, el);
                }}
                onClick={() => scrollTo(item.id)}
                className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  isActive
                    ? scrolled
                      ? "bg-white text-[#111114] shadow-sm"
                      : "bg-[#111114] text-white shadow-sm"
                    : scrolled
                    ? "text-white/60 hover:text-white hover:bg-white/10"
                    : "text-[#111114]/65 hover:text-[#111114] hover:bg-[#111114]/8"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button: CV */}
        {site.cvPath && (
          <a
            href={site.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 ml-2 px-4 py-2 rounded-full bg-[#DC2626] hover:bg-[#EF4444] text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-sm"
          >
            <span>CV</span>
            <span className="text-[10px]">↗</span>
          </a>
        )}

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden flex items-center justify-center px-4 py-2 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
            scrolled ? "bg-white/10 text-white" : "bg-[#111114]/8 text-[#111114]"
          }`}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[76px] bg-[#0d0d0f]/95 backdrop-blur-2xl z-40 p-8 flex flex-col justify-between md:hidden border-t border-white/10 pointer-events-auto">
          <div className="flex flex-col gap-5 pt-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#aeb8b0]">
              Navigation
            </span>
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex items-center justify-between text-left text-3xl font-serif text-[#f4f4f1] hover:text-[#DC2626] transition-colors py-2 border-b border-white/8"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-white/40">
                  0{index + 1}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-8 flex flex-col gap-4 border-t border-white/10 font-mono text-xs text-white/60">
            <div className="flex items-center justify-between">
              <span>Jakarta, UTC+7</span>
              <span className="text-emerald-400">● Available for Work</span>
            </div>
            {site.cvPath && (
              <a
                href={site.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 text-center rounded-xl bg-[#DC2626] text-white font-medium"
              >
                Download Resume PDF
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
