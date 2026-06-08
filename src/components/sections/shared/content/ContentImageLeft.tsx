import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";

type CTA = {
  label?: string;
  href?: string;
  variant?: "primary" | "secondary" | "text";
};

type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string;
};

type Props = {
  data?: {
    image?: SanityImage;
    displayTitle?: string;
    displaySubtitle?: string;
    body?: string;
    ctas?: CTA[];
  };
};

function ctaClass(variant?: CTA["variant"]) {
  if (variant === "secondary") {
    return "inline-flex items-center justify-center rounded-full border border-primary-text/25 px-6 py-3 text-base font-medium text-primary-text transition hover:border-primary-text/50";
  }

  if (variant === "text") {
    return "inline-flex items-center justify-center text-base font-medium text-primary-text underline-offset-4 transition hover:underline";
  }

  return "inline-flex items-center justify-center rounded-full bg-primary-text px-6 py-3 text-base font-medium text-primary-bg transition hover:opacity-90";
}

export default function ContentImageLeft({ data }: Props) {
  const imageUrl = data?.image ? urlFor(data.image).url() : "";

  return (
    <section className="w-full bg-primary-bg px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
        {imageUrl ? (
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
            <Image
              src={imageUrl}
              alt={data?.image?.alt || data?.displayTitle || ""}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        ) : null}

        <div>
          {data?.displaySubtitle ? (
            <p className="mb-4 text-base font-medium uppercase tracking-[0.18em] text-primary-text/60 md:text-lg">
              {data.displaySubtitle}
            </p>
          ) : null}

          {data?.displayTitle ? (
            <h2 className="font-canela text-2xl font-semibold leading-tight text-primary-text md:text-4xl">
              {data.displayTitle}
            </h2>
          ) : null}

          {data?.body ? (
            <p className="mt-6 text-base leading-relaxed text-primary-text/75 md:text-lg">
              {data.body}
            </p>
          ) : null}

          {data?.ctas?.length ? (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {data.ctas.map((cta, index) =>
                cta?.href && cta?.label ? (
                  <Link
                    key={`${cta.label}-${index}`}
                    href={cta.href}
                    className={ctaClass(cta.variant)}
                  >
                    {cta.label}
                  </Link>
                ) : null,
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}