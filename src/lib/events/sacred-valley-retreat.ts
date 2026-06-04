import type { RetreatCeremonyEvent } from "@/types/ceremony-event";

import { homepageEventShareConfig } from "@/lib/share/event-share-config";

export const sacredValleyRetreat: RetreatCeremonyEvent =
  {
    type: "retreat",

    id: "event-2",

    title: "Sacred Valley Retreat",

    ceremonyTitle:
      "Sacred Valley Retreat",

    overlayNavTitle:
      "Retreat detail",

    shareNavTitle:
      "Share this retreat",

    image:
      "/images/homepage/aya-vine.jpg",

    heroImage:
      "/images/homepage/aya-vine.jpg",

    heroImageAlt:
      "Sacred Valley retreat",

    description:
      "A held, intentional gathering guided with care in the Sacred Valley.",

    startDate:
      "2026-05-21T18:00:00",

    endDate:
      "2026-05-27T18:00:00",

    timeRange:
      "6 Days Retreat",

    reserveUrl: "#",

    shareUrl: "#",

    reserveCta: {
      label:
        "Reserve Your Spot",

      href: "#",
    },

    shareFriendsLabel:
      "Share with friends",

    features: [
      {
        id: "mountains",

        icon:
          "/images/homepage/icons/Sacredvalley.png",

        label:
          "Immersive healing experience surrounded by Sacred Valley mountains",
      },

      {
        id: "support",

        icon:
          "/images/homepage/icons/leading.png",

        label:
          "Dedicated support and held ceremonial space throughout the retreat",
      },

      {
        id: "integration",

        icon:
          "/images/homepage/icons/fruits.png",

        label:
          "Nourishing meals and integration support throughout the experience",
      },

      {
        id: "temple",

        icon:
          "/images/homepage/icons/temple.png",

        label:
          "Held in a peaceful ceremonial temple space in the Sacred Valley",
      },

      {
        id: "translation",

        icon:
          "/images/homepage/icons/hearing.png",

        label:
          "English, Español, and French translation facilitators available",
      },

      {
        id: "nature",

        icon:
          "/images/homepage/icons/Sacredvalley.png",

        label:
          "Time for reflection, grounding, and connection with nature",
      },
    ],

    location: {
      name:
        "AyaLuz Temple — Sacred Valley",

      latitude: -13.3328,

      longitude: -72.0845,
    },

    mapCtaLabel:
      "See on map",

    whatsapp: {
      title:
        "Have questions or need guidance?",

      description:
        "Click and connect with us on WhatsApp",

      buttonText:
        "Connect",

      link:
        "https://wa.me/yourphonenumber",
    },

    share:
      homepageEventShareConfig,
  };