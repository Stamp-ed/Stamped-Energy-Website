import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { landingContent } from "@/lib/content";

export function Problem() {
  const { problem } = landingContent;

  return (
    <section className="relative overflow-hidden bg-secondary py-20 text-on-secondary md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,color-mix(in_srgb,var(--brand-primary)_18%,transparent),transparent_55%)]"
      />

      <Container className="relative z-10">
        <Reveal>
          <SectionHeading eyebrow={problem.eyebrow} title={problem.title} dark />
        </Reveal>

        <StaggerReveal className="mt-12 grid gap-4 lg:grid-cols-3">
          {problem.items.map((item, index) => (
            <article
              key={item.id}
              data-stagger-item
              className="accent-card h-full rounded-xl border border-on-secondary/15 bg-surface-lowest p-6 text-on-surface shadow-lg"
            >
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-primary">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-lg font-bold text-on-surface">{item.title}</h3>
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
