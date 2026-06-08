import type { Variants } from "framer-motion";

/** Smooth deceleration — close to Greenovative-style scroll reveals */
export const easeOut = [0.25, 0.1, 0.25, 1] as const;

export const viewport = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -8% 0px",
} as const;

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: easeOut },
  },
};

export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut },
  },
};

export const heroVisual: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOut, delay: 0.25 },
  },
};

type RevealDirection = "up" | "left" | "right" | "scale";

export function getRevealVariants(from: RevealDirection = "up"): Variants {
  if (from === "left") {
    return {
      hidden: { opacity: 0, x: -32 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.72, ease: easeOut },
      },
    };
  }

  if (from === "right") {
    return {
      hidden: { opacity: 0, x: 32 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.72, ease: easeOut },
      },
    };
  }

  if (from === "scale") {
    return {
      hidden: { opacity: 0, y: 16, scale: 0.98 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.72, ease: easeOut },
      },
    };
  }

  return fadeUpItem;
}
