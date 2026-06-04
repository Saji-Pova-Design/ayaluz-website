import { client } from "./client";

import { pageBySlugQuery } from "./queries";

export async function getPage(
  slug: string,
) {
  return client.fetch(pageBySlugQuery, {
    slug,
  });
}