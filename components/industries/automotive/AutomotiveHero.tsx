"use client";

import Image from "next/image";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { industriesContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function AutomotiveHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { automotive } = industriesContent;
  const vertical = industriesContent.verticals[0];
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-auto-hero]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  if (!vertical) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-outline-variant/40 bg-surface pb-14 pt-28 md:pb-20 md:pt-32"
    >
      <div className="absolute inset-0">
        <Image
          src={vertical.heroImageSrc}
          alt={vertical.heroImageAlt}
          fill
          priority
          className="object-cover object-[center_40%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,color-mix(in_srgb,var(--brand-secondary)_88%,transparent)_0%,color-mix(in_srgb,var(--brand-secondary)_72%,transparent)_42%,color-mix(in_srgb,var(--brand-secondary)_45%,transparent)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,color-mix(in_srgb,var(--brand-primary)_22%,transparent),transparent_45%)]" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <p
            data-auto-hero
            className="text-xs font-semibold uppercase tracking-[0.16em] text-inverse-primary"
          >
            {automotive.eyebrow}
          </p>
          <h1
            data-auto-hero
            className="mt-3 font-display text-3xl font-extrabold leading-tight text-on-secondary md:text-4xl lg:text-[2.65rem]"
          >
            {automotive.title}
          </h1>
          <p data-auto-hero className="mt-4 max-w-xl text-sm leading-7 text-on-secondary/85 md:text-base">
            {automotive.description}
          </p>
          <div data-auto-hero className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href={automotive.primaryCta.href} variant="primary">
              {automotive.primaryCta.label}
            </Button>
            <Button
              href={automotive.secondaryCta.href}
              variant="outline"
              className="border-on-secondary/30 bg-on-secondary/5 text-on-secondary hover:bg-on-secondary/10"
            >
              {automotive.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
