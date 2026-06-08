"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function HiwDeployment() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { deployment } = howItWorksContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-deploy-phase]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.fromTo(
        "[data-deploy-progress]",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.6,
          },
        },
      );
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="bg-surface-low py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow={deployment.eyebrow}
          title={deployment.title}
          align="center"
          className="mx-auto"
        />

        <div ref={trackRef} className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute left-0 right-0 top-8 hidden h-1 overflow-hidden rounded-full bg-outline-variant/30 md:block">
            <div data-deploy-progress className="h-full w-full bg-primary" />
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {deployment.phases.map((phase) => (
              <article
                key={phase.id}
                data-deploy-phase
                className="relative rounded-lg border border-outline-variant/50 bg-surface-lowest p-5 pt-8 md:pt-10"
              >
                <span className="absolute -top-0 left-5 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary md:left-1/2 md:-translate-x-1/2">
                  •
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {phase.week}
                </p>
                <h3 className="mt-2 text-base font-bold text-on-surface">{phase.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-on-surface-variant">
                  {phase.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
