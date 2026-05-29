import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient, sanityDataset, sanityProjectId } from "@/lib/sanity/client";

const builder =
  sanityProjectId && sanityClient
    ? createImageUrlBuilder({
        projectId: sanityProjectId,
        dataset: sanityDataset,
      })
    : null;

export function urlForImage(source: SanityImageSource) {
  return builder?.image(source).auto("format").fit("max").quality(90);
}
