import { defineArrayMember, defineField, defineType } from "sanity";

export const zigzagContentSection = defineType({
  name: "zigzagContentSection",
  title: "Content - Zigzag",
  type: "object",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),

    defineField({
      name: "displayTitle",
      title: "Main Title",
      type: "string",
    }),

    defineField({
      name: "contentCells",
      title: "Content Cells",
      type: "array",
      of: [
        defineArrayMember({
          name: "contentCell",
          title: "Content Cell",
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
              name: "displayTitle",
              title: "Display Title",
              type: "string",
            }),

            defineField({
              name: "displaySubtitle",
              title: "Display Subtitle",
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
                  name: "cta",
                  title: "CTA",
                  type: "object",

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

                  preview: {
                    select: {
                      title: "label",
                      subtitle: "variant",
                    },

                    prepare({ title, subtitle }) {
                      return {
                        title: title || "CTA",
                        subtitle: subtitle || "primary",
                      };
                    },
                  },
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
                title: title || "Content Cell",
                subtitle,
                media,
              };
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "displayTitle",
      subtitle: "eyebrow",
    },

    prepare({ title, subtitle }) {
      return {
        title: title || "Content - Zigzag",
        subtitle,
      };
    },
  },
});