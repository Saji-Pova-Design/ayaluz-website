import { client } from "./client";
import { eventBySlugQuery, pageBySlugQuery } from "./queries";

export async function getPage(slug: string) {
  return client.fetch(pageBySlugQuery, {
    slug,
  });
}

export async function getEventBySlug(slug: string) {
  return client.fetch(eventBySlugQuery, {
    slug,
  });
}