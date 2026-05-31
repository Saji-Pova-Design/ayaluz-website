import type { CeremonyEventDetail } from "@/types/ceremony-event";
import { homepageEventShareConfig } from "@/lib/share/event-share-config";

/** Homepage upcoming ceremony — replace with Sanity/CMS later */
export const homepageCeremonyEvent: CeremonyEventDetail = {
  id: "ayahuasca-may-2026",
  ceremonyTitle: "Ayahuasca Ceremony",
  overlayNavTitle: "Ceremony detail",
  shareNavTitle: "Share this event",
  heroImage: "/images/homepage/photos/Aya-cup.jpg",
  heroImageAlt: "Ayahuasca ceremony preparation",
  description:
    "Limited spaces available for this week's ceremony. A held, intentional gathering guided with care in the heart of the Sacred Valley.",
  date: new Date("2026-05-18T18:00:00"),
  timeRange: "5 PM : 2 AM",
  reserveCta: {
    label: "Reserve Your Spot",
    href: "#reserve",
  },
  shareFriendsLabel: "Share with friends",
  features: [
    {
      id: "ceremony",
      icon: "/images/homepage/icons/moon.png",
      label:
        "Intimate overnight ceremony,\n(6:00 PM – 8:00 AM) guided in a safe and supportive setting",
    },
    {
      id: "guides",
      icon: "/images/homepage/icons/leading.png",
      label:
        "Professionally guided Ayahuasca experience with personal care and support",
    },
    
    {
      id: "temple",
      icon: "/images/homepage/icons/temple.png",
      label:
        "Couldn’t manage transportation back?\nYou’re welcome to stay overnight at the temple",
    },
    {
      id: "fruit",
      icon: "/images/homepage/icons/fruits.png",
      label:
        "Fresh fruit and light nourishment served after the ceremony",
    },
    {
      id: "location",
      icon: "/images/homepage/icons/Sacredvalley.png",
      label:
        "AyaLuz Temple is nestled in the Sacred Valley, Peru. A place honored for healing and transformation.",
    },
    {
      id: "translation",
      icon: "/images/homepage/icons/translate.png",
      label:
        "English, Español, and French translation facilitators is available",
    },
  ],
   
  location: {
    name: "AyaLuz Temple — Sacred Valley",
    latitude: -13.3328,
    longitude: -72.0845,
  },
  mapCtaLabel: "See on map",
  whatsapp: {
    title: "Have questions or need guidance?",
    description: "Click and connect with us on WhatsApp",
    buttonText: "Connect",
    link: "https://wa.me/yourphonenumber",
  },
  share: homepageEventShareConfig,
};
