import { defineField, defineType } from "sanity";

export const calendarSection = defineType({
  name: "calendarSection",
  title: "Calendar Section",
  type: "object",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",

      initialValue: "Calendar",
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",

      initialValue:
        "Ceremony & Retreat Calendar",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",

      rows: 3,
    }),

    /**
     * DISPLAY SETTINGS
     */
    defineField({
      name: "showSingleDayCeremonies",
      title:
        "Show Single Day Ceremonies",
      type: "boolean",

      initialValue: true,
    }),

    defineField({
      name: "showRetreats",
      title: "Show Retreats",
      type: "boolean",

      initialValue: true,
    }),

    defineField({
      name: "enableExpandMonths",
      title: "Enable Expand Months",
      type: "boolean",

      initialValue: true,
    }),

    defineField({
      name: "initialVisibleMonths",
      title: "Initial Visible Months",
      type: "number",

      initialValue: 1,

      validation: (Rule) =>
        Rule.min(1).max(12),
    }),

    /**
     * OPTIONAL MANUAL EVENTS
     * (later useful for curated calendars)
     */
    defineField({
      name: "manualEvents",
      title: "Manual Events Override",
      type: "array",

      of: [
        {
          type: "reference",

          to: [
            {
              type: "event",
            },
          ],
        },
      ],
    }),

    /**
     * AUTO MODE
     */
    defineField({
      name: "useAutomaticEvents",
      title:
        "Automatically Pull Events",
      type: "boolean",

      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "title",
    },

    prepare(selection) {
      return {
        title:
          selection.title ||
          "Calendar Section",

        subtitle:
          "Dynamic Event Calendar",
      };
    },
  },
});