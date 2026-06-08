import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "iicafgfn",
  dataset: "ayaluz-dataset",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const eventId = "421ca061-81ad-4e9c-85b3-1cd683f2509b";

const oldFields = [
  "displayIcon",
  "useCardSubtitleInDetail",
  "useCardTitleInDetail",
  "useShortDescriptionInDetail",
  "useAnnouncementInDetail",
  "showReserveCta",
  "reserveCtaLabel",
];

async function cleanup(id) {
  try {
    await client.patch(id).unset(oldFields).commit();
    console.log(`Cleaned ${id}`);
  } catch (error) {
    console.log(`Skipped ${id}:`, error.message);
  }
}

await cleanup(eventId);
await cleanup(`drafts.${eventId}`);

console.log("Done.");