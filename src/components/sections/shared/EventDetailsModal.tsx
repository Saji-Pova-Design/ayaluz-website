"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

import { urlFor } from "@/sanity/lib/image";
import EventDateBadge from "./EventDateBadge";

type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
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

type FeatureItem = {
  icon?: SanityImage | null;
  text?: string;
};

type EventDetailsEvent = {
  _id?: string;
  title?: string;
  displayTitle?: string;
  displaySubtitle?: string;
  description?: string;
  shortDescription?: string;
  announcementNote?: string;
  longDescription?: PortableTextBlock[];
  eventType?: "single-day" | "retreat";
  singleDate?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  timeRange?: string | null;
  reservationUrl?: string | null;
  cardImage?: SanityImage | null;
  detailedViewImage?: SanityImage | null;
  useCardDateBadgeInDetail?: boolean;
  useCardImageInDetail?: boolean;
  showShortDescriptionInDetail?: boolean;
  showAnnouncementInDetail?: boolean;
  showLongDescriptionInDetail?: boolean;
  showCountdown?: boolean;
  showLocation?: boolean;
  showReserveCtaInDetail?: boolean;
  detailReserveCtaLabel?: string;
  features?: FeatureItem[];
  whatToBring?: FeatureItem[];
  whatsappTitle?: string;
  whatsappDescription?: string;
  whatsappButtonLabel?: string;
  whatsappPhoneNumber?: string;
  showShareCta?: boolean;
  shareTitle?: string;
  shareDescription?: string;
  sharePreviewImage?: SanityImage | null;
  slug?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  event: EventDetailsEvent | null;
};

const SITE_URL = "https://www.ayaluz.org";

const AYALUZ_LOCATION = {
  name: "AyaLuz Temple, Sacred Valley",
  googleMapsUrl:
    "https://www.google.com/maps?q=-13.4822877,-71.7929999",
};

const MONTHS: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) return "th";
  if (day % 10 === 1) return "st";
  if (day % 10 === 2) return "nd";
  if (day % 10 === 3) return "rd";

  return "th";
}

function formatDateObject(date: Date) {
  const month = date.toLocaleDateString("en-US", {
    month: "long",
  });

  const day = date.getDate();

  return `${month} ${day}${getOrdinalSuffix(day)}`;
}

function getCeremonyDateFromSlug(slug?: string) {
  if (!slug) return "";

  const normalizedSlug = slug.toLowerCase();

  const spacedDateMatch = normalizedSlug.match(
    /^ceremony-[a-z0-9-]+-(20\d{2})-(january|february|march|april|may|june|july|august|september|october|november|december)-(\d{1,2})$/,
  );

  const compactDateMatch = normalizedSlug.match(
    /^ceremony-[a-z0-9-]+-(20\d{2})-(january|february|march|april|may|june|july|august|september|october|november|december)(\d{1,2})$/,
  );

  const match = spacedDateMatch || compactDateMatch;

  if (!match) return "";

  const [, year, monthName, dayRaw] = match;

  const date = new Date(
    Number(year),
    MONTHS[monthName],
    Number(dayRaw),
    12,
  );

  return formatDateObject(date);
}

function getRetreatDateRangeFromSlug(slug?: string) {
  if (!slug) return "";

  const normalizedSlug = slug.toLowerCase();

  const sameMonthMatch = normalizedSlug.match(
    /^retreat-(20\d{2})-(january|february|march|april|may|june|july|august|september|october|november|december)-(\d{1,2})-(\d{1,2})$/,
  );

  const splitMonthMatch = normalizedSlug.match(
    /^retreat-(20\d{2})-(january|february|march|april|may|june|july|august|september|october|november|december)-(\d{1,2})-(january|february|march|april|may|june|july|august|september|october|november|december)-(\d{1,2})$/,
  );

  const compactSplitMonthMatch = normalizedSlug.match(
    /^retreat-(20\d{2})-(january|february|march|april|may|june|july|august|september|october|november|december)(\d{1,2})-(january|february|march|april|may|june|july|august|september|october|november|december)(\d{1,2})$/,
  );

  if (sameMonthMatch) {
    const [, year, monthName, startDayRaw, endDayRaw] = sameMonthMatch;

    const startDate = new Date(
      Number(year),
      MONTHS[monthName],
      Number(startDayRaw),
      12,
    );

    const endDate = new Date(
      Number(year),
      MONTHS[monthName],
      Number(endDayRaw),
      12,
    );

    return `${formatDateObject(startDate)} – ${formatDateObject(endDate)}`;
  }

  if (splitMonthMatch) {
    const [, year, startMonthName, startDayRaw, endMonthName, endDayRaw] =
      splitMonthMatch;

    const startDate = new Date(
      Number(year),
      MONTHS[startMonthName],
      Number(startDayRaw),
      12,
    );

    const endDate = new Date(
      Number(year),
      MONTHS[endMonthName],
      Number(endDayRaw),
      12,
    );

    return `${formatDateObject(startDate)} – ${formatDateObject(endDate)}`;
  }

  if (compactSplitMonthMatch) {
    const [, year, startMonthName, startDayRaw, endMonthName, endDayRaw] =
      compactSplitMonthMatch;

    const startDate = new Date(
      Number(year),
      MONTHS[startMonthName],
      Number(startDayRaw),
      12,
    );

    const endDate = new Date(
      Number(year),
      MONTHS[endMonthName],
      Number(endDayRaw),
      12,
    );

    return `${formatDateObject(startDate)} – ${formatDateObject(endDate)}`;
  }

  return "";
}

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

function getEventImageUrl(event: EventDetailsEvent) {
  if (!event.cardImage) return "/images/no-event.png";

  return urlFor(event.cardImage).width(1200).height(630).fit("crop").url();
}

function getEventSourceText(event: EventDetailsEvent) {
  return `${event.displayTitle || ""} ${event.displaySubtitle || ""} ${
    event.title || ""
  }`.toLowerCase();
}

function isWachumaEvent(event: EventDetailsEvent) {
  const source = getEventSourceText(event);

  return source.includes("wachuma") || source.includes("san pedro");
}

function isAyahuascaEvent(event: EventDetailsEvent) {
  return getEventSourceText(event).includes("ayahuasca");
}

function getCeremonyTitle(event: EventDetailsEvent) {
  if (isWachumaEvent(event)) return "Wachuma Ceremony";

  return "Ayahuasca Ceremony";
}

function getSocialDescription(event: EventDetailsEvent) {
  if (event.eventType === "retreat") {
    return "Transformative Sacred Plant Medicine Journeys in Peru's Andean Heartland, Sacred Valley, Ayahuasca Temple.";
  }

  if (isWachumaEvent(event)) {
    return "Transformative Wachuma Journey in Peru's Andean Heartland, Sacred Valley, Ayahuasca Temple.";
  }

  if (isAyahuascaEvent(event)) {
    return "Transformative Ayahuasca Journey in Peru's Andean Heartland, Sacred Valley, Ayahuasca Temple.";
  }

  return "Transformative Sacred Plant Medicine Journeys in Peru's Andean Heartland, Sacred Valley, Ayahuasca Temple.";
}

function getSocialTitle(event: EventDetailsEvent) {
  if (event.eventType === "retreat") {
    return [
      event.displayTitle || event.title || "AyaLuz Retreat",
      event.displaySubtitle,
      getRetreatDateRangeFromSlug(event.slug),
    ]
      .filter(Boolean)
      .join(" • ");
  }

  return [getCeremonyTitle(event), getCeremonyDateFromSlug(event.slug)]
    .filter(Boolean)
    .join(" • ");
}

function getTitle(event: EventDetailsEvent) {
  return event.displayTitle || event.title || "Upcoming Event";
}

function getSubtitle(event: EventDetailsEvent) {
  return event.displaySubtitle || "";
}

function getHeroImage(event: EventDetailsEvent) {
  if (event.useCardImageInDetail !== false) {
    return (
      getImageUrl(event.cardImage, 1800, 1000) ||
      getImageUrl(event.detailedViewImage, 1800, 1000)
    );
  }

  return (
    getImageUrl(event.detailedViewImage, 1800, 1000) ||
    getImageUrl(event.cardImage, 1800, 1000)
  );
}

function getCompactTimeRange(timeRange?: string | null) {
  if (!timeRange) return "";

  return timeRange
    .replace(/\s*-\s*/g, "–")
    .replace(/:00/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getCountdownTarget(event: EventDetailsEvent) {
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

  const single = new Date(event.singleDate);

  if (Number.isNaN(single.getTime())) return null;

  return new Date(
    single.getFullYear(),
    single.getMonth(),
    single.getDate(),
    17,
    0,
    0,
  );
}

function Countdown({
  event,
}: {
  event: EventDetailsEvent;
}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => window.clearInterval(interval);
  }, []);

  const target = getCountdownTarget(event);

  if (!target) return null;

  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return null;

  const days = String(
    Math.floor(diff / (1000 * 60 * 60 * 24)),
  ).padStart(2, "0");

  const hours = String(
    Math.floor((diff / (1000 * 60 * 60)) % 24),
  ).padStart(2, "0");

  const mins = String(
    Math.floor((diff / (1000 * 60)) % 60),
  ).padStart(2, "0");

  return (
    <div className="flex items-center gap-2 rounded-full bg-[#F6F1E8] px-5 py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.45)]">
      {[
        { value: days, label: "days" },
        { value: hours, label: "hrs" },
        { value: mins, label: "mins" },
      ].map((item, index) => (
        <div
          key={item.label}
          className="flex items-center gap-2"
        >
          <span className="text-[1.05rem] font-semibold tracking-[-0.04em] text-[#245748]">
            {item.value}
          </span>

          <span className="text-[0.72rem] uppercase tracking-[0.18em] text-[#8D775D]">
            {item.label}
          </span>

          {index < 2 && (
            <span className="ml-1 text-[#C1AE97]">/</span>
          )}
        </div>
      ))}
    </div>
  );
}

function ShareArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[14px] w-[14px]"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M15 18L9 12L15 6" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
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

function InstagramIcon() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.3" />
        <path d="M17.4 6.7h.01" />
      </svg>
    </span>
  );
}

function FacebookIcon() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#4267B2] text-white">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M14.2 8.2V6.9c0-.6.4-.8.8-.8h2V3h-2.8c-3 0-4.1 1.8-4.1 4v1.2H7.6v3.4h2.5V21h3.7v-9.4h2.8l.5-3.4h-3Z" />
      </svg>
    </span>
  );
}

function SectionDivider() {
  return (
    <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[#D7C7B3] to-transparent md:my-8" />
  );
}

function FeatureSection({
  title,
  items,
}: {
  title: string;
  items?: FeatureItem[];
}) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="mt-9">
      <h3 className="mb-5 font-canela text-[2rem] leading-none tracking-[-0.04em] text-[#111111]">
        {title}
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => {
          const iconUrl = getImageUrl(item.icon, 80, 80);

          return (
            <div
              key={`${item.text || "feature"}-${index}`}
              className="flex items-start gap-4 rounded-[24px] border border-[#E4D7C7] bg-[#FFFAF1] p-5"
            >
              {iconUrl && (
                <div className="relative h-11 w-11 shrink-0 overflow-hidden">
                  <Image
                    src={iconUrl}
                    alt=""
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              )}

              <p className="text-[0.98rem] leading-[1.75] text-[#1C1C1C]">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShareView({
  event,
  title,
  description,
  imageUrl,
  onBack,
  onClose,
}: {
  event: EventDetailsEvent;
  title: string;
  description: string;
  imageUrl: string;
  onBack: () => void;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? event.slug
        ? `${window.location.origin}/events/${event.slug}`
        : window.location.href
      : "";

  const encodedUrl = encodeURIComponent(shareUrl);

  async function handleCopyLink() {
    if (!shareUrl) return;

    await navigator.clipboard.writeText(shareUrl);

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 4200);
  }

  return (
    <div className="relative px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-7 md:px-12 md:pb-16 md:pt-10">
      <div className="relative flex h-12 items-center justify-center">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#2B4A40]/10 bg-[#F6F1E8] text-[#111111]"
          aria-label="Back to event details"
        >
          <BackIcon />
        </button>

        <h2 className="text-center text-xl font-semibold tracking-[-0.03em] text-[#111111] md:text-2xl">
          Share this event
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-3xl leading-none text-[#111111]"
          aria-label="Close share view"
        >
          ×
        </button>
      </div>

      <div className="mx-auto mt-10 grid max-w-[980px] gap-8 md:mt-16 md:grid-cols-[1fr_1fr] md:items-start md:gap-14">
        <div className="overflow-hidden rounded-[24px] bg-[#FFFAF1] shadow-[0_28px_70px_-52px_rgba(20,25,22,0.55)]">
          <div className="relative aspect-[1200/630] w-full overflow-hidden bg-[#EFE7D8]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover"
            />
          </div>

          <div className="p-5 md:p-6">
            <h3 className="text-xl font-semibold leading-[1.15] tracking-[-0.04em] text-[#111111] md:text-2xl">
              {title}
            </h3>

            <p className="mt-4 text-base leading-[1.45] text-[#111111] md:text-lg">
              {description}
            </p>

            <p className="mt-5 text-base leading-none text-[#111111]/45 md:text-lg">
              ayaluz.org
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex h-16 items-center justify-center gap-3 rounded-[14px] border border-[#E4D7C7] bg-[#F4EFE7] px-4 text-center text-base font-medium text-[#111111] transition-all duration-300 hover:border-[#215848]/30 hover:bg-[#FFFAF1] md:justify-start md:px-5 md:text-lg"
            >
              <CopyIcon />
              Copy link
            </button>

            <a
              href={`https://wa.me/?text=${encodedUrl}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-16 items-center justify-center gap-3 rounded-[14px] border border-[#E4D7C7] bg-[#F4EFE7] px-4 text-center text-base font-medium text-[#111111] transition-all duration-300 hover:border-[#215848]/30 hover:bg-[#FFFAF1] md:justify-start md:px-5 md:text-lg"
            >
              <span className="text-[#27B43E]">
                <WhatsAppIcon />
              </span>
              WhatsApp
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-16 items-center justify-center gap-3 rounded-[14px] border border-[#E4D7C7] bg-[#F4EFE7] px-4 text-center text-base font-medium text-[#111111] transition-all duration-300 hover:border-[#215848]/30 hover:bg-[#FFFAF1] md:justify-start md:px-5 md:text-lg"
            >
              <InstagramIcon />
              Instagram
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-16 items-center justify-center gap-3 rounded-[14px] border border-[#E4D7C7] bg-[#F4EFE7] px-4 text-center text-base font-medium text-[#111111] transition-all duration-300 hover:border-[#215848]/30 hover:bg-[#FFFAF1] md:justify-start md:px-5 md:text-lg"
            >
              <FacebookIcon />
              FaceBook
            </a>
          </div>

          <div
            className={`
              fixed left-1/2 top-1/2 z-50 w-[min(84vw,420px)] -translate-x-1/2 rounded-[22px]
              border border-[#D7C7B3] bg-[#FFFAF1] px-6 py-5 text-center text-sm leading-[1.65]
              text-[#215848] shadow-[0_24px_80px_-35px_rgba(20,25,22,0.55)]
              transition-all duration-500 ease-out
              ${
                copied
                  ? "-translate-y-1/2 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-[42%] scale-95 opacity-0"
              }
            `}
          >
            <p className="font-semibold">
              Link copied successfully.
            </p>

            <p className="mt-1 text-[#215848]/80">
              Now send it to a friend and invite them into the journey ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventDetailsModal({
  open,
  onClose,
  event,
}: Props) {
  const [shareView, setShareView] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    const handleEscape = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setShareView(false);
    }
  }, [open, event?._id]);

  const data = useMemo(() => {
    if (!event) return null;

    const title = getTitle(event);
    const image = getHeroImage(event);

    const eventWithSiteSlug = {
      ...event,
      slug: event.slug,
    };

    return {
      title,
      subtitle: getSubtitle(event),
      image,
      compactTimeRange: getCompactTimeRange(event.timeRange),
      shareTitle: getSocialTitle(eventWithSiteSlug),
      shareDescription: getSocialDescription(eventWithSiteSlug),
      shareImage: getEventImageUrl(eventWithSiteSlug),
    };
  }, [event]);

  if (!open || !event || !data) {
    return null;
  }

  const isCeremony = event.eventType === "single-day";

  return (
    <div
      className="fixed inset-0 z-[999] flex h-[100dvh] items-end justify-center overflow-hidden bg-black/45 backdrop-blur-[4px] md:items-center md:px-6"
      onClick={onClose}
    >
      <div
        onClick={(clickEvent) => clickEvent.stopPropagation()}
        className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[34px] bg-[#F4EFE7] shadow-[0_-24px_80px_-40px_rgba(0,0,0,0.65)] md:max-h-[94vh] md:max-w-[1220px] md:rounded-[36px]"
      >
        {!shareView && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#F4EFE7] text-[1.8rem] text-[#111111] shadow-[0_10px_35px_-24px_rgba(0,0,0,0.6)] md:h-14 md:w-14 md:text-[2rem]"
            aria-label="Close event details"
          >
            ×
          </button>
        )}

        <div className="max-h-[92dvh] overflow-y-auto overscroll-contain bg-[#F4EFE7] pb-[env(safe-area-inset-bottom)] md:max-h-[94vh]">
          {shareView ? (
            <ShareView
              event={event}
              title={data.shareTitle}
              description={data.shareDescription}
              imageUrl={data.shareImage}
              onBack={() => setShareView(false)}
              onClose={onClose}
            />
          ) : (
            <>
              {data.image && (
                <div className="relative h-[260px] overflow-hidden md:h-[430px]">
                  <Image
                    src={data.image}
                    alt={data.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 1220px"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

                  {event.showCountdown && (
                    <div className="absolute bottom-5 right-5 md:bottom-6 md:right-10">
                      <Countdown event={event} />
                    </div>
                  )}
                </div>
              )}

              <div className="px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-7 md:px-12 md:pb-12 md:pt-10">
                <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <h2 className="font-canela text-3xl font-medium leading-[0.9] tracking-[-0.06em] text-[#111111] md:text-6xl">
                      {data.title}
                    </h2>

                    <div className="mt-4 flex flex-wrap items-center gap-x-[5px] gap-y-2 text-[0.74rem] uppercase tracking-[0.14em] text-[#9A734A] min-[390px]:text-[0.8rem] min-[390px]:tracking-[0.17em] md:gap-3 md:text-[1rem] md:tracking-[0.32em]">
                      {data.subtitle && (
                        <span>{data.subtitle.toLowerCase()}</span>
                      )}

                      {isCeremony && data.compactTimeRange && (
                        <>
                          <span className="mx-0 text-[#B38A63]">
                            •
                          </span>

                          <span>{data.compactTimeRange}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="hidden shrink-0 items-center justify-end gap-3 md:flex md:pt-2">
                    {event.showReserveCtaInDetail !== false && (
                      <a
                        href={event.reservationUrl || "#"}
                        target={
                          event.reservationUrl ? "_blank" : undefined
                        }
                        rel={
                          event.reservationUrl ? "noreferrer" : undefined
                        }
                        className="inline-flex h-[48px] items-center justify-center rounded-full bg-[#215848] px-5 text-[1.05rem] font-semibold text-[#FFFAF1]"
                      >
                        {event.detailReserveCtaLabel ||
                          "Reserve Your Spot"}
                      </a>
                    )}

                    {event.showShareCta !== false && (
                      <button
                        type="button"
                        onClick={() => setShareView(true)}
                        className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full border border-[#215848] px-4 text-[1.02rem] font-semibold text-[#215848]"
                      >
                        Share
                        <ShareArrowIcon />
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-6 md:mt-7 md:flex-row md:items-stretch md:gap-3">
                  <div className="flex flex-col gap-3 md:contents">
                    {event.useCardDateBadgeInDetail !== false && (
                      <div className="shrink-0">
                        <EventDateBadge event={event} />
                      </div>
                    )}

                    <div className="flex items-center gap-3 md:hidden">
                      {event.showReserveCtaInDetail !== false && (
                        <a
                          href={event.reservationUrl || "#"}
                          target={
                            event.reservationUrl ? "_blank" : undefined
                          }
                          rel={
                            event.reservationUrl ? "noreferrer" : undefined
                          }
                          className="inline-flex h-[48px] flex-1 items-center justify-center rounded-full bg-[#215848] px-5 text-[1.05rem] font-semibold text-[#FFFAF1]"
                        >
                          {event.detailReserveCtaLabel ||
                            "Reserve Your Spot"}
                        </a>
                      )}

                      {event.showShareCta !== false && (
                        <button
                          type="button"
                          onClick={() => setShareView(true)}
                          className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full border border-[#215848] px-4 text-[1.02rem] font-semibold text-[#215848]"
                        >
                          Share
                          <ShareArrowIcon />
                        </button>
                      )}
                    </div>
                  </div>

                  {event.showAnnouncementInDetail !== false &&
                    event.announcementNote && (
                      <div className="flex min-h-full flex-1 items-center rounded-[16px] border border-[#E6C89E] bg-[#F7F0E6] px-6 py-3 md:ml-2 md:py-5">
                        <p className="text-[1rem] leading-[1.55] text-[#8D643D]">
                          {event.announcementNote}
                        </p>
                      </div>
                    )}
                </div>

                {event.showShortDescriptionInDetail !== false &&
                  event.shortDescription && (
                    <div className="mt-8">
                      <p className="max-w-[920px] text-[1.1rem] leading-[1.9] tracking-[-0.03em] text-[#222222] md:text-[1.22rem]">
                        {event.shortDescription}
                      </p>
                    </div>
                  )}

                {event.showShortDescriptionInDetail !== false &&
                  event.shortDescription &&
                  event.showLongDescriptionInDetail !== false &&
                  event.longDescription && <SectionDivider />}

                {event.showLongDescriptionInDetail !== false &&
                  event.longDescription && (
                    <div className="prose prose-neutral max-w-none prose-p:text-[1.05rem] prose-p:leading-[1.95] prose-p:text-[#222222]">
                      <PortableText value={event.longDescription} />
                    </div>
                  )}

                <FeatureSection
                  title="Included"
                  items={event.features}
                />

                <FeatureSection
                  title="What To Bring"
                  items={event.whatToBring}
                />

                {event.showLocation && (
                  <div className="mt-9 rounded-[24px] border border-[#E4D7C7] bg-[#FFFAF1] px-5 py-5">
                    <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#9A734A]">
                      Location
                    </p>

                    <p className="mt-2 text-base font-semibold tracking-[-0.03em] text-[#111111]">
                      {AYALUZ_LOCATION.name}
                    </p>

                    <a
                      href={AYALUZ_LOCATION.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-[#215848] px-4 text-sm font-semibold text-[#215848]"
                    >
                      Open Maps ↗
                    </a>
                  </div>
                )}

                {(event.whatsappTitle ||
                  event.whatsappDescription ||
                  event.whatsappPhoneNumber) && (
                  <div className="mt-10 rounded-[24px] border border-[#2B4A40]/10 bg-[#DDEADF] px-5 py-5 md:px-6 md:py-6">
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div className="max-w-[680px]">
                        <h3 className="text-base font-semibold uppercase tracking-[0.18em] text-[#1F3E35] md:text-lg">
                          {event.whatsappTitle ||
                            "Need guidance before joining?"}
                        </h3>

                        <p className="mt-3 max-w-[620px] text-sm leading-[1.7] text-[#111111]/70 md:text-base">
                          {event.whatsappDescription ||
                            "Connect with us directly on WhatsApp for questions, support, and preparation guidance."}
                        </p>
                      </div>

                      {event.whatsappPhoneNumber && (
                        <a
                          href={`https://wa.me/${event.whatsappPhoneNumber.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-full bg-white/80 px-5 text-sm font-semibold text-[#2E9E53] ring-1 ring-white/70 transition-all duration-300 hover:bg-white md:mt-0"
                        >
                          <WhatsAppIcon />

                          {event.whatsappButtonLabel || "Connect"}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}