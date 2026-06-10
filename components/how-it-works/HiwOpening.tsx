"use client";

import { useRef } from "react";

import { PlantSldDiagram } from "@/components/how-it-works/PlantSldDiagram";
import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { howItWorksContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function HiwOpening() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hero, plantSld } = howItWorksContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-hiw-opening]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.12,
        ease: "power2.out",
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
      className="page-hero relative overflow-hidden border-b border-outline-variant/40 bg-surface"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--brand-primary)_12%,transparent),transparent_60%)]"
      />
      <Container className="relative z-10">
        <div data-hiw-opening className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {hero.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-on-surface md:text-4xl lg:text-[2.5rem]">
            {hero.title}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-on-surface-variant md:text-base">
            {hero.description}
          </p>
          <div className="mt-6 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:items-center">
            <Button href={hero.primaryCta.href} variant="primary" className="w-full sm:w-auto">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" className="w-full sm:w-auto">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div data-hiw-opening className="mx-auto mt-8 max-w-5xl">
          <PlantSldDiagram nodes={plantSld.nodes} hint={plantSld.hint} />
        </div>

        <p
          data-hiw-opening
          className="mx-auto mt-6 text-center text-xs font-medium uppercase tracking-[0.14em] text-on-surface-variant/80"
          aria-hidden="true"
        >
          ↓ Scroll the workflow
        </p>
      </Container>
    </section>
  );
}
