import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "How It Works",
};

export default function HowItWorksPage() {
  return (
    <section className="py-28 md:py-36">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Full workflow page coming soon"
          description="This route is scaffolded. The landing page preview covers the five-step workflow for now."
        />

        <ol className="mt-12 space-y-4">
          {landingContent.howItWorks.steps.map((step) => (
            <li
              key={step.id}
              className="rounded-lg border border-outline-variant/50 bg-surface-lowest p-5"
            >
              <p className="text-sm font-semibold text-primary">Step {step.step}</p>
              <h2 className="mt-2 text-lg font-bold">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
