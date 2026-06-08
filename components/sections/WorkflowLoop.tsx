"use client";

import { useRef } from "react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, registerGsap, useGSAP } from "@/lib/motion/gsap";

export function WorkflowLoop() {
  const sectionRef = useRef<HTMLElement>(null);
  const { workflow } = landingContent;

  useGSAP(
    () => {
      registerGsap();

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      if (prefersReducedMotion || isMobile) {
        gsap.set("[data-workflow-step]", { autoAlpha: 1, y: 0 });
        return;
      }

      const steps = gsap.utils.toArray<HTMLElement>("[data-workflow-step]");

      gsap.set(steps, { autoAlpha: 0.35, y: 24 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.8,
        },
      });

      steps.forEach((step, index) => {
        timeline.to(
          step,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          index,
        );

        if (index < steps.length - 1) {
          timeline.to(
            step,
            {
              autoAlpha: 0.35,
              y: -12,
              duration: 0.6,
              ease: "power2.inOut",
            },
            index + 0.8,
          );
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-inverse-surface py-20 text-inverse-on-surface md:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow={workflow.eyebrow}
          title={workflow.title}
          align="center"
          dark
        />

        <div className="mt-14 grid gap-4 md:grid-cols-5">
          {workflow.steps.map((step, index) => (
            <article
              key={step.id}
              data-workflow-step
              className="rounded-lg border border-inverse-on-surface/10 bg-inverse-surface p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-inverse-primary">
                Step {index + 1}
              </p>
              <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-inverse-on-surface/75">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
