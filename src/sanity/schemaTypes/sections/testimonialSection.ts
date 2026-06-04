import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const testimonialSection = defineType({
  name: "testimonialSection",
  title: "Testimonial Section",
  type: "object",

  fields: [
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
      name: "testimonials",
      title: "Testimonials",
      type: "array",

      of: [
        defineArrayMember({
          type: "object",

          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),

            defineField({
              name: "from",
              title: "From / Location",
              type: "string",
            }),

            defineField({
              name: "event",
              title: "Event",
              type: "string",
            }),

            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),

            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 5,
            }),

            defineField({
              name: "rating",
              title: "Rating",
              type: "number",

              initialValue: 5,

              validation: (Rule) =>
                Rule.required().min(1).max(5),
            }),

            defineField({
              name: "image",
              title: "Image",
              type: "image",

              options: {
                hotspot: true,
              },
            }),
          ],

          preview: {
            select: {
              title: "name",
              subtitle: "event",
              media: "image",
            },
          },
        }),
      ],
    }),

    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
    }),

    defineField({
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Testimonial Section",
      };
    },
  },
});