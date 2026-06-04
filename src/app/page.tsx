import PageBuilder from "@/components/page-builder/PageBuilder";

import { client } from "@/sanity/lib/client";
import { pageBySlugQuery } from "@/sanity/lib/queries";

export default async function HomePage() {
  try {
    const page = await client.fetch(
      pageBySlugQuery,
      {
        slug: "home",
      },
      {
        cache: "no-store",
      }
    );

    return (
      <main>
        <PageBuilder
          sections={page?.pageBuilder || []}
        />
      </main>
    );
  } catch (error) {
    console.error("SANITY ERROR:", error);

    return (
      <main
        style={{
          padding: "40px",
          fontSize: "24px",
        }}
      >
        SANITY FETCH FAILED
      </main>
    );
  }
}