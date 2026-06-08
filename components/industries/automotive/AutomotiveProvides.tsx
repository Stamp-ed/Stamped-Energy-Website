"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industriesContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function AutomotiveProvides() {
  const sectionRef = useRef<HTMLElement>(null);
  const { provides } = industriesContent.automotive;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-provides-card]", {
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
    <section ref={sectionRef} className="bg-surface-low py-20 md:py-28">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow={provides.eyebrow}
            title={provides.title}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2 md:gap-5">
          {provides.items.map((item) => (
            <article
              key={item.id}
              data-provides-card
              className="rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 md:p-6"
            >
              <h3 className="text-lg font-bold text-on-surface">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant md:text-[15px] md:leading-7">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
