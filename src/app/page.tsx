import type { Metadata } from "next";
import { HomepageHeader } from "@/components/homepage/hero/homepageheader/HomepageHeader";
import { getHomepageHeader } from "@/lib/cms/getHomepageHeader";
import UpcomingEventSection from "@/components/homepage/upcoming-event/UpcomingEventSection";
import { buildEventShareMetadata } from "@/lib/share/build-share-metadata";
import { homepageEventShareConfig } from "@/lib/share/event-share-config";

/** Rich link previews for homepage share (WhatsApp, iMessage, Facebook, etc.) */
export const metadata: Metadata = {
  ...buildEventShareMetadata(homepageEventShareConfig),
};

export default async function Home() {
  const header = await getHomepageHeader();

  return (
    <main className="min-h-screen bg-primary-bg">
      <HomepageHeader content={header} />
      <UpcomingEventSection />
    </main>
  );
}
