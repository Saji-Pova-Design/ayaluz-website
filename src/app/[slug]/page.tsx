import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageBuilder from "@/components/page-builder/PageBuilder";

import { urlFor } from "@/sanity/lib/image";
import { getEventBySlug, getPage } from "@/sanity/lib/getPage";

type Props = {
  params: Promise<{
    slug: string;
  }>;
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
  shortDescription?: string;
  singleDate?: string;
  startDate?: string;
  endDate?: string;
  reservationUrl?: string;
  cardImage?: SanityImage;
};

const SITE_URL = "https://www.ayaluz.org";

function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  const lastDigit = day % 10;

  if (lastDigit === 1) {
    return "st";
  }

  if (lastDigit === 2) {
    return "nd";
  }

  if (lastDigit === 3) {
    return "rd";
  }

  return "th";
}

function formatSingleDate(date?: string) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(`${date}T12:00:00`);
  const month = parsedDate.toLocaleDateString("en-US", {
    month: "long",
  });
  const day = parsedDate.getDate();

  return `${month} ${day}${getOrdinalSuffix(day)}`;
}

function formatRetreatDateRange(startDate?: string, endDate?: string) {
  if (!startDate || !endDate) {
    return "";
  }

  const start = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate}T12:00:00`);

  const startMonth = start.toLocaleDateString("en-US", {
    month: "long",
  });
  const endMonth = end.toLocaleDateString("en-US", {
    month: "long",
  });

  const startDay = start.getDate();
  const endDay = end.getDate();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay}${getOrdinalSuffix(startDay)} – ${endDay}${getOrdinalSuffix(endDay)}`;
  }

  return `${startMonth} ${startDay}${getOrdinalSuffix(startDay)} – ${endMonth} ${endDay}${getOrdinalSuffix(endDay)}`;
}

function getCeremonyTitle(event: EventPageData) {
  const source = `${event.displayTitle || ""} ${event.title || ""}`.toLowerCase();

  if (source.includes("wachuma") || source.includes("san pedro")) {
    return "Wachuma Ceremony";
  }

  return "Ayahuasca Ceremony";
}

function getSocialTitle(event: EventPageData) {
  if (event.eventType === "retreat") {
    return [
      event.displayTitle || event.title || "AyaLuz Retreat",
      event.displaySubtitle,
      formatRetreatDateRange(event.startDate, event.endDate),
    ]
      .filter(Boolean)
      .join(" • ");
  }

  return [getCeremonyTitle(event), formatSingleDate(event.singleDate)]
    .filter(Boolean)
    .join(" • ");
}

function getEventImageUrl(event: EventPageData) {
  if (!event.cardImage) {
    return `${SITE_URL}/images/no-event.png`;
  }

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

  const title = getSocialTitle(event);
  const description =
    event.shortDescription ||
    "A sacred plant medicine journey in Peru’s Sacred Valley.";
  const imageUrl = getEventImageUrl(event);
  const url = `${SITE_URL}/${event.slug || slug}`;

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

  if (!event) {
    notFound();
  }

  const title = getSocialTitle(event);
  const imageUrl = getEventImageUrl(event);

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
          {event.displaySubtitle ? (
            <p className="mb-4 text-[12px] uppercase tracking-[0.24em] text-[#2B4A40]/65">
              {event.displaySubtitle}
            </p>
          ) : null}

          <h1 className="font-canela text-[44px] leading-[0.96] tracking-[-0.055em] text-[#111111] md:text-[72px]">
            {event.displayTitle || event.title || title}
          </h1>

          <p className="mt-5 text-[15px] uppercase tracking-[0.18em] text-[#8A5A44]">
            {event.eventType === "retreat"
              ? formatRetreatDateRange(event.startDate, event.endDate)
              : formatSingleDate(event.singleDate)}
          </p>

          {event.shortDescription ? (
            <p className="mt-7 max-w-[720px] text-[17px] leading-[1.8] text-[#222222]/72 md:text-[19px]">
              {event.shortDescription}
            </p>
          ) : null}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {event.reservationUrl ? (
              <Link
                href={event.reservationUrl}
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