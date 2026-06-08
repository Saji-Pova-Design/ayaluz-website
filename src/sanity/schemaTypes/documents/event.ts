import {
  defineField,
  defineType,
} from "sanity";

function getEventSlugPrefix(eventType?: string) {
  return eventType === "retreat"
    ? "retreat"
    : "ceremony";
}

function getSlugDatePart(rawDate?: string) {
  if (!rawDate) {
    return "";
  }

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();

  const month = date.toLocaleDateString("en-US", {
    month: "long",
  });

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const event = defineType({
  name: "event",
  title: "Events",
  type: "document",

  groups: [
    {
      name: "basic",
      title: "Event Card Information",
      default: true,
    },

    {
      name: "dates",
      title: "Dates",
    },

    {
      name: "detailView",
      title: "Detail View",
    },

    {
      name: "shareView",
      title: "Share View",
    },

    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Sanity Title",
      description:
        "Internal title for organizing this event inside Sanity.",
      type: "string",
      group: "basic",

      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "status",
      title: "Event Status",
      description:
        "Published events appear on the website. Cancelled events stay saved in Sanity but are hidden from the website.",
      type: "string",
      initialValue: "published",

      options: {
        layout: "radio",

        list: [
          {
            title: "Published",
            value: "published",
          },

          {
            title: "Cancelled",
            value: "cancelled",
          },
        ],
      },

      validation: (Rule) =>
        Rule.required(),

      group: "basic",
    }),

    defineField({
      name: "displayTitle",
      title: "Display Title",
      description:
        "Public title shown on event cards and upcoming sections.",
      type: "string",
      group: "basic",

      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "displaySubtitle",
      title: "Display Subtitle",
      description:
        "Optional subtitle shown below the display title.",
      type: "string",
      group: "basic",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",

      options: {
        source: (document: any) => {
          const eventType = getEventSlugPrefix(
            document?.eventType,
          );

          const title =
            document?.displayTitle ||
            document?.title ||
            "event";

          const rawDate =
            document?.eventType === "retreat"
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

      initialValue: "single-day",

      options: {
        layout: "radio",

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
      title: "Announcement",
      type: "text",
      rows: 2,
      group: "basic",
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

      group: "basic",
    }),

    defineField({
      name: "showShortDescriptionOnCard",
      title: "Show Short Description On Card",
      type: "boolean",
      initialValue: true,
      group: "basic",
    }),

    defineField({
      name: "showAnnouncementOnCard",
      title: "Show Announcement On Card",
      type: "boolean",
      initialValue: true,
      group: "basic",
    }),

    defineField({
      name: "showLongDescriptionOnCard",
      title: "Show Long Description On Card",
      type: "boolean",
      initialValue: false,
      group: "basic",
    }),

    defineField({
      name: "showReserveCtaOnCard",
      title: "Show Reserve CTA On Card",
      type: "boolean",
      initialValue: true,
      group: "basic",
    }),

    defineField({
      name: "cardReserveCtaLabel",
      title: "Card Reserve CTA Label",
      type: "string",
      initialValue: "Reserve",
      group: "basic",
    }),

    defineField({
      name: "cardImage",
      title: "Card Image",
      type: "image",

      options: {
        hotspot: true,
      },

      group: "basic",
    }),

    defineField({
      name: "reservationUrl",
      title: "Reservation URL",
      type: "url",
      group: "basic",
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
      name: "useCardDateBadgeInDetail",
      title: "Show Date Badge In Detail View",
      type: "boolean",
      initialValue: true,
      group: "detailView",
    }),

    defineField({
      name: "useCardImageInDetail",
      title: "Show Card Image In Detail View",
      type: "boolean",
      initialValue: true,
      group: "detailView",
    }),

    defineField({
      name: "showShortDescriptionInDetail",
      title: "Show Short Description In Detail View",
      type: "boolean",
      initialValue: true,
      group: "detailView",
    }),

    defineField({
      name: "showAnnouncementInDetail",
      title: "Show Announcement In Detail View",
      type: "boolean",
      initialValue: true,
      group: "detailView",
    }),

    defineField({
      name: "showLongDescriptionInDetail",
      title: "Show Long Description In Detail View",
      type: "boolean",
      initialValue: true,
      group: "detailView",
    }),

    defineField({
      name: "showCountdown",
      title: "Show Countdown",
      type: "boolean",
      initialValue: false,
      group: "detailView",
    }),

    defineField({
      name: "showLocation",
      title: "Show Location",
      type: "boolean",
      initialValue: false,
      group: "detailView",
    }),

    defineField({
      name: "showReserveCtaInDetail",
      title: "Show Reserve CTA In Detail View",
      type: "boolean",
      initialValue: true,
      group: "detailView",
    }),

    defineField({
      name: "detailReserveCtaLabel",
      title: "Detail Reserve CTA Label",
      type: "string",

      initialValue:
        "Reserve Your Spot",

      group: "detailView",
    }),

    defineField({
      name: "detailedViewImage",
      title: "Detail Image",
      type: "image",

      options: {
        hotspot: true,
      },

      group: "detailView",
    }),

    defineField({
      name: "features",
      title: "Features / Included Items",
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
      title: "WhatsApp Section Description",
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
      type: "string",
      group: "detailView",
    }),

    defineField({
      name: "showShareCta",
      title: "Show Share CTA",
      type: "boolean",
      initialValue: true,
      group: "shareView",
    }),

    defineField({
      name: "shareTitle",
      title: "Share Title",
      type: "string",
      group: "shareView",
    }),

    defineField({
      name: "shareDescription",
      title: "Share Description",
      type: "text",
      rows: 2,
      group: "shareView",
    }),

    defineField({
      name: "sharePreviewImage",
      title: "Share Preview Image",
      type: "image",

      options: {
        hotspot: true,
      },

      group: "shareView",
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
      displayTitle: "displayTitle",
      displaySubtitle: "displaySubtitle",
      media: "cardImage",
      eventType: "eventType",
      status: "status",
      singleDate: "singleDate",
      startDate: "startDate",
    },

    prepare(selection) {
      const rawDate =
        selection.eventType === "retreat"
          ? selection.startDate
          : selection.singleDate;

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

      const statusLabel =
        selection.status === "cancelled"
          ? "Cancelled"
          : "Published";

      return {
        title:
          selection.displayTitle ||
          selection.title ||
          "Untitled event",

        subtitle: [
          statusLabel,
          selection.displaySubtitle,
          selection.eventType === "retreat"
            ? "Retreat"
            : "Single Ceremony",
          formattedDate,
        ]
          .filter(Boolean)
          .join(" • "),

        media: selection.media,
      };
    },
  },
});