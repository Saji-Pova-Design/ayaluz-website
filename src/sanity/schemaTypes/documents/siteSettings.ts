import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  groups: [
    {
      name: "branding",
      title: "Branding",
    },

    {
      name: "navigation",
      title: "Navigation",
    },

    {
      name: "footer",
      title: "Footer",
    },

    {
      name: "social",
      title: "Social Links",
    },

    {
      name: "contact",
      title: "Contact",
    },

    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    /**
     * BRANDING
     */
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      group: "branding",
    }),

    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
      group: "branding",
    }),

    defineField({
      name: "logo",
      title: "Logo",
      type: "image",

      options: {
        hotspot: true,
      },

      group: "branding",
    }),

    defineField({
      name: "announcementBarText",
      title: "Announcement Bar Text",
      type: "string",
      group: "branding",
    }),

    defineField({
      name: "announcementBarEnabled",
      title: "Enable Announcement Bar",
      type: "boolean",

      initialValue: false,

      group: "branding",
    }),

    /**
     * NAVIGATION
     */
    defineField({
      name: "navigationItems",
      title: "Navigation Items",
      type: "array",

      group: "navigation",

      of: [
        {
          type: "object",

          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),

            defineField({
              name: "href",
              title: "Href",
              type: "string",
            }),

            defineField({
              name: "openInNewTab",
              title: "Open In New Tab",
              type: "boolean",

              initialValue: false,
            }),
          ],
        },
      ],
    }),

    /**
     * FOOTER
     */
    defineField({
      name: "footerCopyright",
      title: "Footer Copyright",
      type: "string",
      group: "footer",
    }),

    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",

      rows: 3,

      group: "footer",
    }),

    /**
     * SOCIAL
     */
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "social",
    }),

    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      group: "social",
    }),

    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      group: "social",
    }),

    defineField({
      name: "tiktokUrl",
      title: "TikTok URL",
      type: "url",
      group: "social",
    }),

    /**
     * CONTACT
     */
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      group: "contact",
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "contact",
    }),

    /**
     * SEO
     */
    defineField({
      name: "defaultSeoTitle",
      title: "Default SEO Title",
      type: "string",
      group: "seo",
    }),

    defineField({
      name: "defaultSeoDescription",
      title: "Default SEO Description",
      type: "text",

      rows: 3,

      group: "seo",
    }),

    defineField({
      name: "defaultSeoImage",
      title: "Default SEO Image",
      type: "image",

      options: {
        hotspot: true,
      },

      group: "seo",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});