import { defineField, defineType } from "sanity";

export const promoBannerSection = defineType({
  name: "promoBannerSection",
  title: "Promo Banner",
  type: "object",

  fields: [
    defineField({
      name: "enabled",
      title: "Show Promo Banner",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Sacred Valley Retreats",
    }),

    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 2,
      initialValue:
        "Limited spaces available for upcoming ceremonies and healing journeys.",
    }),

    defineField({
      name: "button",
      title: "Button",
      type: "object",

      fields: [
        defineField({
          name: "label",
          title: "Button Label",
          type: "string",
          initialValue: "Explore Retreats",
        }),

        defineField({
          name: "href",
          title: "Button Link",
          type: "string",
          initialValue: "/retreats",
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      enabled: "enabled",
    },

    prepare({ title, enabled }) {
      return {
        title: title || "Promo Banner",
        subtitle: enabled === false ? "Hidden" : "Visible",
      };
    },
  },
});