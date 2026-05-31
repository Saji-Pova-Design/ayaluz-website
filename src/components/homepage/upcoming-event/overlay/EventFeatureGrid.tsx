import Image from "next/image";
import { MapPin } from "lucide-react";

type Feature = {
  id: string;
  icon: string;
  label: string;
};

type EventFeatureGridProps = {
  features: Feature[];
};

export default function EventFeatureGrid({
  features,
}: EventFeatureGridProps) {
  const leftIds = [
    "ceremony",
    "guides",
    "translation",
  ];

  const rightIds = [
    "fruit",
    "temple",
    "location",
  ];

  const leftColumn = features.filter((feature) =>
    leftIds.includes(feature.id),
  );

  const rightColumn = features.filter((feature) =>
    rightIds.includes(feature.id),
  );

  const orderedMobile = [
    ...leftColumn,
    ...rightColumn,
  ];

  const renderFeature = (feature: Feature) => (
    <div
      key={feature.id}
      className="flex items-start gap-4"
    >
      <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[24px] bg-[#C7D3C4]">
      <div className="flex h-[36px] w-[36px] items-center justify-center">
  <Image
    src={feature.icon}
    alt={feature.label}
    width={36}
    height={36}
    className="h-[36px] w-[36px] object-contain"
  />
</div>
      </div>

      <div className="flex flex-col">
        <p className="max-w-[320px] whitespace-pre-line text-[16px] leading-[1.25] tracking-[-0.03em] text-[#111111]">
          {feature.label}
        </p>

        {feature.id === "location" && (
          <button className="mt-2 flex items-center gap-2 text-[14px] text-[#0066FF]">
            <MapPin size={18} />

            <span>See on map</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE */}
      <div className="flex flex-col gap-6 md:hidden">
        {orderedMobile.map(renderFeature)}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-x-8">
        <div className="flex flex-col gap-6">
          {leftColumn.map(renderFeature)}
        </div>

        <div className="flex flex-col gap-6">
          {rightColumn.map(renderFeature)}
        </div>
      </div>
    </>
  );
}