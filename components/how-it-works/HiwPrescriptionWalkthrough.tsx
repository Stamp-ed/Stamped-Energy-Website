"use client";

import { DashboardEmbed } from "@/components/how-it-works/DashboardEmbed";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";

export function HiwPrescriptionWalkthrough() {
  const { prescriptionDemo } = howItWorksContent;

  return (
    <section className="relative bg-surface-low py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={prescriptionDemo.eyebrow}
            title={prescriptionDemo.title}
            description={prescriptionDemo.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-5xl">
          <DashboardEmbed embed={prescriptionDemo.embed} />
        </Reveal>
      </Container>
    </section>
  );
}
