import { BaseSectionProps } from "./types";

import SectionHeading from "./shared/SectionHeading";
import SectionBody from "./shared/SectionBody";
import SectionCTA from "./shared/SectionCTA";
import { SectionImage } from "./shared/SectionImage";

export default function SectionImageTop({
  title,
  body,
  image,
  cta,
}: BaseSectionProps) {
  return (
    <section className="w-full bg-primary-bg px-4 py-20 md:px-8 lg:px-16">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <SectionImage
          src={image.src}
          alt={image.alt}
          ratio="landscape"
          priority
        />

        <div className="max-w-[980px]">
          <SectionHeading>{title}</SectionHeading>

          <SectionBody body={body} />

          {cta && (
  <div className="mt-8">
    <SectionCTA
      label={cta.label}
      href={cta.href}
    />
  </div>
)}
        </div>
      </div>
    </section>
  );
}