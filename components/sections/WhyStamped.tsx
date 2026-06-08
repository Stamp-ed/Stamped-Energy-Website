import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { landingContent } from "@/lib/content";

export function WhyStamped() {
  const { whyStamped } = landingContent;

  return (
    <section className="relative overflow-hidden bg-secondary py-20 text-on-secondary md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,color-mix(in_srgb,var(--brand-primary)_16%,transparent),transparent_50%)]"
      />

      <Container className="relative z-10">
        <Reveal>
          <SectionHeading eyebrow={whyStamped.eyebrow} title={whyStamped.title} dark />
        </Reveal>

        <StaggerReveal className="mt-12 grid gap-4 md:grid-cols-2">
          {whyStamped.items.map((item) => (
            <article
              key={item.id}
              data-stagger-item
              className="accent-card rounded-xl border border-on-secondary/15 bg-surface-lowest p-6 text-on-surface shadow-lg"
            >
              <div className="mb-4 h-1 w-10 rounded-full bg-primary" aria-hidden="true" />
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
