import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <section className="py-28 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="About us"
            title={`Built for manufacturers who need proof, not dashboards`}
            description={`${siteConfig.name} is building prescriptive energy intelligence for Indian SMEs — starting with auto components and expanding across discrete manufacturing.`}
          />
        </Reveal>
      </Container>
    </section>
  );
}
