import { page } from "./documents/page";
import { siteSettings } from "./documents/siteSettings";

import { heroSection } from "./sections/heroSection";
import { calendarSection } from "./sections/calendarSection";
import faqSection from "./sections/faqSection";
import { testimonialSection } from "./sections/testimonialSection";
import { upcomingSection } from "./sections/upcomingSection";
import { promoBannerSection } from "./sections/promoBannerSection";
import { richTextSection } from "./sections/richTextSection";

import { event } from "./documents/event";

export const schemaTypes = [
  page,
  siteSettings,
  heroSection,
  calendarSection,
  faqSection,
  testimonialSection,
  upcomingSection,
  promoBannerSection,
  richTextSection,
  event,
];