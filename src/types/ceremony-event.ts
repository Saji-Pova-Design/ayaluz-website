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

type CeremonyEventBase = {
  id: string;

  title: string;

  ceremonyTitle: string;

  overlayNavTitle: string;

  shareNavTitle: string;

  image: string;

  heroImage: string;

  heroImageAlt: string;

  description: string;

  longDescription?: string;

  timeRange: string;

  reserveUrl: string;

  shareUrl: string;

  reserveCta: {
    label: string;
    href: string;
  };

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

export type SingleDayCeremonyEvent =
  CeremonyEventBase & {
    type: "single-day";

    date: string;
  };

export type RetreatCeremonyEvent =
  CeremonyEventBase & {
    type: "retreat";

    startDate: string;

    endDate: string;
  };

export type CeremonyEventDetail =
  | SingleDayCeremonyEvent
  | RetreatCeremonyEvent;