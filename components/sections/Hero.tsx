"use client";

import {
  motion,
  useAnimation,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { landingContent } from "@/lib/content";
import { useIsHydrated } from "@/lib/hooks/useIsHydrated";
import { heroContainer, heroItem, heroVisual } from "@/lib/motion/variants";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hero } = landingContent;
  const isHydrated = useIsHydrated();
  const reduceMotion = useReducedMotion();
  const controls = useAnimation();

  useEffect(() => {
    if (!isHydrated || reduceMotion) {
      return;
    }

    void controls.start("visible");
  }, [controls, isHydrated, reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [0, -28]);

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

  const backgroundLayers = (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_srgb,var(--brand-primary)_14%,transparent),transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--brand-primary)_10%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--brand-primary)_10%,transparent)_1px,transparent_1px)] [background-size:48px_48px] motion-safe:animate-[grid-drift_28s_linear_infinite]"
      />
    </>
  );

  if (!isHydrated || reduceMotion) {
    return (
      <section
        ref={sectionRef}
        className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40"
      >
        {backgroundLayers}
        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {hero.eyebrow}
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
              <span className="block text-on-surface">{hero.headlineLine1}</span>
              <span className="mt-2 block text-primary">{hero.headlineLine2}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-on-surface-variant md:text-lg">
              {hero.subheadline}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={hero.primaryCta.href} variant="primary">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="outline">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>
          <div className={visualClassName}>{visualCard}</div>
        </Container>
      </section>
    );
  }

  return (
    <motion.section
      ref={sectionRef}
      className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40"
      initial="hidden"
      animate={controls}
      variants={heroContainer}
    >
      {backgroundLayers}
      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            variants={heroItem}
            className="mb-5 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary"
          >
            {hero.eyebrow}
          </motion.p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
            <motion.span variants={heroItem} className="block text-on-surface">
              {hero.headlineLine1}
            </motion.span>
            <motion.span variants={heroItem} className="mt-2 block text-primary">
              {hero.headlineLine2}
            </motion.span>
          </h1>
          <motion.p
            variants={heroItem}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-on-surface-variant md:text-lg"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
        </div>

        <motion.div variants={heroVisual} style={{ y: visualY }} className={visualClassName}>
          {visualCard}
        </motion.div>
      </Container>
    </motion.section>
  );
}
