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
    backgroundImage,
    primaryCta,
    secondaryCta,
  } = content;

  return (
    <section className="relative w-full overflow-hidden" aria-label="Hero">
      <div className="relative min-h-[min(92vh,820px)] w-full sm:min-h-[min(88vh,900px)]">
        <HeroBackground src={backgroundImage.src} alt={backgroundImage.alt} />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1440px] items-end px-4 pb-12 pt-28 sm:min-h-[88vh] sm:items-center sm:px-6 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24">
          <div className="flex max-w-2xl flex-col gap-5 sm:gap-6 lg:max-w-3xl lg:gap-7">
            <HeroEyebrow text={eyebrow} />
            <HeroHeadline lines={headlineLines} />
            <HeroParagraph lines={paragraphLines} />
            <HeroCtas primary={primaryCta} secondary={secondaryCta} />
          </div>
        </div>
      </div>
    </section>
  );
}
