"use client";

import { useRef } from "react";

import { StepDiagram } from "@/components/how-it-works/diagrams/StepDiagram";
import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";
import { animateDiagramPanel } from "@/lib/motion/animateDiagram";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { getPinScrollStart } from "@/lib/motion/pinLayout";
import { cn } from "@/lib/utils";

export function HiwPinnedJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(-1);
  const { journey } = howItWorksContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-journey-panel]");
        const stepNav = gsap.utils.toArray<HTMLElement>("[data-journey-step]");

        if (!panels.length) {
          return;
        }

        const setActivePanel = (index: number) => {
          panels.forEach((panel, panelIndex) => {
            const isActive = panelIndex === index;
            gsap.set(panel, {
              autoAlpha: isActive ? 1 : 0,
              visibility: isActive ? "visible" : "hidden",
              pointerEvents: isActive ? "auto" : "none",
            });
          });

          stepNav.forEach((step, stepIndex) => {
            const isActive = stepIndex === index;
            const tagline = step.querySelector<HTMLElement>("[data-journey-tagline]");

            gsap.set(step, {
              autoAlpha: isActive ? 1 : 0.55,
              scale: isActive ? 1.02 : 1,
            });

            if (tagline) {
              tagline.classList.toggle("hidden", !isActive);
            }

            step.classList.toggle("border-primary/50", isActive);
            step.classList.toggle("bg-primary/5", isActive);
            step.classList.toggle("shadow-md", isActive);
          });
        };

        const activateStep = (index: number) => {
          if (index === activeIndexRef.current) {
            return;
          }

          activeIndexRef.current = index;
          setActivePanel(index);
          requestAnimationFrame(() => {
            animateDiagramPanel(panels[index]);
          });
        };

        activateStep(0);

        const scrollTrigger = ScrollTrigger.create({
          trigger: pinRef.current,
          start: getPinScrollStart(),
          end: () => `+=${(panels.length - 1) * 100}%`,
          pin: pinRef.current,
          pinSpacing: true,
          scrub: 0.35,
          anticipatePin: 0,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.15, max: 0.35 },
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const index = Math.min(
              Math.round(self.progress * (panels.length - 1)),
              panels.length - 1,
            );
            activateStep(index);
          },
        });

        return () => {
          scrollTrigger.kill();
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-journey-panel-mobile]");

        panels.forEach((panel) => {
          gsap.from(panel, {
            autoAlpha: 0,
            y: 36,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              once: true,
            },
          });

          ScrollTrigger.create({
            trigger: panel,
            start: "top 70%",
            once: true,
            onEnter: () => animateDiagramPanel(panel),
          });
        });
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="bg-surface-low">
      <Container className="pt-16 pb-6 md:pt-20 md:pb-8">
        <SectionHeading
          eyebrow={journey.eyebrow}
          title={journey.title}
          description={journey.description}
          align="center"
          className="mx-auto"
        />
      </Container>

      <div ref={pinRef} className="hidden lg:block">
        <Container className="w-full pb-12">
          <div className="grid grid-cols-12 items-center gap-10 xl:gap-14">
            <div className="col-span-3 flex flex-col gap-2 xl:col-span-3">
              {journey.steps.map((step, index) => (
                <div
                  key={step.id}
                  data-journey-step
                  className={cn(
                    "rounded-xl border border-outline-variant/40 bg-surface-lowest/95 px-4 py-3 transition-colors",
                    index === 0 && "border-primary/50 bg-primary/5 shadow-md",
                  )}
                >
                  <div className="flex items-baseline gap-3">
                    <p className="font-display text-2xl font-extrabold leading-none text-primary">
                      {String(step.step).padStart(2, "0")}
                    </p>
                    <p className="text-base font-bold text-on-surface">{step.title}</p>
                  </div>
                  <p
                    data-journey-tagline
                    className={cn(
                      "mt-1.5 text-sm leading-5 text-on-surface-variant",
                      index !== 0 && "hidden",
                    )}
                  >
                    {step.tagline}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative col-span-9 min-h-[min(58vh,560px)] xl:col-span-9">
              {journey.steps.map((step, index) => (
                <article
                  key={step.id}
                  data-journey-panel
                  className="absolute inset-0 grid grid-cols-1 items-center gap-10 xl:grid-cols-2 xl:gap-12"
                  style={{
                    visibility: index === 0 ? "visible" : "hidden",
                    opacity: index === 0 ? 1 : 0,
                  }}
                >
                  <div className="max-w-xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                      Step {step.step}
                    </p>
                    <h3 className="mt-2 text-3xl font-bold text-on-surface md:text-4xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base font-medium text-on-surface-variant">
                      {step.tagline}
                    </p>
                    <p className="mt-4 text-base leading-7 text-on-surface-variant">
                      {step.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {step.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2.5 text-sm leading-6 text-on-surface-variant md:text-base md:leading-7"
                        >
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full xl:min-w-[340px]">
                    <StepDiagram diagram={step.diagram} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container className="space-y-12 py-12 lg:hidden">
        {journey.steps.map((step) => (
          <article
            key={step.id}
            data-journey-panel-mobile
            className="rounded-xl border border-outline-variant/50 bg-surface-lowest p-5"
          >
            <p className="font-display text-3xl font-extrabold text-primary">
              {String(step.step).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-xl font-bold text-on-surface">{step.title}</h3>
            <p className="mt-1 text-sm font-medium text-on-surface-variant">{step.tagline}</p>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">{step.description}</p>
            <ul className="mt-4 space-y-2">
              {step.bullets.map((bullet) => (
                <li key={bullet} className="text-sm leading-6 text-on-surface-variant">
                  • {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <StepDiagram diagram={step.diagram} />
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
}
