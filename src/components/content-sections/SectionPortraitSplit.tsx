import SectionHeading from "./shared/SectionHeading";
import SectionBody from "./shared/SectionBody";
import SectionCTA from "./shared/SectionCTA";
import { SectionImage } from "./shared/SectionImage";

import type { BaseSectionProps } from "./types";

export default function SectionPortraitSplit({
  title,
  body,
  image,
  cta,
}: BaseSectionProps) {
  return (
    <section className="bg-[#ECE6DC] py-20">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 px-6 lg:grid-cols-[320px_1fr] lg:items-center">
        <div>
          <SectionImage
            src={image.src}
            alt={image.alt}
            ratio="portrait"
          />
        </div>

        <div className="max-w-[520px]">
          <SectionHeading>{title}</SectionHeading>

          <SectionBody body={body} />

          {cta && (
            <div className="mt-6">
              <SectionCTA label={cta.label} href={cta.href} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}