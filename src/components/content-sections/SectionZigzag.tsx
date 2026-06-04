import SectionHeading from "./shared/SectionHeading";
import SectionBody from "./shared/SectionBody";
import SectionCTA from "./shared/SectionCTA";
import { SectionImage } from "./shared/SectionImage";

type ZigzagItem = {
  title: string;

  body: string[];

  image: {
    src: string;
    alt: string;
  };

  href: string;
};

type SectionZigzagProps = {
  title: string;

  items: ZigzagItem[];
};

export default function SectionZigzag({
  title,
  items,
}: SectionZigzagProps) {
  return (
    <section className="bg-[#ECE6DC] py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-16">
          <SectionHeading>{title}</SectionHeading>
        </div>

        <div className="space-y-24">
          {items.map((item, index) => {
            const reverse = index % 2 !== 0;

            return (
              <div
                key={item.title}
                className={`grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* IMAGE */}
                <div>
                  <SectionImage
                    src={item.image.src}
                    alt={item.image.alt}
                    ratio="landscape"
                  />
                </div>

                {/* CONTENT */}
                <div className="max-w-[480px]">
                  <SectionHeading>{item.title}</SectionHeading>

                  <SectionBody body={item.body} />

                  <div className="mt-6">
                    <SectionCTA
                      label="Read More"
                      href={item.href}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}