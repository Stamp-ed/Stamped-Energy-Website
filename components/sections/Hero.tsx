"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { landingContent } from "@/lib/content";
import { gsap, registerGsap, useGSAP } from "@/lib/motion/gsap";
import { refreshScrollTriggers, revealOnLoad } from "@/lib/motion/scrollAnimations";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hero } = landingContent;

  useGSAP(
    () => {
      registerGsap();

      revealOnLoad(
        [
          "[data-hero='eyebrow']",
          "[data-hero='line1']",
          "[data-hero='line2']",
          "[data-hero='subheadline']",
          "[data-hero='cta']",
          "[data-hero='visual']",
        ],
        { y: 36, stagger: 0.1, delay: 0.2, duration: 1 },
      );

      gsap.fromTo(
        "[data-hero='visual']",
        { scale: 0.96 },
        { scale: 1, duration: 1.2, ease: "power2.out", delay: 0.55 },
      );

      gsap.to("[data-hero='grid']", {
        backgroundPosition: "48px 96px",
        duration: 24,
        ease: "none",
        repeat: -1,
      });

      refreshScrollTriggers();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_srgb,var(--brand-primary)_14%,transparent),transparent_72%)]"
      />
      <div
        data-hero="grid"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45] [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--brand-primary)_12%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--brand-primary)_12%,transparent)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <p
            data-hero="eyebrow"
            className="mb-5 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary"
          >
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
            <span data-hero="line1" className="block text-on-surface">
              {hero.headlineLine1}
            </span>
            <span data-hero="line2" className="mt-2 block text-primary">
              {hero.headlineLine2}
            </span>
          </h1>
          <p
            data-hero="subheadline"
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-on-surface-variant md:text-lg"
          >
            {hero.subheadline}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div data-hero="cta">
              <Button href={hero.primaryCta.href} variant="primary">
                {hero.primaryCta.label}
              </Button>
            </div>
            <div data-hero="cta">
              <Button href={hero.secondaryCta.href} variant="outline">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>

        <div
          data-hero="visual"
          className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-xl border-2 border-primary/20 bg-surface-lowest shadow-[0_24px_60px_-20px_color-mix(in_srgb,var(--brand-primary)_35%,transparent)]"
        >
          <div className="relative aspect-[16/9] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--brand-primary)_6%,var(--brand-surface-container-low)),var(--brand-surface-container-high))]">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm font-medium text-on-surface-variant">
                Product video / demo placeholder
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
