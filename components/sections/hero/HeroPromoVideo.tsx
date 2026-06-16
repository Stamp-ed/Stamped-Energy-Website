import { Container } from "@/components/ui/Container";
import { HeroVideo } from "@/components/ui/HeroVideo";
import { landingContent } from "@/lib/content";

export function HeroPromoVideo() {
  const { video } = landingContent.hero;

  return (
    <Container className="bg-surface py-8 md:py-10">
      <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-xl border-2 border-outline-variant/50 bg-surface-lowest shadow-[0_20px_48px_-24px_color-mix(in_srgb,var(--brand-secondary)_18%,transparent)] md:border-primary/20 md:shadow-[0_24px_60px_-20px_color-mix(in_srgb,var(--brand-primary)_35%,transparent)]">
        <HeroVideo webm={video.webm} poster={video.poster} label={video.label} />
      </div>
    </Container>
  );
}
