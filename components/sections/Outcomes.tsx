import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";

export function Outcomes() {
  const { outcomes } = landingContent;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={outcomes.eyebrow}
            title={outcomes.title}
            description={outcomes.disclaimer}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {outcomes.stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 0.05}>
              <article className="rounded-lg border border-outline-variant/50 bg-surface-lowest p-6">
                <p className="font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm font-semibold text-on-surface">{stat.label}</p>
                {stat.detail ? (
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{stat.detail}</p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
