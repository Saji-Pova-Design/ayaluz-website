type HeroBackgroundProps = {
  src: string;
  alt: string;
};

export function HeroBackground({
  src,
  alt,
}: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10">
      
      {/* IMAGE */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

    </div>
  );
}
