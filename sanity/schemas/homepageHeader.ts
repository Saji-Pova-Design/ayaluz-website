import { defineField, defineType } from "sanity";

export const homepageHeader = defineType({
  name: "homepageHeader",
  title: "Homepage Header",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      initialValue: "Homepage Header",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "promoBanner",
      title: "1 · Promotional banner",
      type: "promoBanner",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "navbar",
      title: "2 · Navigation",
      type: "navbar",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "hero",
      title: "3 · Hero",
      type: "hero",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
