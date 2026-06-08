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
  ScrollTrigger.refresh();
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
): gsap.core.Tween | void {
  registerGsap();

  if (prefersReducedMotion()) {
    gsap.set(targets, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
    return;
  }

  const {
    y = 40,
    x = 0,
    scale = 1,
    duration = 0.9,
    delay = 0,
    stagger = 0,
    scrollTrigger,
  } = options;

  const resolvedScrollTrigger: ScrollTrigger.Vars = {
    trigger: resolveTrigger(targets),
    start: "top 85%",
    once: true,
    ...scrollTrigger,
  };

  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y, x, scale },
    {
      autoAlpha: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: resolvedScrollTrigger,
    },
  );
}

export function animateCounter(
  element: HTMLElement,
  endValue: number,
  options: { suffix?: string; prefix?: string; duration?: number } = {},
): gsap.core.Tween | void {
  registerGsap();

  if (prefersReducedMotion()) {
    element.textContent = `${options.prefix ?? ""}${endValue}${options.suffix ?? ""}`;
    return;
  }

  const counter = { value: 0 };

  return gsap.to(counter, {
    value: endValue,
    duration: options.duration ?? 1.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      once: true,
    },
    onUpdate: () => {
      element.textContent = `${options.prefix ?? ""}${Math.round(counter.value)}${options.suffix ?? ""}`;
    },
  });
}
