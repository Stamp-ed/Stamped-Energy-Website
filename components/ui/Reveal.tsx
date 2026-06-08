"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { getRevealVariants } from "@/lib/motion/variants";
import { useScrollReveal } from "@/lib/motion/useScrollReveal";
import { cn } from "@/lib/utils";

type RevealFrom = "up" | "left" | "right" | "scale";

type RevealProps = {
  children: ReactNode;
  className?: string;
  from?: RevealFrom;
  delay?: number;
};

export function Reveal({ children, className, from = "up", delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const { ref, controls, isHydrated } = useScrollReveal();

  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  if (!isHydrated) {
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={controls}
      variants={getRevealVariants(from)}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
