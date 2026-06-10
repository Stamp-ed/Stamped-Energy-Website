"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/content/about";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function AboutVisionMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const { visionMission } = aboutContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-about-vm]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section ref={sectionRef} className="bg-secondary py-10 text-on-secondary md:section-y">
      <Container>
        <Reveal className="mx-auto max-w-2xl">
          <SectionHeading
            eyebrow={visionMission.eyebrow}
            title={visionMission.title}
            align="center"
            dark
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-6 grid max-w-4xl gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
          <article
            data-about-vm
            className="rounded-2xl border border-on-secondary/15 bg-inverse-surface/50 p-5 backdrop-blur-sm md:p-8"
          >
            <h3 className="font-display text-xl font-extrabold text-on-secondary md:text-2xl">
              {visionMission.vision.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-on-secondary/85 md:text-base">
              {visionMission.vision.description}
            </p>
          </article>
          <article
            data-about-vm
            className="rounded-2xl border border-on-secondary/15 bg-inverse-surface/50 p-5 backdrop-blur-sm md:p-8"
          >
            <h3 className="font-display text-xl font-extrabold text-on-secondary md:text-2xl">
              {visionMission.mission.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-on-secondary/85 md:text-base">
              {visionMission.mission.description}
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
