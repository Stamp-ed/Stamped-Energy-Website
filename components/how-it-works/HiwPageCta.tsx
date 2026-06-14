"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { howItWorksContent } from "@/lib/content";
import { getHiwScrollStart } from "@/lib/motion/hiwScrollTrigger";
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

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.from("[data-hiw-cta]", {
          autoAlpha: 0,
          y: 32,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: getHiwScrollStart("sectionReveal", false),
            once: true,
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from("[data-hiw-cta]", {
          autoAlpha: 0,
          y: 32,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: getHiwScrollStart("sectionReveal", true),
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-secondary section-y text-on-secondary"
    >
      <Container>
        <div data-hiw-cta className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-inverse-primary">
            {finalCta.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
            {finalCta.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-on-secondary/80 md:text-base">
            {finalCta.description}
          </p>
          <div className="mt-6">
            <Button href={finalCta.primaryCta.href} variant="primary">
              {finalCta.primaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
