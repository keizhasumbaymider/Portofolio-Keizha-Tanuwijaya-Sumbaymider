"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUpVariants, transition } from "@/lib/motion";

export function ScrollReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.12 }}
      transition={{ ...transition.reveal, duration: 1.2 }}
    >
      {children}
    </motion.div>
  );
}