import { Container } from "@/components/ui/Container";
import { StaggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";
import { landingContent } from "@/lib/content";

export function TrustStrip() {
  const { trust } = landingContent;

  return (
    <section className="border-y border-outline-variant/40 bg-surface-low py-8">
      <Container>
        <StaggerReveal className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <StaggerItem>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              {trust.label}
            </p>
          </StaggerItem>
          <ul className="grid gap-3 md:grid-cols-3 md:gap-8">
            {trust.items.map((item) => (
              <StaggerItem key={item}>
                <li className="text-sm text-on-surface-variant">{item}</li>
              </StaggerItem>
            ))}
          </ul>
        </StaggerReveal>
      </Container>
    </section>
  );
}
