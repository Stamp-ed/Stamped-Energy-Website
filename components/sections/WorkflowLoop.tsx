"use client";

import Link from "next/link";

import { GifPlaceholder } from "@/components/how-it-works/GifPlaceholder";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";

export function WorkflowLoop() {
  const { workflow } = landingContent;

  return (
    <section className="bg-surface-low py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={workflow.eyebrow}
            title={workflow.title}
            description={workflow.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-5xl">
          <GifPlaceholder
            variant="hero"
            title={workflow.media.title}
            description={workflow.media.description}
            src={workflow.media.src}
            posterAlt={workflow.media.posterAlt}
          />
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-4xl">
          <ol className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {workflow.steps.map((step, index) => (
              <li key={step.id}>
                <span className="inline-flex items-center gap-2 rounded-full border border-outline-variant/50 bg-surface-lowest px-3 py-1.5 text-xs font-medium text-on-surface-variant">
                  <span className="font-display font-extrabold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step.title}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-sm text-on-surface-variant">
            Full interactive walkthrough on{" "}
            <Link href="/how-it-works" className="font-semibold text-primary underline-offset-2 hover:underline">
              How it works
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
