import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "headlineLines",
      title: "Headline (3 lines)",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.length(3).required(),
      description: "Exactly three lines, displayed as separate headline rows",
    }),
    defineField({
      name: "paragraphLines",
      title: "Supporting paragraph (2 lines)",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.length(2).required(),
      description: "Line 1 and line 2, shown as separate rows",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "heroCta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "heroCta",
      validation: (r) => r.required(),
    }),
  ],
});
