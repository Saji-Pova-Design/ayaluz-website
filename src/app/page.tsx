import PageBuilder from "@/components/page-builder/PageBuilder";

import { client } from "@/sanity/lib/client";
import { pageBySlugQuery } from "@/sanity/lib/queries";

async function getHomePageData() {
  try {
    return await client.fetch(
      pageBySlugQuery,
      {
        slug: "home",
      },
      {
        cache: "no-store",
      },
    );
  } catch (error) {
    console.error("SANITY ERROR:", error);
    return null;
  }
}

export default async function HomePage() {
  const page = await getHomePageData();

  if (!page) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6F1E8] px-6 text-center">
        <div className="max-w-[640px]">
          <p className="mb-4 text-[12px] uppercase tracking-[0.24em] text-[#2B4A40]/60">
            Content Loading Error
          </p>

          <h1 className="font-canela text-[42px] leading-[1] tracking-[-0.05em] text-[#111111] md:text-[64px]">
            Unable to load homepage content
          </h1>

          <p className="mt-6 text-[16px] leading-[1.8] text-[#222222]/70 md:text-[18px]">
            There was an issue fetching content from Sanity. Please check your
            environment variables, dataset configuration, or query structure.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <PageBuilder sections={page?.pageBuilder ?? []} />
    </main>
  );
}