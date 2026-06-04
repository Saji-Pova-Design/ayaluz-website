"use client";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";

import Image from "next/image";

import type { CeremonyEventDetail } from "@/types/ceremony-event";

import { ViewDetailsButton } from "@/components/homepage/upcoming-event/ViewDetailsButton";

import EventDetailOverlay from "@/components/homepage/upcoming-event/overlay/EventDetailOverlay";

import CalendarSingleDayDateBadge from "@/components/homepage/calendar/CalendarSingleDayDateBadge";

import CalendarRetreatDateBadge from "@/components/homepage/calendar/CalendarRetreatDateBadge";

import { calendarMonths } from "@/components/homepage/calendar/data";

interface TimeLeft {
  days: number;

  hours: number;

  minutes: number;
}

function WhatsAppIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="12"
        fill="#25D366"
      />

      <path
        fill="white"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z"
      />
    </svg>
  );
}

function EventBadge({
  title,
}: {
  title: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-full border border-[#D7C7A3]/20 bg-[rgba(16,72,35,0.45)] shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-[#D7C7A3]/5 to-white/5" />

      <div className="relative flex items-center gap-1.5 px-3.5 py-1.5 md:gap-2 md:px-4 md:py-2 lg:gap-2 lg:px-5 lg:py-2.5">
        <div className="h-1 w-1 rounded-full bg-[#D7C7A3] shadow-[0_0_10px_rgba(215,199,163,0.8)] md:h-1.5 md:w-1.5" />

        <h2 className="text-[13px] leading-none font-medium tracking-[0.05em] text-[#F6F1E8] md:text-[15px] lg:text-[18px] lg:tracking-[0.06em]">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function UpcomingEventSection() {
  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [isClient, setIsClient] =
    useState(false);

  /**
   * AUTO FIND NEAREST UPCOMING EVENT
   */

  const now = new Date();

  const allEvents = calendarMonths.flatMap(
    (month) => month.events,
  );
  
  const upcomingEvents = allEvents
    .filter((event) => {
      const startDate =
        event.type === "retreat"
          ? new Date(event.startDate)
          : new Date(event.date);
  
      return (
        startDate.getTime() >
        now.getTime()
      );
    })
    .sort((a, b) => {
      const aDate =
        a.type === "retreat"
          ? new Date(a.startDate).getTime()
          : new Date(a.date).getTime();
  
      const bDate =
        b.type === "retreat"
          ? new Date(b.startDate).getTime()
          : new Date(b.date).getTime();
  
      return aDate - bDate;
    });

  /**
   * NEAREST EVENT
   */

  const ceremony = upcomingEvents[0];

  /**
   * EVENT TYPE
   */

  const isRetreat =
    ceremony.type === "retreat";

  /**
   * PRIMARY DATE
   */

  const eventDate = !isRetreat
    ? new Date(ceremony.date)
    : new Date(ceremony.startDate);

  /**
   * COUNTDOWN
   */

  const calculateTimeLeft = () => {
    const now = new Date();

    const difference =
      eventDate.getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(
          difference /
            (1000 * 60 * 60 * 24),
        ),

        hours: Math.floor(
          (difference /
            (1000 * 60 * 60)) %
            24,
        ),

        minutes: Math.floor(
          (difference / 1000 / 60) % 60,
        ),
      };
    }

    return {
      days: 0,
      hours: 0,
      minutes: 0,
    };
  };

  const [timeLeft, setTimeLeft] =
    useState<TimeLeft>(
      calculateTimeLeft(),
    );

  useEffect(() => {
    setIsClient(true);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const countdownItems = [
    {
      label: "days",
      value: timeLeft.days,
    },

    {
      label: "hrs",
      value: timeLeft.hours,
    },

    {
      label: "mins",
      value: timeLeft.minutes,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-[#06110B] py-20">
        <div className="absolute inset-0">
          <Image
            src={ceremony.heroImage}
            alt={ceremony.heroImageAlt}
            fill
            priority
            className="object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="max-w-2xl">
            <EventBadge
              title={
                isRetreat
                  ? "Upcoming Retreat"
                  : "Upcoming Ceremony"
              }
            />

            <motion.h2
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              viewport={{
                once: true,
              }}
              className="mt-6 text-4xl font-light tracking-tight text-[#F6F1E8] md:text-5xl lg:text-6xl"
            >
              {ceremony.title}
            </motion.h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#D7C7A3]/80 md:text-lg">
              {ceremony.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {isRetreat ? (
                <CalendarRetreatDateBadge
                  startDay={String(
                    new Date(
                      ceremony.startDate,
                    ).getDate(),
                  )}
                  startMonth={new Date(
                    ceremony.startDate,
                  ).toLocaleString("en-US", {
                    month: "short",
                  })}
                  startYear={String(
                    new Date(
                      ceremony.startDate,
                    ).getFullYear(),
                  )}
                  endDay={String(
                    new Date(
                      ceremony.endDate,
                    ).getDate(),
                  )}
                  endMonth={new Date(
                    ceremony.endDate,
                  ).toLocaleString("en-US", {
                    month: "short",
                  })}
                  endYear={String(
                    new Date(
                      ceremony.endDate,
                    ).getFullYear(),
                  )}
                />
              ) : (
                <CalendarSingleDayDateBadge
                  day={String(
                    new Date(
                      ceremony.date,
                    ).getDate(),
                  )}
                  month={new Date(
                    ceremony.date,
                  ).toLocaleString("en-US", {
                    month: "short",
                  })}
                  weekday={new Date(
                    ceremony.date,
                  ).toLocaleString("en-US", {
                    weekday: "short",
                  })}
                />
              )}

              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F6F1E8]/80 backdrop-blur-xl">
                {ceremony.timeRange}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <a
                href={ceremony.reserveUrl}
                className="inline-flex items-center justify-center rounded-full bg-[#D7C7A3] px-6 py-3 text-sm font-medium tracking-wide text-[#06110B] transition-all duration-300 hover:scale-[1.02]"
              >
                Reserve Spot
              </a>

              <a
                href={ceremony.whatsapp.link}
                className="inline-flex items-center gap-3 text-sm text-[#F6F1E8]/80 transition-colors duration-300 hover:text-white"
              >
                <WhatsAppIcon className="h-6 w-6" />

                <span>
                  {ceremony.whatsapp.buttonText}
                </span>
              </a>
            </div>

            <div className="mt-10">
              <p className="text-sm tracking-wide text-[#D7C7A3]/70 uppercase">
                Limited spaces available for this week's ceremony.
              </p>

              <ViewDetailsButton
                onClick={() =>
                  setDetailsOpen(true)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 lg:min-w-[360px]">
            {countdownItems.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/5 px-5 py-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
              >
                <div className="text-4xl font-light text-[#F6F1E8] md:text-5xl">
                  {isClient
                    ? String(
                        item.value,
                      ).padStart(2, "0")
                    : "00"}
                </div>

                <div className="mt-2 text-xs tracking-[0.18em] text-[#D7C7A3]/70 uppercase">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EventDetailOverlay
        open={detailsOpen}
        onClose={() =>
          setDetailsOpen(false)
        }
        event={ceremony}
      />
    </>
  );
}
