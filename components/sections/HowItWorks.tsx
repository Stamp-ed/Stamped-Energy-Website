import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";

export function HowItWorks() {
  const { howItWorks } = landingContent;

  return (
    <section className="bg-surface-low py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={howItWorks.eyebrow} title={howItWorks.title} />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {howItWorks.steps.map((step, index) => (
            <Reveal key={step.id} delay={index * 0.05}>
              <article className="h-full rounded-lg border border-outline-variant/50 bg-surface-lowest p-5">
                <p className="font-display text-2xl font-extrabold text-primary">
                  {String(step.step).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-base font-bold text-on-surface">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Button href={howItWorks.cta.href} variant="secondary">
            {howItWorks.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
