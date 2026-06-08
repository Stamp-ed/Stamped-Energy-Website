"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import { registerGsap, useGSAP } from "@/lib/motion/gsap";
import { refreshScrollTriggers, revealOnScroll } from "@/lib/motion/scrollAnimations";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
};

export function Reveal({ children, className, delay = 0, y = 48, x = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();

      const element = ref.current;
      if (!element) {
        return;
      }

      revealOnScroll(element, {
        y,
        x,
        delay,
        scrollTrigger: {
          trigger: element,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      refreshScrollTriggers();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-animate="scroll" className={cn(className)}>
      {children}
    </div>
  );
}
