"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { landingContent } from "@/lib/content";
import { easeOut, heroDelay, heroDuration, heroStagger } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hero } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const targets = section.querySelectorAll<HTMLElement>("[data-hero]");
      gsap.set(targets, { autoAlpha: 0, y: 20 });

      const timeline = gsap.timeline({
        defaults: { ease: easeOut, duration: heroDuration },
        delay: heroDelay,
      });

      timeline
        .to("[data-hero='eyebrow']", { autoAlpha: 1, y: 0 })
        .to(
          "[data-hero='line1'], [data-hero='line2']",
          { autoAlpha: 1, y: 0, stagger: heroStagger },
          "-=0.55",
        )
        .to("[data-hero='subheadline']", { autoAlpha: 1, y: 0 }, "-=0.5")
        .to("[data-hero='ctas']", { autoAlpha: 1, y: 0 }, "-=0.5")
        .to("[data-hero='visual']", { autoAlpha: 1, y: 0, duration: 0.85 }, "-=0.35");

      gsap.to("[data-hero='visual-inner']", {
        y: -28,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  const visualCard = (
    <div className="relative aspect-[16/9] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--brand-primary)_6%,var(--brand-surface-container-low)),var(--brand-surface-container-high))]">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm font-medium text-on-surface-variant">
          Product video / demo placeholder
        </p>
      </div>
    </div>
  );

  const visualClassName =
    "mx-auto mt-14 max-w-5xl overflow-hidden rounded-xl border-2 border-primary/20 bg-surface-lowest shadow-[0_24px_60px_-20px_color-mix(in_srgb,var(--brand-primary)_35%,transparent)]";

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
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--brand-primary)_10%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--brand-primary)_10%,transparent)_1px,transparent_1px)] [background-size:48px_48px] motion-safe:animate-[grid-drift_28s_linear_infinite]"
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
          <div
            data-hero="ctas"
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div data-hero="visual" className={visualClassName}>
          <div data-hero="visual-inner">{visualCard}</div>
        </div>
      </Container>
    </section>
  );
}
