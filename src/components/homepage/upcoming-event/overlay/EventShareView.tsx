"use client";

import Image from "next/image";

import { Copy } from "lucide-react";

import type { CeremonyEventDetail } from "@/types/ceremony-event";

type EventShareViewProps = {
  event: CeremonyEventDetail;
};

export default function EventShareView({
  event,
}: EventShareViewProps) {
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  const whatsappMessage =
    encodeURIComponent(
      `${event.title}

${event.description}

${shareUrl}`,
    );

  return (
    <div className="bg-[#F7F5F1] px-4 pb-8 pt-6 md:px-7 md:pb-10">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* PREVIEW CARD */}
        <div className="overflow-hidden rounded-[28px] bg-[#F3F1EC] shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:w-[340px]">
          <div className="relative h-[180px] w-full">
            <Image
              src={event.heroImage}
              alt={event.heroImageAlt}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-2 p-4">
            <h3 className="text-[18px] font-semibold leading-tight text-[#111111]">
              {event.title} • AyaLuz
            </h3>

            <p className="text-[16px] text-[#111111]">
              Friday, June 22, 2026
            </p>

            <p className="text-[16px] leading-[1.35] text-[#111111]">
              A transformative healing
              journey in Peru’s Sacred
              Valley.
            </p>

            <p className="pt-1 text-[15px] text-[#8E8E8E]">
              ayaluz.org
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid flex-1 grid-cols-2 gap-3 md:h-fit md:pt-5">
          {/* COPY */}
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  window.location.href,
                );

                alert(
                  "Link copied! Paste it in a chat with your friend.",
                );
              } catch (error) {
                console.error(error);
              }
            }}
            className="flex h-[54px] items-center gap-3 rounded-[14px] border border-[#DDD2C3] bg-white px-4 transition-all duration-300 hover:bg-[#F9F7F3]"
          >
            <Copy
              size={18}
              className="text-[#111111]"
            />

            <span className="text-[16px] text-[#111111]">
              Copy link
            </span>
          </button>

          {/* WHATSAPP */}
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[54px] items-center gap-3 rounded-[14px] border border-[#DDD2C3] bg-white px-4 transition-all duration-300 hover:bg-[#F9F7F3]"
          >
            <Image
              src="/images/homepage/icons/whatsapp-logo.svg"
              alt="WhatsApp"
              width={20}
              height={20}
            />

            <span className="text-[16px] text-[#111111]">
              WhatsApp
            </span>
          </a>

          {/* INSTAGRAM */}
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  shareUrl,
                );

                alert(
                  "Link copied! Open Instagram and paste it into your story or DM.",
                );

                window.open(
                  "https://www.instagram.com/",
                  "_blank",
                );
              } catch (error) {
                console.error(error);
              }
            }}
            className="flex h-[54px] items-center gap-3 rounded-[14px] border border-[#DDD2C3] bg-white px-4 transition-all duration-300 hover:bg-[#F9F7F3]"
          >
            <Image
              src="/images/homepage/icons/instagram-logo.png"
              alt="Instagram"
              width={20}
              height={20}
            />

            <span className="text-[16px] text-[#111111]">
              Instagram
            </span>
          </button>

          {/* FACEBOOK */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[54px] items-center gap-3 rounded-[14px] border border-[#DDD2C3] bg-white px-4 transition-all duration-300 hover:bg-[#F9F7F3]"
          >
            <Image
              src="/images/homepage/icons/facebook-logo.png"
              alt="Facebook"
              width={20}
              height={20}
            />

            <span className="text-[16px] text-[#111111]">
              FaceBook
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}