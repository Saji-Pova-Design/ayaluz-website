"use client";

import { useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

import EventDateBadge from "@/components/sections/shared/EventDateBadge";
import EventDetailsModal from "@/components/sections/shared/EventDetailsModal";
import { urlFor } from "@/sanity/lib/image";

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

function getImageUrl(image?: SanityImage | null) {
  if (!image) {
    return null;
  }

  return urlFor(image).width(900).height(900).fit("crop").auto("format").url();
}

export default function CalendarEventCard({
  event,
}: CalendarEventCardProps) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const title = getTitle(event);
  const imageUrl = getImageUrl(event.cardImage);

  return (
    <>
      <article className="w-fit lg:max-w-[900px]">
        <div className="overflow-hidden rounded-[24px] border border-[#2B4A40]/10 bg-primary-bg shadow-[0_12px_40px_-18px_rgba(20,25,22,0.18)] transition-all duration-300 hover:shadow-[0_18px_56px_-24px_rgba(20,25,22,0.24)] lg:rounded-[32px]">
          <div className="flex flex-col lg:flex-row">
            {imageUrl && (
              <div className="relative h-[220px] shrink-0 overflow-hidden lg:h-auto lg:w-[320px]">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="320px"
                />
              </div>
            )}

            <div className="flex flex-1 flex-col justify-between px-4 py-5 md:px-7 md:py-6 lg:px-8 lg:py-6">
              <div>
                <h3 className="font-canela text-xl font-semibold leading-none tracking-[-0.03em] text-[#111111] md:text-2xl lg:text-3xl">
                  {title}
                </h3>

                {event.displaySubtitle && (
                  <p className="mt-2 text-sm uppercase tracking-[0.28em] text-[#7A5F3C] md:text-base">
                    {event.displaySubtitle}
                  </p>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-5 lg:mt-6">
                <EventDateBadge event={event} />

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

              <div className="mt-3 flex w-full flex-row items-center gap-3 md:mt-5">
                {event.showReserveCtaOnCard !== false && (
                  <a
                    href={event.reservationUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-[#215848] px-6 text-sm font-semibold leading-none text-[#FFFAF1]"
                  >
                    {event.cardReserveCtaLabel || "Reserve Your Spot"}
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setIsOverlayOpen(true)}
                  className="inline-flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-full border border-[#215848] px-6 text-sm font-semibold leading-none text-[#215848]"
                >
                  Details
                </button>
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