"use client";

import { useRef } from "react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, registerGsap, useGSAP } from "@/lib/motion/gsap";
import { prefersReducedMotion, revealOnScroll } from "@/lib/motion/scrollAnimations";

export function WorkflowLoop() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const { workflow } = landingContent;

  useGSAP(
    () => {
      registerGsap();

      const reducedMotion = prefersReducedMotion();
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      if (reducedMotion || isMobile) {
        revealOnScroll("[data-workflow-step]", {
          y: 32,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });
        return;
      }

      const steps = gsap.utils.toArray<HTMLElement>("[data-workflow-step]");
      const heading = pinRef.current?.querySelector("[data-workflow-heading]");

      gsap.set(steps, { autoAlpha: 0.25, y: 40, scale: 0.96 });
      if (heading) {
        gsap.set(heading, { autoAlpha: 0, y: 24 });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      if (heading) {
        timeline.to(heading, { autoAlpha: 1, y: 0, duration: 0.4 });
      }

      steps.forEach((step, index) => {
        timeline.to(
          step,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          index * 0.7 + 0.2,
        );

        if (index < steps.length - 1) {
          timeline.to(
            step,
            {
              autoAlpha: 0.25,
              y: -16,
              scale: 0.96,
              duration: 0.5,
              ease: "power2.inOut",
            },
            index * 0.7 + 0.65,
          );
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-secondary text-on-secondary">
      <div ref={pinRef} className="py-20 md:py-28">
        <Container>
          <div data-workflow-heading>
            <SectionHeading
              eyebrow={workflow.eyebrow}
              title={workflow.title}
              align="center"
              dark
            />
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-5">
            {workflow.steps.map((step, index) => (
              <article
                key={step.id}
                data-workflow-step
                className="rounded-lg border border-on-secondary/15 bg-secondary p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-inverse-primary">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 text-lg font-bold text-on-secondary">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-on-secondary/75">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
