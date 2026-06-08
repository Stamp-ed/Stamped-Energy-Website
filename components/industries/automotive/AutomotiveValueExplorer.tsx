"use client";

import { useRef, useState } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industriesContent } from "@/lib/content";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

export function AutomotiveValueExplorer() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { valueExplorer } = industriesContent.automotive;
  const [activeId, setActiveId] = useState(valueExplorer.areas[0]?.id ?? "");
  const active =
    valueExplorer.areas.find((area) => area.id === activeId) ?? valueExplorer.areas[0];
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !panelRef.current) {
        return;
      }

      gsap.from("[data-value-tab]", {
        autoAlpha: 0,
        x: -12,
        duration: 0.45,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !panelRef.current || !active) {
        return;
      }

      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0.6, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    },
    { scope: panelRef, dependencies: [activeId, isReady, prefersReducedMotion] },
  );

  if (!active) {
    return null;
  }

  return (
    <section ref={sectionRef} className="overflow-hidden bg-secondary py-20 text-on-secondary md:py-28">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow={valueExplorer.eyebrow}
            title={valueExplorer.title}
            description={valueExplorer.description}
            align="center"
            dark
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8">
          <div className="flex flex-col gap-2">
            {valueExplorer.areas.map((area) => {
              const isActive = area.id === active.id;
              return (
                <button
                  key={area.id}
                  type="button"
                  data-value-tab
                  className={cn(
                    "rounded-xl border px-4 py-3.5 text-left transition-colors md:px-5 md:py-4",
                    isActive
                      ? "border-primary/45 bg-primary/10 shadow-sm"
                      : "border-on-secondary/15 bg-inverse-surface/40 hover:border-on-secondary/25",
                  )}
                  onClick={() => setActiveId(area.id)}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className={cn(
                        "font-display text-lg font-extrabold",
                        isActive ? "text-inverse-primary" : "text-on-secondary/50",
                      )}
                    >
                      {area.step}
                    </span>
                    <span className="text-sm font-bold md:text-base">{area.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            ref={panelRef}
            className="flex flex-col justify-center rounded-2xl border border-on-secondary/15 bg-inverse-surface/50 p-6 backdrop-blur-sm md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-inverse-primary">
              {active.step} · Selected area
            </p>
            <h3 className="mt-2 text-2xl font-bold md:text-3xl">{active.title}</h3>
            <p className="mt-3 text-sm leading-7 text-on-secondary/85 md:text-base">
              {active.description}
            </p>
            <div className="mt-6 inline-flex w-fit items-baseline gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-inverse-primary">
                {active.potentialLabel}
              </span>
              <span className="text-xl font-extrabold text-on-secondary">{active.potentialValue}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
