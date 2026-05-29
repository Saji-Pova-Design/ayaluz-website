import type { HomepageHeaderContent } from "@/types/cms";
import { sanityClient } from "@/lib/sanity/client";

const homepageHeaderQuery = `*[_type == "homepageHeader"][0]{
  promoBanner{
    enabled,
    label,
    message,
    "iconSrc": icon.asset->url,
    link{ label, href, openInNewTab }
  },
  navbar{
    brandName,
    "logoSrc": logo.asset->url,
    items[]{ _key, label, href, openInNewTab }
  },
  hero{
    eyebrow,
    headlineLines,
    paragraphLines,
    backgroundImage{ alt },
    "backgroundSrc": backgroundImage.asset->url,
    primaryCta{ label, href, openInNewTab, showTrailingArrow },
    secondaryCta{ label, href, openInNewTab, showTrailingArrow }
  }
}`;

type SanityHomepageHeader = {
  promoBanner?: {
    enabled?: boolean;
    label?: string;
    message?: string;
    iconSrc?: string;
    link?: { label?: string; href?: string; openInNewTab?: boolean };
  };
  navbar?: {
    brandName?: string;
    logoSrc?: string;
    items?: Array<{
      _key?: string;
      label?: string;
      href?: string;
      openInNewTab?: boolean;
    }>;
  };
  hero?: {
    eyebrow?: string;
    headlineLines?: string[];
    paragraphLines?: string[];
    backgroundImage?: { alt?: string };
    backgroundSrc?: string;
    primaryCta?: {
      label?: string;
      href?: string;
      openInNewTab?: boolean;
      showTrailingArrow?: boolean;
    };
    secondaryCta?: {
      label?: string;
      href?: string;
      openInNewTab?: boolean;
      showTrailingArrow?: boolean;
    };
  };
};

export async function getHomepageHeaderFromSanity(): Promise<HomepageHeaderContent | null> {
  if (!sanityClient) return null;

  const data = await sanityClient.fetch<SanityHomepageHeader | null>(
    homepageHeaderQuery,
  );

  if (!data?.hero?.headlineLines || data.hero.headlineLines.length < 3) {
    return null;
  }

  return {
    promoBanner: {
      enabled: data.promoBanner?.enabled ?? true,
      label: data.promoBanner?.label ?? "",
      message: data.promoBanner?.message ?? "",
      icon: data.promoBanner?.iconSrc
        ? { src: data.promoBanner.iconSrc, alt: "Ceremony icon" }
        : undefined,
      link: {
        label: data.promoBanner?.link?.label ?? "See Details",
        href: data.promoBanner?.link?.href ?? "#",
        openInNewTab: data.promoBanner?.link?.openInNewTab,
      },
    },
    navbar: {
      brandName: data.navbar?.brandName ?? "AYALUZ",
      logo: data.navbar?.logoSrc
        ? { src: data.navbar.logoSrc, alt: data.navbar.brandName }
        : undefined,
      items:
        data.navbar?.items?.map((item) => ({
          _key: item._key,
          label: item.label ?? "",
          href: item.href ?? "#",
          openInNewTab: item.openInNewTab,
        })) ?? [],
    },
    hero: {
      eyebrow: data.hero.eyebrow ?? "",
      headlineLines: [
        data.hero.headlineLines[0] ?? "",
        data.hero.headlineLines[1] ?? "",
        data.hero.headlineLines[2] ?? "",
      ],
      paragraphLines: [
        data.hero.paragraphLines?.[0] ?? "",
        data.hero.paragraphLines?.[1] ?? "",
      ],
      backgroundImage: {
        src: data.hero.backgroundSrc ?? "/images/hero-jungle-mountain.png",
        alt: data.hero.backgroundImage?.alt ?? "Sacred jungle mountains",
      },
      primaryCta: {
        label: data.hero.primaryCta?.label ?? "",
        href: data.hero.primaryCta?.href ?? "#",
        openInNewTab: data.hero.primaryCta?.openInNewTab,
        showTrailingArrow: data.hero.primaryCta?.showTrailingArrow ?? true,
      },
      secondaryCta: {
        label: data.hero.secondaryCta?.label ?? "",
        href: data.hero.secondaryCta?.href ?? "#",
        openInNewTab: data.hero.secondaryCta?.openInNewTab,
        showTrailingArrow: data.hero.secondaryCta?.showTrailingArrow ?? true,
      },
    },
  };
}
