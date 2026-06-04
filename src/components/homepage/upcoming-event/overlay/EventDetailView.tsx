"use client";

import Image from "next/image";
import { Share2 } from "lucide-react";

import type { CeremonyEventDetail } from "@/types/ceremony-event";

import EventCountdown from "./EventCountdown";
import EventFeatureGrid from "./EventFeatureGrid";

import CalendarSingleDayDateBadge from "../../calendar/CalendarSingleDayDateBadge";
import CalendarRetreatDateBadge from "../../calendar/CalendarRetreatDateBadge";

type EventDetailViewProps = {
  event: CeremonyEventDetail;
  onOpenShare: () => void;
};

export default function EventDetailView({
  event,
  onOpenShare,
}: EventDetailViewProps) {
  const isRetreat =
    event.type === "retreat";

  const singleDayDate =
    !isRetreat
      ? new Date(event.date)
      : null;

  const retreatStartDate =
    isRetreat
      ? new Date(event.startDate)
      : null;

  const retreatEndDate =
    isRetreat
      ? new Date(event.endDate)
      : null;

  const countdownTarget =
    !isRetreat
      ? singleDayDate
      : retreatStartDate;

  return (
    <>
      {/* HERO IMAGE */}
      <div className="relative h-[180px] w-full">
        <Image
          src={event.heroImage}
          alt={event.heroImageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-5 pt-5 md:px-10 md:pb-10 md:pt-8">
        {/* TITLE + SHARE */}
        <div className="flex h-[32px] items-center justify-between md:h-auto">
          <h1 className="text-[24px] font-medium tracking-[-0.04em] text-[#111111]">
            {event.title}
          </h1>

          {/* DESKTOP SHARE BUTTON */}
          <button
            type="button"
            onClick={onOpenShare}
            className="hidden items-center gap-3 transition-opacity hover:opacity-60 md:flex"
          >
            <Share2
              size={18}
              strokeWidth={2}
              className="text-[#111111]"
            />

            <span className="text-[16px] text-[#111111]">
              {event.shareFriendsLabel}
            </span>
          </button>
        </div>

        {/* DATE BADGE */}
        <div className="mt-6">
          {!isRetreat &&
            singleDayDate && (
              <CalendarSingleDayDateBadge
                day={String(
                  singleDayDate.getDate(),
                )}
                month={singleDayDate.toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                  },
                )}
                weekday={singleDayDate.toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                  },
                )}
              />
            )}

          {isRetreat &&
            retreatStartDate &&
            retreatEndDate && (
              <CalendarRetreatDateBadge
                startDay={String(
                  retreatStartDate.getDate(),
                )}
                startMonth={retreatStartDate.toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                  },
                )}
                startYear={String(
                  retreatStartDate.getFullYear(),
                )}
                endDay={String(
                  retreatEndDate.getDate(),
                )}
                endMonth={retreatEndDate.toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                  },
                )}
                endYear={String(
                  retreatEndDate.getFullYear(),
                )}
              />
            )}
        </div>

        {/* COUNTDOWN + CTA */}
        <div className="mt-8">
          {/* DESKTOP */}
          <div className="hidden items-center justify-between md:flex">
            {countdownTarget && (
              <EventCountdown
                targetDate={
                  countdownTarget
                }
              />
            )}

            <a
              href={event.reserveUrl}
              className="inline-flex h-[48px] items-center justify-center rounded-[18px] bg-[#28543B] px-10 text-[16px] font-medium text-white transition-all duration-300 hover:bg-[#1F4330]"
            >
              Reserve Your Spot
            </a>
          </div>

          {/* MOBILE */}
          <div className="md:hidden">
            {countdownTarget && (
              <EventCountdown
                targetDate={
                  countdownTarget
                }
              />
            )}

            <div className="mt-4 flex items-center gap-2">
              <a
                href={event.reserveUrl}
                className="flex h-[44px] flex-1 items-center justify-center rounded-full bg-[#28543B] px-4 text-[14px] font-medium text-white"
              >
                Reserve Your Spot
              </a>

              {/* MOBILE SHARE BUTTON */}
              <button
                type="button"
                onClick={onOpenShare}
                className="flex h-[44px] items-center justify-center gap-2 rounded-full border border-[#D8D8D8] bg-white px-4 transition-opacity active:opacity-70"
              >
                <Share2
                  size={16}
                  strokeWidth={2}
                  className="text-[#111111]"
                />

                <span className="text-[14px] text-[#111111]">
                  Share
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-5 max-w-[1100px] text-[15px] leading-[1.4] tracking-[-0.03em] text-[#111111] md:text-[16px] md:leading-[1.35]">
          {event.description}
        </p>

        {/* FEATURES */}
        <div className="mt-6 md:mt-8">
          <EventFeatureGrid
            features={event.features}
          />
        </div>

        {/* WHATSAPP */}
        <div className="mt-5 rounded-[24px] bg-[#DDE6DE] px-4 py-4 md:mt-6 md:rounded-[30px] md:px-8 md:py-3">
          {/* MOBILE */}
          <div className="flex flex-col gap-2 md:hidden">
            <h3 className="text-[15px] font-semibold text-[#111111]">
              {event.whatsapp.title}
            </h3>

            <p className="text-[14px] leading-[1.4] text-[#111111]">
              {event.whatsapp.description}
            </p>

            <a
              href={event.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex h-[44px] w-full items-center justify-center gap-2 rounded-full bg-white px-5"
            >
              <Image
                src="/images/homepage/icons/whatsapp-logo.svg"
                alt="WhatsApp"
                width={18}
                height={18}
              />

              <span className="text-[14px] font-medium text-[#25D366]">
                {event.whatsapp.buttonText}
              </span>
            </a>
          </div>

          {/* DESKTOP */}
          <div className="hidden items-center justify-between md:flex">
            <div className="space-y-0.5">
              <h3 className="text-[16px] font-semibold text-[#111111]">
                {event.whatsapp.title}
              </h3>

              <p className="text-[16px] text-[#111111]">
                {event.whatsapp.description}
              </p>
            </div>

            <a
              href={event.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[40px] items-center gap-3 rounded-full bg-white px-6"
            >
              <Image
                src="/images/homepage/icons/whatsapp-logo.svg"
                alt="WhatsApp"
                width={18}
                height={18}
              />

              <span className="text-[16px] font-medium text-[#25D366]">
                {event.whatsapp.buttonText}
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}