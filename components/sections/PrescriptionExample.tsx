import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";

export function PrescriptionExample() {
  const { prescription } = landingContent;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow={prescription.eyebrow}
              title={prescription.title}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <article className="rounded-xl border border-outline-variant/60 bg-surface-lowest p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-outline-variant/40 pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                  Live prescription example
                </p>
                <span className="rounded-md bg-primary-container px-3 py-1 text-xs font-semibold text-on-primary-container">
                  Open
                </span>
              </div>

              <dl className="space-y-4">
                {prescription.fields.map((field) => (
                  <div key={field.label} className="grid gap-1 sm:grid-cols-[88px_1fr]">
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                      {field.label}
                    </dt>
                    <dd
                      className={
                        field.label === "Impact"
                          ? "font-display text-lg font-bold text-primary"
                          : "text-sm leading-6 text-on-surface"
                      }
                    >
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
