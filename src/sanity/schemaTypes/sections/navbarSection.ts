import { defineField, defineType } from "sanity";

export const navbarSection = defineType({
  name: "navbarSection",
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
        {
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
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "brandName",
    },
    prepare({ title }) {
      return {
        title: title || "Navbar",
        subtitle: "Page Builder Navbar",
      };
    },
  },
});
