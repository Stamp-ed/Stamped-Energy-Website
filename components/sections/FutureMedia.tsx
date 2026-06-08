"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function FutureMedia() {
  const sectionRef = useRef<HTMLElement>(null);
  const { futureMedia, credibility } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-cred-link]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="border-t border-outline-variant/30 py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal from="left">
            <SectionHeading
              eyebrow={futureMedia.eyebrow}
              title={futureMedia.title}
              description={futureMedia.description}
            />
            <div className="mt-8 overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-lowest shadow-sm">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={futureMedia.imageSrc}
                  alt={futureMedia.imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-inverse-primary">
                    {futureMedia.placeholderLabel}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal from="right">
              <SectionHeading
                eyebrow={credibility.eyebrow}
                title={credibility.title}
                description={credibility.founderNote}
              />
            </Reveal>
            <div className="mt-8 space-y-3">
              <Link
                href="/case-studies"
                data-cred-link
                className="flex items-center gap-4 rounded-xl border border-outline-variant/50 bg-surface-lowest p-4 transition-colors hover:border-primary/35 hover:bg-primary/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  CS
                </span>
                <div>
                  <p className="text-sm font-bold text-on-surface">Case studies</p>
                  <p className="text-xs text-on-surface-variant">Verified SEC and MD outcomes from pilot plants</p>
                </div>
              </Link>
              <Link
                href="/how-it-works"
                data-cred-link
                className="flex items-center gap-4 rounded-xl border border-outline-variant/50 bg-surface-lowest p-4 transition-colors hover:border-primary/35 hover:bg-primary/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  HIW
                </span>
                <div>
                  <p className="text-sm font-bold text-on-surface">How it works</p>
                  <p className="text-xs text-on-surface-variant">Connect → Observe → Decide → Execute → Verify</p>
                </div>
              </Link>
              <Link
                href="/industries"
                data-cred-link
                className="flex items-center gap-4 rounded-xl border border-outline-variant/50 bg-surface-lowest p-4 transition-colors hover:border-primary/35 hover:bg-primary/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  IN
                </span>
                <div>
                  <p className="text-sm font-bold text-on-surface">Industries</p>
                  <p className="text-xs text-on-surface-variant">Automotive process segments — die casting to rubber moulding</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
