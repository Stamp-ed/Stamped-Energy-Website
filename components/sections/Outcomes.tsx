"use client";

import { useRef } from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { registerGsap, useGSAP } from "@/lib/motion/gsap";
import { refreshScrollTriggers, revealOnScroll } from "@/lib/motion/scrollAnimations";

export function Outcomes() {
  const sectionRef = useRef<HTMLElement>(null);
  const { outcomes } = landingContent;

  useGSAP(
    () => {
      registerGsap();

      revealOnScroll("[data-outcome-card]", {
        y: 52,
        stagger: 0.12,
        duration: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
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
        <Reveal>
          <SectionHeading
            eyebrow={outcomes.eyebrow}
            title={outcomes.title}
            description={outcomes.disclaimer}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {outcomes.stats.map((stat) => (
            <article
              key={stat.id}
              data-outcome-card
              className="accent-card rounded-lg border border-outline-variant/50 bg-surface-lowest p-6"
            >
              <p className="font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm font-semibold text-on-surface">{stat.label}</p>
              {stat.detail ? (
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{stat.detail}</p>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
