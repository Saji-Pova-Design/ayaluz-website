import { homepageHeaderPlaceholder } from "@/lib/cms/placeholders";
import { getHomepageHeaderFromSanity } from "@/lib/sanity/queries";
import type { HomepageHeaderContent } from "@/types/cms";

export async function getHomepageHeader(): Promise<HomepageHeaderContent> {
  if (
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET
  ) {
    const fromSanity = await getHomepageHeaderFromSanity();
    if (fromSanity) return fromSanity;
  }

  return homepageHeaderPlaceholder;
}
