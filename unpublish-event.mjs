import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "iicafgfn",
  dataset: "ayaluz-dataset",
  apiVersion: "2025-01-01",
  token:
    "skluok03Vw1g3j9anWU7Fn8oK5jX6sdLFJx9g8mybGiW8ERG4s8q5YBGyQpXDWgcaJum4RhcAPjlLjLL6EAXDDvxUf8MqIEwp1XwSCfjLuST9LsZSrQv1kg4DalQHxWVWhyNF4y2rNXq1yVvxB3EZu7T13FxQOQo7Kj0qs52qnpeAWoF2Rif",

  useCdn: false,
});

const eventId =
  "421ca061-81ad-4e9c-85b3-1cd683f2509b";

await client.action({
  actionType:
    "sanity.action.document.unpublish",

  publishedId: eventId,

  draftId: `drafts.${eventId}`,
});

console.log(
  "Event unpublished successfully.",
);