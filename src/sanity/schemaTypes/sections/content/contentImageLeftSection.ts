import { defineArrayMember, defineField, defineType } from "sanity";

export const contentImageLeftSection = defineType({
  name: "contentImageLeftSection",
  title: "Content - Image Left",
  type: "object",

  fields: [
    defineField({
      name: "image",
      title: "Image",
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
      ],
    }),

    defineField({
      name: "displaySubtitle",
      title: "Display Subtitle",
      type: "string",
    }),

    defineField({
      name: "displayTitle",
      title: "Display Title",
      type: "string",
    }),

    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 5,
    }),

    defineField({
      name: "ctas",
      title: "CTAs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "cta",
          title: "CTA",

          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),

            defineField({
              name: "href",
              title: "Link",
              type: "string",
            }),

            defineField({
              name: "variant",
              title: "CTA Type",
              type: "string",
              initialValue: "primary",
              options: {
                layout: "radio",
                list: [
                  { title: "Primary", value: "primary" },
                  { title: "Secondary", value: "secondary" },
                  { title: "Text Button", value: "text" },
                ],
              },
            }),
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "displayTitle",
      subtitle: "displaySubtitle",
      media: "image",
    },

    prepare({ title, subtitle, media }) {
      return {
        title: title || "Content - Image Left",
        subtitle,
        media,
      };
    },
  },
});