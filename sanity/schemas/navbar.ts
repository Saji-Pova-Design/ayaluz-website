import { defineField, defineType } from "sanity";

export const navbar = defineType({
  name: "navbar",
  title: "Navigation",
  type: "object",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand name",
      type: "string",
      initialValue: "AYALUZ",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo mark",
      type: "image",
      description: "Optional — falls back to default emblem",
    }),
    defineField({
      name: "items",
      title: "Navigation links",
      type: "array",
      of: [
        defineField({
          name: "navItem",
          type: "link",
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
      validation: (r) => r.min(1),
    }),
  ],
});
