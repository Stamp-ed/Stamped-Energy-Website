/** Greenovative-style motion tokens (AOS-like fade-up on scroll) */
export const easeOut = "power2.out";

export const revealDuration = 0.72;
export const revealDistance = 24;
export const staggerGap = 0.08;
export const staggerDelay = 0.04;

export const heroDuration = 0.75;
export const heroStagger = 0.09;
export const heroDelay = 0.1;

export const scrollTriggerDefaults = {
  start: "top 88%",
  toggleActions: "play none none none",
  once: true,
} as const;

export type RevealDirection = "up" | "left" | "right" | "scale";

export function getRevealFromVars(from: RevealDirection = "up") {
  if (from === "left") {
    return { autoAlpha: 0, x: -32 };
  }

  if (from === "right") {
    return { autoAlpha: 0, x: 32 };
  }

  if (from === "scale") {
    return { autoAlpha: 0, y: 16, scale: 0.98 };
  }

  return { autoAlpha: 0, y: revealDistance };
}

export function getRevealToVars(from: RevealDirection = "up") {
  if (from === "left" || from === "right") {
    return { autoAlpha: 1, x: 0 };
  }

  if (from === "scale") {
    return { autoAlpha: 1, y: 0, scale: 1 };
  }

  return { autoAlpha: 1, y: 0 };
}
