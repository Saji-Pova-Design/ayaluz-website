import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import EventPageShareButton from "@/components/events/EventPageShareButton";
import { PromoBanner } from "@/components/general-shared/PromoBanner";
import Navbar from "@/components/general-shared/Navbar";
import CalendarSection from "@/components/sections/calendar/CalendarSection";
import EventDateBadge from "@/components/sections/shared/EventDateBadge";
import UpcomingSection from "@/components/sections/UpcomingSection";
import { getEventBySlug, getPage } from "@/sanity/lib/getPage";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  params: Promise<{ slug: string }>;
};

type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string;
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

type FeatureItem = {
  _key?: string;
  icon?: SanityImage | null;
  text?: string;
};

type PageBuilderSection = {
  _key?: string;
  _type?: string;
  [key: string]: unknown;
};

type EventPageData = {
  _id?: string;
  title?: string;
  displayTitle?: string;
  displaySubtitle?: string;
  slug?: string;
  eventType?: "single-day" | "retreat";
  shortDescription?: string;
  announcementNote?: string;
  longDescription?: PortableTextBlock[];
  singleDate?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  timeRange?: string | null;
  reservationUrl?: string | null;
  cardImage?: SanityImage | null;
  detailedViewImage?: SanityImage | null;
  useCardImageInDetail?: boolean;
  showShortDescriptionInDetail?: boolean;
  showAnnouncementInDetail?: boolean;
  showLongDescriptionInDetail?: boolean;
  showReserveCtaInDetail?: boolean;
  detailReserveCtaLabel?: string;
  features?: FeatureItem[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImage | null;
};

const SITE_URL = "https://www.ayaluz.org";

function getTitle(event: EventPageData) {
  return event.displayTitle || event.title || "AyaLuz Event";
}

function getDescription(event: EventPageData) {
  return (
    event.shortDescription ||
    event.displaySubtitle ||
    "Sacred plant medicine ceremonies and retreats in Peru’s Sacred Valley."
  );
}

function getHeroImage(event: EventPageData) {
  const preferredImage =
    event.useCardImageInDetail === false
      ? event.detailedViewImage || event.cardImage
      : event.cardImage || event.detailedViewImage;

  if (!preferredImage) return "/images/no-event.png";

  return urlFor(preferredImage).width(1800).height(1000).fit("crop").url();
}

function getSeoImage(event: EventPageData) {
  const image = event.seoImage || event.cardImage || event.detailedViewImage;

  if (!image) return `${SITE_URL}/images/no-event.png`;

  return urlFor(image).width(1200).height(630).fit("crop").url();
}

function getEventDate(event: EventPageData) {
  return event.eventType === "retreat"
    ? event.endDate || event.startDate
    : event.singleDate;
}

function isPastEvent(event: EventPageData) {
  const rawDate = getEventDate(event);

  if (!rawDate) return false;

  const eventDate = new Date(rawDate);
  const today = new Date();

  eventDate.setHours(23, 59, 59, 999);
  today.setHours(0, 0, 0, 0);

  return eventDate < today;
}

function getFeatureIconUrl(icon?: SanityImage | null) {
  if (!icon) return null;

  return urlFor(icon).width(80).height(80).fit("max").auto("format").url();
}

function findHomepageSection(
  sections: PageBuilderSection[] = [],
  type: string,
) {
  return sections.find((section) => section._type === type);
}
function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) return "th";
  if (day % 10 === 1) return "st";
  if (day % 10 === 2) return "nd";
  if (day % 10 === 3) return "rd";

  return "th";
}

function formatShareDate(date?: string | null) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  const month = parsedDate.toLocaleDateString("en-US", {
    month: "long",
  });

  const day = parsedDate.getDate();

  return `${month} ${day}${getOrdinalSuffix(day)}`;
}

function getShareDateText(event: EventPageData) {
  if (event.eventType === "retreat") {
    return [formatShareDate(event.startDate), formatShareDate(event.endDate)]
      .filter(Boolean)
      .join(" – ");
  }

  return formatShareDate(event.singleDate);
}

function getShareTitle(event: EventPageData) {
  return [
    event.displayTitle || event.title || "AyaLuz Event",
    event.displaySubtitle,
    getShareDateText(event),
  ]
    .filter(Boolean)
    .join(" • ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | AyaLuz",
    };
  }

  const title = getShareTitle(event);
  const description =
    event.eventType === "retreat"
      ? "Transformative Sacred Plant Medicine Journeys in Peru's Andean Heartland, Sacred Valley, AyaLuz Temple."
      : "Transformative Sacred Plant Medicine Journey in Peru's Andean Heartland, Sacred Valley, AyaLuz Temple.";
  const url = `${SITE_URL}/events/${slug}`;
  const imageUrl = getSeoImage(event);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "AyaLuz",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  const homePage = await getPage("home");

  if (!event) notFound();

  const homeSections = (homePage?.pageBuilder || []) as PageBuilderSection[];
  const promoBannerSection = findHomepageSection(
    homeSections,
    "promoBannerSection",
  );
  const navbarSection = findHomepageSection(homeSections, "navbarSection");
  const upcomingSection = findHomepageSection(
    homeSections,
    "upcomingSection",
  );
  const calendarSection = findHomepageSection(
    homeSections,
    "calendarSection",
  );

  const eventWithSlug = {
    ...event,
    slug,
  };

  const title = getTitle(eventWithSlug);
  const description = getDescription(eventWithSlug);
  const heroImage = getHeroImage(eventWithSlug);
  const expired = isPastEvent(eventWithSlug);
  const eventUrl = `${SITE_URL}/events/${slug}`;

  if (expired) {
    return (
      <>
        {promoBannerSection && (
          <PromoBanner data={promoBannerSection as never} />
        )}

        <Navbar data={navbarSection as never} />

        <main className="min-h-screen bg-[#F6F1E8] text-[#222222]">
          <section className="px-5 py-10 md:px-8 md:py-16">
            <div className="mx-auto max-w-[1060px]">
            <div className="relative overflow-visible rounded-[34px] border border-[#D8CEC2] bg-[#EEEAE3] px-6 pb-6 pt-12 shadow-[0_24px_80px_-55px_rgba(43,74,64,0.28)] md:px-10 md:pb-8 md:pt-14">
  <div className="absolute left-6 top-0 z-20 -translate-y-1/2 md:left-10">
    <div className="inline-flex min-h-[54px] items-center rounded-full border border-[#D89A5B]/35 bg-[#B9773B] px-7 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#F6F1E8] shadow-[0_18px_45px_-28px_rgba(185,119,59,0.55)]">
      ✦ Event Passed
    </div>
  </div>

  <div className="absolute inset-0 rounded-[34px] bg-[#D7D1C8]/45" />

  <div className="relative flex flex-col gap-6 opacity-70 md:flex-row md:items-center md:gap-12">
    <div className="grayscale">
      <EventDateBadge event={eventWithSlug} />
    </div>

    <div className="min-w-0">
      {eventWithSlug.displaySubtitle && (
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.24em] text-[#7A5F3C] md:text-[15px]">
          {eventWithSlug.displaySubtitle}
        </p>
      )}

      <h1 className="font-canela text-2xl font-medium leading-[0.92] tracking-[-0.065em] text-[#1B1713] md:text-4xl">
        {title}
      </h1>
    </div>
  </div>
</div>

              <div className="mt-8 rounded-[34px] bg-[#2B4A40] p-7 text-[#F6F1E8] shadow-[0_24px_80px_-55px_rgba(43,74,64,0.45)] md:p-10">
              <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-[#F6F1E8]/68">
  {eventWithSlug.eventType === "retreat"
    ? "Retreat passed"
    : "Ceremony passed"}
</p>

                <h2 className="mt-4 max-w-[780px] font-canela text-[42px] leading-[0.92] tracking-[-0.06em] md:text-[68px]">
                  This event has already completed its journey.
                </h2>

                <p className="mt-5 max-w-[620px] text-[1.02rem] leading-[1.75] text-[#F6F1E8]/82 md:text-[1.1rem]">
                Discover the next available journeys below and find the moment that calls you forward.
</p>
              </div>
            </div>
          </section>

          {upcomingSection && (
            <UpcomingSection data={upcomingSection as never} />
          )}

          {calendarSection ? (
            <CalendarSection data={calendarSection as never} />
          ) : (
            <section className="px-5 py-16 text-center md:px-8">
              <Link
                href="/calendar"
                className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#2B4A40] px-8 text-[13px] font-semibold uppercase tracking-[0.15em] text-[#F6F1E8]"
              >
                View Available Events
              </Link>
            </section>
          )}
        </main>
      </>
    );
  }

  return (
    <>
      {promoBannerSection && (
        <PromoBanner data={promoBannerSection as never} />
      )}

      <Navbar data={navbarSection as never} />

      <main className="min-h-screen bg-[#F6F1E8] text-[#222222]">
        <section className="relative overflow-hidden bg-[#111111]">
          <div className="relative h-[58vh] min-h-[430px] w-full md:h-[72vh]">
            <Image
              src={heroImage}
              alt={title}
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
          </div>

          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-[1180px] px-5 pb-12 md:px-8 md:pb-20">
              {eventWithSlug.displaySubtitle && (
                <p className="mb-3 text-[14px] font-semibold uppercase tracking-[0.22em] text-[#F6F1E8]/88 md:text-[16px] md:tracking-[0.26em]">
                  {eventWithSlug.displaySubtitle}
                </p>
              )}

              <h1 className="max-w-[900px] font-canela text-[52px] font-medium leading-[0.9] tracking-[-0.065em] text-[#F6F1E8] md:text-[88px]">
                {title}
              </h1>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1180px] gap-8 px-5 py-10 md:grid-cols-[320px_1fr] md:px-8 md:py-16">
          <aside className="md:sticky md:top-8 md:self-start">
            <div className="rounded-[28px] border border-[#D8CEC2] bg-[#FFFAF1] p-5 shadow-[0_24px_80px_-52px_rgba(43,74,64,0.35)]">
              <div className="w-full overflow-hidden">
                <div
                  className={
                    eventWithSlug.eventType === "retreat"
                      ? "origin-left scale-[0.88] md:scale-[0.82]"
                      : ""
                  }
                >
                  <EventDateBadge event={eventWithSlug} />
                </div>
              </div>

              {eventWithSlug.timeRange &&
                eventWithSlug.eventType === "single-day" && (
                  <p className="mt-5 rounded-[18px] bg-[#F4EFE7] px-5 py-4 text-[13px] uppercase tracking-[0.16em] text-[#8A5A44]">
                    {eventWithSlug.timeRange}
                  </p>
                )}

              {eventWithSlug.showReserveCtaInDetail !== false && (
                <a
                  href={eventWithSlug.reservationUrl || "#"}
                  target={eventWithSlug.reservationUrl ? "_blank" : undefined}
                  rel={eventWithSlug.reservationUrl ? "noreferrer" : undefined}
                  className="mt-6 inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-[#2B4A40] px-7 text-[13px] font-semibold uppercase tracking-[0.15em] text-[#FFFAF1] transition hover:bg-[#1F3A32]"
                >
                  {eventWithSlug.detailReserveCtaLabel || "Reserve Your Spot"}
                </a>
              )}

<EventPageShareButton
  title={title}
  subtitle={eventWithSlug.displaySubtitle}
  description={
    eventWithSlug.eventType === "retreat"
      ? "Transformative Sacred Plant Medicine Journeys in Peru's Andean Heartland, Sacred Valley, AyaLuz Temple."
    : "Transformative Sacred Plant Medicine Journey in Peru's Andean Heartland, Sacred Valley, AyaLuz Temple."
  }
  imageUrl={getSeoImage(eventWithSlug)}
  url={eventUrl}
  eventType={eventWithSlug.eventType}
  singleDate={eventWithSlug.singleDate}
  startDate={eventWithSlug.startDate}
  endDate={eventWithSlug.endDate}
/>
            </div>
          </aside>

          <article className="rounded-none border-0 bg-transparent p-0 shadow-none md:rounded-[34px] md:border md:border-[#D8CEC2] md:bg-[#FFFAF1] md:p-10 md:shadow-[0_24px_80px_-55px_rgba(43,74,64,0.28)]">
            {eventWithSlug.showAnnouncementInDetail !== false &&
              eventWithSlug.announcementNote && (
                <div className="mb-8 rounded-[22px] border border-[#E6C89E] bg-[#F7F0E6] px-6 py-5">
                  <p className="text-[1rem] leading-[1.65] text-[#8D643D]">
                    {eventWithSlug.announcementNote}
                  </p>
                </div>
              )}

            {eventWithSlug.showShortDescriptionInDetail !== false &&
              description && (
                <p className="max-w-[860px] text-[1.12rem] leading-[1.9] tracking-[-0.03em] text-[#222222]/78 md:text-[1.25rem]">
                  {description}
                </p>
              )}

            {eventWithSlug.showLongDescriptionInDetail !== false &&
              eventWithSlug.longDescription && (
                <div className="prose prose-stone mt-10 max-w-none prose-p:text-[1.04rem] prose-p:leading-[1.9] prose-headings:font-canela prose-headings:tracking-[-0.05em]">
                  <PortableText value={eventWithSlug.longDescription} />
                </div>
              )}

            {eventWithSlug.features && eventWithSlug.features.length > 0 && (
              <div className="mt-12">
                <h2 className="font-canela text-[2.4rem] leading-none tracking-[-0.055em] text-[#111111]">
                  What this journey includes
                </h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {eventWithSlug.features.map(
                    (item: FeatureItem, index: number) => {
                      const iconUrl = getFeatureIconUrl(item.icon);

                      return (
                        <div
                          key={`${item.text || "feature"}-${index}`}
                          className="flex items-start gap-4 rounded-[24px] border border-[#E4D7C7] bg-[#F6F1E8] p-5"
                        >
                          {iconUrl && (
                            <div className="relative h-11 w-11 shrink-0 overflow-hidden">
                              <Image
                                src={iconUrl}
                                alt=""
                                fill
                                unoptimized
                                className="object-contain"
                              />
                            </div>
                          )}

                          <p className="text-[0.98rem] leading-[1.75] text-[#1C1C1C]">
                            {item.text}
                          </p>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            )}
          </article>
          </section>

{upcomingSection && (
  <UpcomingSection data={upcomingSection as never} />
)}

{calendarSection ? (
  <CalendarSection data={calendarSection as never} />
) : (
  <section className="px-5 py-16 text-center md:px-8">
    <Link
      href="/calendar"
      className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#2B4A40] px-8 text-[13px] font-semibold uppercase tracking-[0.15em] text-[#F6F1E8]"
    >
      View Available Events
    </Link>
  </section>
)}
</main>
</>
);
}
