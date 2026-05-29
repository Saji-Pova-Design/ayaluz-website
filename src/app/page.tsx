import { HomepageHeader } from "@/components/homepage/hero/homepageheader/HomepageHeader";
import { getHomepageHeader } from "@/lib/cms/getHomepageHeader";

export default async function Home() {
  const header = await getHomepageHeader();

  return (
    <main className="min-h-screen bg-primary-bg">
      <HomepageHeader content={header} />
    </main>
  );
}
