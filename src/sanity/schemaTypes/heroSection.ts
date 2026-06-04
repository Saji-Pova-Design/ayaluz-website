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

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",

      rows: 3,
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
      name: "mobileImage",
      title: "Mobile Image",
      type: "image",

      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "overlayOpacity",
      title: "Overlay Opacity",
      type: "number",

      initialValue: 0.45,

      validation: (Rule) =>
        Rule.min(0).max(1),
    }),

    defineField({
      name: "primaryButtonLabel",
      title: "Primary Button Label",
      type: "string",
    }),

    defineField({
      name: "primaryButtonUrl",
      title: "Primary Button URL",
      type: "string",
    }),

    defineField({
      name: "secondaryButtonLabel",
      title: "Secondary Button Label",
      type: "string",
    }),

    defineField({
      name: "secondaryButtonUrl",
      title: "Secondary Button URL",
      type: "string",
    }),

    defineField({
      name: "contentAlignment",
      title: "Content Alignment",
      type: "string",

      options: {
        list: [
          {
            title: "Left",
            value: "left",
          },

          {
            title: "Center",
            value: "center",
          },
        ],

        layout: "radio",
      },

      initialValue: "left",
    }),

    defineField({
      name: "height",
      title: "Hero Height",
      type: "string",

      options: {
        list: [
          {
            title: "Small",
            value: "small",
          },

          {
            title: "Medium",
            value: "medium",
          },

          {
            title: "Fullscreen",
            value: "fullscreen",
          },
        ],

        layout: "radio",
      },

      initialValue: "fullscreen",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "backgroundImage",
    },

    prepare(selection) {
      return {
        title: selection.title,
        subtitle: "Hero Section",
        media: selection.media,
      };
    },
  },
});