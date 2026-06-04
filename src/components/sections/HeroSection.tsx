import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";

type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string;
};

type HeroButton = {
  label?: string;
  text?: string;
  href?: string;
  url?: string;
};

type HeroSectionProps = {
  data?: {
    eyebrow?: string;
    subtitle?: string;
    description?: string;
    title?: string;
    backgroundImage?: SanityImage | null;
    image?: SanityImage | null;
    primaryButton?: HeroButton;
    secondaryButton?: HeroButton;
  };
};

function getImageUrl(image?: SanityImage | null) {
  if (!image?.asset?._ref) {
    return null;
  }

  return urlFor(image)
    .width(2400)
    .height(1500)
    .fit("crop")
    .auto("format")
    .url();
}

function getButtonLabel(button?: HeroButton, fallback?: string) {
  return button?.label || button?.text || fallback || "";
}

function getButtonHref(button?: HeroButton, fallback = "#") {
  return button?.href || button?.url || fallback;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const heroImage = data?.backgroundImage || data?.image || null;
  const imageUrl = getImageUrl(heroImage);

  const subtitle = data?.subtitle || data?.description || "";

  const primaryButtonLabel = getButtonLabel(
    data?.primaryButton,
    "Discover Ceremonies & Retreats",
  );

  const primaryButtonHref = getButtonHref(data?.primaryButton, "#calendar");

  const secondaryButtonLabel = getButtonLabel(
    data?.secondaryButton,
    "Explore Our Approach",
  );

  const secondaryButtonHref = getButtonHref(data?.secondaryButton, "#approach");

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#F5EFE4] text-[#1F1A14]">
      {imageUrl && (
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={heroImage?.alt || data?.title || "AyaLuz retreat in Sacred Valley"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

<div className="absolute inset-0 bg-[#F5EFE4]/12" />
<div className="absolute inset-0 bg-gradient-to-r from-[#F5EFE4]/52 via-[#F5EFE4]/18 to-transparent" />
<div className="absolute inset-0 bg-gradient-to-t from-[#F5EFE4]/18 via-transparent to-[#F5EFE4]/6" />
        </div>
      )}

      <div className="relative z-10 flex min-h-[92vh] items-center px-6 py-28 md:px-10 lg:px-16">
        <div className="max-w-[1060px]">
          {data?.eyebrow && (
            <p className="mb-8 text-xs font-medium uppercase tracking-[0.42em] text-[#7A5F3C] md:text-sm">
              {data.eyebrow}
            </p>
          )}

          {data?.title && (
            <h1 className="max-w-[980px] font-serif text-[56px] leading-[0.98] tracking-[-0.065em] text-[#1F1A14] md:text-[92px] lg:text-[112px]">
              {data.title}
            </h1>
          )}

          {subtitle && (
            <p className="mt-8 max-w-[680px] text-lg leading-[1.8] tracking-[-0.02em] text-[#3F3932] md:text-xl">
              {subtitle}
            </p>
          )}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={primaryButtonHref}
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#2B4A40] px-8 text-sm font-medium text-[#FFFAF1] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#213C34]"
            >
              {primaryButtonLabel}
            </Link>

            <Link
              href={secondaryButtonHref}
              className="inline-flex h-14 items-center justify-center rounded-full border border-[#2B4A40]/35 bg-[#FFFAF1]/35 px-8 text-sm font-medium text-[#2B4A40] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2B4A40] hover:text-[#FFFAF1]"
            >
              {secondaryButtonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}