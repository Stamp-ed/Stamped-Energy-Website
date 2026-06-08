import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/lib/content";

export function TrustStrip() {
  const { trust } = landingContent;

  return (
    <section className="border-y border-outline-variant/40 bg-surface-low py-8">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
              {trust.label}
            </p>
            <ul className="grid gap-3 md:grid-cols-3 md:gap-8">
              {trust.items.map((item) => (
                <li key={item} className="text-sm text-on-surface-variant">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
