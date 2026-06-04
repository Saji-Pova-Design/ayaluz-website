import SectionHeading from "./shared/SectionHeading";
import SectionBody from "./shared/SectionBody";
import SectionCTA from "./shared/SectionCTA";
import { SectionImage } from "./shared/SectionImage";

import type { BaseSectionProps } from "./types";

export default function SectionSplitLarge({
  title,
  body,
  image,
  cta,
}: BaseSectionProps) {
  return (
    <section className="bg-[#ECE6DC] py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-12">
        {/* IMAGE */}
        <div>
          <SectionImage
            src={image.src}
            alt={image.alt}
            ratio="landscape"
            priority={false}
          />
        </div>

        {/* CONTENT */}
        <div className="max-w-[560px]">
          <SectionHeading>{title}</SectionHeading>

          <SectionBody body={body} />

          {cta && (
            <div className="mt-8">
              <SectionCTA label={cta.label} href={cta.href} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}