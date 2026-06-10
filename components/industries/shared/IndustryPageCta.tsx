"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { industriesContent } from "@/lib/content";

type IndustryPageCtaProps = {
  content?: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
  };
};

export function IndustryPageCta({ content }: IndustryPageCtaProps) {
  const cta = content ?? industriesContent.automotive.finalCta;

  return (
    <section className="bg-secondary section-y text-on-secondary">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-inverse-primary">
            {cta.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">{cta.title}</h2>
          <p className="mt-3 text-sm leading-6 text-on-secondary/80 md:text-base">
            {cta.description}
          </p>
          <div className="mt-6">
            <Button href={cta.primaryCta.href} variant="primary">
              {cta.primaryCta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
