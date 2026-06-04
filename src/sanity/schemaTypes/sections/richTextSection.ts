import { defineField, defineType } from "sanity";

export const richTextSection = defineType({
  name: "richTextSection",
  title: "Rich Text Section",
  type: "object",

  fields: [
    /**
     * TOP CONTENT
     */
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

      rows: 3,
    }),

    /**
     * MAIN CONTENT
     */
    defineField({
      name: "content",
      title: "Content",
      type: "array",

      of: [
        {
          type: "block",
        },

        {
          type: "image",

          options: {
            hotspot: true,
          },

          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),

            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
    }),

    /**
     * OPTIONAL SIDE IMAGE
     */
    defineField({
      name: "sideImage",
      title: "Side Image",
      type: "image",

      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "sideImageAlt",
      title: "Side Image Alt",
      type: "string",
    }),

    /**
     * LAYOUT
     */
    defineField({
      name: "layoutStyle",
      title: "Layout Style",
      type: "string",

      options: {
        list: [
          {
            title: "Centered",
            value: "centered",
          },

          {
            title: "Split Left Image",
            value: "split-left",
          },

          {
            title: "Split Right Image",
            value: "split-right",
          },

          {
            title: "Full Width",
            value: "full-width",
          },
        ],

        layout: "radio",
      },

      initialValue: "centered",
    }),

    /**
     * WIDTH
     */
    defineField({
      name: "contentWidth",
      title: "Content Width",
      type: "string",

      options: {
        list: [
          {
            title: "Narrow",
            value: "narrow",
          },

          {
            title: "Medium",
            value: "medium",
          },

          {
            title: "Wide",
            value: "wide",
          },
        ],

        layout: "radio",
      },

      initialValue: "medium",
    }),

    /**
     * CTA
     */
    defineField({
      name: "buttonLabel",
      title: "Button Label",
      type: "string",
    }),

    defineField({
      name: "buttonUrl",
      title: "Button URL",
      type: "string",
    }),

    /**
     * STYLING
     */
    defineField({
      name: "backgroundStyle",
      title: "Background Style",
      type: "string",

      options: {
        list: [
          {
            title: "Light",
            value: "light",
          },

          {
            title: "Dark",
            value: "dark",
          },

          {
            title: "Transparent",
            value: "transparent",
          },
        ],

        layout: "radio",
      },

      initialValue: "light",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "sideImage",
    },

    prepare(selection) {
      return {
        title:
          selection.title ||
          "Rich Text Section",

        subtitle:
          "Flexible Content Section",

        media: selection.media,
      };
    },
  },
});