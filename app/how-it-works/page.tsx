import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { landingContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "How It Works",
};

export default function HowItWorksPage() {
  return (
    <section className="py-28 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Full workflow page coming soon"
            description="This route is scaffolded. Greenovative-style scroll storytelling will land here next — the preview below covers the five-step workflow for now."
          />
        </Reveal>

        <StaggerReveal className="mt-12 space-y-4">
          {landingContent.howItWorks.steps.map((step) => (
            <StaggerItem key={step.id}>
              <article className="rounded-lg border border-outline-variant/50 bg-surface-lowest p-5">
                <p className="text-sm font-semibold text-primary">Step {step.step}</p>
                <h2 className="mt-2 text-lg font-bold">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {step.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
