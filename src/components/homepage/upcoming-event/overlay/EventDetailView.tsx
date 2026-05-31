"use client";

import Image from "next/image";
import { Share2 } from "lucide-react";

import type { CeremonyEventDetail } from "@/types/ceremony-event";

import EventCountdown from "./EventCountdown";
import EventFeatureGrid from "./EventFeatureGrid";

type EventDetailViewProps = {
  event: CeremonyEventDetail;
};

export default function EventDetailView({
  event,
}: EventDetailViewProps) {
  return (
    <>
      <div className="relative h-[180px] w-full">
        <Image
          src={event.heroImage}
          alt={event.heroImageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="px-4 pb-5 pt-5 md:px-10 md:pb-10 md:pt-8">
      <div className="flex h-[32px] items-center justify-between md:h-auto">
          <h1 className="text-[20px] font-medium tracking-[-0.04em] text-[#111111]">
            {event.ceremonyTitle}
          </h1>

          <button className="hidden items-center gap-3 md:flex">
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

        <div className="mt-8">
          {/* DESKTOP */}
          <div className="hidden items-center justify-between md:flex">
            <EventCountdown targetDate={event.date} />

            <a
              href={event.reserveCta.href}
              className="inline-flex h-[48px] items-center justify-center rounded-[18px] bg-[#28543B] px-10 text-[16px] font-medium text-white"
            >
              {event.reserveCta.label}
            </a>
          </div>

          {/* MOBILE */}
          <div className="md:hidden">
            <EventCountdown targetDate={event.date} />

            <div className="mt-4 flex items-center gap-2">
              <a
                href={event.reserveCta.href}
                className="flex h-[44px] flex-1 items-center justify-center rounded-full bg-[#28543B] px-4 text-[14px] font-medium text-white"
              >
                {event.reserveCta.label}
              </a>

              <button className="flex h-[44px] items-center justify-center gap-2 rounded-full border border-[#D8D8D8] bg-white px-4">
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

        <p className="mt-5 max-w-[1100px] text-[15px] leading-[1.4] tracking-[-0.03em] text-[#111111] md:text-[16px] md:leading-[1.35]">
          {event.description}
        </p>

        <div className="mt-6 md:mt-8">
          <EventFeatureGrid features={event.features} />
        </div>

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