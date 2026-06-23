import { IndustryResources } from "@/components/industries/shared/IndustryResources";
import { getHomepageResourceContent } from "@/lib/content/homepage-spotlight";

export async function DynamicIndustryResources() {
  const content = await getHomepageResourceContent();
  return <IndustryResources content={content} />;
}
