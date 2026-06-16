"use client";

import { Container } from "@/components/ui/Container";
import { landingContent } from "@/lib/content";

import {
  LoopArrowIcon,
  LoopConnectIcon,
  LoopDecideIcon,
  LoopExecuteIcon,
  LoopObserveIcon,
  LoopVerifyIcon,
} from "./HeroIcons";

const STEP_ICONS = {
  connect: LoopConnectIcon,
  observe: LoopObserveIcon,
  decide: LoopDecideIcon,
  execute: LoopExecuteIcon,
  verify: LoopVerifyIcon,
} as const;

export function HeroEnergyLoop() {
  const { workflow } = landingContent;

  return (
    <div data-hero="loop" className="border-b border-outline-variant/30 bg-surface pb-10 pt-10 md:pb-14 md:pt-12">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
          <div className="lg:pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {workflow.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-xl font-extrabold leading-snug text-on-surface md:text-2xl">
              {workflow.title}
            </h2>
          </div>

          <div className="relative">
            <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {workflow.steps.map((step, index) => {
                const Icon = STEP_ICONS[step.id as keyof typeof STEP_ICONS] ?? LoopConnectIcon;
                const isLast = index === workflow.steps.length - 1;

                return (
                  <div key={step.id} className="flex min-w-[11.5rem] shrink-0 items-stretch sm:min-w-[12.5rem] lg:min-w-0 lg:flex-1">
                    <article className="flex flex-1 flex-col rounded-xl border border-outline-variant/50 bg-surface-lowest p-4 shadow-sm sm:p-5">
                      <p className="font-display text-sm font-extrabold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant/40 bg-surface-low text-on-surface">
                        <Icon />
                      </div>
                      <h3 className="mt-3 text-sm font-bold text-on-surface">{step.title}</h3>
                      <p className="mt-1.5 flex-1 text-xs leading-5 text-on-surface-variant sm:text-sm sm:leading-6">
                        {step.description}
                      </p>
                    </article>
                    {!isLast ? (
                      <div className="hidden shrink-0 items-center px-1 text-primary lg:flex" aria-hidden>
                        <LoopArrowIcon className="h-4 w-4" />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {/* Loop-back arrow hint */}
            <div className="pointer-events-none absolute -bottom-1 left-[8%] right-[8%] hidden h-8 lg:block" aria-hidden>
              <svg viewBox="0 0 800 32" className="h-full w-full" fill="none" preserveAspectRatio="none">
                <path
                  d="M20 8 C200 28, 600 28, 780 8"
                  stroke="var(--brand-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.45"
                />
                <path
                  d="M24 10 L14 8 L18 16"
                  stroke="var(--brand-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.45"
                />
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
