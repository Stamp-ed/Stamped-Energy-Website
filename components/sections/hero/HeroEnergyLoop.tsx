"use client";

import { Fragment } from "react";

import { Container } from "@/components/ui/Container";
import { landingContent } from "@/lib/content";
import { cn } from "@/lib/utils";

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

const LOOP_GAP_CLASS = "w-4 shrink-0 sm:w-5";

export function HeroEnergyLoop() {
  const { workflow } = landingContent;
  const steps = workflow.steps;

  return (
    <div data-hero="loop" className="hidden border-b border-outline-variant/30 bg-surface pb-10 pt-10 md:pb-14 md:pt-12 lg:block">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] xl:gap-12">
          <div className="max-w-xs lg:max-w-none">
            <h2 className="font-display text-2xl font-extrabold leading-tight text-on-surface md:text-[1.65rem]">
              {workflow.eyebrow}
            </h2>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant md:text-[0.9375rem] md:leading-7">
              {workflow.title}
            </p>
          </div>

          <div>
            <div className="flex items-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden">
              {steps.map((step, index) => {
                const Icon = STEP_ICONS[step.id as keyof typeof STEP_ICONS] ?? LoopConnectIcon;
                const isLast = index === steps.length - 1;

                return (
                  <Fragment key={step.id}>
                    <article className="flex min-w-[9.5rem] flex-1 flex-col rounded-2xl border border-outline-variant/35 bg-surface-lowest px-3.5 py-4 shadow-[0_2px_12px_-4px_rgba(25,28,26,0.08)] sm:min-w-[10.25rem] sm:px-4 sm:py-5 lg:min-w-0">
                      <p className="font-display text-sm font-extrabold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <div className="mt-3 text-on-surface">
                        <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                      </div>
                      <h3 className="mt-3 text-sm font-bold leading-snug text-on-surface">{step.title}</h3>
                      <p className="mt-1.5 text-[11px] leading-5 text-on-surface-variant sm:text-xs sm:leading-[1.35rem]">
                        {step.description}
                      </p>
                    </article>

                    {!isLast ? (
                      <div
                        className={cn("flex items-center justify-center text-primary", LOOP_GAP_CLASS)}
                        aria-hidden
                      >
                        <LoopArrowIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </div>
                    ) : null}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
