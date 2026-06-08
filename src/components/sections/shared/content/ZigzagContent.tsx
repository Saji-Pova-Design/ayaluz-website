import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";

type CTA = {
  _key?: string;
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

type ContentCell = {
  _key?: string;
  image?: SanityImage;
  displayTitle?: string;
  displaySubtitle?: string;
  body?: string;
  ctas?: CTA[];
};

type Props = {
  data?: {
    eyebrow?: string;
    displayTitle?: string;
    contentCells?: ContentCell[];
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

export default function ZigzagContent({ data }: Props) {
  return (
    <section className="w-full bg-primary-bg px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/80 via-white/45 to-primary-text/[0.04] p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:rounded-[3rem]">
        <div className="rounded-[calc(2rem-1px)] bg-primary-bg/70 px-5 py-10 backdrop-blur-sm md:rounded-[calc(3rem-1px)] md:px-10 md:py-14">
          {(data?.eyebrow || data?.displayTitle) && (
            <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
              {data?.eyebrow ? (
                <p className="mb-4 text-base font-medium uppercase tracking-[0.18em] text-primary-text/60 md:text-lg">
                  {data.eyebrow}
                </p>
              ) : null}

              {data?.displayTitle ? (
                <h2 className="font-canela text-2xl font-semibold leading-tight text-primary-text md:text-4xl">
                  {data.displayTitle}
                </h2>
              ) : null}
            </div>
          )}

          {data?.contentCells?.length ? (
            <div className="space-y-14 md:space-y-20">
              {data.contentCells.map((cell, index) => {
                const imageUrl = cell?.image ? urlFor(cell.image).url() : "";
                const reverse = index % 2 === 1;

                return (
                  <div
                    key={cell._key || `${cell.displayTitle || "content-cell"}-${index}`}
                    className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
                  >
                    {imageUrl ? (
                      <div
                        className={`relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] shadow-[0_18px_50px_rgba(0,0,0,0.12)] md:rounded-[2rem] ${
                          reverse ? "md:order-2" : ""
                        }`}
                      >
                        <Image
                          src={imageUrl}
                          alt={cell?.image?.alt || cell?.displayTitle || ""}
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 50vw, 100vw"
                        />
                      </div>
                    ) : null}

                    <div className={reverse ? "md:order-1" : ""}>
                      {cell?.displaySubtitle ? (
                        <p className="mb-4 text-base font-medium uppercase tracking-[0.18em] text-primary-text/60 md:text-lg">
                          {cell.displaySubtitle}
                        </p>
                      ) : null}

                      {cell?.displayTitle ? (
                        <h3 className="font-canela text-2xl font-semibold leading-tight text-primary-text md:text-4xl">
                          {cell.displayTitle}
                        </h3>
                      ) : null}

                      {cell?.body ? (
                        <p className="mt-6 text-base leading-relaxed text-primary-text/75 md:text-lg">
                          {cell.body}
                        </p>
                      ) : null}

                      {cell?.ctas?.length ? (
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                          {cell.ctas.map((cta, ctaIndex) =>
                            cta?.href && cta?.label ? (
                              <Link
                                key={cta._key || `${cta.label}-${ctaIndex}`}
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
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}