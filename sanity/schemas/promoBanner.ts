import { defineField, defineType } from "sanity";

export const promoBanner = defineType({
  name: "promoBanner",
  title: "Promotional Banner",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Show banner",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "icon",
      title: "Icon (optional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'e.g. "Upcoming Ceremony"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "link",
      title: "CTA link",
      type: "link",
      validation: (r) => r.required(),
    }),
  ],
});
