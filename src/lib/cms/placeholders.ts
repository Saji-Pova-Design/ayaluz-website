import type { HomepageHeaderContent } from "@/types/cms";

/** Placeholder CMS data — replace via Sanity fetch in production */
export const homepageHeaderPlaceholder: HomepageHeaderContent = {
  promoBanner: {
    enabled: true,
    label: "Upcoming Ceremony",
    message: "Join our next Ayahuasca ceremony this Friday, May 29",
    link: {
      label: "See Details",
      href: "/ceremonies",
      openInNewTab: false,
    },
  },
  navbar: {
    brandName: "AYALUZ",
    items: [
      { label: "About us", href: "/about" },
      { label: "Ceremonies", href: "/ceremonies" },
      { label: "Retreats", href: "/retreats" },
      { label: "Calendar", href: "/calendar" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Healing Journey", href: "/healing-journey" },
      { label: "Location", href: "/location" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  hero: {
    eyebrow: "Do you hear the call?",
    headlineLines: [
      "Transformative Ayahuasca Journeys",
      "in Peru's Andean Heartland,",
      "Sacred Valley",
    ],
    paragraphLines: [
      "Deep healing, inner clarity, spiritual awakening.",
      "Guided with love and rooted in ancient wisdom.",
    ],
    backgroundImage: {
      src: "/images/hero-jungle-mountain.png",
      alt: "Misty jungle mountains in Peru's Sacred Valley at golden hour",
    },
    primaryCta: {
      label: "Explore Retreats/Ceremonies",
      href: "/retreats",
      showTrailingArrow: true,
    },
    secondaryCta: {
      label: "Learn Our Approach",
      href: "/about",
      showTrailingArrow: true,
    },
  },
};
