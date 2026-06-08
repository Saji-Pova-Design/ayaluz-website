"use client";

import { useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

import EventDateBadge from "@/components/sections/shared/EventDateBadge";
import EventDetailsModal from "@/components/sections/shared/EventDetailsModal";

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

type CalendarEvent = {
  _id?: string;
  title?: string;
  displayTitle?: string;
  displaySubtitle?: string;
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
  features?: {
    icon?: SanityImage | null;
    text?: string;
  }[];
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

type CalendarEventCardProps = {
  event: CalendarEvent;
};

function getTitle(event: CalendarEvent) {
  return event.displayTitle || event.title || "Upcoming event";
}

function getTypeLabel(event: CalendarEvent) {
  return event.eventType === "retreat" ? "Retreat" : "Ceremony";
}

export default function CalendarEventCard({
  event,
}: CalendarEventCardProps) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const title = getTitle(event);

  return (
    <>
      <article className="w-full lg:max-w-[900px]">
        <div className="overflow-hidden rounded-[24px] border border-[#2B4A40]/10 bg-primary-bg shadow-[0_12px_40px_-18px_rgba(20,25,22,0.18)] transition-all duration-300 hover:shadow-[0_18px_56px_-24px_rgba(20,25,22,0.24)] lg:rounded-[32px]">
          <div className="flex flex-col lg:flex-row">
            {event.cardImage && (
              <div className="relative hidden shrink-0 overflow-hidden lg:block lg:h-auto lg:w-[320px]">
                <Image
                  src={event.cardImage as never}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            )}

            <div className="flex flex-1 flex-col justify-between px-4 py-5 md:px-7 md:py-6 lg:px-8 lg:py-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 lg:gap-4">
                  <Image
                    src="/images/homepage/aya-icon.png"
                    alt="Aya Icon"
                    width={48}
                    height={48}
                    className="h-7 w-7 shrink-0 object-contain md:h-9 md:w-9 lg:h-12 lg:w-12"
                  />

                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-[#2B4A40]/70">
                      {getTypeLabel(event)}
                    </p>

                    <h3 className="font-canela text-xl font-semibold leading-none tracking-[-0.03em] text-[#111111] md:text-2xl lg:text-3xl">
                      {title}
                    </h3>

                    {event.displaySubtitle && (
                      <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#7A5F3C] md:text-sm">
                        {event.displaySubtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-5 lg:mt-6">
                <div className="w-fit rounded-[22px] bg-[#F6F1E8]/70 p-3 shadow-[0_10px_30px_-20px_rgba(20,25,22,0.18)] ring-1 ring-[#2B4A40]/8">
                  <EventDateBadge event={event} />
                </div>

                <div className="flex w-full items-center gap-1.5 md:hidden">
                  {event.showReserveCtaOnCard !== false &&
                    event.reservationUrl && (
                      <a
                        href={event.reservationUrl}
                        target="_blank"
                        rel="noreferrer"
                         className="flex h-10 basis-3/5 items-center justify-center rounded-full bg-[#215848] px-2 text-xs font-semibold text-[#FFFAF1] whitespace-nowrap leading-none"
                      >
                        {event.cardReserveCtaLabel || "Reserve Your Spot"}
                      </a>
                    )}

                  <button
                    type="button"
                    onClick={() => setIsOverlayOpen(true)}
                    className="flex h-10 basis-2/5 items-center justify-center rounded-full border border-[#215848] px-0 text-xs font-semibold text-[#215848] leading-none"
                  >
                    Details
                  </button>
                </div>

                {event.showAnnouncementOnCard !== false &&
                  event.announcementNote && (
                    <div className="rounded-[18px] border border-[#D7C1A1] bg-[#FFF7EA] px-4 py-3 text-sm leading-[1.6] text-[#7A5F3C]">
                      {event.announcementNote}
                    </div>
                  )}

                {event.showShortDescriptionOnCard !== false &&
                  event.shortDescription && (
                    <p className="max-w-[720px] text-base leading-[1.75] tracking-[-0.02em] text-[#1A1A1A] md:text-lg">
                      {event.shortDescription}
                    </p>
                  )}

                {event.showLongDescriptionOnCard &&
                  event.longDescription && (
                    <div className="prose prose-neutral max-w-none prose-p:leading-[1.75] prose-p:text-[#1A1A1A]">
                      <PortableText value={event.longDescription} />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </article>

      <EventDetailsModal
        open={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        event={event}
      />
    </>
  );
}