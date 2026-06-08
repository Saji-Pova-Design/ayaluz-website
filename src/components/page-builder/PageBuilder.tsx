import HeroSection from "../sections/HeroSection";
import CalendarSection from "../sections/calendar/CalendarSection";
import UpcomingSection from "../sections/UpcomingSection";
import TestimonialsSection from "../sections/TestimonialSection";
import FAQSection from "../sections/FAQSection";
import { PromoBanner } from "../general-shared/PromoBanner";
import Navbar from "../general-shared/Navbar";
import ContentImageTop from "../sections/shared/content/ContentImageTop";
import ContentImageLeft from "../sections/shared/content/ContentImageLeft";
import ContentImageRight from "../sections/shared/content/ContentImageRight";
import ZigzagContent from "../sections/shared/content/ZigzagContent";

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
          case "promoBannerSection":
            return <PromoBanner key={key} data={section as never} />;

            case "navbarSection":
  return <Navbar key={key} data={section as never} />;

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

          case "contentImageTopSection":
            return <ContentImageTop key={key} data={section as never} />;

          case "contentImageLeftSection":
            return <ContentImageLeft key={key} data={section as never} />;

          case "contentImageRightSection":
            return <ContentImageRight key={key} data={section as never} />;

          case "zigzagContentSection":
            return <ZigzagContent key={key} data={section as never} />;

          default:
            return null;
        }
      })}
    </>
  );
}