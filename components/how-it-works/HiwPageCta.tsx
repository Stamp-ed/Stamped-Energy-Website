"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { howItWorksContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function HiwPageCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const { finalCta } = howItWorksContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-hiw-cta]", {
        autoAlpha: 0,
        y: 32,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-secondary py-20 text-on-secondary md:py-28"
    >
      <Container>
        <div data-hiw-cta className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-inverse-primary">
            {finalCta.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
            {finalCta.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-on-secondary/85">
            {finalCta.description}
          </p>
          <div className="mt-8">
            <Button href={finalCta.primaryCta.href} variant="primary">
              {finalCta.primaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
