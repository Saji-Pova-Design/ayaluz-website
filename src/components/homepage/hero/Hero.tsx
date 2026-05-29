import { HeroBackground } from "@/components/homepage/hero/HeroBackground";
import type { HeroContent } from "@/types/cms";

type HeroProps = {
  content: HeroContent;
};

export function Hero({ content }: HeroProps) {
  const {
    eyebrow,
    headlineLines,
    paragraphLines,
    backgroundImage,
    primaryCta,
    secondaryCta,
  } = content;

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Hero"
    >
      <div className="relative min-h-screen w-full">
        {/* BACKGROUND IMAGE */}
        <HeroBackground
          src={backgroundImage.src}
          alt={backgroundImage.alt}
        />

        {/* CONTENT */}
        <div className="relative z-50 mx-auto flex min-h-screen max-w-[1440px] items-center px-6 py-24 lg:px-10">
          <div className="flex max-w-3xl flex-col gap-6 text-white">
            
            {/* EYEBROW */}
            <p className="text-lg tracking-wide text-white/80">
              {eyebrow}
            </p>

            {/* HEADLINE */}
            <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              {headlineLines[0]}
              <br />
              {headlineLines[1]}
              <br />
              {headlineLines[2]}
            </h1>

            {/* PARAGRAPH */}
            <p className="max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
              {paragraphLines[0]}
              <br />
              {paragraphLines[1]}
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={primaryCta.href}
                className="inline-flex items-center rounded-full bg-white px-7 py-3 text-base font-medium text-black transition hover:opacity-90"
              >
                {primaryCta.label}
              </a>

              <a
                href={secondaryCta.href}
                className="inline-flex items-center rounded-full border border-white/70 px-7 py-3 text-base font-medium text-white transition hover:bg-white/10"
              >
                {secondaryCta.label}
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}