"use client";

import { useRef } from "react";

import { PayAsYouSaveChartVisual } from "@/components/sections/comparison/PayAsYouSaveChartVisual";
import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

export function PayAsYouSaveComparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const { payAsYouSave } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  const [traditional, stamped] = payAsYouSave.approaches;

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !sectionRef.current) {
        return;
      }

      const cardTween = gsap.from("[data-pay-card]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      const benefitTween = gsap.from("[data-pay-benefit]", {
        autoAlpha: 0,
        y: 18,
        duration: 0.55,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-pay-benefits]",
          start: "top 88%",
          once: true,
        },
      });

      return () => {
        cardTween.scrollTrigger?.kill();
        cardTween.kill();
        benefitTween.scrollTrigger?.kill();
        benefitTween.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} id="pay-as-you-save" className="relative overflow-hidden bg-surface-low section-y">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />

      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={payAsYouSave.eyebrow}
            title={payAsYouSave.title}
            description={payAsYouSave.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="relative mx-auto mt-8 grid max-w-6xl gap-6 md:mt-12 md:grid-cols-2 md:gap-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[calc(50%+1.5rem)] z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-outline-variant/60 bg-surface-lowest text-sm font-bold text-primary shadow-sm md:flex"
          >
            vs
          </div>

          {[traditional, stamped].map((approach) => {
            const isStamped = approach.variant === "stamped";

            return (
              <article
                key={approach.variant}
                data-pay-card
                className={cn(
                  "overflow-hidden rounded-2xl border bg-surface-lowest shadow-sm",
                  isStamped
                    ? "border-2 border-primary/35 shadow-[0_20px_50px_-30px_color-mix(in_srgb,var(--brand-primary)_50%,transparent)]"
                    : "border-outline-variant/60",
                )}
              >
                <div
                  className={cn(
                    "border-b px-5 py-4 sm:px-6",
                    isStamped
                      ? "border-primary/20 bg-primary/10"
                      : "border-outline-variant/50 bg-surface-dim/60",
                  )}
                >
                  <h3
                    className={cn(
                      "text-lg font-bold",
                      isStamped ? "text-on-surface" : "text-on-surface-variant",
                    )}
                  >
                    {approach.label}
                  </h3>
                  <p className="mt-1.5 text-sm leading-5 text-on-surface-variant">{approach.description}</p>
                </div>

                <div className="p-3 sm:p-4 md:p-5">
                  <div className="overflow-hidden rounded-xl border border-outline-variant/40 bg-surface-low/60 p-2 sm:p-3 md:p-4">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary sm:text-xs">
                      Investment vs return
                    </p>
                    <PayAsYouSaveChartVisual variant={approach.variant} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-[0.12em] text-on-surface-variant">
          {payAsYouSave.legend.map((item, index) => (
            <span key={item} className="inline-flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="hidden text-outline-variant sm:inline">
                  ·
                </span>
              ) : null}
              {item === "Investment" ? (
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 rounded-sm bg-[var(--brand-on-secondary-container)]"
                />
              ) : item === "ROI" ? (
                <span
                  aria-hidden="true"
                  className="inline-block h-0.5 w-5 rounded-full bg-primary"
                />
              ) : (
                <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
              )}
              {item}
            </span>
          ))}
        </div>

        <div data-pay-benefits className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-3 md:gap-6">
          {payAsYouSave.benefits.map((benefit) => (
            <article
              key={benefit.id}
              data-pay-benefit
              className="rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 text-center"
            >
              <h4 className="font-display text-base font-bold text-on-surface">{benefit.title}</h4>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">{benefit.description}</p>
            </article>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Button href={payAsYouSave.cta.href} variant="primary">
            {payAsYouSave.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
