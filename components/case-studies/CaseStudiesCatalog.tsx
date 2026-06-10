"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  caseStudiesContent,
  type CaseStudyCategory,
} from "@/lib/content/caseStudies";
import type { CaseStudyListItem } from "@/lib/case-studies/studies";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

const INITIAL_VISIBLE = 4;

type CaseStudiesCatalogProps = {
  studies: CaseStudyListItem[];
};

export function CaseStudiesCatalog({ studies }: CaseStudiesCatalogProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<CaseStudyCategory>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const { isReady, prefersReducedMotion } = useMotion();

  const filtered = useMemo(() => {
    if (activeFilter === "all") {
      return studies;
    }
    return studies.filter((study) => study.category === activeFilter);
  }, [activeFilter, studies]);

  const visibleStudies = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-cs-catalog]", {
        autoAlpha: 0,
        y: 22,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion, activeFilter, visibleCount] },
  );

  return (
    <section ref={sectionRef} className="bg-surface-low section-y">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow="Catalog"
            title={caseStudiesContent.catalogTitle}
            description={caseStudiesContent.catalogDescription}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div
          data-cs-catalog
          className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2 md:mt-10"
          role="tablist"
          aria-label="Filter case studies"
        >
          {caseStudiesContent.filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                setVisibleCount(INITIAL_VISIBLE);
              }}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors md:px-4 md:py-2 md:text-sm",
                activeFilter === filter.id
                  ? "border-secondary bg-secondary text-on-secondary"
                  : "border-outline-variant/60 bg-surface-lowest text-on-surface-variant hover:border-outline-variant hover:text-on-surface",
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-5 md:mt-10 md:grid-cols-2">
          {visibleStudies.map((study) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.slug}`}
              data-cs-catalog
              className="group flex overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative hidden w-2/5 shrink-0 sm:block">
                <Image
                  src={study.imageSrc}
                  alt={study.imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="240px"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                    {study.categoryLabel}
                  </span>
                  {study.tag ? (
                    <span className="rounded-full bg-secondary-container/60 px-2 py-0.5 text-[10px] font-semibold text-on-secondary-container">
                      {study.tag}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-1 text-base font-bold text-on-surface group-hover:text-primary md:text-lg">
                  {study.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-on-surface-variant line-clamp-3">
                  {study.excerpt}
                </p>
                <span className="mt-3 text-sm font-semibold text-primary">Read more →</span>
              </div>
            </Link>
          ))}
        </div>

        {hasMore ? (
          <div data-cs-catalog className="mt-8 flex justify-center md:mt-10">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((count) => count + INITIAL_VISIBLE)}
            >
              Load more
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
