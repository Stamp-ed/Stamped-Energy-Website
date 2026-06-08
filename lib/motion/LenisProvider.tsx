"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap";

type LenisProviderProps = {
  children: React.ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    registerGsap();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const frame = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(frame);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
