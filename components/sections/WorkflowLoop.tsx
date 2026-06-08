import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { landingContent } from "@/lib/content";

export function WorkflowLoop() {
  const { workflow } = landingContent;

  return (
    <section className="bg-surface-low py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={workflow.eyebrow}
            title={workflow.title}
            align="center"
          />
        </Reveal>

        <StaggerReveal className="mt-14 grid gap-4 md:grid-cols-5">
          {workflow.steps.map((step, index) => (
            <StaggerItem key={step.id}>
              <article className="h-full rounded-xl border border-outline-variant/60 bg-surface-lowest p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 text-lg font-bold text-on-surface">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">
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
