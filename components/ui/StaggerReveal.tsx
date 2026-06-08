"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import { registerGsap, useGSAP } from "@/lib/motion/gsap";
import { revealOnScroll } from "@/lib/motion/scrollAnimations";

type StaggerRevealProps = {
  children: React.ReactNode;
  className?: string;
  childSelector?: string;
  stagger?: number;
  y?: number;
};

export function StaggerReveal({
  children,
  className,
  childSelector = "[data-stagger-item]",
  stagger = 0.12,
  y = 36,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();

      const container = ref.current;
      if (!container) {
        return;
      }

      const items = container.querySelectorAll(childSelector);
      if (!items.length) {
        return;
      }

      revealOnScroll(items, {
        y,
        stagger,
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
