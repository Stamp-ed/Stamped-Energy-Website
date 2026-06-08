import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
};

export default function IndustriesPage() {
  return (
    <section className="py-28 md:py-36">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          title="Industry pages coming soon"
          description={landingContent.industries.description}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {landingContent.industries.items.map((industry) => (
            <article
              key={industry.id}
              id={industry.id}
              className="scroll-mt-28 rounded-lg border border-outline-variant/50 bg-surface-lowest p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {industry.focus}
              </p>
              <h2 className="mt-2 text-lg font-bold">{industry.name}</h2>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                {industry.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
