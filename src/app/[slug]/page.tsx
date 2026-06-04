import { notFound } from "next/navigation";

import { getPage } from "@/sanity/lib/getPage";

import PageBuilder from "@/components/page-builder/PageBuilder";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DynamicPage({
  params,
}: Props) {
  const { slug } = await params;

  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <PageBuilder sections={page.pageBuilder || []} />
    </main>
  );
}