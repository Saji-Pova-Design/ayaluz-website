type HeroEyebrowProps = {
  text: string;
};

export function HeroEyebrow({ text }: HeroEyebrowProps) {
  return (
    <section
      data-component="HeroEyebrow"
      data-testid="HeroEyebrow"
      role="region"
      aria-label="Hero Eyebrow"
    >
      <p className="font-sans-minimal text-[14px] leading-normal tracking-[0.04em] text-gold-accent lg:text-[16px]">
        {text}
      </p>
    </section>
  );
}

