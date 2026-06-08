"use client";

import EventDetailsModal from "@/components/sections/shared/EventDetailsModal";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import EventDateBadge from "@/components/sections/shared/EventDateBadge";

import Image from "next/image";
import { PortableText } from "@portabletext/react";

import { urlFor } from "@/sanity/lib/image";

const AYALUZ_LOCATION = {
  name: "AyaLuz Temple, Sacred Valley",
  googleMapsUrl:
    "https://www.google.com/maps?q=-13.4822877,-71.7929999",
};

type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
};

type FeatureItem = {
  icon?: SanityImage | null;
  text?: string;
};

type PortableTextBlock = {
  _key?: string;
  _type: string;
  children?: {
    _key?: string;
    _type?: string;
    text?: string;
  }[];
};

type EventItem = {
  _id: string;
  title?: string;
  displayTitle?: string;
  displaySubtitle?: string;
  slug?: string;
  eventType?: "single-day" | "retreat";
  shortDescription?: string;
  announcementNote?: string;
  longDescription?: PortableTextBlock[];
  singleDate?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  timeRange?: string | null;
  reservationUrl?: string | null;
  cardImage?: SanityImage | null;
  detailedViewImage?: SanityImage | null;
  features?: FeatureItem[];
  whatsappTitle?: string;
  whatsappDescription?: string;
  whatsappButtonLabel?: string;
  whatsappPhoneNumber?: string;
};

type UpcomingBlock = {
  _key?: string;
  selectionMode?: "automatic" | "manual";
  event?: EventItem | null;
  backgroundImage?: SanityImage | null;
  badgeLabel?: string;
  announcementText?: string;
  ctaLabel?: string;
};

type UpcomingSectionData = {
  items?: UpcomingBlock[];
  automaticEvents?: EventItem[];
};

type UpcomingRenderItem = {
  _key?: string;
  selectionMode?: "automatic" | "manual";
  event: EventItem;
  backgroundImage?: SanityImage | null;
  badgeLabel?: string;
  announcementText?: string;
  ctaLabel?: string;
};

type Props = {
  data: UpcomingSectionData;
};

type CountdownValue = {
  days: string;
  hours: string;
  minutes: string;
  hasBegun: boolean;
};

function getImageUrl(
  image?: SanityImage | null,
  width?: number,
  height?: number,
) {
  if (!image) return null;

  let builder = urlFor(image);

  if (width) builder = builder.width(width);
  if (height) builder = builder.height(height);

  return builder.fit("crop").auto("format").url();
}

function getPublicEventTitle(event?: EventItem | null) {
  return event?.displayTitle || event?.title || "Upcoming event";
}

function getPublicEventSubtitle(event?: EventItem | null) {
  return event?.displaySubtitle || "";
}

function getEventDate(event?: EventItem | null) {
  if (!event) return null;

  const rawDate =
    event.eventType === "retreat"
      ? event.startDate
      : event.singleDate;

  if (!rawDate) return null;

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) return null;

  return date;
}


function getCountdownTarget(event?: EventItem | null) {
  if (!event) return null;

  if (event.eventType === "retreat") {
    if (!event.startDate) return null;

    const start = new Date(event.startDate);

    if (Number.isNaN(start.getTime())) return null;

    return new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() - 1,
      12,
      0,
      0,
    );
  }

  if (!event.singleDate) return null;

  const singleDate = new Date(event.singleDate);

  if (Number.isNaN(singleDate.getTime())) return null;

  return new Date(
    singleDate.getFullYear(),
    singleDate.getMonth(),
    singleDate.getDate(),
    17,
    0,
    0,
  );
}

function useCountdown(event?: EventItem | null) {
  const [timeLeft, setTimeLeft] =
    useState<CountdownValue>({
      days: "00",
      hours: "00",
      minutes: "00",
      hasBegun: false,
    });

  useEffect(() => {
    const target = getCountdownTarget(event);

    if (!target) return;

    function updateCountdown() {
      const now = new Date();

      const difference =
        (target?.getTime() || 0) - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          hasBegun: true,
        });

        return;
      }

      setTimeLeft({
        days: String(
          Math.floor(difference / (1000 * 60 * 60 * 24)),
        ).padStart(2, "0"),
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24),
        ).padStart(2, "0"),
        minutes: String(
          Math.floor((difference / (1000 * 60)) % 60),
        ).padStart(2, "0"),
        hasBegun: false,
      });
    }

    updateCountdown();

    const interval = window.setInterval(updateCountdown, 60000);

    return () => window.clearInterval(interval);
  }, [event]);

  return timeLeft;
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.327-5.607ZM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592Zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.589-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.65 0 .972.71 1.916.81 2.049.098.133 1.397 2.132 3.383 2.991.473.205.842.327 1.13.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232Z" />
    </svg>
  );
}

function EventTitleLockup({
  event,
}: {
  event: EventItem;
}) {
  const title = getPublicEventTitle(event);
  const subtitle = getPublicEventSubtitle(event);

  return (
    <div className="min-w-0 leading-none">
      <h3 className="font-serif font-semibold text-3xl leading-[0.95] tracking-[-0.06em] text-[#1B1713] md:text-3xl lg:text-4xl">
        {title}
      </h3>

      {subtitle && (
        <p className="mt-2 text-sm uppercase tracking-[0.28em] text-[#7A5F3C] md:text-base lg:text-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}



function CountdownBlocks({
  countdown,
}: {
  countdown: CountdownValue;
}) {
  if (countdown.hasBegun) {
    return (
      <div className="w-fit rounded-full border border-[#FFFAF1]/60 bg-[#FFFAF1]/82 px-4 py-2 text-xs font-medium text-[#1F1A14]/85 shadow-[0_18px_50px_-36px_rgba(20,25,22,0.42)] backdrop-blur-md">
        Journey has begun
      </div>
    );
  }

  return (
    <div className="flex w-fit items-center gap-1.5 rounded-full border border-[#FFFAF1]/60 bg-[#FFFAF1]/82 px-4 py-2 text-[#1F1A14]/88 shadow-[0_18px_50px_-36px_rgba(20,25,22,0.42)] backdrop-blur-md md:px-5 md:py-2.5">
      {[
        {
          value: countdown.days,
          label: "days",
        },
        {
          value: countdown.hours,
          label: "hrs",
        },
        {
          value: countdown.minutes,
          label: "mins",
        },
      ].map((item, index) => (
        <div
          key={item.label}
          className="flex items-center gap-1.5"
        >
          <div className="flex items-baseline gap-1">
            <span className="text-base font-semibold leading-none tracking-[-0.04em] md:text-xl">
              {item.value}
            </span>

            <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-[#8A7355] md:text-[10px]">
              {item.label}
            </span>
          </div>

          {index < 2 && (
            <span className="text-xs text-[#BFAF98]">
              /
            </span>
          )}
        </div>
      ))}
    </div>
  );
}




function UpcomingCard({
  item,
  onOpen,
}: {
  item: UpcomingRenderItem;
  onOpen: () => void;
}) {
  const event = item.event;
  const countdown = useCountdown(event);

  const backgroundImageUrl =
    getImageUrl(item.backgroundImage, 1800, 900) ||
    getImageUrl(event.detailedViewImage, 1800, 900) ||
    getImageUrl(event.cardImage, 1800, 900);

  const whatsappPhoneNumber =
    event.whatsappPhoneNumber?.replace(/\D/g, "");

  return (
    <article className="relative pt-5">
      <div className="absolute left-8 top-0 z-30 inline-flex items-center gap-2 rounded-full border border-[#FFFAF1]/24 bg-[#9DB294]/92 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FFFAF1] shadow-[0_18px_46px_-26px_rgba(20,25,22,0.55)] backdrop-blur-md md:left-14 md:px-7 md:py-3 md:text-xs md:tracking-[0.22em]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#F1D49B] md:h-2 md:w-2" />
        {item.badgeLabel || "Upcoming event"}
      </div>

      <div className="overflow-hidden rounded-[30px] bg-[#E7E0D2] shadow-[0_24px_70px_-48px_rgba(20,25,22,0.45)] md:rounded-[36px] lg:relative lg:min-h-[430px]">
        <div className="relative h-[210px] overflow-hidden bg-[#D4CBB9] md:h-[300px] lg:absolute lg:inset-0 lg:h-auto">
          {backgroundImageUrl && (
            <Image
              src={backgroundImageUrl}
              alt={getPublicEventTitle(event)}
              fill
              sizes="100vw"
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/5" />

          <div className="absolute bottom-4 right-4 z-20 md:bottom-auto md:right-8 md:top-8">
            <CountdownBlocks countdown={countdown} />
          </div>
        </div>

        <div className="relative lg:grid lg:min-h-[430px] lg:grid-cols-[38%_62%]">
          <div className="relative overflow-hidden bg-[#F6EFE2]/88 px-4 pb-7 pt-4 backdrop-blur-none md:px-10 md:pb-10 md:pt-12 lg:flex lg:h-full lg:flex-col lg:justify-center lg:bg-[#FFFAF1]/48 lg:px-11 lg:py-14 lg:backdrop-blur-[18px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(139,166,127,0.46),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(119,92,59,0.22),transparent_30%),radial-gradient(circle_at_75%_95%,rgba(224,178,140,0.42),transparent_36%),linear-gradient(135deg,rgba(255,250,241,0.82),rgba(202,214,190,0.54),rgba(196,174,150,0.46))] lg:bg-gradient-to-br lg:from-white/24 lg:via-[#FFFAF1]/22 lg:to-[#D8E8DC]/14" />

            <div className="relative z-10">
              <EventTitleLockup event={event} />

              <div className="mt-4 md:mt-7">
                <EventDateBadge event={event} />
              </div>

              {(item.announcementText ||
                event.announcementNote ||
                event.shortDescription) && (
                <p className="mt-5 max-w-[430px] text-base leading-[1.6] tracking-[-0.02em] text-[#1F1A14]/78 md:mt-7 md:text-lg md:leading-[1.7] lg:text-sm">
                  {item.announcementText ||
                    event.announcementNote ||
                    event.shortDescription}
                </p>
              )}

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center md:mt-8 md:gap-4 lg:mt-6 lg:gap-3">
                <a
                  href={event.reservationUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#2B4A40] px-7 text-sm font-semibold text-[#FFFAF1] transition-all duration-300 hover:bg-[#1F3E35] md:h-13 md:px-8 md:text-base lg:h-10 lg:px-6 lg:text-xs"
                >
                  {item.ctaLabel || "Reserve Your Spot"}
                </a>

                <button
                  type="button"
                  onClick={onOpen}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[#2B4A40] px-7 text-sm font-medium text-[#2B4A40] transition-all duration-300 hover:bg-[#2B4A40] hover:text-[#FFFAF1] md:h-13 md:px-8 md:text-base lg:h-10 lg:px-6 lg:text-xs"
                >
                  View Details
                </button>
              </div>

              <div className="mt-6 border-t border-white/45 pt-4 md:mt-9 md:pt-6 lg:mt-6 lg:pt-5">
                <h4 className="text-base font-bold tracking-[-0.03em] text-[#1F1A14] md:text-lg lg:text-sm">
                  {event.whatsappTitle ||
                    "Have questions or need guidance?"}
                </h4>

                <p className="mt-1.5 max-w-[420px] text-sm leading-[1.6] text-[#1F1A14]/72 md:mt-2 md:leading-[1.7] lg:text-xs">
                  {event.whatsappDescription ||
                    "Click and connect with us on WhatsApp."}
                </p>

                {whatsappPhoneNumber && (
                  <a
                    href={`https://wa.me/${whatsappPhoneNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-full border border-white/60 bg-white/68 px-5 text-sm font-semibold text-[#1FBF63] backdrop-blur-sm transition-all duration-300 hover:bg-white md:mt-5 md:h-10 md:px-6 lg:h-9 lg:text-xs"
                  >
                    <WhatsAppIcon />
                    {event.whatsappButtonLabel || "Connect"}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>
    </article>
  );
}

export default function UpcomingSection({
  data,
}: Props) {
  const [activeEvent, setActiveEvent] =
    useState<EventItem | null>(null);

  const items = useMemo(() => {
    const usedAutomaticEventIds = new Set<string>();

    return (data.items || []).reduce(
      (
        result: UpcomingRenderItem[],
        item: UpcomingBlock,
      ) => {
        if (item.selectionMode === "manual") {
          if (item.event) {
            result.push({
              ...item,
              event: item.event,
            });
          }

          return result;
        }

        const nextAutomaticEvent = (
          data.automaticEvents || []
        ).find((event) => {
          const eventDate = getEventDate(event);

          if (!eventDate) return false;
          if (eventDate.getTime() < Date.now()) return false;
          if (usedAutomaticEventIds.has(event._id)) return false;

          return true;
        });

        if (nextAutomaticEvent) {
          usedAutomaticEventIds.add(nextAutomaticEvent._id);

          result.push({
            ...item,
            event: nextAutomaticEvent,
          });
        }

        return result;
      },
      [] as UpcomingRenderItem[],
    );
  }, [data.automaticEvents, data.items]);

  if (items.length === 0) return null;

  return (
    <>
      <section className="bg-[#F5EFE4] px-5 py-8 text-[#1F1A14] md:px-10 md:py-12 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-8">
            {items.map((item, index) => (
              <UpcomingCard
                key={item._key || item.event._id || index}
                item={item}
                onOpen={() => setActiveEvent(item.event)}
              />
            ))}
          </div>
        </div>
      </section>

      {activeEvent && (
  <EventDetailsModal
  open={true}
  event={activeEvent}
  onClose={() => setActiveEvent(null)}
/>
)}
    </>
  );
}