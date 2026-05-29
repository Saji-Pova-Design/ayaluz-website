import { homepageHeaderPlaceholder } from "@/lib/cms/placeholders";
import type { HomepageHeaderContent } from "@/types/cms";

export async function getHomepageHeader(): Promise<HomepageHeaderContent> {
  return homepageHeaderPlaceholder;
}