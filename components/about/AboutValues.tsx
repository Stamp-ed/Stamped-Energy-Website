"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/content/about";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const { values } = aboutContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-about-value]", {
        autoAlpha: 0,
        y: 22,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section ref={sectionRef} className="border-b border-outline-variant/40 bg-surface-low py-10 md:section-y">
      <Container>
        <Reveal className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow={values.eyebrow}
            title={values.title}
            description={values.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-6 grid max-w-5xl gap-3 sm:grid-cols-2 sm:gap-4 md:mt-10 md:gap-5">
          {values.items.map((value) => (
            <article
              key={value.id}
              data-about-value
              className="rounded-2xl border border-outline-variant/50 bg-surface-lowest p-4 shadow-sm sm:p-6"
            >
              <h3 className="text-base font-bold text-on-surface md:text-lg">{value.title}</h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">{value.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
