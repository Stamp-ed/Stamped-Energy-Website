"use client";

import Lenis from "lenis";
import { useLayoutEffect } from "react";

import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap";
import { refreshScrollTriggers } from "@/lib/motion/scrollAnimations";

type LenisProviderProps = {
  children: React.ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  useLayoutEffect(() => {
    registerGsap();
    document.documentElement.classList.add("motion-ready");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      refreshScrollTriggers();
      return () => {
        document.documentElement.classList.remove("motion-ready");
      };
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const frame = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(frame);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => refreshScrollTriggers();
    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh);

    requestAnimationFrame(refresh);
    const refreshTimers = [
      window.setTimeout(refresh, 100),
      window.setTimeout(refresh, 400),
      window.setTimeout(refresh, 1000),
    ];

    return () => {
      refreshTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(frame);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return <>{children}</>;
}
