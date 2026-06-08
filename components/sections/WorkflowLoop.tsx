"use client";

import { Fragment, useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

function buildFlowTimeline(
  steps: HTMLElement[],
  arrows: HTMLElement[],
  stepFrom: { x?: number; y?: number },
) {
  gsap.set(steps, { autoAlpha: 0, scale: 0.97, ...stepFrom });
  gsap.set(arrows, { autoAlpha: 0, transformOrigin: "left center", scaleX: 0 });

  const timeline = gsap.timeline();

  steps.forEach((step, index) => {
    if (index > 0 && arrows[index - 1]) {
      timeline.to(arrows[index - 1], {
        scaleX: 1,
        autoAlpha: 1,
        duration: 0.42,
        ease: "power2.inOut",
      });
    }

    timeline.to(step, {
      autoAlpha: 1,
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.52,
      ease: "power2.out",
    });
  });

  return timeline;
}

export function WorkflowLoop() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { workflow } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-wf-step-lg]");
        const arrows = gsap.utils.toArray<HTMLElement>("[data-wf-arrow-lg]");
        const timeline = buildFlowTimeline(steps, arrows, { y: 20 });

        const scrollTrigger = ScrollTrigger.create({
          trigger: trackRef.current,
          start: "top 80%",
          once: true,
          animation: timeline,
        });

        return () => {
          scrollTrigger.kill();
          timeline.kill();
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-wf-step-sm]");
        gsap.set(steps, { autoAlpha: 0, y: 20 });

        const timeline = gsap.timeline();
        steps.forEach((step, index) => {
          timeline.to(step, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          }, index * 0.1);
        });

        const scrollTrigger = ScrollTrigger.create({
          trigger: trackRef.current,
          start: "top 82%",
          once: true,
          animation: timeline,
        });

        return () => {
          scrollTrigger.kill();
          timeline.kill();
        };
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="bg-surface-low py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={workflow.eyebrow} title={workflow.title} align="center" className="mx-auto" />
        </Reveal>

        <div ref={trackRef} className="mt-14">
          <div className="hidden items-stretch gap-2 lg:flex">
            {workflow.steps.map((step, index) => (
              <Fragment key={step.id}>
                <article
                  data-wf-step-lg
                  className="flex flex-1 flex-col rounded-xl border border-outline-variant/60 bg-surface-lowest p-5 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-on-surface">{step.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-on-surface-variant">{step.description}</p>
                </article>

                {index < workflow.steps.length - 1 ? (
                  <div data-wf-arrow-lg className="flex w-8 shrink-0 items-center self-center" aria-hidden="true">
                    <div className="flex w-full origin-left items-center">
                      <span className="h-[2px] flex-1 rounded-full bg-primary/60" />
                      <span className="-ml-0.5 text-lg leading-none text-primary">›</span>
                    </div>
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:hidden">
            {workflow.steps.map((step, index) => (
              <article
                key={step.id}
                data-wf-step-sm
                className="rounded-xl border border-outline-variant/60 bg-surface-lowest p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 text-lg font-bold text-on-surface">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
