"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeUpItem, staggerContainer } from "@/lib/motion/variants";
import { useScrollReveal } from "@/lib/motion/useScrollReveal";
import { cn } from "@/lib/utils";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerReveal({ children, className }: StaggerRevealProps) {
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
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div className={cn(className)} variants={fadeUpItem}>
      {children}
    </motion.div>
  );
}
