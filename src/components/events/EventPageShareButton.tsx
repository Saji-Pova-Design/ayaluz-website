"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type Props = {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  url: string;
  eventType?: "single-day" | "retreat";
  singleDate?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) return "th";
  if (day % 10 === 1) return "st";
  if (day % 10 === 2) return "nd";
  if (day % 10 === 3) return "rd";

  return "th";
}

function formatDate(date?: string | null) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  const month = parsedDate.toLocaleDateString("en-US", {
    month: "long",
  });

  const day = parsedDate.getDate();

  return `${month} ${day}${getOrdinalSuffix(day)}`;
}

function getDateText({
  eventType,
  singleDate,
  startDate,
  endDate,
}: {
  eventType?: "single-day" | "retreat";
  singleDate?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}) {
  if (eventType === "retreat") {
    const start = formatDate(startDate);
    const end = formatDate(endDate);

    return [start, end].filter(Boolean).join(" – ");
  }

  return formatDate(singleDate);
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.327-5.607ZM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592Zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.589-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.65 0 .972.71 1.916.81 2.049.098.133 1.397 2.132 3.383 2.991.473.205.842.327 1.13.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.3" />
        <path d="M17.4 6.7h.01" />
      </svg>
    </span>
  );
}

function FacebookIcon() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#4267B2] text-white">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M14.2 8.2V6.9c0-.6.4-.8.8-.8h2V3h-2.8c-3 0-4.1 1.8-4.1 4v1.2H7.6v3.4h2.5V21h3.7v-9.4h2.8l.5-3.4h-3Z" />
      </svg>
    </span>
  );
}

export default function EventPageShareButton({
  title,
  subtitle,
  description,
  imageUrl,
  url,
  eventType,
  singleDate,
  startDate,
  endDate,
}: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const dateText = getDateText({
    eventType,
    singleDate,
    startDate,
    endDate,
  });

  const previewTitle = [title, subtitle, dateText]
    .filter(Boolean)
    .join(" • ");

  const previewDescription =
    description ||
    "Transformative Sacred Plant Medicine Journeys in Peru's Andean Heartland, Sacred Valley, Ayahuasca Temple.";

    const shareUrl =
    mounted && typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : url;
  
  const encodedUrl = encodeURIComponent(shareUrl);

  async function handleCopyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 4200);
  }

  const modal = (
    <div
      className="fixed inset-0 z-[2147483647] flex h-[100dvh] items-end justify-center overflow-hidden bg-black/45 backdrop-blur-[4px] md:items-center md:px-6"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative isolate max-h-[92dvh] w-full overflow-hidden rounded-t-[34px] bg-[#F4EFE7] shadow-[0_-24px_80px_-40px_rgba(0,0,0,0.65)] md:max-w-[980px] md:rounded-[36px]"
      >
        <div className="pointer-events-none absolute inset-0 z-0 rounded-t-[34px] bg-[#F4EFE7] md:rounded-[36px]" />

        <div className="relative z-10 max-h-[92dvh] overflow-y-auto px-6 pb-10 pt-7 md:px-12 md:pb-16 md:pt-10">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full text-3xl leading-none text-[#111111]"
            aria-label="Close share view"
          >
            ×
          </button>

          <h2 className="text-center text-xl font-semibold tracking-[-0.03em] text-[#111111] md:text-2xl">
            Share this event
          </h2>

          <div className="mx-auto mt-10 grid max-w-[980px] gap-8 md:mt-16 md:grid-cols-[1fr_1fr] md:items-start md:gap-14">
            <div className="overflow-hidden rounded-[24px] bg-[#FFFAF1] shadow-[0_28px_70px_-52px_rgba(20,25,22,0.55)]">
              <div className="relative aspect-[1200/630] w-full overflow-hidden bg-[#EFE7D8]">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={previewTitle}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="p-5 md:p-6">
                <h3 className="text-xl font-semibold leading-[1.15] tracking-[-0.04em] text-[#111111] md:text-2xl">
                  {previewTitle}
                </h3>

                <p className="mt-4 text-base leading-[1.45] text-[#111111] md:text-lg">
                  {previewDescription}
                </p>

                <p className="mt-5 text-base leading-none text-[#111111]/45 md:text-lg">
                  ayaluz.org
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex h-16 items-center justify-center gap-3 rounded-[14px] border border-[#E4D7C7] bg-[#F4EFE7] px-4 text-base font-medium text-[#111111] transition hover:bg-[#FFFAF1] md:justify-start md:px-5 md:text-lg"
              >
                <CopyIcon />
                Copy link
              </button>

              <a
                href={`https://wa.me/?text=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-16 items-center justify-center gap-3 rounded-[14px] border border-[#E4D7C7] bg-[#F4EFE7] px-4 text-base font-medium text-[#111111] transition hover:bg-[#FFFAF1] md:justify-start md:px-5 md:text-lg"
              >
                <span className="text-[#27B43E]">
                  <WhatsAppIcon />
                </span>
                WhatsApp
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-16 items-center justify-center gap-3 rounded-[14px] border border-[#E4D7C7] bg-[#F4EFE7] px-4 text-base font-medium text-[#111111] transition hover:bg-[#FFFAF1] md:justify-start md:px-5 md:text-lg"
              >
                <InstagramIcon />
                Instagram
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-16 items-center justify-center gap-3 rounded-[14px] border border-[#E4D7C7] bg-[#F4EFE7] px-4 text-base font-medium text-[#111111] transition hover:bg-[#FFFAF1] md:justify-start md:px-5 md:text-lg"
              >
                <FacebookIcon />
                Facebook
              </a>
            </div>
          </div>

          <div
            className={`fixed left-1/2 top-1/2 z-[2147483647] w-[min(84vw,420px)] -translate-x-1/2 rounded-[22px] border border-[#D7C7B3] bg-[#FFFAF1] px-6 py-5 text-center text-sm leading-[1.65] text-[#215848] shadow-[0_24px_80px_-35px_rgba(20,25,22,0.55)] transition-all duration-500 ease-out ${
              copied
                ? "-translate-y-1/2 scale-100 opacity-100"
                : "pointer-events-none -translate-y-[42%] scale-95 opacity-0"
            }`}
          >
            <p className="font-semibold">Link copied successfully.</p>

            <p className="mt-1 text-[#215848]/80">
              Now send it to a friend and invite them into the journey ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full border border-[#2B4A40]/25 px-7 text-[13px] font-semibold uppercase tracking-[0.15em] text-[#2B4A40] transition hover:border-[#2B4A40]/55"
      >
        Share This Event ↗
      </button>

      {mounted && open ? createPortal(modal, document.body) : null}
    </>
  );
}