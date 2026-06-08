"use client";

import { useRef } from "react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, registerGsap, useGSAP } from "@/lib/motion/gsap";
import { prefersReducedMotion, refreshScrollTriggers, revealOnScroll } from "@/lib/motion/scrollAnimations";

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
          y: 36,
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        });
        refreshScrollTriggers();
        return;
      }

      const steps = gsap.utils.toArray<HTMLElement>("[data-workflow-step]");
      const heading = pinRef.current?.querySelector("[data-workflow-heading]");

      gsap.set(steps, { opacity: 0.3, y: 48, scale: 0.94 });
      if (heading) {
        gsap.set(heading, { opacity: 0, y: 28 });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      if (heading) {
        timeline.to(heading, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      }

      steps.forEach((step, index) => {
        timeline.to(
          step,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
          },
          index * 0.75 + 0.25,
        );

        if (index < steps.length - 1) {
          timeline.to(
            step,
            {
              opacity: 0.3,
              y: -20,
              scale: 0.94,
              duration: 0.55,
              ease: "power2.inOut",
            },
            index * 0.75 + 0.7,
          );
        }
      });

      refreshScrollTriggers();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-surface-low py-20 md:py-28">
      <div ref={pinRef} className="py-4 md:py-8">
        <Container>
          <div data-workflow-heading>
            <SectionHeading
              eyebrow={workflow.eyebrow}
              title={workflow.title}
              align="center"
            />
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-5">
            {workflow.steps.map((step, index) => (
              <article
                key={step.id}
                data-workflow-step
                className="rounded-xl border border-outline-variant/60 bg-surface-lowest p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 text-lg font-bold text-on-surface">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">
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
