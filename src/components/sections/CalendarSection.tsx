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
  _key: string;
  _type: string;
  children?: {
    _key: string;
    _type: string;
    text?: string;
  }[];
};

type EventItem = {
  _id: string;
  title?: string;
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
  eventIcon?: SanityImage | null;
  cardImage?: SanityImage | null;
  detailedViewImage?: SanityImage | null;
  features?: FeatureItem[];
  whatsappTitle?: string;
  whatsappDescription?: string;
  whatsappButtonLabel?: string;
  whatsappPhoneNumber?: string;
};

type CalendarSectionData = {
  eyebrow?: string;
  title?: string;
  description?: string;
  manualEvents?: EventItem[];
};

type Props = {
  data: CalendarSectionData;
};

type CalendarMonth = {
  month: number;
  year: number;
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
  if (!image) {
    return null;
  }

  let builder = urlFor(image);

  if (width) {
    builder = builder.width(width);
  }

  if (height) {
    builder = builder.height(height);
  }

  return builder
    .fit("crop")
    .auto("format")
    .url();
}

function getEventDate(event: EventItem) {
  const date =
    event.eventType === "retreat"
      ? event.startDate
      : event.singleDate;

  if (!date) {
    return null;
  }

  return new Date(date);
}

function getMonthKey(month: CalendarMonth) {
  return `${month.year}-${String(
    month.month,
  ).padStart(2, "0")}`;
}

function getEventMonthKey(event: EventItem) {
  const eventDate = getEventDate(event);

  if (!eventDate) {
    return null;
  }

  return getMonthKey({
    month: eventDate.getMonth() + 1,
    year: eventDate.getFullYear(),
  });
}

function getNextMonth(month: CalendarMonth) {
  if (month.month === 12) {
    return {
      month: 1,
      year: month.year + 1,
    };
  }

  return {
    month: month.month + 1,
    year: month.year,
  };
}

function getPreviousMonth(month: CalendarMonth) {
  if (month.month === 1) {
    return {
      month: 12,
      year: month.year - 1,
    };
  }

  return {
    month: month.month - 1,
    year: month.year,
  };
}

function isBeforeMonth(
  monthA: CalendarMonth,
  monthB: CalendarMonth,
) {
  return (
    monthA.year < monthB.year ||
    (monthA.year === monthB.year &&
      monthA.month < monthB.month)
  );
}

function getMonthLabel(month: CalendarMonth) {
  const date = new Date(
    month.year,
    month.month - 1,
    1,
  );

  return date.toLocaleDateString("en-US", {
    month: "long",
  });
}

function getDateParts(date?: string | null) {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);

  return {
    day: String(parsedDate.getDate()),
    month: parsedDate.toLocaleDateString("en-US", {
      month: "long",
    }),
    shortMonth: parsedDate.toLocaleDateString("en-US", {
      month: "short",
    }),
    weekday: parsedDate.toLocaleDateString("en-US", {
      weekday: "long",
    }),
    year: String(parsedDate.getFullYear()),
    full: parsedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };
}

function getCountdownTarget(event: EventItem) {
  if (event.eventType === "retreat") {
    if (!event.startDate) {
      return null;
    }

    const start = new Date(event.startDate);

    return new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() - 1,
      12,
      0,
      0,
    );
  }

  if (!event.singleDate) {
    return null;
  }

  const singleDate = new Date(event.singleDate);

  return new Date(
    singleDate.getFullYear(),
    singleDate.getMonth(),
    singleDate.getDate(),
    17,
    0,
    0,
  );
}

function useCountdown(event: EventItem) {
  const [timeLeft, setTimeLeft] =
    useState<CountdownValue>({
      days: "00",
      hours: "00",
      minutes: "00",
      hasBegun: false,
    });

  useEffect(() => {
    const target = getCountdownTarget(event);

    if (!target) {
      return;
    }

    function updateCountdown() {
      const now = new Date();

      const difference =
        (target?.getTime() || 0) -
        now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          hasBegun: true,
        });

        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24),
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24,
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60,
      );

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        hasBegun: false,
      });
    }

    updateCountdown();

    const interval = setInterval(
      updateCountdown,
      60000,
    );

    return () => clearInterval(interval);
  }, [event]);

  return timeLeft;
}

function getEventShareUrl(event: EventItem) {
  if (typeof window === "undefined") {
    return "";
  }

  return `${window.location.origin}/events/${
    event.slug || event._id
  }`;
}

function CalendarMonthPicker({
  month,
  year,
  onPrevious,
  onNext,
  disablePrevious,
}: {
  month: string;
  year: number;
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious: boolean;
}) {
  return (
    <div className="w-full">
      <div className="inline-flex items-center gap-4 rounded-full border border-[#2B4A40]/10 bg-[#FFFAF1] px-4 py-3 shadow-[0_16px_48px_-30px_rgba(20,25,22,0.34)] md:px-6 md:py-4">
        <button
          type="button"
          onClick={onPrevious}
          disabled={disablePrevious}
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#2B4A40]/12 transition-all duration-300 ${
            disablePrevious
              ? "opacity-25"
              : "hover:bg-[#2B4A40] hover:text-[#FFFAF1]"
          }`}
        >
          ←
        </button>

        <div className="min-w-[180px] text-center">
          <h4 className="font-serif text-3xl tracking-[-0.04em] md:text-5xl">
            {month}
          </h4>

          <p className="text-[#5F5548]">
            {year}
          </p>
        </div>

        <button
          type="button"
          onClick={onNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2B4A40]/12 transition-all duration-300 hover:bg-[#2B4A40] hover:text-[#FFFAF1]"
        >
          →
        </button>
      </div>
    </div>
  );
}

function CalendarExpandButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-[#2B4A40]/15 bg-[#FFFAF1] px-6 py-4 text-sm transition-all duration-300 hover:bg-[#2B4A40] hover:text-[#FFFAF1]"
    >
      {label}
      <span>↓</span>
    </button>
  );
}

function EmptyMonthState({
  month,
}: {
  month: CalendarMonth;
}) {
  return (
    <div className="rounded-[32px] border border-[#2B4A40]/10 bg-[#FFFAF1] px-8 py-14 text-center">
      <h3 className="font-serif text-3xl tracking-[-0.04em] md:text-5xl">
        We are preparing sacred dates for{" "}
        {getMonthLabel(month)} {month.year}
      </h3>

      <p className="mx-auto mt-6 max-w-[620px] text-[#5F5548]">
        New ceremonies and retreats are being lovingly planned.
      </p>
    </div>
  );
}

function SingleDayDateBadge({
  date,
  compact = false,
}: {
  date?: string | null;
  compact?: boolean;
}) {
  const dateParts = getDateParts(date);

  if (!dateParts) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <div
        className={`flex items-center justify-center rounded-[22px] border border-[#28543B] ${
          compact
            ? "h-14 w-14 md:h-16 md:w-16"
            : "h-20 w-20"
        }`}
      >
        <span
          className={`font-bold tracking-[-0.04em] ${
            compact
              ? "text-3xl md:text-4xl"
              : "text-5xl"
          }`}
        >
          {dateParts.day}
        </span>
      </div>

      <div>
        <div
          className={`font-bold tracking-[-0.04em] ${
            compact
              ? "text-2xl md:text-3xl"
              : "text-4xl"
          }`}
        >
          {dateParts.month}
        </div>

        <div
          className={`mt-1 ${
            compact
              ? "text-base md:text-lg"
              : "text-2xl"
          }`}
        >
          {dateParts.weekday}
        </div>
      </div>
    </div>
  );
}

function RetreatDateBadge({
  startDate,
  endDate,
  compact = false,
}: {
  startDate?: string | null;
  endDate?: string | null;
  compact?: boolean;
}) {
  const startDateParts = getDateParts(startDate);
  const endDateParts = getDateParts(endDate);

  if (!startDateParts || !endDateParts) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      {[startDateParts, endDateParts].map(
        (dateParts, index) => (
          <div
            key={`${dateParts.day}-${dateParts.month}-${dateParts.year}`}
            className="flex items-center gap-4"
          >
            {index === 1 && (
              <div className="h-px w-8 bg-[#28543B]" />
            )}

            <div className="text-center">
              <div
                className={`flex items-center justify-center rounded-[22px] border border-[#28543B] ${
                  compact
                    ? "h-14 w-14 md:h-16 md:w-16"
                    : "h-20 w-20"
                }`}
              >
                <span
                  className={`font-bold ${
                    compact
                      ? "text-3xl md:text-4xl"
                      : "text-5xl"
                  }`}
                >
                  {dateParts.day}
                </span>
              </div>

              <div className="mt-3 text-xl font-semibold leading-none tracking-[-0.04em] md:text-2xl">
                {dateParts.month}
              </div>

              <div className="mt-1 text-xs tracking-[0.12em] text-[#7A5F3C] md:text-sm">
                {dateParts.year}
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
}

function EventDateBadge({
  event,
  compact = false,
}: {
  event: EventItem;
  compact?: boolean;
}) {
  if (event.eventType === "retreat") {
    return (
      <RetreatDateBadge
        startDate={event.startDate}
        endDate={event.endDate}
        compact={compact}
      />
    );
  }

  return (
    <SingleDayDateBadge
      date={event.singleDate}
      compact={compact}
    />
  );
}

function CountdownBlocks({
  countdown,
}: {
  countdown: CountdownValue;
}) {
  if (countdown.hasBegun) {
    return (
      <div className="rounded-full border border-[#2B4A40]/10 bg-[#F6F1E8] px-4 py-2.5 text-xs font-medium text-[#2B4A40] md:px-5 md:py-3 md:text-sm">
        Journey has begun
      </div>
    );
  }

  return (
    <div className="flex w-fit items-center gap-1.5 rounded-full border border-[#2B4A40]/10 bg-[#F6F1E8]/70 px-4 py-2.5 md:gap-2 md:px-5 md:py-3">
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
          className="flex items-center gap-1.5 md:gap-2"
        >
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold leading-none tracking-[-0.04em] text-[#111111] md:text-2xl">
              {item.value}
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#7A5F3C]/75 md:text-xs">
              {item.label}
            </span>
          </div>

          {index < 2 && (
            <span className="text-xs text-[#7A5F3C]/35 md:text-sm">
              /
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function EventIcon({
  event,
}: {
  event: EventItem;
}) {
  const iconUrl =
    getImageUrl(event.eventIcon, 96, 96) ||
    "/images/homepage/aya-icon.png";

  return (
    <Image
      src={iconUrl}
      alt=""
      width={64}
      height={64}
      className="h-12 w-12 object-contain"
    />
  );
}

function EventCardImage({
  event,
}: {
  event: EventItem;
}) {
  const imageUrl = getImageUrl(
    event.cardImage,
    900,
    900,
  );

  if (!imageUrl) {
    return (
      <div className="hidden bg-[#F6F1E8] lg:block" />
    );
  }

  return (
    <div className="relative min-h-[300px] overflow-hidden lg:min-h-full">
      <Image
        src={imageUrl}
        alt={event.title || "Event image"}
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-cover"
      />
    </div>
  );
}

function FeatureItemCard({
  feature,
}: {
  feature: FeatureItem;
}) {
  const iconUrl = getImageUrl(
    feature.icon,
    76,
    76,
  );

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

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-6 w-6"
      fill="currentColor"
    >
      <path d="M16.04 3.2A12.7 12.7 0 0 0 5.23 22.58L3.6 28.8l6.35-1.58A12.68 12.68 0 1 0 16.04 3.2Zm0 2.3a10.38 10.38 0 0 1 8.8 15.88 10.35 10.35 0 0 1-13.95 3.72l-.45-.25-3.77.94.96-3.67-.29-.47A10.39 10.39 0 0 1 16.04 5.5Zm-4.2 5.38c-.23 0-.6.08-.92.43-.32.35-1.22 1.2-1.22 2.93s1.25 3.4 1.43 3.64c.17.23 2.42 3.87 5.98 5.27 2.96 1.17 3.56.94 4.2.88.64-.06 2.06-.84 2.35-1.65.29-.82.29-1.52.2-1.66-.09-.15-.32-.24-.67-.42-.35-.17-2.06-1.02-2.38-1.13-.32-.12-.55-.18-.78.17-.23.35-.9 1.13-1.1 1.36-.2.23-.41.26-.76.09-.35-.18-1.48-.55-2.82-1.75-1.04-.93-1.74-2.08-1.94-2.43-.2-.35-.02-.54.15-.72.16-.16.35-.41.53-.61.17-.2.23-.35.35-.58.12-.23.06-.44-.03-.61-.09-.18-.78-1.89-1.07-2.59-.28-.67-.57-.58-.78-.59h-.68Z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="h-10 w-10 shrink-0 text-[#2B4A40] md:h-12 md:w-12"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
    >
      <path d="M24 4.5C15.7 4.5 9 11.2 9 19.5c0 10.5 15 24 15 24s15-13.5 15-24c0-8.3-6.7-15-15-15Z" />
      <path d="M24 25a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
      <path d="M14 39.5c-4.5 1-7.5 2.7-7.5 4.6 0 2.6 7.8 4.7 17.5 4.7s17.5-2.1 17.5-4.7c0-1.9-3-3.6-7.5-4.6" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect
        x="8"
        y="8"
        width="11"
        height="13"
        rx="2"
      />
      <path d="M5 16H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FEDA75] via-[#D62976] to-[#4F5BD5] text-sm font-bold text-white">
      ◎
    </span>
  );
}

function FacebookIcon() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4267B2] text-lg font-bold text-white">
      f
    </span>
  );
}

function DetailTopActions({
  event,
  countdown,
  onShare,
}: {
  event: EventItem;
  countdown: CountdownValue;
  onShare: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-[#2B4A40]/8 bg-[#FFFAF1]/92 p-5 shadow-[0_18px_70px_-48px_rgba(20,25,22,0.35)] md:flex-row md:flex-wrap md:items-center md:gap-5 md:p-6">
      <div className="min-w-0">
        <EventDateBadge
          event={event}
          compact
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        {event.timeRange && (
          <div className="rounded-full border border-[#2B4A40]/10 bg-[#F6F1E8] px-4 py-2.5 text-xs font-medium text-[#2B4A40] md:px-5 md:py-3 md:text-sm">
            {event.timeRange}
          </div>
        )}

        <CountdownBlocks
          countdown={countdown}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 md:ml-auto md:flex md:w-auto">
        <a
          href={event.reservationUrl || "#"}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#2B4A40] px-4 text-xs font-medium text-white transition-all duration-300 hover:opacity-90 md:h-12 md:px-7 md:text-sm"
        >
          Reserve your spot
        </a>

        <button
          type="button"
          onClick={onShare}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#2B4A40] px-4 text-xs font-medium text-[#2B4A40] transition-all duration-300 hover:bg-[#2B4A40] hover:text-[#FFFAF1] md:h-12 md:px-6 md:text-sm"
        >
          ↗ Share
        </button>
      </div>
    </div>
  );
}

function LocationCard() {
  return (
    <div className="rounded-[24px] border border-[#2B4A40]/10 bg-[#FFFAF1] px-5 py-5 shadow-[0_18px_70px_-58px_rgba(20,25,22,0.28)] md:w-fit md:px-6 md:py-5">
      <div className="flex items-center gap-4">
        <MapPinIcon />

        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#7A5F3C] md:text-xs">
              Location
            </p>

            <p className="mt-1 text-base font-semibold tracking-[-0.03em] text-[#1A1A1A] md:text-lg">
              {AYALUZ_LOCATION.name}
            </p>
          </div>

          <a
            href={AYALUZ_LOCATION.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-fit items-center justify-center gap-1.5 rounded-[12px] border border-[#0B63CE]/35 px-3 text-sm font-semibold tracking-[-0.03em] text-[#0B63CE] transition-all duration-300 hover:border-[#0B63CE] hover:bg-[#0B63CE] hover:text-white md:h-10 md:px-4"
          >
            Open Maps
            <span className="text-base leading-none">
              ↗
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function EventShareView({
  event,
  onBack,
  onClose,
}: {
  event: EventItem;
  onBack: () => void;
  onClose: () => void;
}) {
  const [toastVisible, setToastVisible] =
    useState(false);

  const shareUrl = getEventShareUrl(event);

  const shareText = `${event.title || "AyaLuz event"} — ${shareUrl}`;

  const previewImageUrl =
    getImageUrl(event.detailedViewImage, 900, 520) ||
    getImageUrl(event.cardImage, 900, 520);

  const date =
    event.eventType === "retreat"
      ? getDateParts(event.startDate)
      : getDateParts(event.singleDate);

  async function handleCopyLink() {
    await navigator.clipboard.writeText(shareUrl);

    setToastVisible(true);

    window.setTimeout(() => {
      setToastVisible(false);
    }, 2800);
  }

  function openShareUrl(url: string) {
    window.open(
      url,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="min-h-full bg-white">
      <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#E4D8C8] bg-white px-5 md:h-20 md:px-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-3 text-lg tracking-[-0.03em] text-[#111111]"
        >
          <span className="text-2xl">
            ←
          </span>
          Share this event
        </button>

        <button
          type="button"
          onClick={onClose}
          className="text-2xl text-[#111111]"
        >
          ×
        </button>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-10 md:grid-cols-[420px_1fr] md:px-8 md:py-14">
        <div className="overflow-hidden rounded-[22px] bg-[#F7F3EC] shadow-[0_24px_80px_-46px_rgba(20,25,22,0.45)]">
          {previewImageUrl && (
            <div className="relative h-[220px] overflow-hidden">
              <Image
                src={previewImageUrl}
                alt={event.title || "AyaLuz event"}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          )}

          <div className="p-5">
            <h3 className="text-xl font-bold tracking-[-0.04em] text-[#111111]">
              {event.title} • AyaLuz
            </h3>

            {date?.full && (
              <p className="mt-4 text-lg tracking-[-0.03em] text-[#111111]">
                {date.full}
              </p>
            )}

            <p className="mt-2 text-lg leading-[1.35] tracking-[-0.03em] text-[#111111]">
              {event.shortDescription ||
                "A transformative healing journey in Peru’s Sacred Valley."}
            </p>

            <p className="mt-5 text-lg tracking-[-0.03em] text-[#8D8A85]">
              ayaluz.org
            </p>
          </div>
        </div>

        <div className="grid h-fit grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex h-16 items-center gap-4 rounded-[14px] border border-[#D9C9B5] bg-white px-5 text-lg tracking-[-0.03em] transition hover:bg-[#F7F3EC]"
          >
            <CopyIcon />
            Copy link
          </button>

          <button
            type="button"
            onClick={() =>
              openShareUrl(
                `https://wa.me/?text=${encodeURIComponent(
                  shareText,
                )}`,
              )
            }
            className="flex h-16 items-center gap-4 rounded-[14px] border border-[#D9C9B5] bg-white px-5 text-lg tracking-[-0.03em] transition hover:bg-[#F7F3EC]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white">
              <WhatsAppIcon />
            </span>
            WhatsApp
          </button>

          <button
            type="button"
            onClick={() =>
              openShareUrl(
                "https://www.instagram.com/",
              )
            }
            className="flex h-16 items-center gap-4 rounded-[14px] border border-[#D9C9B5] bg-white px-5 text-lg tracking-[-0.03em] transition hover:bg-[#F7F3EC]"
          >
            <InstagramIcon />
            Instagram
          </button>

          <button
            type="button"
            onClick={() =>
              openShareUrl(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl,
                )}`,
              )
            }
            className="flex h-16 items-center gap-4 rounded-[14px] border border-[#D9C9B5] bg-white px-5 text-lg tracking-[-0.03em] transition hover:bg-[#F7F3EC]"
          >
            <FacebookIcon />
            Facebook
          </button>
        </div>
      </div>

      {toastVisible && (
        <div className="fixed bottom-6 left-1/2 z-[1000] w-[calc(100%-32px)] max-w-sm -translate-x-1/2 rounded-full bg-[#2B4A40] px-5 py-4 text-center text-sm text-white shadow-2xl">
          Link copied. Now paste it in your chat with your friend.
        </div>
      )}
    </div>
  );
}

function EventDetailView({
  event,
  onClose,
  onShare,
}: {
  event: EventItem;
  onClose: () => void;
  onShare: () => void;
}) {
  const detailImageUrl =
    getImageUrl(event.detailedViewImage, 1800, 720) ||
    getImageUrl(event.cardImage, 1400, 720);

  const countdown = useCountdown(event);

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur-sm"
      >
        ✕
      </button>

      {detailImageUrl ? (
        <div className="relative h-[260px] overflow-hidden rounded-t-[34px] bg-[#DDD4C5] md:h-[420px] lg:h-[460px] lg:rounded-t-[38px]">
          <Image
            src={detailImageUrl}
            alt={event.title || "Event image"}
            fill
            unoptimized
            priority
            sizes="(max-width: 1024px) 100vw, 1120px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-[120px] rounded-t-[34px] bg-[#DDD4C5]" />
      )}

      <div className="p-5 md:p-10">
        <div className="flex flex-col gap-7 md:gap-8">
          <DetailTopActions
            event={event}
            countdown={countdown}
            onShare={onShare}
          />

          <div>
            <div className="flex items-center gap-4">
              <EventIcon event={event} />

              <h2 className="font-serif text-4xl tracking-[-0.04em] md:text-6xl">
                {event.title}
              </h2>
            </div>

            {event.announcementNote && (
              <div className="mt-6 rounded-[24px] border border-[#D7C1A1] bg-[#FFF7EA] px-5 py-4 text-sm text-[#7A5F3C]">
                {event.announcementNote}
              </div>
            )}
          </div>

          {event.longDescription && (
            <div className="prose prose-neutral max-w-none prose-p:text-[#1A1A1A] prose-p:leading-[1.9]">
              <PortableText
                value={event.longDescription}
              />
            </div>
          )}

          {event.features &&
            event.features.length > 0 && (
              <div>
                <h3 className="mb-6 font-serif text-3xl">
                  Included
                </h3>

                <div className="grid gap-4 md:grid-cols-2">
                  {event.features.map(
                    (feature, index) => (
                      <FeatureItemCard
                        key={index}
                        feature={feature}
                      />
                    ),
                  )}
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
                className="mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/70 bg-white/70 px-8 text-lg font-semibold text-[#46A35A] shadow-[0_18px_60px_-32px_rgba(20,25,22,0.34)]"
              >
                <WhatsAppIcon />
                {event.whatsappButtonLabel ||
                  "Connect"}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function EventDetailModal({
  event,
  onClose,
}: {
  event: EventItem;
  onClose: () => void;
}) {
  const [modalView, setModalView] =
    useState<"detail" | "share">("detail");

  useEffect(() => {
    function handleEscape(
      keyboardEvent: KeyboardEvent,
    ) {
      if (keyboardEvent.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    document.body.style.overflow =
      "hidden";

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );

      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      <style jsx>{`
        @media (max-width: 1023px) {
          .ayaluz-event-sheet {
            height: 90svh !important;
            min-height: 90svh !important;
            max-height: 90svh !important;
          }

          @supports (height: 90dvh) {
            .ayaluz-event-sheet {
              height: 90dvh !important;
              min-height: 90dvh !important;
              max-height: 90dvh !important;
            }
          }
        }
      `}</style>

      <div
        className="fixed inset-0 z-[999] flex items-end justify-center bg-black/50 backdrop-blur-md lg:items-center"
        onClick={onClose}
      >
        <div
          className="ayaluz-event-sheet relative w-full overflow-y-auto rounded-t-[34px] bg-[#F5EFE4] shadow-2xl lg:max-h-[92vh] lg:w-[1120px] lg:rounded-[38px]"
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          {modalView === "detail" && (
            <EventDetailView
              event={event}
              onClose={onClose}
              onShare={() =>
                setModalView("share")
              }
            />
          )}

          {modalView === "share" && (
            <EventShareView
              event={event}
              onBack={() =>
                setModalView("detail")
              }
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </>
  );
}

function EventCard({
  event,
  onOpen,
}: {
  event: EventItem;
  onOpen: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[#2B4A40]/10 bg-[#FFFAF1] shadow-[0_18px_60px_-32px_rgba(20,25,22,0.34)] transition-all duration-300 hover:shadow-[0_22px_72px_-34px_rgba(20,25,22,0.42)] lg:rounded-[34px]">
      <div className="grid lg:grid-cols-[420px_1fr]">
        <EventCardImage event={event} />

        <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10">
          <div className="w-fit rounded-[24px] bg-[#F6F1E8]/80 p-4 ring-1 ring-[#2B4A40]/10">
            <EventDateBadge event={event} />
          </div>

          <div>
            <div className="flex items-center gap-4">
              <EventIcon event={event} />

              <h3 className="font-serif text-3xl leading-tight tracking-[-0.04em] md:text-5xl">
                {event.title}
              </h3>
            </div>

            {event.shortDescription && (
              <p className="mt-8 max-w-[720px] leading-[1.8] text-[#1A1A1A]">
                {event.shortDescription}
              </p>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#2B4A40] px-7 text-sm font-medium tracking-[-0.01em] text-[#2B4A40] transition-all duration-300 hover:bg-[#2B4A40] hover:text-[#FFFAF1]"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CalendarSection({
  data,
}: Props) {
  const today = new Date();

  const currentMonth = {
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  };

  const events = useMemo(() => {
    return [...(data.manualEvents || [])].sort(
      (eventA, eventB) => {
        const dateA =
          getEventDate(eventA)?.getTime() || 0;

        const dateB =
          getEventDate(eventB)?.getTime() || 0;

        return dateA - dateB;
      },
    );
  }, [data.manualEvents]);

  const [selectedMonth, setSelectedMonth] =
    useState<CalendarMonth>(
      currentMonth,
    );

  const [expandedMonths, setExpandedMonths] =
    useState<CalendarMonth[]>([]);

  const [activeEvent, setActiveEvent] =
    useState<EventItem | null>(null);

  const selectedMonthKey =
    getMonthKey(selectedMonth);

  const selectedEvents = events.filter(
    (event) =>
      getEventMonthKey(event) ===
      selectedMonthKey,
  );

  const disablePrevious =
    !isBeforeMonth(
      currentMonth,
      selectedMonth,
    );

  const nextExpandableMonth =
    expandedMonths.length === 0
      ? getNextMonth(selectedMonth)
      : getNextMonth(
          expandedMonths[
            expandedMonths.length - 1
          ],
        );

  function handlePreviousMonth() {
    if (disablePrevious) {
      return;
    }

    setSelectedMonth((current) =>
      getPreviousMonth(current),
    );

    setExpandedMonths([]);
  }

  function handleNextMonth() {
    setSelectedMonth((current) =>
      getNextMonth(current),
    );

    setExpandedMonths([]);
  }

  function handleExpandNextMonth() {
    setExpandedMonths((current) => [
      ...current,
      nextExpandableMonth,
    ]);
  }

  return (
    <>
      <section className="bg-[#F5EFE4] px-6 py-24 text-[#1F1A14] md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 max-w-3xl">
            {data.eyebrow && (
              <p className="mb-4 text-xs uppercase tracking-[0.32em] text-[#7A5F3C]">
                {data.eyebrow}
              </p>
            )}

            {data.title && (
              <h2 className="font-serif text-4xl leading-tight tracking-[-0.04em] md:text-6xl">
                {data.title}
              </h2>
            )}

            {data.description && (
              <p className="mt-6 max-w-2xl text-base leading-[1.75] tracking-[-0.02em] text-[#5F5548] md:text-lg">
                {data.description}
              </p>
            )}
          </div>

          <div className="mb-10">
            <CalendarMonthPicker
              month={getMonthLabel(
                selectedMonth,
              )}
              year={selectedMonth.year}
              onPrevious={
                handlePreviousMonth
              }
              onNext={handleNextMonth}
              disablePrevious={
                disablePrevious
              }
            />
          </div>

          <div className="space-y-8">
            {selectedEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onOpen={() =>
                  setActiveEvent(event)
                }
              />
            ))}

            {selectedEvents.length === 0 && (
              <EmptyMonthState
                month={selectedMonth}
              />
            )}

            {expandedMonths.map((month) => {
              const monthKey =
                getMonthKey(month);

              const monthEvents =
                events.filter(
                  (event) =>
                    getEventMonthKey(
                      event,
                    ) === monthKey,
                );

              return (
                <div
                  key={monthKey}
                  className="pt-8"
                >
                  <h3 className="mb-8 font-serif text-3xl tracking-[-0.04em] md:text-5xl">
                    {getMonthLabel(month)}{" "}
                    {month.year}
                  </h3>

                  <div className="space-y-8">
                    {monthEvents.map(
                      (event) => (
                        <EventCard
                          key={event._id}
                          event={event}
                          onOpen={() =>
                            setActiveEvent(
                              event,
                            )
                          }
                        />
                      ),
                    )}

                    {monthEvents.length ===
                      0 && (
                      <EmptyMonthState
                        month={month}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <CalendarExpandButton
              label={`View ${getMonthLabel(
                nextExpandableMonth,
              )} events`}
              onClick={
                handleExpandNextMonth
              }
            />
          </div>
        </div>
      </section>

      {activeEvent && (
        <EventDetailModal
          event={activeEvent}
          onClose={() =>
            setActiveEvent(null)
          }
        />
      )}
    </>
  );
}