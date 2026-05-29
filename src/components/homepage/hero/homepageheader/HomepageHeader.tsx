import { PromoBanner } from "@/components/shared/banner/PromoBanner";
import { Hero } from "@/components/homepage/hero/Hero";
import { Navbar } from "@/components/shared/navbar/Navbar";
import type { HomepageHeaderContent } from "@/types/cms";

type HomepageHeaderProps = {
  content: HomepageHeaderContent;
};

export function HomepageHeader({ content }: HomepageHeaderProps) {
  return (
    <>
      <PromoBanner content={content.promoBanner} />
      <Navbar content={content.navbar} />
      <Hero content={content.hero} />
    </>
  );
}