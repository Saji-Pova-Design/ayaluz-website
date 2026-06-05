import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  fields: [
    defineField({
      name: "promoBanner",
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
          type: "string",
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
    }),

    defineField({
      name: "navbar",
      title: "Navbar",
      type: "object",

      fields: [
        defineField({
          name: "brandName",
          title: "Brand Name",
          type: "string",
          initialValue: "AYALUZ",
        }),

        defineField({
          name: "logo",
          title: "Logo",
          type: "image",
          options: {
            hotspot: true,
          },
        }),

        defineField({
          name: "items",
          title: "Navigation Items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "navItem",
              title: "Navigation Item",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),

                defineField({
                  name: "href",
                  title: "Link",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "label",
                  subtitle: "href",
                },
              },
            }),
          ],
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Navbar, promo banner, and global website settings",
      };
    },
  },
});