"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap";
import { refreshScrollTriggers } from "@/lib/motion/scrollAnimations";

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
      refreshScrollTriggers();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const frame = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(frame);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => refreshScrollTriggers();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", refreshScrollTriggers);

    const refreshTimer = window.setTimeout(refreshScrollTriggers, 200);
    const refreshTimerLate = window.setTimeout(refreshScrollTriggers, 800);

    return () => {
      window.clearTimeout(refreshTimer);
      window.clearTimeout(refreshTimerLate);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", refreshScrollTriggers);
      gsap.ticker.remove(frame);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
