type HeroBackgroundProps = {
  src: string;
  alt: string;
};

export function HeroBackground({ src, alt }: HeroBackgroundProps) {
  return (
    <>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label={alt}
      />

      <div
        className="absolute inset-0 z-10 bg-gradient-to-r from-[#1a2e28]/85 via-[#1a2e28]/55 to-[#1a2e28]/25"
        aria-hidden
      />

      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-[#1a2e28]/50 via-transparent to-transparent sm:hidden"
        aria-hidden
      />
    </>
  );
}