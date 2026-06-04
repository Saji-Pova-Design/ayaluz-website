import HeroSection from "../sections/HeroSection";
import CalendarSection from "../sections/CalendarSection";
import UpcomingSection from "../sections/UpcomingSection";
import TestimonialsSection from "../sections/TestimonialSection";
import FAQSection from "../sections/FAQSection";

type Props = {
  sections?: any[];
};

export default function PageBuilder({ sections = [] }: Props) {
  return (
    <>
      {sections.map((section: any) => {
        switch (section._type) {
          case "heroSection":
            return <HeroSection key={section._key} data={section} />;

          case "calendarSection":
            return <CalendarSection key={section._key} data={section} />;

          case "upcomingSection":
            return <UpcomingSection key={section._key} data={section} />;

          case "testimonialSection":
            return <TestimonialsSection key={section._key} data={section} />;

          case "faqSection":
            return <FAQSection key={section._key} data={section} />;

          default:
            return null;
        }
      })}
    </>
  );
}