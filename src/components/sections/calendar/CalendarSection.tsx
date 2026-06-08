"use client";

import {
  useMemo,
  useState,
} from "react";
import EventDetailsModal from "@/components/sections/shared/EventDetailsModal";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import EventDateBadge from "../shared/EventDateBadge";

import { urlFor } from "@/sanity/lib/image";

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

  showShortDescriptionOnCard?: boolean;
  showAnnouncementOnCard?: boolean;
  showLongDescriptionOnCard?: boolean;

  showReserveCtaOnCard?: boolean;
  cardReserveCtaLabel?: string;

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

  whatsappTitle?: string;
  whatsappDescription?: string;
  whatsappButtonLabel?: string;
  whatsappPhoneNumber?: string;

  showShareCta?: boolean;
  shareTitle?: string;
  shareDescription?: string;
  sharePreviewImage?: SanityImage | null;
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

          {event.showAnnouncementOnCard !== false &&
            event.announcementNote && (
              <div className="rounded-[18px] border border-[#D7C1A1] bg-[#FFF7EA] px-4 py-3 text-sm leading-[1.6] text-[#7A5F3C]">
                {event.announcementNote}
              </div>
            )}

          {event.showShortDescriptionOnCard !== false &&
            event.shortDescription && (
              <p className="max-w-[640px] text-base leading-[1.75] text-[#1A1A1A] md:text-lg">
                {event.shortDescription}
              </p>
            )}

          {event.showLongDescriptionOnCard &&
            event.longDescription && (
              <div className="prose prose-neutral max-w-none prose-p:leading-[1.75] prose-p:text-[#1A1A1A]">
                <PortableText value={event.longDescription} />
              </div>
            )}

          <div className="flex flex-row gap-3">
          {event.showReserveCtaOnCard !== false && (
  <a
    href={event.reservationUrl || "#"}
    target="_blank"
    rel="noreferrer"
    className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-[#2B4A40] px-7 text-sm font-medium text-[#FFFAF1] transition-all duration-300 hover:bg-[#1F3E35]"
  >
    <span className="sm:hidden">
      {event.cardReserveCtaLabel || "Reserve"}
    </span>
    <span className="hidden sm:inline">
      {event.cardReserveCtaLabel ||
        "Reserve Your Spot"}
    </span>
  </a>
)}

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

function EmptyMonthState() {
  return (
    <div className="overflow-hidden rounded-[34px] border border-[#2B4A40]/10 bg-[#FFFAF1] shadow-[0_18px_60px_-32px_rgba(20,25,22,0.18)]">
      <div className="relative h-[280px] md:min-h-[420px] md:h-auto overflow-hidden">
        <Image
          src="/images/no-event.png"
          alt="No events yet"
          fill
          sizes="(max-width: 1024px) 100vw, 1152px"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

        <div className="absolute inset-0 flex items-center p-8 md:p-12 lg:p-14">
        <div>
  <p className="max-w-[520px] font-serif text-3xl leading-[0.95] tracking-[-0.06em] text-[#F5EFE4] md:text-3xl lg:text-5xl">
    No events
    <br />
    have been opened
    <br />
    for this month yet.
  </p>

  <p className="mt-8 max-w-[420px] text-sm leading-[1.8] tracking-[-0.02em] text-[#C99A5D] md:3xl lg:text-2xl ">
    New ceremonies and retreats are being lovingly planned.
  </p>
</div>
        </div>
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
      className="inline-flex items-center gap-2 rounded-full border border-[#2B4A40]/15 bg-[#FFFAF1] px-6 py-1 text-sm transition-all duration-300 hover:bg-[#2B4A40] hover:text-[#FFFAF1] md:py-2"
    >
      {label}
      <span>↓</span>
    </button>
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
      <section className="bg-[#F5EFE4] px-6 py-6 text-[#1F1A14] md:px-10 md:py-8 lg:px-16">
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

          <div className="mb-2 flex w-fit items-center gap-4 rounded-full border border-[#2B4A40]/10 bg-[#FFFAF1] px-3 py-2 md:mb-4 md:gap-6 md:px-5 md:py-4">
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
              <h3 className="font-serif text-2xl tracking-[-0.05em] md:text-3xl">
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
              <EmptyMonthState />
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
                    <EmptyMonthState />
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
        <EventDetailsModal
          open={true}
          event={activeEvent}
          onClose={() => setActiveEvent(null)}
        />
      )}
    </>
  );
}