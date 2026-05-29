import Image from "next/image";

type HeroBackgroundProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function HeroBackground({ src, alt, priority = true }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0">
      <img
  src={src}
  alt={alt}
  className="h-full w-full object-cover object-[center_35%] sm:object-[center_40%]"
/>
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#1a2e28]/85 via-[#1a2e28]/55 to-[#1a2e28]/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#1a2e28]/50 via-transparent to-transparent sm:hidden"
        aria-hidden
      />
    </div>
  );
}
