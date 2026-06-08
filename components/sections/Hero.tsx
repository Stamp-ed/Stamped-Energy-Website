"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { landingContent } from "@/lib/content";
import { gsap, registerGsap, useGSAP } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/scrollAnimations";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hero } = landingContent;

  useGSAP(
    () => {
      registerGsap();

      if (prefersReducedMotion()) {
        gsap.set("[data-hero]", { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set("[data-hero]", { autoAlpha: 0, y: 28 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      timeline
        .to("[data-hero='eyebrow']", { autoAlpha: 1, y: 0, duration: 0.7 })
        .to("[data-hero='headline']", { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.45")
        .to("[data-hero='subheadline']", { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.55")
        .to("[data-hero='cta']", { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.14 }, "-=0.45")
        .fromTo(
          "[data-hero='visual']",
          { autoAlpha: 0, y: 48, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out" },
          "-=0.35",
        );

      gsap.to("[data-hero='grid']", {
        backgroundPosition: "48px 96px",
        duration: 20,
        ease: "none",
        repeat: -1,
      });
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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_srgb,var(--brand-primary)_8%,transparent),transparent_70%)]"
      />
      <div
        data-hero="grid"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--brand-outline-variant)_35%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--brand-outline-variant)_35%,transparent)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <p
            data-hero="eyebrow"
            className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-secondary"
          >
            {hero.eyebrow}
          </p>
          <h1
            data-hero="headline"
            className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-on-surface md:text-6xl"
          >
            {hero.headline}
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
          className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-lowest shadow-sm"
        >
          <div className="relative aspect-[16/9] bg-[linear-gradient(135deg,var(--brand-surface-container-low),var(--brand-surface-container-high))]">
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
