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
    <section className="relative min-h-[92vh] overflow-hidden bg-[#11110E] text-white">
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

          <div className="absolute inset-0 bg-black/8" />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_23%_46%,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.72)_24%,rgba(0,0,0,0.44)_45%,rgba(0,0,0,0.18)_66%,rgba(0,0,0,0.04)_82%,transparent_100%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.52)_0%,rgba(0,0,0,0.34)_24%,rgba(0,0,0,0.14)_48%,rgba(0,0,0,0.04)_70%,transparent_100%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.22)_0%,transparent_42%,rgba(0,0,0,0.12)_100%)]" />
        </div>
      )}

      <div className="relative z-10 flex min-h-[92vh] items-center px-6 py-28 md:px-10 lg:px-16">
        <div className="max-w-[1060px]">
          {data?.eyebrow && (
            <p className="mb-8 text-xs font-medium uppercase tracking-[0.35em] text-[#D7B98A] md:text-sm">
              {data.eyebrow}
            </p>
          )}

          {data?.title && (
            <h1 className="max-w-[980px] font-serif text-2xl font-bold leading-[0.98] tracking-[-0.05em] text-[#FFF8EC] md:text-4xl lg:text-6xl">
              <span className="block">Transformative</span>
              <span className="block">Ayahuasca Journeys</span>
              <span className="block">in Peru&apos;s Andean Heartland,</span>
              <span className="block">Sacred Valley</span>
            </h1>
          )}

          <p className="mt-8 max-w-[680px] text-base leading-[1.8] tracking-[-0.02em] text-[#F5EFE4]/85 md:text-lg lg:text-xl">
            <span className="block">
              Deep healing, inner clarity, spiritual awakening.
            </span>
            <span className="block">
              Guided with love and rooted in ancient wisdom.
            </span>
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={primaryButtonHref}
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#2B4A40] px-8 text-sm font-medium text-[#FFFAF1] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#213C34] md:text-base"
            >
              {primaryButtonLabel}
            </Link>

            <Link
              href={secondaryButtonHref}
              className="inline-flex h-14 items-center justify-center rounded-full border border-[#FFFAF1]/35 bg-[#FFFAF1]/12 px-8 text-sm font-medium text-[#FFFAF1] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFFAF1] hover:text-[#2B4A40] md:text-base"
            >
              {secondaryButtonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}