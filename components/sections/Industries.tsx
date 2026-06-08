import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Industries() {
  const { industries } = landingContent;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={industries.eyebrow}
            title={industries.title}
            description={industries.description}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {industries.items.map((industry, index) => (
            <Reveal key={industry.id} delay={index * 0.05}>
              <article
                className={cn(
                  "h-full rounded-lg border p-6",
                  industry.featured
                    ? "border-secondary bg-secondary-container/40"
                    : "border-outline-variant/50 bg-surface-lowest",
                )}
              >
                <h3 className="text-lg font-bold text-on-surface">{industry.name}</h3>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                  {industry.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Button href={industries.cta.href} variant="outline">
            {industries.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
