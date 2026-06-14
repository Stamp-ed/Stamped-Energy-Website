"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVideo } from "@/components/ui/HeroVideo";
import { landingContent } from "@/lib/content";
import { easeOut, heroDelay, heroDuration, heroStagger } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introPlayedRef = useRef(false);
  const { hero } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || introPlayedRef.current) {
        return;
      }

      introPlayedRef.current = true;

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
        .to("[data-hero='ctas']", { autoAlpha: 1, y: 0 }, "-=0.5");
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  const visualCard = (
    <div className="relative aspect-[16/9] overflow-hidden bg-surface-lowest">
      <HeroVideo
        webm={hero.video.webm}
        poster={hero.video.poster}
        label={hero.video.label}
      />
    </div>
  );

  const visualClassName =
    "mx-auto mt-10 max-w-5xl overflow-hidden rounded-xl border-2 border-outline-variant/50 bg-surface-lowest shadow-[0_20px_48px_-24px_color-mix(in_srgb,var(--brand-secondary)_18%,transparent)] sm:mt-14 md:border-primary/20 md:shadow-[0_24px_60px_-20px_color-mix(in_srgb,var(--brand-primary)_35%,transparent)]";

  return (
    <section ref={sectionRef} className="landing-hero relative overflow-hidden bg-surface">
      {/* Subtle orange glow — desktop only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_70%_30%,color-mix(in_srgb,var(--brand-primary)_14%,transparent),transparent_72%)] md:block"
      />
      {/* Mobile: neutral grid, slightly stronger lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.52] [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--brand-outline-variant)_34%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--brand-outline-variant)_34%,transparent)_1px,transparent_1px)] [background-size:48px_48px] motion-safe:animate-[grid-drift_28s_linear_infinite] md:hidden"
      />
      {/* Desktop: subtle primary grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-[0.4] [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--brand-primary)_10%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--brand-primary)_10%,transparent)_1px,transparent_1px)] [background-size:48px_48px] motion-safe:animate-[grid-drift_28s_linear_infinite] md:block"
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <p
            data-hero="eyebrow"
            className="mb-5 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary"
          >
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl md:text-6xl">
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
            className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
          >
            <Button href={hero.primaryCta.href} variant="primary" className="w-full sm:w-auto">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" className="w-full sm:w-auto">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className={visualClassName}>{visualCard}</div>
      </Container>
    </section>
  );
}
