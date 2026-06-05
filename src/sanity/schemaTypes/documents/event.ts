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
      title: "Sanity Title",
      description:
        "Main internal title for organizing this event inside Sanity.",
      type: "string",
      initialValue: "",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "displayTitle",
      title: "Display Title",
      description:
        "Public visual title shown on cards and upcoming sections.",
      type: "string",
      initialValue: "",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "displaySubtitle",
      title: "Display Subtitle",
      description:
        "Optional subtitle shown below the display title.",
      type: "string",
      initialValue: "",
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

      validation: (Rule) => Rule.required(),
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

      validation: (Rule) => Rule.required(),
      group: "basic",
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      initialValue: "",
      group: "basic",
    }),

    defineField({
      name: "announcementNote",
      title: "Short Announcement Note",
      type: "text",
      rows: 2,
      initialValue: "",
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
      initialValue: "",
      group: "dates",
    }),

    defineField({
      name: "cardImage",
      title: "Card Image",
      type: "image",

      options: {
        hotspot: true,
      },

      group: "media",
    }),

    defineField({
      name: "detailedViewImage",
      title: "Detailed View Image",
      type: "image",

      options: {
        hotspot: true,
      },

      group: "detailView",
    }),

    defineField({
      name: "features",
      title: "Features",
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
              initialValue: "",

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
      initialValue: "",
      group: "detailView",
    }),

    defineField({
      name: "reservationUrl",
      title: "Reservation URL",
      type: "url",
      initialValue: "",
      group: "basic",
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      initialValue: "",
      group: "seo",
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",

      rows: 3,

      initialValue: "",

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

      return {
        title:
          selection.displayTitle ||
          selection.title ||
          "Untitled event",

        subtitle: [
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