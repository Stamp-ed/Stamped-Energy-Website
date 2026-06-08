import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { landingContent } from "@/lib/content";

export function FutureMedia() {
  const { futureMedia, credibility } = landingContent;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal from="left">
            <SectionHeading
              eyebrow={futureMedia.eyebrow}
              title={futureMedia.title}
              description={futureMedia.description}
            />
            <div className="mt-8 overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-lowest">
              <div className="flex aspect-video items-center justify-center bg-surface-container">
                <p className="text-sm font-medium text-on-surface-variant">
                  {futureMedia.placeholderLabel}
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal from="right">
              <SectionHeading
                eyebrow={credibility.eyebrow}
                title={credibility.title}
                description={credibility.founderNote}
              />
            </Reveal>
            <StaggerReveal className="mt-8 space-y-3">
              {credibility.placeholders.map((item) => (
                <StaggerItem key={item}>
                  <div className="rounded-lg border border-dashed border-outline-variant/70 px-4 py-3 text-sm text-on-surface-variant">
                    {item} placeholder
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
