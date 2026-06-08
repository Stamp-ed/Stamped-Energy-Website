"use client";

import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap";

type RevealOptions = {
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  scrollTrigger?: ScrollTrigger.Vars;
};

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function refreshScrollTriggers(): void {
  registerGsap();
  ScrollTrigger.refresh(true);
}

function resolveTrigger(targets: gsap.TweenTarget): Element | string | undefined {
  if (typeof targets === "string") {
    return targets;
  }

  if (targets instanceof Element) {
    return targets;
  }

  if (Array.isArray(targets) && targets[0] instanceof Element) {
    return targets[0];
  }

  return undefined;
}

export function revealOnScroll(
  targets: gsap.TweenTarget,
  options: RevealOptions = {},
): gsap.core.Tween | gsap.core.Timeline | void {
  registerGsap();

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "transform" });
    return;
  }

  const {
    y = 48,
    x = 0,
    scale = 1,
    duration = 1,
    delay = 0,
    stagger = 0,
    scrollTrigger,
  } = options;

  gsap.set(targets, { opacity: 0, y, x, scale });

  const resolvedScrollTrigger: ScrollTrigger.Vars = {
    trigger: resolveTrigger(targets),
    start: "top 82%",
    toggleActions: "play none none none",
    ...scrollTrigger,
  };

  return gsap.to(targets, {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    duration,
    delay,
    stagger,
    ease: "power3.out",
    clearProps: "transform",
    scrollTrigger: resolvedScrollTrigger,
  });
}

export function revealOnLoad(
  targets: gsap.TweenTarget,
  options: { y?: number; delay?: number; stagger?: number; duration?: number } = {},
): gsap.core.Timeline {
  registerGsap();

  const { y = 32, delay = 0.1, stagger = 0.12, duration = 0.9 } = options;

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return gsap.timeline();
  }

  gsap.set(targets, { opacity: 0, y });

  return gsap.timeline({ delay }).to(targets, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    ease: "power3.out",
  });
}
