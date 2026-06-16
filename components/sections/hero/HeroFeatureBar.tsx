import { Container } from "@/components/ui/Container";
import { landingContent } from "@/lib/content";
import type { HeroFeatureItem } from "@/lib/content/types";

import {
  FeatureFactoryIcon,
  FeaturePrescriptionIcon,
  FeatureRupeeIcon,
  FeatureShieldIcon,
} from "./HeroIcons";

function FeatureIcon({ icon }: { icon: HeroFeatureItem["icon"] }) {
  const className = "h-5 w-5 shrink-0 text-on-surface";
  switch (icon) {
    case "shield":
      return <FeatureShieldIcon className={className} />;
    case "factory":
      return <FeatureFactoryIcon className={className} />;
    case "prescription":
      return <FeaturePrescriptionIcon className={className} />;
    case "rupee":
      return <FeatureRupeeIcon className={className} />;
  }
}

export function HeroFeatureBar() {
  const { features } = landingContent.hero;

  return (
    <div data-hero="features" className="border-y border-outline-variant/40 bg-surface-low">
      <Container className="py-6 md:py-7">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-outline-variant/45 bg-surface-lowest">
                <FeatureIcon icon={feature.icon} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-snug text-on-surface">{feature.title}</p>
                <p className="mt-0.5 text-sm leading-snug text-on-surface-variant">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
