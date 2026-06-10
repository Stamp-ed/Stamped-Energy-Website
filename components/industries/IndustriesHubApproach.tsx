"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industriesContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function IndustriesHubApproach() {
  const sectionRef = useRef<HTMLElement>(null);
  const { approach } = industriesContent.hub;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-hub-approach]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.55,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section ref={sectionRef} className="bg-surface section-y">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow={approach.eyebrow}
            title={approach.title}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-8 grid md:mt-12 max-w-5xl gap-5 md:grid-cols-3">
          {approach.items.map((item, index) => (
            <article
              key={item.id}
              data-hub-approach
              className="rounded-2xl border border-outline-variant/50 bg-surface-lowest p-6 md:p-7"
            >
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-primary/80">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-lg font-bold text-on-surface">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-on-surface-variant">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
