import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { landingContent } from "@/lib/content";

export function Problem() {
  const { problem } = landingContent;

  return (
    <section className="bg-surface-container py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={problem.eyebrow} title={problem.title} />
        </Reveal>

        <StaggerReveal className="mt-12 grid gap-4 lg:grid-cols-3">
          {problem.items.map((item) => (
            <article
              key={item.id}
              data-stagger-item
              className="h-full rounded-lg border border-outline-variant/50 bg-surface-lowest p-6"
            >
              <h3 className="text-lg font-bold text-on-surface">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                {item.description}
              </p>
            </article>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
