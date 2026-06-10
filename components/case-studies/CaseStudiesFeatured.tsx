"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudiesContent } from "@/lib/content/caseStudies";
import type { CaseStudyListItem } from "@/lib/case-studies/studies";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type CaseStudiesFeaturedProps = {
  studies: CaseStudyListItem[];
};

export function CaseStudiesFeatured({ studies }: CaseStudiesFeaturedProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = studies.filter((s) => s.featured);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-cs-featured]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section ref={sectionRef} className="border-b border-outline-variant/40 bg-surface section-y">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Featured"
            title={caseStudiesContent.featuredTitle}
            className="mx-auto text-center"
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-6xl gap-5 md:mt-12 lg:grid-cols-3">
          {featured.length === 0 ? (
            <p className="col-span-full text-center text-sm text-on-surface-variant">
              Featured case studies will appear here once published.
            </p>
          ) : (
          featured.map((study) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.slug}`}
              data-cs-featured
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={study.imageSrc}
                  alt={study.imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                {study.tag ? (
                  <span className="absolute left-3 top-3 rounded-full bg-secondary/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-on-secondary">
                    {study.tag}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                  {study.categoryLabel}
                </p>
                <h3 className="mt-1 text-base font-bold leading-snug text-on-surface group-hover:text-primary md:text-lg">
                  {study.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-on-surface-variant">
                  {study.excerpt}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-outline-variant/40 pt-4">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <p className="font-display text-sm font-extrabold text-primary md:text-base">
                        {metric.value}
                      </p>
                      <p className="mt-0.5 text-[10px] leading-tight text-on-surface-variant">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
                <span className="mt-4 text-sm font-semibold text-primary">Read more →</span>
              </div>
            </Link>
          ))
          )}
        </div>
      </Container>
    </section>
  );
}
