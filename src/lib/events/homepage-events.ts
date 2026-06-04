import type { CeremonyEventDetail } from "@/types/ceremony-event";

export const homepageEvents: CeremonyEventDetail[] = [
  {
    id: "ceremony-1",

    type: "single-day",

    title: "Ayahuasca Ceremony",

    ceremonyTitle: "Ayahuasca Ceremony",

    overlayNavTitle: "Ceremony Details",

    shareNavTitle: "Share Ceremony",

    date: "2026-06-15",

    timeRange: "6:00 PM — 2:00 AM",

    description:
      "A sacred healing ceremony guided with intention and care.",

    image:
      "/images/placeholder/upcoming-event.jpg",

    heroImage:
      "/images/placeholder/upcoming-event.jpg",

    heroImageAlt:
      "Ayahuasca Ceremony",

    reserveUrl: "#",

    shareUrl: "/ceremonies/ayahuasca-ceremony",

    reserveCta: {
      label: "Reserve Your Spot",
      href: "#",
    },

    shareFriendsLabel:
      "Share this ceremony with friends",

    share: {
      title:
        "Ayahuasca Ceremony • AyaLuz",

      description:
        "A transformative healing journey in Peru’s Sacred Valley.",

      image:
        "/images/placeholder/upcoming-event.jpg",

      imageAlt:
        "Ayahuasca Ceremony",

      canonicalPath:
        "/ceremonies/ayahuasca-ceremony",
    },

    location: {
      name: "Sacred Valley, Peru",

      latitude: -13.2856,

      longitude: -71.4734,
    },

    mapCtaLabel: "Open in Maps",

    features: [
      {
        id: "feature-1",
        icon: "sparkles",
        label: "Traditional Ceremony",
      },

      {
        id: "feature-2",
        icon: "leaf",
        label: "Sacred Healing Space",
      },

      {
        id: "feature-3",
        icon: "moon",
        label: "Guided Facilitation",
      },
    ],

    whatsapp: {
      title:
        "Have questions or need guidance?",

      description:
        "Click and connect with us on WhatsApp",

      buttonText: "Connect",

      link: "#",
    },
  },

  {
    id: "retreat-1",

    type: "retreat",

    title: "7 Day Healing Retreat",

    ceremonyTitle:
      "7 Day Healing Retreat",

    overlayNavTitle: "Retreat Details",

    shareNavTitle: "Share Retreat",

    startDate: "2026-07-10",

    endDate: "2026-07-17",

    timeRange: "7 Days",

    description:
      "A full immersion retreat in Peru’s Sacred Valley.",

    image:
      "/images/placeholder/upcoming-retreat.jpg",

    heroImage:
      "/images/placeholder/upcoming-retreat.jpg",

    heroImageAlt:
      "Healing Retreat",

    reserveUrl: "#",

    shareUrl:
      "/retreats/7-day-healing-retreat",

    reserveCta: {
      label: "Reserve Your Spot",
      href: "#",
    },

    shareFriendsLabel:
      "Share this retreat with friends",

    share: {
      title:
        "7 Day Healing Retreat • AyaLuz",

      description:
        "A transformative healing journey in Peru’s Sacred Valley.",

      image:
        "/images/placeholder/upcoming-retreat.jpg",

      imageAlt:
        "Healing Retreat",

      canonicalPath:
        "/retreats/7-day-healing-retreat",
    },

    location: {
      name: "Sacred Valley, Peru",

      latitude: -13.2856,

      longitude: -71.4734,
    },

    mapCtaLabel: "Open in Maps",

    features: [
      {
        id: "feature-1",
        icon: "sparkles",
        label: "7 Day Immersion",
      },

      {
        id: "feature-2",
        icon: "leaf",
        label: "Plant Medicine Ceremonies",
      },

      {
        id: "feature-3",
        icon: "moon",
        label: "Breathwork & Integration",
      },
    ],

    whatsapp: {
      title:
        "Have questions or need guidance?",

      description:
        "Click and connect with us on WhatsApp",

      buttonText: "Connect",

      link: "#",
    },
  },
];
