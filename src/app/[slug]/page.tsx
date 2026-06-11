import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import PageBuilder from "@/components/page-builder/PageBuilder";
import { getEventBySlug, getPage } from "@/sanity/lib/getPage";

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = "https://www.ayaluz.org";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const page = await getPage(slug);

  if (page) {
    const title = page.seoTitle || page.title || "AyaLuz";
    const description =
      page.seoDescription ||
      "Sacred plant medicine ceremonies and retreats in Peru’s Sacred Valley.";

    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/${slug}`,
        siteName: "AyaLuz",
        type: "website",
      },
    };
  }

  const event = await getEventBySlug(slug);

  if (event) {
    const title =
      event.seoTitle ||
      event.displayTitle ||
      event.title ||
      "AyaLuz Event";

    const description =
      event.seoDescription ||
      event.shortDescription ||
      "Sacred plant medicine ceremonies and retreats in Peru’s Sacred Valley.";

    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/events/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/events/${slug}`,
        siteName: "AyaLuz",
        type: "article",
      },
    };
  }

  return {
    title: "Page Not Found | AyaLuz",
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

  if (event) {
    redirect(`/events/${slug}`);
  }

  notFound();
}