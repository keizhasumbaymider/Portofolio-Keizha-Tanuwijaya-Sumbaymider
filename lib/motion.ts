import type { Transition, Variants } from "motion/react";

export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  xslow: 0.6,
} as const;

export const ease = {
  default: [0.4, 0, 0.2, 1] as [number, number, number, number],
  out: [0, 0, 0.2, 1] as [number, number, number, number],
  in: [0.4, 0, 1, 1] as [number, number, number, number],
} as const;

export const transition = {
  fast: { duration: duration.fast, ease: ease.default } satisfies Transition,
  base: { duration: duration.base, ease: ease.default } satisfies Transition,
  slow: { duration: duration.slow, ease: ease.out } satisfies Transition,
  reveal: { duration: duration.slow, ease: ease.out } satisfies Transition,
} as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const sheetVariants: Variants = {
  inactive: { opacity: 0.6, y: 8, scale: 0.98 },
  active: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.99 },
};
