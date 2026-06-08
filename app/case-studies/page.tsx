import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Case Studies",
};

export default function CaseStudiesPage() {
  return (
    <section className="py-28 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Case studies"
            title="Verified outcomes from the plant floor"
            description="Customer stories and ROI proof points are coming soon. The landing page shares target outcome ranges while we finalize publishable case studies."
          />
        </Reveal>
      </Container>
    </section>
  );
}
