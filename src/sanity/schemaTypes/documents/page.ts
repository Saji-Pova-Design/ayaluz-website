import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",

      options: {
        source: "title",
        maxLength: 96,
      },
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
    }),

    defineField({
      name: "navigationTitle",
      title: "Navigation Title",
      type: "string",
    }),

    defineField({
      name: "showInNavigation",
      title: "Show In Navigation",
      type: "boolean",

      initialValue: true,
    }),

    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "array",

      of: [
        {
          type: "promoBannerSection",
        },

        {
          type: "heroSection",
        },

        {
          type: "calendarSection",
        },

        {
          type: "upcomingSection",
        },

        {
          type: "faqSection",
        },

        {
          type: "testimonialSection",
        },

        {
          type: "richTextSection",
        },
      ],
    }),
  ],
});