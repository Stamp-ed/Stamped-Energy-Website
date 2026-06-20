"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVerticalPage, type VerticalSlug } from "@/lib/content";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type IndustryFaqProps = {
  slug: VerticalSlug;
};

export function IndustryFaq({ slug }: IndustryFaqProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const page = getVerticalPage(slug);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-faq-item]", {
        autoAlpha: 0,
        y: 18,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  if (!page || page.faq.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="bg-surface section-y">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-8 max-w-3xl space-y-4 md:mt-12">
          {page.faq.map((item) => (
            <article
              key={item.id}
              data-faq-item
              className="rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 md:p-6"
            >
              <h3 className="text-base font-bold text-on-surface md:text-lg">{item.question}</h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant md:leading-7">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
