"use client";

import { useRef } from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { registerGsap, useGSAP } from "@/lib/motion/gsap";
import { revealOnScroll } from "@/lib/motion/scrollAnimations";

export function Outcomes() {
  const sectionRef = useRef<HTMLElement>(null);
  const { outcomes } = landingContent;

  useGSAP(
    () => {
      registerGsap();

      revealOnScroll("[data-outcome-card]", {
        y: 48,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
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
              className="rounded-lg border border-outline-variant/50 bg-surface-lowest p-6 transition-transform duration-300 hover:-translate-y-1"
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
