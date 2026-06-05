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
  displayTitle?: string;
  displaySubtitle?: string;
  displayIcon?: SanityImage | null;
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
  const rawDate =
    event.eventType === "retreat"
      ? event.startDate
      : event.singleDate;

  if (!rawDate) {
    return null;
  }

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function getMonthKey(month: CalendarMonth) {
  return `${month.year}-${String(month.month).padStart(2, "0")}`;
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

function getMonthLabel(month: CalendarMonth) {
  const date = new Date(month.year, month.month - 1, 1);

  return date.toLocaleDateString("en-US", {
    month: "long",
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

function isSameMonth(
  monthA: CalendarMonth,
  monthB: CalendarMonth,
) {
  return (
    monthA.month === monthB.month &&
    monthA.year === monthB.year
  );
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

function getDateParts(date?: string | null) {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

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

function EventIdentity({
  event,
}: {
  event: EventItem;
}) {
  return (
    <div className="min-w-0 leading-none">
      <h3 className="font-serif font-semibold text-3xl leading-[0.95] tracking-[-0.06em] text-[#1B1713] md:text-3xl">
        {event.displayTitle || event.title}
      </h3>

      {event.displaySubtitle && (
        <p className="mt-2 text-sm uppercase tracking-[0.28em] text-[#7A5F3C] md:text-base">
          {event.displaySubtitle}
        </p>
      )}
    </div>
  );
}

function SingleDayDateBadge({
  date,
}: {
  date?: string | null;
}) {
  const dateParts = getDateParts(date);

  if (!dateParts) {
    return null;
  }

  return (
    <div className="flex items-center gap-5 p-0">
      <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-[#28543B] md:h-16 md:w-16 md:rounded-[16px]">
        <span className="text-2xl font-bold tracking-[-0.05em] md:text-3xl">
          {dateParts.day}
        </span>
      </div>

      <div>
        <div className="text-lg font-bold tracking-[-0.05em] md:text-2xl">
          {dateParts.month}
        </div>

        <div className="mt-0 text-base md:text-large">
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

  if (!start || !end) {
    return null;
  }

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
              <span className="text-2xl font-bold tracking-[-0.05em] md:text-3xl">
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
  event: EventItem;
}) {
  if (event.eventType === "retreat") {
    return (
      <RetreatDateBadge
        startDate={event.startDate}
        endDate={event.endDate}
      />
    );
  }

  return (
    <SingleDayDateBadge date={event.singleDate} />
  );
}

function EventCardImage({
  event,
}: {
  event: EventItem;
}) {
  const imageUrl = getImageUrl(event.cardImage, 1000, 1000);

  if (!imageUrl) {
    return <div className="bg-[#EFE7D8]" />;
  }

  return (
    <div className="relative min-h-[200px] overflow-hidden">
      <Image
        src={imageUrl}
        alt={event.displayTitle || event.title || "Event"}
        fill
        unoptimized
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 40vw"
      />
    </div>
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
    <article className="overflow-hidden rounded-[36px] border border-[#2B4A40]/10 bg-[#FFFAF1] shadow-[0_20px_80px_-42px_rgba(20,25,22,0.35)]">
      <div className="grid lg:grid-cols-[44%_1fr]">
        <EventCardImage event={event} />

        <div className="flex flex-col justify-center gap-4 p-4 md:p-10 lg:gap-4 lg:p-8">
          <EventIdentity event={event} />

          <EventDateBadge event={event} />

          {event.shortDescription && (
            <p className="max-w-[640px] text-base leading-[1.75] text-[#1A1A1A] md:text-lg">
              {event.shortDescription}
            </p>
          )}

<div className="flex flex-row gap-3">
            <a
              href={event.reservationUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-[#2B4A40] px-7 text-sm font-medium text-[#FFFAF1] transition-all duration-300 hover:bg-[#1F3E35]"
            >
              <span className="sm:hidden">Reserve</span>
<span className="hidden sm:inline">
  Reserve Your Spot
</span>
            </a>

            <button
              type="button"
              onClick={onOpen}
              className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-[#2B4A40] px-7 text-sm font-medium text-[#2B4A40] transition-all duration-300 hover:bg-[#2B4A40] hover:text-[#FFFAF1]"
            >
              <span className="sm:hidden">Details</span>
<span className="hidden sm:inline">
  View Details
</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function EmptyMonthState({
  month,
}: {
  month: CalendarMonth;
}) {
  return (
    <div className="rounded-[24px] border border-[#2B4A40]/10 bg-[#FFFAF1] px-3 py-2 text-center">
      <h3 className="font-serif text-3xl tracking-[-0.05em]">
        We are preparing sacred dates for {getMonthLabel(month)}{" "}
        {month.year}
      </h3>

      <p className="mx-auto mt-5 max-w-[640px] text-[#5F5548]">
        New ceremonies and retreats are being lovingly planned.
      </p>
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
      className="inline-flex items-center gap-2 rounded-full border border-[#2B4A40]/15 bg-[#FFFAF1] px-6 py-1 md:py-2 text-sm transition-all duration-300 hover:bg-[#2B4A40] hover:text-[#FFFAF1]"
    >
      {label}
      <span>↓</span>
    </button>
  );
}

function EventDetailModal({
  event,
  onClose,
}: {
  event: EventItem;
  onClose: () => void;
}) {
  const imageUrl =
    getImageUrl(event.detailedViewImage, 1800, 1200) ||
    getImageUrl(event.cardImage, 1800, 1200);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-end justify-center bg-black/50 backdrop-blur-md lg:items-center"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[36px] bg-[#F5EFE4] lg:w-[1120px] lg:rounded-[38px]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur-sm"
        >
          ✕
        </button>

        {imageUrl && (
          <div className="relative h-[260px] overflow-hidden lg:h-[440px]">
            <Image
              src={imageUrl}
              alt={event.displayTitle || event.title || "Event"}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6 md:p-10">
          <div className="space-y-10">
            <EventDateBadge event={event} />

            <EventIdentity event={event} />

            {event.longDescription && (
              <div className="prose prose-neutral max-w-none prose-p:leading-[1.9]">
                <PortableText value={event.longDescription} />
              </div>
            )}

            {event.features && event.features.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {event.features.map((feature, index) => (
                  <div
                    key={index}
                    className="rounded-[24px] border border-[#2B4A40]/10 bg-[#FFFAF1] p-5"
                  >
                    <p className="text-base leading-[1.8]">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-[28px] bg-[#D8E8DC] p-7">
              <h3 className="text-4xl font-bold tracking-[-0.05em]">
                {event.whatsappTitle ||
                  "Have questions or need guidance?"}
              </h3>

              <p className="mt-5 max-w-[700px] text-xl leading-[1.7] text-[#111111]/80">
                {event.whatsappDescription ||
                  "Click and connect with us on WhatsApp."}
              </p>

              {event.whatsappPhoneNumber && (
                <a
                  href={`https://wa.me/${event.whatsappPhoneNumber.replace(
                    /\D/g,
                    "",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-lg font-semibold text-[#2B4A40]"
                >
                  {event.whatsappButtonLabel || "Connect"}
                </a>
              )}
            </div>

            <div className="rounded-[26px] border border-[#2B4A40]/10 bg-[#FFFAF1] p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6EFE8]">
                  📍
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#7A5F3C]">
                    Location
                  </p>

                  <p className="mt-1 text-xl font-semibold">
                    {AYALUZ_LOCATION.name}
                  </p>
                </div>
              </div>

              <a
                href={AYALUZ_LOCATION.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-[#2B4A40] px-5 text-sm font-medium text-[#2B4A40]"
              >
                Open Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
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

  const [activeEvent, setActiveEvent] =
    useState<EventItem | null>(null);

  const [selectedMonth, setSelectedMonth] =
    useState<CalendarMonth>(currentMonth);

  const [expandedMonths, setExpandedMonths] =
    useState<CalendarMonth[]>([]);

  const events = useMemo(() => {
    return [...(data.manualEvents || [])]
      .filter((event) => Boolean(getEventDate(event)))
      .sort((a, b) => {
        const dateA = getEventDate(a)?.getTime() || 0;
        const dateB = getEventDate(b)?.getTime() || 0;

        return dateA - dateB;
      });
  }, [data.manualEvents]);

  const selectedEvents = events.filter(
    (event) =>
      getEventMonthKey(event) === getMonthKey(selectedMonth),
  );

  const disablePrevious =
    isSameMonth(selectedMonth, currentMonth) ||
    isBeforeMonth(selectedMonth, currentMonth);

  const nextExpandableMonth =
    expandedMonths.length === 0
      ? getNextMonth(selectedMonth)
      : getNextMonth(expandedMonths[expandedMonths.length - 1]);

  function handlePreviousMonth() {
    if (disablePrevious) {
      return;
    }

    setSelectedMonth((current) => getPreviousMonth(current));

    setExpandedMonths([]);
  }

  function handleNextMonth() {
    setSelectedMonth((current) => getNextMonth(current));

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
      <section className="bg-[#F5EFE4] px-6 py-6 md:py-8 text-[#1F1A14] md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 max-w-3xl">
            {data.eyebrow && (
              <p className="mb-4 text-xs uppercase tracking-[0.32em] text-[#7A5F3C]">
                {data.eyebrow}
              </p>
            )}

            {data.title && (
              <h2 className="font-serif text-4xl tracking-[-0.05em] md:text-6xl">
                {data.title}
              </h2>
            )}

            {data.description && (
              <p className="mt-6 text-lg leading-[1.8] text-[#5F5548]">
                {data.description}
              </p>
            )}
          </div>

          <div className="mb-2 md:mb-4 flex w-fit items-center gap-4 rounded-full border border-[#2B4A40]/10 bg-[#FFFAF1] px-3 py-2 md:gap-6 md:px-5 md:py-4">
            <button
              type="button"
              onClick={() => {
                if (!disablePrevious) {
                  handlePreviousMonth();
                }
              }}
              aria-disabled={disablePrevious}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#2B4A40]/10 transition-all duration-300 ${
                disablePrevious
                  ? "cursor-not-allowed opacity-25"
                  : "hover:bg-[#2B4A40] hover:text-[#FFFAF1]"
              }`}
            >
              ←
            </button>

            <div className="text-center">
              <h3 className="font-serif text-2xl md:text-3xl tracking-[-0.05em]">
                {getMonthLabel(selectedMonth)}
              </h3>

              <p className="text-[#7A5F3C]">
                {selectedMonth.year}
              </p>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2B4A40]/10 transition-all duration-300 hover:bg-[#2B4A40] hover:text-[#FFFAF1]"
            >
              →
            </button>
          </div>

          <div className="space-y-8">
            {selectedEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onOpen={() => setActiveEvent(event)}
              />
            ))}

            {selectedEvents.length === 0 && (
              <EmptyMonthState month={selectedMonth} />
            )}

            {expandedMonths.map((month) => {
              const monthKey = getMonthKey(month);

              const monthEvents = events.filter(
                (event) => getEventMonthKey(event) === monthKey,
              );

              return (
                <div key={monthKey} className="pt-8">
                  <h3 className="mb-8 font-serif text-3xl tracking-[-0.04em] md:text-5xl">
                    {getMonthLabel(month)} {month.year}
                  </h3>

                  <div className="space-y-8">
                    {monthEvents.map((event) => (
                      <EventCard
                        key={event._id}
                        event={event}
                        onOpen={() => setActiveEvent(event)}
                      />
                    ))}

                    {monthEvents.length === 0 && (
                      <EmptyMonthState month={month} />
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
              onClick={handleExpandNextMonth}
            />
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