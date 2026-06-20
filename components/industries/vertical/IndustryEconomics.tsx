"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVerticalPage, type VerticalSlug } from "@/lib/content";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type IndustryEconomicsProps = {
  slug: VerticalSlug;
};

export function IndustryEconomics({ slug }: IndustryEconomicsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const page = getVerticalPage(slug);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-challenge-stat]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  if (!page) {
    return null;
  }

  const { economics } = page;

  return (
    <section ref={sectionRef} className="bg-surface-low section-y">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow={economics.eyebrow}
            title={economics.title}
            description={economics.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          {economics.stats.map((stat) => (
            <article
              key={stat.id}
              data-challenge-stat
              className="rounded-2xl border border-outline-variant/50 bg-surface-lowest p-6 text-center shadow-sm"
            >
              <p className="font-display text-4xl font-extrabold text-primary md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-bold text-on-surface md:text-base">{stat.label}</p>
              {stat.detail ? (
                <p className="mt-2 text-xs leading-5 text-on-surface-variant">{stat.detail}</p>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
