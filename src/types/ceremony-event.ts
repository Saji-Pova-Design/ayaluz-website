import type { EventShareConfig } from "@/types/event-share";

export type CeremonyFeature = {
  id: string;
  icon: string;
  label: string;
};

export type CeremonyLocation = {
  name: string;
  latitude: number;
  longitude: number;
};

export type CeremonyEventDetail = {
  id: string;
  ceremonyTitle: string;
  overlayNavTitle: string;
  shareNavTitle: string;
  heroImage: string;
  heroImageAlt: string;
  description: string;
  date: Date;
  timeRange: string;
  reserveCta: { label: string; href: string };
  shareFriendsLabel: string;
  features: CeremonyFeature[];
  location: CeremonyLocation;
  mapCtaLabel: string;
  whatsapp: {
    title: string;
    description: string;
    buttonText: string;
    link: string;
  };
  share: EventShareConfig;
};
