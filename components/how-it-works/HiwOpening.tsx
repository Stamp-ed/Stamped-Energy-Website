"use client";

import { useRef } from "react";

import { GifPlaceholder } from "@/components/how-it-works/GifPlaceholder";
import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { howItWorksContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function HiwOpening() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hero, gifSlots } = howItWorksContent;
  const openingSlot = gifSlots[0];
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
      className="relative overflow-hidden border-b border-outline-variant/40 bg-surface pb-14 pt-28 md:pb-20 md:pt-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--brand-primary)_12%,transparent),transparent_60%)]"
      />
      <Container className="relative z-10">
        <div data-hiw-opening>
          <GifPlaceholder
            variant="hero"
            title={openingSlot.title}
            description={openingSlot.description}
          />
        </div>

        <div data-hiw-opening className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {hero.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-on-surface md:text-4xl">
            {hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base">
            {hero.description}
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-on-surface-variant">
            Scroll to explore the workflow
          </p>
        </div>
      </Container>
    </section>
  );
}
