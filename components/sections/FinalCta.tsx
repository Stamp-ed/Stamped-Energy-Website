import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/lib/content";

export function FinalCta() {
  const { finalCta, contactForm } = landingContent;

  return (
    <section id="contact" className="bg-secondary py-20 text-on-secondary md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-on-secondary/80">
                {finalCta.eyebrow}
              </p>
              <h2 className="text-3xl font-bold leading-tight text-on-secondary md:text-4xl">
                {finalCta.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-on-secondary/85 md:text-lg">
                {finalCta.description}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-xl border border-on-secondary/15 bg-surface-lowest p-6 text-on-surface md:p-8">
              <h3 className="text-xl font-bold">{contactForm.title}</h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                {contactForm.description}
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
