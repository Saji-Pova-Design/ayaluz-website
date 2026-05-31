import type { Metadata } from "next";
import type { EventShareConfig } from "@/types/event-share";
import { getSiteUrl, toAbsoluteUrl } from "@/lib/share/get-site-url";

/** Builds Open Graph + Twitter metadata for rich link previews */
export function buildEventShareMetadata(config: EventShareConfig): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalUrl = toAbsoluteUrl(config.canonicalPath);
  const imageUrl = toAbsoluteUrl(config.image);

  return {
    title: config.title,
    description: config.description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: config.canonicalPath,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: config.title,
      description: config.description,
      siteName: "AyaLuz",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: config.imageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [imageUrl],
    },
  };
}
