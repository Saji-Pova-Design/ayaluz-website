import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageBuilder from "@/components/page-builder/PageBuilder";

import { urlFor } from "@/sanity/lib/image";
import { getEventBySlug, getPage } from "@/sanity/lib/getPage";

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

type EventPageData = {
  title?: string;
  displayTitle?: string;
  displaySubtitle?: string;
  slug?: string;
  eventType?: "single-day" | "retreat";
  startDate?: string;
  endDate?: string;
  reservationUrl?: string;
  cardImage?: SanityImage;
};

const SITE_URL = "https://www.ayaluz.org";

const MONTHS: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) return "th";
  if (day % 10 === 1) return "st";
  if (day % 10 === 2) return "nd";
  if (day % 10 === 3) return "rd";

  return "th";
}

function formatDateObject(date: Date) {
  const month = date.toLocaleDateString("en-US", {
    month: "long",
  });

  const day = date.getDate();

  return `${month} ${day}${getOrdinalSuffix(day)}`;
}

function getCeremonyDateFromSlug(slug?: string) {
  if (!slug) return "";

  const normalizedSlug = slug.toLowerCase();

  const spacedDateMatch = normalizedSlug.match(
    /^ceremony-[a-z0-9-]+-(20\d{2})-(january|february|march|april|may|june|july|august|september|october|november|december)-(\d{1,2})$/,
  );

  const compactDateMatch = normalizedSlug.match(
    /^ceremony-[a-z0-9-]+-(20\d{2})-(january|february|march|april|may|june|july|august|september|october|november|december)(\d{1,2})$/,
  );

  const match = spacedDateMatch || compactDateMatch;

  if (!match) return "";

  const [, year, monthName, dayRaw] = match;

  const date = new Date(
    Number(year),
    MONTHS[monthName],
    Number(dayRaw),
    12,
  );

  return formatDateObject(date);
}

function getRetreatDateRangeFromSlug(slug?: string) {
  if (!slug) return "";

  const normalizedSlug = slug.toLowerCase();

  const sameMonthMatch = normalizedSlug.match(
    /^retreat-(20\d{2})-(january|february|march|april|may|june|july|august|september|october|november|december)-(\d{1,2})-(\d{1,2})$/,
  );

  const splitMonthMatch = normalizedSlug.match(
    /^retreat-(20\d{2})-(january|february|march|april|may|june|july|august|september|october|november|december)-(\d{1,2})-(january|february|march|april|may|june|july|august|september|october|november|december)-(\d{1,2})$/,
  );

  const compactSplitMonthMatch = normalizedSlug.match(
    /^retreat-(20\d{2})-(january|february|march|april|may|june|july|august|september|october|november|december)(\d{1,2})-(january|february|march|april|may|june|july|august|september|october|november|december)(\d{1,2})$/,
  );

  if (sameMonthMatch) {
    const [, year, monthName, startDayRaw, endDayRaw] = sameMonthMatch;

    const startDate = new Date(
      Number(year),
      MONTHS[monthName],
      Number(startDayRaw),
      12,
    );

    const endDate = new Date(
      Number(year),
      MONTHS[monthName],
      Number(endDayRaw),
      12,
    );

    return `${formatDateObject(startDate)} – ${formatDateObject(endDate)}`;
  }

  if (splitMonthMatch) {
    const [, year, startMonthName, startDayRaw, endMonthName, endDayRaw] =
      splitMonthMatch;

    const startDate = new Date(
      Number(year),
      MONTHS[startMonthName],
      Number(startDayRaw),
      12,
    );

    const endDate = new Date(
      Number(year),
      MONTHS[endMonthName],
      Number(endDayRaw),
      12,
    );

    return `${formatDateObject(startDate)} – ${formatDateObject(endDate)}`;
  }

  if (compactSplitMonthMatch) {
    const [, year, startMonthName, startDayRaw, endMonthName, endDayRaw] =
      compactSplitMonthMatch;

    const startDate = new Date(
      Number(year),
      MONTHS[startMonthName],
      Number(startDayRaw),
      12,
    );

    const endDate = new Date(
      Number(year),
      MONTHS[endMonthName],
      Number(endDayRaw),
      12,
    );

    return `${formatDateObject(startDate)} – ${formatDateObject(endDate)}`;
  }

  return "";
}

function getEventSourceText(event: EventPageData) {
  return `${event.displayTitle || ""} ${event.displaySubtitle || ""} ${event.title || ""}`.toLowerCase();
}

function isWachumaEvent(event: EventPageData) {
  const source = getEventSourceText(event);

  return source.includes("wachuma") || source.includes("san pedro");
}

function isAyahuascaEvent(event: EventPageData) {
  return getEventSourceText(event).includes("ayahuasca");
}

function getCeremonyTitle(event: EventPageData) {
  if (isWachumaEvent(event)) return "Wachuma Ceremony";

  return "Ayahuasca Ceremony";
}

function getSocialDescription(event: EventPageData) {
  if (event.eventType === "retreat") {
    return "Transformative Sacred Plant Medicine Journeys in Peru's Andean Heartland, Sacred Valley, Ayahuasca Temple.";
  }

  if (isWachumaEvent(event)) {
    return "Transformative Wachuma Journey in Peru's Andean Heartland, Sacred Valley, Ayahuasca Temple.";
  }

  if (isAyahuascaEvent(event)) {
    return "Transformative Ayahuasca Journey in Peru's Andean Heartland, Sacred Valley, Ayahuasca Temple.";
  }

  return "Transformative Sacred Plant Medicine Journeys in Peru's Andean Heartland, Sacred Valley, Ayahuasca Temple.";
}

function getSocialTitle(event: EventPageData) {
  if (event.eventType === "retreat") {
    return [
      event.displayTitle || event.title || "AyaLuz Retreat",
      event.displaySubtitle,
      getRetreatDateRangeFromSlug(event.slug),
    ]
      .filter(Boolean)
      .join(" • ");
  }

  return [getCeremonyTitle(event), getCeremonyDateFromSlug(event.slug)]
    .filter(Boolean)
    .join(" • ");
}

function getVisibleEventDate(event: EventPageData) {
  if (event.eventType === "retreat") {
    return getRetreatDateRangeFromSlug(event.slug);
  }

  return getCeremonyDateFromSlug(event.slug);
}

function getEventImageUrl(event: EventPageData) {
  if (!event.cardImage) return `${SITE_URL}/images/no-event.png`;

  return urlFor(event.cardImage).width(1200).height(630).fit("crop").url();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const event = await getEventBySlug(slug);

  if (!event) {
    const page = await getPage(slug);

    return {
      title: page?.seoTitle || page?.title || "AyaLuz",
      description:
        page?.seoDescription ||
        "Sacred plant medicine ceremonies and retreats in Peru’s Sacred Valley.",
      alternates: {
        canonical: `${SITE_URL}/${slug}`,
      },
      openGraph: {
        title: page?.seoTitle || page?.title || "AyaLuz",
        description:
          page?.seoDescription ||
          "Sacred plant medicine ceremonies and retreats in Peru’s Sacred Valley.",
        url: `${SITE_URL}/${slug}`,
        siteName: "AyaLuz",
        type: "website",
      },
    };
  }

  const eventWithSlug = {
    ...event,
    slug,
  };

  const title = getSocialTitle(eventWithSlug);
  const description = getSocialDescription(eventWithSlug);
  const imageUrl = getEventImageUrl(eventWithSlug);
  const url = `${SITE_URL}/${slug}`;

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

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;

  const page = await getPage(slug);

  if (page) {
    return (
      <main>
        <PageBuilder sections={page.pageBuilder || []} />
      </main>
    );
  }

  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const eventWithSlug = {
    ...event,
    slug,
  };

  const title = getSocialTitle(eventWithSlug);
  const description = getSocialDescription(eventWithSlug);
  const eventDate = getVisibleEventDate(eventWithSlug);
  const imageUrl = getEventImageUrl(eventWithSlug);

  return (
    <main className="min-h-screen bg-[#F6F1E8] px-5 py-20 text-[#222222] md:px-8">
      <section className="mx-auto max-w-[980px] overflow-hidden rounded-[32px] border border-[#D8CEC2] bg-white shadow-[0_24px_80px_rgba(43,74,64,0.14)]">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#EFE7DC]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 980px"
            className="object-cover"
          />
        </div>

        <div className="p-7 md:p-12">
          {eventWithSlug.displaySubtitle ? (
            <p className="mb-4 text-[12px] uppercase tracking-[0.24em] text-[#2B4A40]/65">
              {eventWithSlug.displaySubtitle}
            </p>
          ) : null}

          <h1 className="font-canela text-[44px] leading-[0.96] tracking-[-0.055em] text-[#111111] md:text-[72px]">
            {eventWithSlug.displayTitle || eventWithSlug.title || title}
          </h1>

          {eventDate ? (
            <p className="mt-5 text-[15px] uppercase tracking-[0.18em] text-[#8A5A44]">
              {eventDate}
            </p>
          ) : null}

          <p className="mt-7 max-w-[720px] text-[17px] leading-[1.8] text-[#222222]/72 md:text-[19px]">
            {description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {eventWithSlug.reservationUrl ? (
              <Link
                href={eventWithSlug.reservationUrl}
                className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#2B4A40] px-8 text-[13px] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-[#1F3A32]"
              >
                Reserve Your Spot
              </Link>
            ) : null}

            <Link
              href="/"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-[#2B4A40]/25 px-8 text-[13px] font-medium uppercase tracking-[0.16em] text-[#2B4A40] transition hover:border-[#2B4A40]/50"
            >
              Explore AyaLuz
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}