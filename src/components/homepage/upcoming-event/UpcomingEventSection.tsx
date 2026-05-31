"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ViewDetailsButton } from "@/components/homepage/upcoming-event/ViewDetailsButton";
import EventDetailOverlay from "@/components/homepage/upcoming-event/overlay/EventDetailOverlay";
import { homepageCeremonyEvent } from "@/lib/events/homepage-ceremony";
import type { CeremonyEventDetail } from "@/types/ceremony-event";

interface EventData {
  title: string;
  eventTitle: string;
  description: string;
  date: Date;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  whatsappText: string;
  whatsappDescription: string;
  whatsappButtonText: string;
  whatsappLink: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

const defaultEventData: EventData = {
  title: "Upcoming event",
  eventTitle: "Ayahuasca Ceremony",
  description: "Limited spaces available for this week's ceremony.",
  date: new Date("2026-05-18T18:00:00"),
  ctaText: "Reserve Your Spot",
  ctaLink: "#reserve",
  backgroundImage: "/images/homepage/aya-vine.jpg",
  whatsappText: "Have questions or need guidance?",
  whatsappDescription: "Click and connect with us on WhatsApp",
  whatsappButtonText: "Connect",
  whatsappLink: "https://wa.me/yourphonenumber",
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        fill="white"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z"
      />
    </svg>
  );
}

function EventBadge({ title }: { title: string }) {
  return (
    <div className="relative overflow-hidden rounded-full border border-[#D7C7A3]/20 bg-[rgba(16,72,35,0.45)] shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:border-[#D7C7A3]/20">
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

export default function UpcomingEventSection({
  eventData = defaultEventData,
  ceremony = homepageCeremonyEvent,
}: {
  eventData?: EventData;
  ceremony?: CeremonyEventDetail;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const [isClient, setIsClient] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const difference = new Date(eventData.date).getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0 };
  }, [eventData.date]);

  useEffect(() => {
    setIsClient(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const d = new Date(eventData.date);

  const dateInfo = {
    day: d.getDate(),
    month: d.toLocaleDateString("en-US", { month: "long" }),
    weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
    year: d.getFullYear(),
  };

  const countdownItems = [
    { label: "days", value: timeLeft.days },
    { label: "hrs", value: timeLeft.hours },
    { label: "mins", value: timeLeft.minutes },
  ];

  return (
    <section className="w-full bg-[#F6F1E8] py-6 md:py-8 lg:py-10">
      <div className="mx-auto max-w-[1800px] px-4 md:px-6 lg:px-10">
        {/* MAIN WRAPPER */}
        <div className="relative mx-auto w-full max-w-[380px] md:max-w-[800px] lg:mx-0 lg:h-[520px] lg:max-w-none lg:overflow-visible">
          {/* BADGE — mobile/tablet on image; desktop floats above card */}
          <div className="absolute top-4 left-4 z-30 md:top-5 md:left-5 lg:top-[-20px] lg:left-16">
            <EventBadge title={eventData.title} />
          </div>

          {/* CARD SHELL — mobile/tablet stacked card; desktop cinematic clip */}
          <div className="relative flex flex-col overflow-hidden rounded-[28px] bg-[#F6F1E8] shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:rounded-[30px] lg:h-full lg:rounded-[34px] lg:bg-transparent lg:shadow-none">
            {/* IMAGE */}
            <div className="relative h-[210px] w-full shrink-0 md:h-[250px] lg:absolute lg:inset-0 lg:z-0 lg:h-full">
              <Image
                src={eventData.backgroundImage}
                alt="Ayahuasca ceremony"
                fill
                priority
                className="rounded-t-[28px] object-cover object-center md:rounded-t-[30px] lg:rounded-none"
              />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 bg-[#F6F1E8] px-3 pb-7 pt-5 md:px-8 md:pb-8 md:pt-6 lg:absolute lg:top-0 lg:left-12 lg:h-full lg:bg-[#F6F1E8]/70 lg:px-0 lg:pb-0 lg:pt-6 lg:backdrop-blur-sm">
              <div className="flex w-full flex-col gap-5 md:gap-6 lg:h-full lg:w-fit lg:max-w-[820px] lg:gap-0 lg:px-16 lg:py-8">
                {/* HEADER */}
                <div className="space-y-3 md:space-y-3.5 lg:space-y-3">
                  {/* EVENT TITLE */}
                  <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
                    <Image
                      src="/images/homepage/aya-icon.png"
                      alt="Aya Icon"
                      width={48}
                      height={48}
                      className="h-10 w-10 shrink-0 object-contain md:h-11 md:w-11 lg:h-12 lg:w-12"
                    />
                    <h3 className="font-canela text-[22px] font-semibold leading-tight text-[#222222] md:text-[26px] lg:text-[30px]">
                      {eventData.eventTitle}
                    </h3>
                  </div>

                  {/* DATE ROW */}
                  <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-[#2B4A40] md:h-12 md:w-12 md:rounded-[13px] lg:h-12 lg:w-12 lg:rounded-[14px]">
                    <span className="text-[18px] font-semibold text-[#161616] md:text-[22px] lg:text-[24px]">
                        {dateInfo.day}
                      </span>
                    </div>

                    <div className="flex min-w-0 flex-1 items-center gap-2 self-center whitespace-nowrap text-[14px] font-medium leading-none text-[#161616] md:gap-3 md:text-[14px] lg:gap-4 lg:text-[16px]">
                      <span>
                        {dateInfo.month} {dateInfo.year}
                      </span>
                      <span className="opacity-30">|</span>
                      <span>{dateInfo.weekday}</span>
                      <span className="opacity-30">|</span>
                      <span>5 PM : 2 AM</span>
                    </div>
                  </div>
                </div>

                {/* MIDDLE */}
                <div className="lg:mt-2">
                  <p className="text-[15px] leading-relaxed text-[#222222] md:text-[16px] lg:text-[18px]">
                    {eventData.description}
                  </p>

                  <ViewDetailsButton onClick={() => setDetailsOpen(true)} />

                  <div className="mt-4 flex items-center justify-between gap-3 md:mt-5 lg:mt-4">
  <motion.a
    href={eventData.ctaLink}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="inline-flex h-[44px] shrink-0 items-center justify-center rounded-[14px] bg-[#2B4A40] px-4 text-[14px] font-medium text-[#F6F1E8] shadow-lg md:h-[48px] md:rounded-[16px] md:px-4 md:text-[17px] lg:h-[48px] lg:rounded-[18px] lg:px-10 lg:text-[18px]"
  >
    {eventData.ctaText}
  </motion.a>

  {isClient && (
    <div className="flex items-center gap-1 md:gap-2 lg:gap-3">
      {countdownItems.map((item, i) => (
        <div
          key={item.label}
          className="flex items-center gap-0.5 md:gap-1.5"
        >
          <div className="text-center">
            <div className="text-[20px] font-light leading-none text-[#1E1E1E] md:text-[26px] lg:text-[30px]">
              {String(item.value).padStart(2, "0")}
            </div>

            <div className="mt-0.5 text-[9px] text-[#222222] md:mt-1 md:text-[11px]">
              {item.label}
            </div>
          </div>

          {i < 2 && (
            <span className="text-[18px] font-light opacity-40 md:text-[24px] lg:text-[30px]">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )}
</div>
              
                </div>

                {/* WHATSAPP */}
                <div className="mt-2 border-t border-[#D8D2C7] pt-4 md:mt-3 md:pt-5 lg:mt-8 lg:pt-4">
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#161616] md:text-[17px] lg:text-[18px]">
                      {eventData.whatsappText}
                    </h4>
                    <p className="mt-1 text-[14px] text-[#222222] md:text-[15px] lg:text-[16px]">
                      {eventData.whatsappDescription}
                    </p>
                    <motion.a
                      href={eventData.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-3 inline-flex h-[38px] w-fit items-center justify-center gap-2.5 self-start rounded-full border border-[#E8E8E8] bg-white/85 px-4 shadow-sm md:mt-3.5 md:h-[40px] md:gap-3 md:px-4 lg:mt-3 lg:inline-flex lg:h-[40px] lg:px-10"
                    >
                      <WhatsAppIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-6 lg:w-6" />
                      <span className="text-[17px] font-medium text-[#22C55E] md:text-[18px] lg:text-[20px]">
                        {eventData.whatsappButtonText}
                      </span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EventDetailOverlay
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        event={ceremony}
      />
    </section>
  );
}
