import { IndustryEconomics } from "@/components/industries/vertical/IndustryEconomics";
import { IndustryFaq } from "@/components/industries/vertical/IndustryFaq";
import { IndustryHero } from "@/components/industries/vertical/IndustryHero";
import { IndustryIntegration } from "@/components/industries/vertical/IndustryIntegration";
import { IndustryOutcomes } from "@/components/industries/vertical/IndustryOutcomes";
import { IndustryPrescriptionExamples } from "@/components/industries/vertical/IndustryPrescriptionExamples";
import { IndustrySegments } from "@/components/industries/vertical/IndustrySegments";
import { IndustryWasteTable } from "@/components/industries/vertical/IndustryWasteTable";
import { IndustryPageCta } from "@/components/industries/shared/IndustryPageCta";
import { IndustryResources } from "@/components/industries/shared/IndustryResources";
import { resourcesContent } from "@/lib/content";
import { getVerticalPage, type VerticalSlug } from "@/lib/content";

type IndustryVerticalPageProps = {
  slug: VerticalSlug;
};

export function IndustryVerticalPage({ slug }: IndustryVerticalPageProps) {
  const page = getVerticalPage(slug);

  if (!page) {
    return null;
  }

  const showResources = slug === "automotive";

  return (
    <>
      {page.hero.seoHeadings?.length ? (
        <div className="sr-only">
          {page.hero.seoHeadings.map((heading) => (
            <h2 key={heading}>{heading}</h2>
          ))}
        </div>
      ) : null}
      <IndustryHero slug={slug} />
      <IndustryEconomics slug={slug} />
      <IndustryWasteTable slug={slug} />
      <IndustryPrescriptionExamples slug={slug} />
      <IndustryIntegration slug={slug} />
      <IndustrySegments slug={slug} />
      <IndustryOutcomes slug={slug} />
      <IndustryFaq slug={slug} />
      {showResources ? <IndustryResources content={resourcesContent} /> : null}
      <IndustryPageCta content={page.finalCta} />
    </>
  );
}
