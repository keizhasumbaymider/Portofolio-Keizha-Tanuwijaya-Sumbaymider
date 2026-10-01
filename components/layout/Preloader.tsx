"use client";

import { useEffect, useState, useMemo, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete?: () => void;
}

function subscribeToResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getWindowDimensions() {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }
  return { width: window.innerWidth, height: window.innerHeight };
}

function getServerDimensions() {
  return { width: 0, height: 0 };
}

export function Preloader({ onComplete }: PreloaderProps) {
  const words = useMemo(
    () => [
      "Hello",
      "Halo",
      "Bonjour",
      "안녕하세요",
      "Привет",
      "Ciao",
      "Hola",
      "こんにちは",
      "Hello",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const dimension = useSyncExternalStore(
    subscribeToResize,
    getWindowDimensions,
    getServerDimensions
  );

  useEffect(() => {
    if (index === words.length - 1) {
      // Pause slightly on the final word "Hello" then trigger the upward curve exit
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 350);

      const finishTimer = setTimeout(() => {
        setIsFinished(true);
        onComplete?.();
      }, 1300);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(finishTimer);
      };
    }

    const intervalTimer = setTimeout(
      () => {
        setIndex((prev) => prev + 1);
      },
      index === 0 ? 300 : 160
    );

    return () => clearTimeout(intervalTimer);
  }, [index, words.length, onComplete]);

  if (isFinished) return null;

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={isExiting ? { y: "-100%" } : { y: 0 }}
      transition={{
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2,
      }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{ isolation: "isolate" }}
    >
      {/* Central Multilingual Greeting Text */}
      <div className="relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isExiting ? (
            <motion.p
              key={words[index]}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex items-center gap-3 text-3xl sm:text-5xl md:text-6xl font-mono font-medium tracking-tight text-white select-none"
            >
              <span
                className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"
                aria-hidden="true"
              />
              <span>{words[index]}</span>
            </motion.p>
          ) : (
            /* Fluid transition moving towards the navbar position on exit */
            <motion.p
              key="exit-to-nav"
              initial={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: -Math.max(20, dimension.width / 2 - 80),
                y: -Math.max(20, dimension.height / 2 - 32),
                scale: 0.35,
                opacity: 0,
              }}
              transition={{
                duration: 0.75,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="flex items-center gap-2 text-4xl sm:text-6xl font-mono text-white select-none pointer-events-none"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Hello</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* SVG Curved Liquid Curtain */}
      {dimension.width > 0 && (
        <svg
          className="absolute top-0 left-0 w-full h-[calc(100%+300px)] pointer-events-none"
          viewBox={`0 0 ${dimension.width} ${dimension.height + 300}`}
          preserveAspectRatio="none"
        >
          <motion.path
            fill="#121214"
            initial={{ d: initialPath }}
            animate={
              isExiting
                ? {
                    d: targetPath,
                    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
                  }
                : { d: initialPath }
            }
          />
        </svg>
      )}
    </motion.div>
  );
}
