"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industriesContent } from "@/lib/content";
import { getSegmentImageFocus } from "@/lib/industries/imageFocus";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

export function IndustriesHubFeatured() {
  const sectionRef = useRef<HTMLElement>(null);
  const { featured } = industriesContent.hub;
  const vertical = industriesContent.verticals[0];
  const [showSegments, setShowSegments] = useState(false);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-hub-featured]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });

      gsap.from("[data-hub-segment]", {
        autoAlpha: 0,
        y: 18,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  if (!vertical) {
    return null;
  }

  return (
    <section ref={sectionRef} className="bg-surface-low section-y">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow={featured.eyebrow}
            title={featured.title}
            description={featured.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div
          data-hub-featured
          className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-sm md:mt-12"
        >
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            <div className="relative min-h-[14rem] lg:min-h-[22rem]">
              <Image
                src={vertical.heroImageSrc}
                alt={vertical.heroImageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-secondary/10 lg:to-secondary/40" />
              <div className="absolute bottom-0 left-0 p-5 sm:p-6 lg:hidden">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-inverse-primary">
                  {vertical.name}
                </p>
                <p className="mt-1 max-w-xs text-sm text-on-secondary/90">{vertical.tagline}</p>
              </div>
            </div>

            <div className="flex flex-col p-5 sm:p-6 md:p-8">
              <div className="hidden lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {vertical.name}
                </p>
                <p className="mt-1 text-lg font-bold text-on-surface">{vertical.tagline}</p>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {vertical.description}
                </p>
              </div>

              <div
                className={cn(
                  "mt-0 grid gap-3 sm:grid-cols-2 lg:mt-8",
                  !showSegments && "hidden md:grid",
                )}
              >
                {vertical.segments.map((segment) => (
                  <Link
                    key={segment.id}
                    data-hub-segment
                    href={segment.href}
                    className="group flex gap-3 rounded-xl border border-outline-variant/40 bg-surface-low/60 p-3 transition-colors hover:border-primary/35 hover:bg-primary/5"
                  >
                    <div className="relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={segment.imageSrc}
                        alt={segment.imageAlt}
                        fill
                        className={getSegmentImageFocus(segment.id)}
                        sizes="72px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-on-surface group-hover:text-primary">
                        {segment.name}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-on-surface-variant">
                        {segment.focus}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant/60 bg-surface-low px-4 py-3 text-sm font-semibold text-on-surface transition-colors hover:border-primary/35 hover:bg-primary/5 md:hidden"
                aria-expanded={showSegments}
                onClick={() => setShowSegments((open) => !open)}
              >
                {showSegments ? featured.showLessLabel : featured.showMoreLabel}
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-primary transition-transform duration-200",
                    showSegments && "rotate-180",
                  )}
                >
                  ▾
                </span>
              </button>

              <div className="mt-5 lg:mt-auto lg:pt-6">
                <Button href={featured.cta.href} variant="primary" className="w-full sm:w-auto">
                  {featured.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
