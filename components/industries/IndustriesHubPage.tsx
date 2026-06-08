"use client";

import Link from "next/link";
import { useRef } from "react";

import { IndustriesExplorerPanel } from "@/components/industries/IndustriesExplorerPanel";
import { IndustryResources } from "@/components/industries/shared/IndustryResources";
import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industriesContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function IndustriesHubPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hub, verticals } = industriesContent;
  const featured = verticals[0];
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-hub-intro]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.75,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden border-b border-outline-variant/40 bg-surface pb-16 pt-28 md:pb-20 md:pt-32"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,color-mix(in_srgb,var(--brand-primary)_10%,transparent),transparent_55%)]"
        />
        <Container className="relative z-10">
          <div data-hub-intro className="mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow={hub.eyebrow}
              title={hub.title}
              description={hub.description}
              align="center"
              className="mx-auto"
            />
          </div>

          <div data-hub-intro className="mx-auto mt-12 max-w-4xl">
            <IndustriesExplorerPanel />
          </div>

          {featured ? (
            <div data-hub-intro className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-2xl border border-primary/25 bg-primary/5 p-5 sm:flex-row md:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  Featured vertical
                </p>
                <p className="mt-1 text-lg font-bold text-on-surface">{featured.name}</p>
                <p className="mt-1 text-sm text-on-surface-variant">{featured.description}</p>
              </div>
              <Button href={featured.href} variant="primary">
                Explore {featured.name}
              </Button>
            </div>
          ) : null}

          <p data-hub-intro className="mx-auto mt-8 max-w-2xl text-center text-xs text-on-surface-variant">
            More verticals will appear here as validation grows. Process segments use expandable
            cards on the industry page today — dedicated segment URLs are planned next.
          </p>
        </Container>
      </section>

      <IndustryResources />
      <section className="bg-secondary py-16 md:py-20">
        <Container>
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="text-sm text-on-secondary/80">
              Ready to map your plant?{" "}
              <Link href={hub.cta.href} className="font-semibold text-inverse-primary hover:underline">
                {hub.cta.label}
              </Link>
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
