"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useGoldPointer } from "@/components/ui/useGoldPointer";

interface AnimatedNameProps {
  name: string;
  className: string;
}

export function AnimatedName({ name, className }: AnimatedNameProps) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(headingRef);
  const { gradientRef, handlePointerMove, handlePointerLeave } =
    useGoldPointer<HTMLHeadingElement>();

  useEffect(() => {
    if (!name) return;

    if (!isInView) {
      setVisibleCharacters(0);
      return;
    }

    const intervalDuration = 2500 / name.length;
    let interval: number;
    interval = window.setInterval(() => {
      setVisibleCharacters((currentCount) => {
        const nextCount = currentCount + 1;
        if (nextCount >= name.length) window.clearInterval(interval);
        return Math.min(nextCount, name.length);
      });
    }, intervalDuration);

    return () => window.clearInterval(interval);
  }, [isInView, name]);

  const displayedName = name.slice(0, visibleCharacters);
  const isTyping = visibleCharacters < name.length;

  return (
    <h1
      ref={headingRef}
      onPointerEnter={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
    >
      <span className="sr-only">{name}</span>
      <span aria-hidden="true" className="grid grid-cols-1">
        <span className="invisible col-start-1 row-start-1 select-none">
          {name}
        </span>
        <span className="relative col-start-1 row-start-1">
          {displayedName}
          {isTyping && (
            <span className="ml-1 inline-block h-[0.8em] w-[0.06em] animate-pulse bg-current align-[-0.05em] motion-reduce:animate-none" />
          )}
          <span
            ref={gradientRef}
            aria-hidden="true"
            className="hero-name-gold-gradient pointer-events-none absolute inset-0 bg-clip-text text-transparent"
          >
            {displayedName}
          </span>
        </span>
      </span>
    </h1>
  );
}
