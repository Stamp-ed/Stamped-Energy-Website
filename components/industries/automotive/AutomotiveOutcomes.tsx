"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industriesContent } from "@/lib/content";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function AutomotiveOutcomes() {
  const sectionRef = useRef<HTMLElement>(null);
  const { outcomes } = industriesContent.automotive;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-outcome-card]", {
        autoAlpha: 0,
        y: 22,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section ref={sectionRef} className="bg-surface-low py-20 md:py-28">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow={outcomes.eyebrow}
            title={outcomes.title}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2 md:gap-5">
          {outcomes.items.map((item) => (
            <article
              key={item.id}
              data-outcome-card
              className="rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 md:p-6"
            >
              <h3 className="text-lg font-bold text-on-surface">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant md:leading-7">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
