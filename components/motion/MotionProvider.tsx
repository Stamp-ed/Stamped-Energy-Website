"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap";

import "lenis/dist/lenis.css";

type MotionContextValue = {
  isReady: boolean;
  prefersReducedMotion: boolean;
};

const MotionContext = createContext<MotionContextValue>({
  isReady: false,
  prefersReducedMotion: false,
});

export function useMotion(): MotionContextValue {
  return useContext(MotionContext);
}

type MotionProviderProps = {
  children: ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    registerGsap();

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isReducedMotion = reducedMotionQuery.matches;
    setPrefersReducedMotion(isReducedMotion);

    if (isReducedMotion) {
      setIsReady(true);
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
    });

    document.documentElement.classList.add("lenis");

    lenis.on("scroll", ScrollTrigger.update);

    const onTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTicker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
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

    ScrollTrigger.defaults({ scroller: document.documentElement });

    const onRefresh = () => {
      lenis.resize();
    };

    ScrollTrigger.addEventListener("refresh", onRefresh);

    const onResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    const readyFrame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      setIsReady(true);
    });

    return () => {
      cancelAnimationFrame(readyFrame);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(onTicker);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const value = useMemo(
    () => ({ isReady, prefersReducedMotion }),
    [isReady, prefersReducedMotion],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
