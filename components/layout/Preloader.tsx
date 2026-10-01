"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete?: () => void;
}

function getWindowDimensions() {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }
  return { width: window.innerWidth, height: window.innerHeight };
}

export function Preloader({ onComplete }: PreloaderProps) {
  const words = useMemo(
    () => [
      "Halo",
      "你好",
      "Hola",
      "Bonjour",
      "Привет",
      "こんにちは",
      "مرحبا",
      "안녕하세요",
      "Ciao",
      "Здравствуйте",
      "Hello",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimension(getWindowDimensions());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      // Pause slightly on the final word "Hello" then trigger the upward curve exit
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 500);

      const finishTimer = setTimeout(() => {
        setIsFinished(true);
        onComplete?.();
      }, 2600);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(finishTimer);
      };
    }

    const intervalTimer = setTimeout(
      () => {
        setIndex((prev) => prev + 1);
      },
      index === 0 ? 500 : 260
    );

    return () => clearTimeout(intervalTimer);
  }, [index, words.length, onComplete]);

  if (isFinished) return null;

  const navbarRevealX = 78;
  const navbarRevealY = 48;
  const exitX = -Math.max(240, dimension.width * 0.28) + navbarRevealX;
  const exitY = -Math.max(170, dimension.height * 0.2) + navbarRevealY;

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={isExiting ? { y: "-100%" } : { y: 0 }}
      transition={{
        duration: 1.3,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.35,
      }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{ isolation: "isolate" }}
    >
      {/* Central Multilingual Greeting Text */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5, scale: 0.96 }}
          animate={{ opacity: isExiting ? 0.2 : 1, scale: isExiting ? 0.96 : 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {!isExiting ? (
              <motion.p
                key={words[index]}
                initial={{ opacity: 0, y: 14, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(2px)" }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 text-3xl sm:text-5xl md:text-6xl font-mono font-medium tracking-tight text-white select-none drop-shadow-[0_0_18px_rgba(52,211,153,0.25)]"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_18px_rgba(52,211,153,0.9)]"
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
                  filter: "blur(0px)",
                  rotate: 0,
                }}
                animate={{
                  x: exitX,
                  y: exitY,
                  scale: 0.28,
                  opacity: 0,
                  filter: "blur(1.5px)",
                  rotate: -7,
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: `${navbarRevealX}px ${navbarRevealY}px` }}
                className="flex items-center gap-2 text-4xl sm:text-6xl font-mono text-white select-none pointer-events-none drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
                <span>Hello</span>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* SVG Curved Liquid Curtain */}
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
                  opacity: 0.94,
                  transition: { duration: 1.45, ease: [0.22, 1, 0.36, 1] },
                }
              : { d: initialPath, opacity: 1 }
          }
        />
      </svg>
    </motion.div>
  );
}
