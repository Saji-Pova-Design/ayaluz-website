import {
  defineField,
  defineType,
} from "sanity";

export const upcomingSection = defineType({
  name: "upcomingSection",
  title: "Upcoming Section",
  type: "object",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Upcoming",
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Next sacred gathering",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "items",
      title: "Upcoming Blocks",
      description:
        "Add one block for each upcoming feature. Each block can be automatic or manual.",
      type: "array",

      initialValue: [
        {
          selectionMode: "automatic",
          badgeLabel: "Upcoming event",
          ctaLabel: "Reserve Your Spot",
        },
      ],

      validation: (Rule) =>
        Rule.min(1).max(6),

      of: [
        {
          type: "object",
          title: "Upcoming Block",

          fields: [
            defineField({
              name: "selectionMode",
              title: "Event Selection Mode",
              type: "string",
              initialValue: "automatic",

              options: {
                layout: "radio",
                list: [
                  {
                    title:
                      "Automatic — use closest available upcoming event",
                    value: "automatic",
                  },
                  {
                    title:
                      "Manual — choose preferred event",
                    value: "manual",
                  },
                ],
              },
            }),

            defineField({
              name: "event",
              title: "Manual Event",
              type: "reference",
              to: [
                {
                  type: "event",
                },
              ],

              weak: true,

              options: {
                filter:
                  "defined(coalesce(singleDate, startDate))",
              },

              hidden: ({ parent }) =>
                parent?.selectionMode !== "manual",
            }),

            defineField({
              name: "backgroundImage",
              title: "Background Image",
              description:
                "Optional. If empty, the event detail image or card image will be used.",
              type: "image",

              options: {
                hotspot: true,
              },
            }),

            defineField({
              name: "badgeLabel",
              title: "Badge Label",
              type: "string",
              initialValue: "Upcoming event",
            }),

            defineField({
              name: "announcementText",
              title: "Announcement Text",
              description:
                "Optional. If empty, the event announcement note or short description will be used.",
              type: "text",
              rows: 2,
            }),

            defineField({
              name: "ctaLabel",
              title: "CTA Label",
              type: "string",
              initialValue: "Reserve Your Spot",
            }),
          ],

          preview: {
            select: {
              title: "event.title",
              selectionMode: "selectionMode",
              badgeLabel: "badgeLabel",
              media: "backgroundImage",
            },

            prepare(selection) {
              return {
                title:
                  selection.title ||
                  (selection.selectionMode ===
                  "manual"
                    ? "Manual upcoming block"
                    : "Automatic upcoming block"),
                subtitle:
                  selection.badgeLabel ||
                  selection.selectionMode,
                media: selection.media,
              };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      items: "items",
    },

    prepare(selection) {
      return {
        title:
          selection.title ||
          "Upcoming Section",
        subtitle: `${
          selection.items?.length || 1
        } upcoming block(s)`,
      };
    },
  },
});