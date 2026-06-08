import { GifPlaceholder } from "@/components/how-it-works/GifPlaceholder";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";

export function HiwMediaSlots() {
  const dashboardSlot = howItWorksContent.gifSlots[1];

  if (!dashboardSlot) {
    return null;
  }

  return (
    <section className="border-t border-outline-variant/40 py-20 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Optional media"
          title="Dashboard walkthrough GIF"
          description="The opening plant SLD animation lives at the top of this page. This slot is for an optional product UI walkthrough."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-12 max-w-4xl">
          <GifPlaceholder
            title={dashboardSlot.title}
            description={dashboardSlot.description}
            reason={dashboardSlot.reason}
          />
        </div>
      </Container>
    </section>
  );
}
