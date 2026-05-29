import { HeroBackground } from "@/components/homepage/hero/HeroBackground";
import type { HeroContent } from "@/types/cms";

type HeroProps = {
  content: HeroContent;
};

export function Hero({ content }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <HeroBackground
        src="/images/homepage/hero-jungle-mountain.png"
        alt="Hero"
      />

      <div className="absolute inset-0 z-[9999] flex items-center justify-center">
        <div className="bg-red-500 p-10 text-6xl font-bold text-white">
          HERO TEST
        </div>
      </div>
    </section>
  );
}