"use client";

import { Fragment, useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { howItWorks } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const steps = gsap.utils.toArray<HTMLElement>("[data-hiw-step]");

      gsap.set(steps, { autoAlpha: 0, y: 28 });

      const timeline = gsap.timeline();

      steps.forEach((step, index) => {
        timeline.to(
          step,
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
          index * 0.1,
        );
      });

      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top 82%",
        once: true,
        animation: timeline,
      });
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-surface-low py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />

      <Container>
        <Reveal>
          <SectionHeading eyebrow={howItWorks.eyebrow} title={howItWorks.title} />
        </Reveal>

        <div ref={trackRef} className="relative mt-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden h-px bg-gradient-to-r from-primary/10 via-primary/35 to-primary/10 xl:block"
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {howItWorks.steps.map((step) => (
              <Fragment key={step.id}>
                <article
                  data-hiw-step
                  className="relative h-full rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/8">
                    <p className="font-display text-sm font-extrabold text-primary">
                      {String(step.step).padStart(2, "0")}
                    </p>
                  </div>
                  <h3 className="text-base font-bold text-on-surface">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{step.description}</p>
                </article>
              </Fragment>
            ))}
          </div>
        </div>

        <Reveal className="mt-10">
          <Button href={howItWorks.cta.href} variant="primary">
            {howItWorks.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
