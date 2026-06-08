"use client";

import { useRef } from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { registerGsap, useGSAP } from "@/lib/motion/gsap";
import { refreshScrollTriggers, revealOnScroll } from "@/lib/motion/scrollAnimations";

export function FutureMedia() {
  const sectionRef = useRef<HTMLElement>(null);
  const { futureMedia, credibility } = landingContent;

  useGSAP(
    () => {
      registerGsap();

      revealOnScroll("[data-credibility-item]", {
        y: 24,
        stagger: 0.1,
        scrollTrigger: {
          trigger: "[data-credibility-list]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      refreshScrollTriggers();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow={futureMedia.eyebrow}
              title={futureMedia.title}
              description={futureMedia.description}
            />
            <div className="mt-8 overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-lowest">
              <div className="flex aspect-video items-center justify-center bg-surface-container">
                <p className="text-sm font-medium text-on-surface-variant">
                  {futureMedia.placeholderLabel}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <SectionHeading
              eyebrow={credibility.eyebrow}
              title={credibility.title}
              description={credibility.founderNote}
            />
            <ul data-credibility-list className="mt-8 space-y-3">
              {credibility.placeholders.map((item) => (
                <li
                  key={item}
                  data-credibility-item
                  className="rounded-lg border border-dashed border-outline-variant/70 px-4 py-3 text-sm text-on-surface-variant"
                >
                  {item} placeholder
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
