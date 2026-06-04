import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
    }),

    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",

      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "primaryButtonLabel",
      title: "Primary Button Label",
      type: "string",
    }),

    defineField({
      name: "primaryButtonLink",
      title: "Primary Button Link",
      type: "string",

      description:
        "Example: /calendar",
    }),

    defineField({
      name: "secondaryButtonLabel",
      title: "Secondary Button Label",
      type: "string",
    }),

    defineField({
      name: "secondaryButtonLink",
      title: "Secondary Button Link",
      type: "string",

      description:
        "Example: /healing-journey/our-approach",
    }),
  ],
});