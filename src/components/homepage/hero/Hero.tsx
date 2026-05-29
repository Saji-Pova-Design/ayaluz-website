import { HeroBackground } from "@/components/homepage/hero/HeroBackground";
import { HeroCtas } from "@/components/homepage/hero/HeroCtas";
import { HeroEyebrow } from "@/components/homepage/hero/HeroEyebrow";
import { HeroHeadline } from "@/components/homepage/hero/HeroHeadline";
import { HeroParagraph } from "@/components/homepage/hero/HeroParagraph";
import type { HeroContent } from "@/types/cms";

type HeroProps = {
  content: HeroContent;
};

export function Hero({ content }: HeroProps) {
  const {
    eyebrow,
    headlineLines,
    paragraphLines,
    primaryCta,
    secondaryCta,
  } = content;

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Hero"
    >
      <div className="relative min-h-screen w-full">
        <HeroBackground
          src="/images/homepage/hero-jungle-mountain.png"
          alt="Hero"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* CONTENT */}
        <div className="relative z-20 mx-auto flex min-h-screen max-w-[1440px] items-center px-6 py-24 lg:px-10">
          <div className="flex max-w-3xl flex-col gap-6 text-white">
            <HeroEyebrow text={eyebrow} />

            <HeroHeadline lines={headlineLines} />

            <HeroParagraph lines={paragraphLines} />

            <HeroCtas
              primary={primaryCta}
              secondary={secondaryCta}
            />
          </div>
        </div>
      </div>
    </section>
  );
}