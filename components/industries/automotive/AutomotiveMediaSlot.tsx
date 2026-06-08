"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industriesContent } from "@/lib/content";
import { cn } from "@/lib/utils";

type AutomotiveMediaSlotProps = {
  className?: string;
};

export function AutomotiveMediaSlot({ className }: AutomotiveMediaSlotProps) {
  const { mediaSlot } = industriesContent.automotive;

  return (
    <section className={cn("bg-surface-low py-10 md:py-14", className)}>
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow={mediaSlot.eyebrow}
            title={mediaSlot.title}
            description={mediaSlot.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-6xl" delay={0.08}>
          <div
            className="relative flex min-h-[min(72vh,720px)] w-full items-center justify-center overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-sm"
            aria-label={mediaSlot.mediaAlt}
          >
            {mediaSlot.mediaSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mediaSlot.mediaSrc}
                alt={mediaSlot.mediaAlt}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex max-w-md flex-col items-center px-6 text-center">
                <span
                  aria-hidden="true"
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-outline-variant/60 bg-surface-low text-2xl text-on-surface-variant"
                >
                  ▷
                </span>
                <p className="text-base font-bold text-on-surface">{mediaSlot.placeholderTitle}</p>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {mediaSlot.placeholderDescription}
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
