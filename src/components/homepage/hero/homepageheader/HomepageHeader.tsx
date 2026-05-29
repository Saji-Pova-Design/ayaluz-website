import { Hero } from "@/components/homepage/hero/Hero";
import type { HomepageHeaderContent } from "@/types/cms";

type HomepageHeaderProps = {
  content: HomepageHeaderContent;
};

export function HomepageHeader({ content }: HomepageHeaderProps) {
  return (
    <>
      <Hero content={content.hero} />
    </>
  );
}