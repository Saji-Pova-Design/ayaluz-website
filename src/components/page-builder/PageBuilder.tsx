import HeroSection from "../sections/HeroSection";
import CalendarSection from "../sections/CalendarSection";
import UpcomingSection from "../sections/UpcomingSection";
import TestimonialsSection from "../sections/TestimonialSection";
import FAQSection from "../sections/FAQSection";
import { PromoBanner } from "../general-shared/PromoBanner";

type PageBuilderSection = {
  _key?: string;
  _type?: string;
  [key: string]: unknown;
};

type Props = {
  sections?: PageBuilderSection[];
};

export default function PageBuilder({ sections = [] }: Props) {
  return (
    <>
      {sections.map((section, index) => {
        const key = section._key || `${section._type || "section"}-${index}`;

        switch (section._type) {
        

          case "heroSection":
            return <HeroSection key={key} data={section as never} />;

          case "calendarSection":
            return <CalendarSection key={key} data={section as never} />;

          case "upcomingSection":
            return <UpcomingSection key={key} data={section as never} />;

          case "testimonialSection":
            return <TestimonialsSection key={key} data={section as never} />;

          case "faqSection":
            return <FAQSection key={key} data={section as never} />;

          default:
            return null;
        }
      })}
    </>
  );
}