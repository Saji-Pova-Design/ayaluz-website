"use client";

import { useState } from "react";

import Image from "next/image";

import type { CalendarEvent } from "./types";

import CalendarSingleDayDateBadge from "@/components/homepage/calendar/CalendarSingleDayDateBadge";

import CalendarRetreatDateBadge from "@/components/homepage/calendar/CalendarRetreatDateBadge";

import EventDetailOverlay from "../upcoming-event/overlay/EventDetailOverlay";

type CalendarEventCardProps = {
  event: CalendarEvent;
};

export default function CalendarEventCard({
  event,
}: CalendarEventCardProps) {
  const [isOverlayOpen, setIsOverlayOpen] =
    useState(false);

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

  return (
    <>
      <article
        className="
          w-full
          lg:max-w-[900px]
        "
      >
        <div
          className="
            overflow-hidden
            rounded-[24px]
            border
            border-[#2B4A40]/10
            bg-primary-bg
            shadow-[0_12px_40px_-18px_rgba(20,25,22,0.18)]
            transition-all
            duration-300
            hover:shadow-[0_18px_56px_-24px_rgba(20,25,22,0.24)]
            lg:rounded-[32px]
          "
        >
          <div
            className="
              flex
              flex-col
              lg:flex-row
            "
          >
            <div
              className="
                relative
                hidden
                shrink-0
                overflow-hidden
                lg:block
                lg:h-auto
                lg:w-[320px]
              "
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />
            </div>

            <div
              className="
                flex
                flex-1
                flex-col
                justify-between
                px-4
                py-5
                md:px-7
                md:py-6
                lg:px-8
                lg:py-6
              "
            >
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    lg:gap-4
                  "
                >
                  <Image
                    src="/images/homepage/aya-icon.png"
                    alt="Aya Icon"
                    width={48}
                    height={48}
                    className="
                      h-7
                      w-7
                      shrink-0
                      object-contain
                      md:h-9
                      md:w-9
                      lg:h-12
                      lg:w-12
                    "
                  />

                  <div>
                    <p
                      className="
                        mb-1
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-[#2B4A40]/70
                      "
                    >
                      {isRetreat
                        ? "Retreat"
                        : "Ceremony"}
                    </p>

                    <h3
                      className="
                        font-canela
                        text-xl
                        font-semibold
                        leading-none
                        tracking-[-0.03em]
                        text-[#111111]
                        md:text-2xl
                        lg:text-3xl
                      "
                    >
                      {event.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div
                className="
                  mt-5
                  flex
                  flex-col
                  gap-5
                  lg:mt-6
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-5
                    md:flex-row
                    md:items-center
                    md:justify-between
                    lg:justify-start
                    lg:gap-12
                  "
                >
                  <div
                    className="
                      w-fit
                      rounded-[22px]
                      bg-[#F6F1E8]/70
                      p-3
                      shadow-[0_10px_30px_-20px_rgba(20,25,22,0.18)]
                      ring-1
                      ring-[#2B4A40]/8
                    "
                  >
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
                              month: "short",
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
                              month: "short",
                            },
                          )}
                          endYear={String(
                            retreatEndDate.getFullYear(),
                          )}
                        />
                      )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setIsOverlayOpen(true)
                    }
                    className="
                      group
                      inline-flex
                      w-fit
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      tracking-[-0.01em]
                      text-[#111111]
                      transition-all
                      duration-300
                      hover:opacity-70
                      md:text-base
                    "
                  >
                    <span
                      className="
                        border-b
                        border-transparent
                        transition-all
                        duration-300
                        group-hover:border-[#111111]
                      "
                    >
                      View details
                    </span>

                    <span
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    >
                      →
                    </span>
                  </button>
                </div>

                <p
                  className="
                    max-w-[720px]
                    text-base
                    leading-[1.75]
                    tracking-[-0.02em]
                    text-[#1A1A1A]
                    md:text-lg
                  "
                >
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <EventDetailOverlay
        open={isOverlayOpen}
        onClose={() =>
          setIsOverlayOpen(false)
        }
        event={event}
      />
    </>
  );
}