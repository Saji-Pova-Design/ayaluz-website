"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

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

function getDateParts(date?: string | null) {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return null;

  return {
    day: String(parsedDate.getDate()),
    month: parsedDate.toLocaleDateString("en-US", {
      month: "long",
    }),
    weekday: parsedDate.toLocaleDateString("en-US", {
      weekday: "long",
    }),
    year: String(parsedDate.getFullYear()),
  };
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
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M16.04 3.2A12.7 12.7 0 0 0 5.23 22.58L3.6 28.8l6.35-1.58A12.68 12.68 0 1 0 16.04 3.2Zm0 2.3a10.38 10.38 0 0 1 8.8 15.88 10.35 10.35 0 0 1-13.95 3.72l-.45-.25-3.77.94.96-3.67-.29-.47A10.39 10.39 0 0 1 16.04 5.5Zm-4.2 5.38c-.23 0-.6.08-.92.43-.32.35-1.22 1.2-1.22 2.93s1.25 3.4 1.43 3.64c.17.23 2.42 3.87 5.98 5.27 2.96 1.17 3.56.94 4.2.88.64-.06 2.06-.84 2.35-1.65.29-.82.29-1.52.2-1.66-.09-.15-.32-.24-.67-.42-.35-.17-2.06-1.02-2.38-1.13-.32-.12-.55-.18-.78.17-.23.35-.9 1.13-1.1 1.36-.2.23-.41.26-.76.09-.35-.18-1.48-.55-2.82-1.75-1.04-.93-1.74-2.08-1.94-2.43-.2-.35-.02-.54.15-.72.16-.16.35-.41.53-.61.17-.2.23-.35.35-.58.12-.23.06-.44-.03-.61-.09-.18-.78-1.89-1.07-2.59-.28-.67-.57-.58-.78-.59h-.68Z" />
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

function DetailTitleLockup({
  event,
}: {
  event: EventItem;
}) {
  const title = getPublicEventTitle(event);
  const subtitle = getPublicEventSubtitle(event);

  return (
    <div className="min-w-0 leading-none">
      <h2 className="font-serif text-4xl leading-[0.95] tracking-[-0.06em] text-[#1B1713] md:text-6xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-sm uppercase tracking-[0.28em] text-[#7A5F3C] md:text-base">
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

function SingleDayDateBadge({
  date,
}: {
  date?: string | null;
}) {
  const dateParts = getDateParts(date);

  if (!dateParts) return null;

  return (
    <div className="flex items-center gap-5 p-0">
      <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-[#28543B] md:h-16 md:w-16 md:rounded-[16px]">
        <span className="text-2xl font-bold tracking-[-0.05em] md:text-3xl">
          {dateParts.day}
        </span>
      </div>

      <div>
        <div className="text-lg font-semibold tracking-[-0.05em] md:text-2xl">
          {dateParts.month}
        </div>

        <div className="mt-0 text-base md:text-lg">
          {dateParts.weekday}
        </div>
      </div>
    </div>
  );
}

function RetreatDateBadge({
  startDate,
  endDate,
}: {
  startDate?: string | null;
  endDate?: string | null;
}) {
  const start = getDateParts(startDate);
  const end = getDateParts(endDate);

  if (!start || !end) return null;

  return (
    <div className="flex items-start gap-4 p-0 md:gap-5">
      {[start, end].map((date, index) => (
        <div
          key={`${date.day}-${date.month}-${date.year}`}
          className="flex items-center gap-4 md:gap-5"
        >
          {index === 1 && (
            <div className="h-px w-5 bg-[#28543B] md:w-8" />
          )}

          <div className="flex items-center gap-3 md:gap-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[10px] border border-[#28543B] md:h-16 md:w-16 md:rounded-[16px]">
              <span className="text-lg font-semibold tracking-[-0.05em] md:text-2xl">
                {date.day}
              </span>
            </div>

            <div className="leading-none">
              <div className="text-lg font-bold tracking-[-0.05em] md:text-2xl">
                {date.month}
              </div>

              <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#7A5F3C] md:text-xs">
                {date.year}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EventDateBadge({
  event,
}: {
  event?: EventItem | null;
}) {
  if (!event) return null;

  if (event.eventType === "retreat") {
    return (
      <RetreatDateBadge
        startDate={event.startDate}
        endDate={event.endDate}
      />
    );
  }

  return (
    <SingleDayDateBadge
      date={event.singleDate}
    />
  );
}

function FeatureItemCard({
  feature,
}: {
  feature: FeatureItem;
}) {
  const iconUrl = getImageUrl(feature.icon, 76, 76);

  return (
    <div className="flex items-start gap-4 rounded-[24px] border border-[#2B4A40]/10 bg-[#FFFAF1] p-5">
      {iconUrl && (
        <Image
          src={iconUrl}
          alt=""
          width={38}
          height={38}
          className="shrink-0"
        />
      )}

      <p className="text-sm leading-[1.7] text-[#1A1A1A]">
        {feature.text}
      </p>
    </div>
  );
}

function LocationCard() {
  return (
    <div className="rounded-[24px] border border-[#2B4A40]/10 bg-[#FFFAF1] px-5 py-5 shadow-[0_18px_70px_-58px_rgba(20,25,22,0.28)] md:w-fit md:px-6 md:py-5">
      <p className="text-[10px] uppercase tracking-[0.28em] text-[#7A5F3C] md:text-xs">
        Location
      </p>

      <p className="mt-1 text-base font-semibold tracking-[-0.03em] text-[#1A1A1A] md:text-lg">
        {AYALUZ_LOCATION.name}
      </p>

      <a
        href={AYALUZ_LOCATION.googleMapsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex h-9 w-fit items-center justify-center rounded-[12px] border border-[#0B63CE]/35 px-3 text-sm font-semibold tracking-[-0.03em] text-[#0B63CE]"
      >
        Open Maps ↗
      </a>
    </div>
  );
}

function EventDetailModal({
  event,
  onClose,
}: {
  event: EventItem;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleEscape(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const detailImageUrl =
    getImageUrl(event.detailedViewImage, 1800, 720) ||
    getImageUrl(event.cardImage, 1400, 720);

  const countdown = useCountdown(event);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-end justify-center bg-black/50 backdrop-blur-md lg:items-center"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[34px] bg-[#F5EFE4] shadow-2xl lg:w-[1120px] lg:rounded-[38px]"
        onClick={(clickEvent) => clickEvent.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur-sm"
        >
          ✕
        </button>

        {detailImageUrl && (
          <div className="relative h-[260px] overflow-hidden rounded-t-[34px] bg-[#DDD4C5] md:h-[420px] lg:h-[460px] lg:rounded-t-[38px]">
            <Image
              src={detailImageUrl}
              alt={getPublicEventTitle(event)}
              fill
              unoptimized
              priority
              sizes="(max-width: 1024px) 100vw, 1120px"
              className="object-cover"
            />
          </div>
        )}

        <div className="p-5 md:p-10">
          <div className="flex flex-col gap-7 md:gap-8">
            <div className="flex flex-col gap-4 rounded-[28px] border border-[#2B4A40]/8 bg-[#FFFAF1]/92 p-5 md:flex-row md:flex-wrap md:items-center md:gap-5 md:p-6">
              <EventDateBadge event={event} />

              <div className="flex flex-wrap items-center gap-3 md:ml-auto">
                {event.timeRange && (
                  <div className="rounded-full border border-[#2B4A40]/10 bg-[#F6F1E8] px-4 py-2.5 text-xs font-medium text-[#2B4A40] md:px-5 md:py-3 md:text-sm">
                    {event.timeRange}
                  </div>
                )}

                <CountdownBlocks countdown={countdown} />
              </div>
            </div>

            <DetailTitleLockup event={event} />

            {event.announcementNote && (
              <div className="rounded-[24px] border border-[#D7C1A1] bg-[#FFF7EA] px-5 py-4 text-sm text-[#7A5F3C]">
                {event.announcementNote}
              </div>
            )}

            {event.longDescription && (
              <div className="prose prose-neutral max-w-none prose-p:text-[#1A1A1A] prose-p:leading-[1.9]">
                <PortableText value={event.longDescription} />
              </div>
            )}

            {event.features && event.features.length > 0 && (
              <div>
                <h3 className="mb-6 font-serif text-3xl">
                  Included
                </h3>

                <div className="grid gap-4 md:grid-cols-2">
                  {event.features.map((feature, index) => (
                    <FeatureItemCard
                      key={`${feature.text || "feature"}-${index}`}
                      feature={feature}
                    />
                  ))}
                </div>
              </div>
            )}

            <LocationCard />

            <div className="rounded-[30px] bg-[#D8E8DC] p-7 text-[#111111] md:p-8">
              <h3 className="text-3xl font-bold tracking-[-0.04em] md:text-5xl">
                {event.whatsappTitle ||
                  "Have questions or need guidance?"}
              </h3>

              <p className="mt-5 max-w-[680px] text-xl tracking-[-0.03em] text-[#111111]/80 md:text-3xl">
                {event.whatsappDescription ||
                  "Click and connect with us on WhatsApp"}
              </p>

              {event.whatsappPhoneNumber && (
                <a
                  href={`https://wa.me/${event.whatsappPhoneNumber.replace(
                    /\D/g,
                    "",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/70 bg-white/70 px-8 text-lg font-semibold text-[#46A35A]"
                >
                  <WhatsAppIcon />
                  {event.whatsappButtonLabel || "Connect"}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
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
        <div className="mx-auto max-w-7xl">
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
        <EventDetailModal
          event={activeEvent}
          onClose={() => setActiveEvent(null)}
        />
      )}
    </>
  );
}