import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'categories',
      title: 'FAQ Tabs',
      type: 'array',
      validation: (Rule) => Rule.min(1),
      of: [
        defineField({
          name: 'faqCategory',
          title: 'FAQ Tab',
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Tab ID',
              type: 'slug',
              options: {
                source: 'label',
                maxLength: 40,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Tab Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'questions',
              title: 'Questions',
              type: 'array',
              validation: (Rule) => Rule.min(1),
              of: [
                defineField({
                  name: 'faqItem',
                  title: 'FAQ Question',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'question',
                      title: 'Question',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'answerRichText',
                      title: 'Answer',
                      type: 'array',
                      validation: (Rule) => Rule.required(),
                      of: [
                        {
                          type: 'block',
                          styles: [{ title: 'Normal', value: 'normal' }],
                          lists: [],
                          marks: {
                            decorators: [
                              { title: 'Strong', value: 'strong' },
                              { title: 'Emphasis', value: 'em' },
                            ],
                            annotations: [
                              {
                                name: 'link',
                                title: 'Link',
                                type: 'object',
                                fields: [
                                  defineField({
                                    name: 'href',
                                    title: 'URL',
                                    type: 'string',
                                  }),
                                  defineField({
                                    name: 'openInNewTab',
                                    title: 'Open in new tab',
                                    type: 'boolean',
                                    initialValue: false,
                                  }),
                                ],
                              },
                            ],
                          },
                        },
                      ],
                    }),
                    defineField({
                      name: 'bulletPoints',
                      title: 'Optional Bullet Points',
                      type: 'array',
                      of: [{ type: 'string' }],
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'question',
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'label',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})