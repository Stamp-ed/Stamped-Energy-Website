import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { landingContent } from "@/lib/content";

export function HowItWorks() {
  const { howItWorks } = landingContent;

  return (
    <section className="bg-surface-low py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={howItWorks.eyebrow} title={howItWorks.title} />
        </Reveal>

        <StaggerReveal className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {howItWorks.steps.map((step) => (
            <StaggerItem key={step.id}>
              <article className="accent-card h-full rounded-lg border border-outline-variant/50 bg-surface-lowest p-5">
                <p className="font-display text-2xl font-extrabold text-primary">
                  {String(step.step).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-base font-bold text-on-surface">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {step.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <Reveal className="mt-10">
          <Button href={howItWorks.cta.href} variant="primary">
            {howItWorks.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
