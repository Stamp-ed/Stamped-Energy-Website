"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";

/**
 * Resets scroll position and ScrollTrigger state after client navigations.
 * Prevents stale pin spacers / Lenis desync from crashing the next page on mobile.
 */
export function RouteMotionSync() {
  const pathname = usePathname();
  const { resetRouteMotion, isReady } = useMotion();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    resetRouteMotion();
  }, [pathname, isReady, resetRouteMotion]);

  return null;
}
