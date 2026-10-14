"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Check inside a microtask/timer to avoid synchronous render warning
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && sessionStorage.getItem("preloaded")) {
        setHidden(true);
      }
    }, 0);

    const container = containerRef.current;
    const counter = counterRef.current;
    if (!container || !counter) return () => clearTimeout(timer);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      sessionStorage.setItem("preloaded", "1");
      const rTimer = setTimeout(() => setHidden(true), 0);
      return () => {
        clearTimeout(timer);
        clearTimeout(rTimer);
      };
    }

    document.body.style.overflow = "hidden";

    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("preloaded", "1");
        document.body.style.overflow = "";
        setHidden(true);
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        counter.textContent = Math.round(obj.val).toString();
      },
    })
      .to(
        container,
        {
          yPercent: -100,
          duration: 0.7,
          ease: "power3.inOut",
        },
        "+=0.2"
      );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-hidden="true"
    >
      <div className="flex items-baseline gap-1 font-mono">
        <span
          ref={counterRef}
          className="text-7xl sm:text-9xl font-medium tabular-nums"
          style={{ color: "var(--color-text)" }}
        >
          0
        </span>
        <span
          className="text-2xl sm:text-4xl"
          style={{ color: "var(--color-accent)" }}
        >
          %
        </span>
      </div>
    </div>
  );
}
