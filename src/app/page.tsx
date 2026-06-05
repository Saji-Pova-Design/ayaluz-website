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

  return (
    <main className="min-h-screen bg-[#F6F1E8]">
      <pre className="whitespace-pre-wrap break-words p-6 text-[12px] leading-relaxed text-black">
        {JSON.stringify(
          {
            sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
            sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
            sanityApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
            pageExists: Boolean(page),
            pageId: page?._id,
            pageTitle: page?.title,
            pageSlug: page?.slug,
            pageBuilderCount: page?.pageBuilder?.length ?? 0,
            pageBuilderTypes:
              page?.pageBuilder?.map((section: { _type?: string }) => section?._type) ??
              [],
            rawPage: page,
          },
          null,
          2,
        )}
      </pre>

      {page?.pageBuilder?.length ? (
        <PageBuilder sections={page.pageBuilder} />
      ) : null}
    </main>
  );
}