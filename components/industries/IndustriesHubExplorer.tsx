"use client";

import { useRef } from "react";

import { IndustriesExplorerPanel } from "@/components/industries/IndustriesExplorerPanel";
import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industriesContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function IndustriesHubExplorer() {
  const sectionRef = useRef<HTMLElement>(null);
  const { explorer } = industriesContent.hub;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-hub-explorer]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section ref={sectionRef} className="border-t border-outline-variant/40 bg-surface py-20 md:py-28">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow={explorer.eyebrow}
            title={explorer.title}
            description={explorer.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div data-hub-explorer className="mx-auto mt-12 max-w-5xl">
          <IndustriesExplorerPanel />
        </div>
      </Container>
    </section>
  );
}
