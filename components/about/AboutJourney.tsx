"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/content/about";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function AboutJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const { journey } = aboutContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-about-milestone]", {
        autoAlpha: 0,
        x: -20,
        duration: 0.55,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section ref={sectionRef} className="bg-surface-low py-10 md:section-y">
      <Container>
        <Reveal className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow={journey.eyebrow}
            title={journey.title}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="relative mx-auto mt-6 max-w-3xl md:mt-10">
          <div
            className="absolute bottom-0 left-[1.0625rem] top-0 w-px bg-outline-variant/50 md:left-1/2 md:-translate-x-px"
            aria-hidden
          />
          <ol className="relative">
          {journey.milestones.map((milestone, index) => (
            <li
              key={milestone.id}
              data-about-milestone
              className={`relative flex gap-4 pb-7 last:pb-0 md:gap-0 md:pb-10 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden flex-1 md:block" />
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-surface-lowest md:absolute md:left-1/2 md:h-9 md:w-9 md:-translate-x-1/2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary md:h-2 md:w-2" />
              </div>
              <article
                className={`min-w-0 flex-1 rounded-xl border border-outline-variant/50 bg-surface-lowest p-4 shadow-sm sm:rounded-2xl sm:p-5 md:max-w-[calc(50%-2.5rem)] ${
                  index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {milestone.period}
                </p>
                <h3 className="mt-1 text-base font-bold text-on-surface md:text-lg">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {milestone.description}
                </p>
              </article>
            </li>
          ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
