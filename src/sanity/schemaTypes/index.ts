import { page } from "./documents/page";
import { siteSettings } from "./documents/siteSettings";
import { event } from "./documents/event";

import { navbarSection } from "./sections/navbarSection";
import { heroSection } from "./sections/heroSection";
import { calendarSection } from "./sections/calendarSection";
import faqSection from "./sections/faqSection";
import { testimonialSection } from "./sections/testimonialSection";
import { upcomingSection } from "./sections/upcomingSection";
import { promoBannerSection } from "./sections/promoBannerSection";
import { richTextSection } from "./sections/richTextSection";

import { contentImageTopSection } from "./sections/content/contentImageTopSection";
import { contentImageLeftSection } from "./sections/content/contentImageLeftSection";
import { contentImageRightSection } from "./sections/content/contentImageRightSection";
import { zigzagContentSection } from "./sections/content/zigzagContentSection";

export const schemaTypes = [
  page,
  siteSettings,
  event,

  heroSection,
  navbarSection,
  calendarSection,
  faqSection,
  testimonialSection,
  upcomingSection,
  promoBannerSection,
  richTextSection,

  contentImageTopSection,
  contentImageLeftSection,
  contentImageRightSection,
  zigzagContentSection,
];