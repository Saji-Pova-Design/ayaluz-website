import { defineField, defineType } from "sanity";

export const heroCta = defineType({
  name: "heroCta",
  title: "Hero CTA",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "URL", type: "string", validation: (r) => r.required() }),
    defineField({ name: "openInNewTab", title: "Open in new tab", type: "boolean" }),
    defineField({
      name: "showTrailingArrow",
      title: "Show trailing arrow",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
