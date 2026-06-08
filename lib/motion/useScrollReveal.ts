"use client";

import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import { useIsHydrated } from "@/lib/hooks/useIsHydrated";
import { viewport } from "@/lib/motion/variants";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const controls = useAnimation();
  const isHydrated = useIsHydrated();
  const isInView = useInView(ref, {
    once: viewport.once,
    amount: viewport.amount,
    margin: viewport.margin,
  });

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      void controls.start(isInView ? "visible" : "hidden");
    });

    return () => cancelAnimationFrame(frame);
  }, [controls, isHydrated, isInView]);

  return { ref, controls, isHydrated };
}
