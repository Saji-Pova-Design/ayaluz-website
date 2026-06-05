import {
  defineField,
  defineType,
} from "sanity";

type EventPreviewSelection = {
  title?: string;
  media?: string;
  eventType?: string;
  singleDate?: string;
  startDate?: string;
  slug?: string;
};

function getEventSlugPrefix(eventType?: unknown) {
  return eventType === "retreat"
    ? "retreat"
    : "ceremony";
}

function getSlugDatePart(rawDate?: unknown) {
  if (typeof rawDate !== "string") {
    return "";
  }

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();

  const month = date.toLocaleDateString(
    "en-US",
    {
      month: "long",
    },
  );

  const day = String(date.getDate()).padStart(
    2,
    "0",
  );

  return `${year}-${month}-${day}`;
}

export const event = defineType({
  name: "event",
  title: "Events",
  type: "document",

  groups: [
    {
      name: "basic",
      title: "Basic",
    },
    {
      name: "dates",
      title: "Dates",
    },
    {
      name: "media",
      title: "Media",
    },
    {
      name: "content",
      title: "Content",
    },
    {
      name: "detailView",
      title: "Detail View",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "basic",
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (document) => {
          const eventType =
            getEventSlugPrefix(
              document?.eventType,
            );

          const title =
            typeof document?.title ===
            "string"
              ? document.title
              : "event";

          const rawDate =
            document?.eventType ===
            "retreat"
              ? document?.startDate
              : document?.singleDate;

          const datePart =
            getSlugDatePart(rawDate);

          return datePart
            ? `${eventType}-${title}-${datePart}`
            : `${eventType}-${title}`;
        },

        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/&/g, "and")
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-"),
      },
      validation: (Rule) =>
        Rule.required(),
      group: "basic",
    }),

    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          {
            title: "Single Day Ceremony",
            value: "single-day",
          },
          {
            title: "Retreat",
            value: "retreat",
          },
        ],
        layout: "radio",
      },
      validation: (Rule) =>
        Rule.required(),
      group: "basic",
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      group: "basic",
    }),

    defineField({
      name: "announcementNote",
      title: "Short Announcement Note",
      description:
        "Example: Limited spaces available for this ceremony.",
      type: "text",
      rows: 2,
      group: "detailView",
    }),

    defineField({
      name: "longDescription",
      title: "Long Description",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
      group: "content",
    }),

    defineField({
      name: "singleDate",
      title: "Single Ceremony Date",
      type: "datetime",
      hidden: ({ document }) =>
        document?.eventType !== "single-day",
      group: "dates",
    }),

    defineField({
      name: "startDate",
      title: "Retreat Start Date",
      type: "datetime",
      hidden: ({ document }) =>
        document?.eventType !== "retreat",
      group: "dates",
    }),

    defineField({
      name: "endDate",
      title: "Retreat End Date",
      type: "datetime",
      hidden: ({ document }) =>
        document?.eventType !== "retreat",
      group: "dates",
    }),

    defineField({
      name: "timeRange",
      title: "Time Range",
      type: "string",
      group: "dates",
    }),

    defineField({
      name: "eventIcon",
      title: "Event Icon",
      description:
        "Optional icon shown beside the event title. If empty, the default Aya icon will be used.",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "media",
    }),

    defineField({
      name: "cardImage",
      title: "Card Image",
      description:
        "Image shown on the event card.",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "media",
    }),

    defineField({
      name: "detailedViewImage",
      title: "Detailed View Image",
      description:
        "Large image shown inside the ceremony or retreat detail modal.",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "detailView",
    }),

    defineField({
      name: "features",
      title: "Features",
      description:
        "Add icon and text feature items shown in the detail view.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "string",
              validation: (Rule) =>
                Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "text",
              media: "icon",
            },
          },
        },
      ],
      group: "detailView",
    }),

    defineField({
      name: "whatsappTitle",
      title: "WhatsApp Section Title",
      type: "string",
      initialValue:
        "Have questions or need guidance?",
      group: "detailView",
    }),

    defineField({
      name: "whatsappDescription",
      title:
        "WhatsApp Section Description",
      type: "text",
      rows: 2,
      initialValue:
        "Click and connect with us on WhatsApp.",
      group: "detailView",
    }),

    defineField({
      name: "whatsappButtonLabel",
      title: "WhatsApp Button Label",
      type: "string",
      initialValue: "Connect",
      group: "detailView",
    }),

    defineField({
      name: "whatsappPhoneNumber",
      title: "WhatsApp Phone Number",
      description:
        "Use international format without spaces or plus sign. Example: 51999999999",
      type: "string",
      group: "detailView",
    }),

    defineField({
      name: "reservationUrl",
      title: "Reservation URL",
      type: "url",
      group: "basic",
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
    }),

    defineField({
      name: "seoImage",
      title: "SEO Image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "seo",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "cardImage",
      eventType: "eventType",
      singleDate: "singleDate",
      startDate: "startDate",
      slug: "slug.current",
    },

    prepare(selection) {
      const {
        title,
        media,
        eventType,
        singleDate,
        startDate,
        slug,
      } = selection as EventPreviewSelection;

      const rawDate =
        eventType === "retreat"
          ? startDate
          : singleDate;

      const formattedDate = rawDate
        ? new Date(rawDate).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            },
          )
        : "No date";

      return {
        title:
          slug ||
          title ||
          "Untitled event",
        subtitle: `${
          eventType === "retreat"
            ? "Retreat"
            : "Single Ceremony"
        } • ${formattedDate}`,
        media,
      };
    },
  },
});