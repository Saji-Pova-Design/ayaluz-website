import { groq } from "next-sanity";

export const eventFields = groq`
  _id,
  title,
  displayTitle,
  displaySubtitle,
  displayIcon,
  "slug": slug.current,
  eventType,
  shortDescription,
  announcementNote,
  longDescription,
  singleDate,
  startDate,
  endDate,
  timeRange,
  reservationUrl,
  cardImage,
  detailedViewImage,
  features,
  whatsappTitle,
  whatsappDescription,
  whatsappButtonLabel,
  whatsappPhoneNumber
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    promoBanner {
      enabled,
      title,
      text,
      button {
        label,
        href
      }
    },

    navbar {
      brandName,
      logo,
      items[] {
        _key,
        label,
        href
      }
    }
  }
`;

export const pageBySlugQuery = groq`
  *[slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    navigationTitle,
    showInNavigation,

    pageBuilder[] {
      ...,

      _type == "promoBannerSection" => {
        _type,
        _key,
        enabled,
        title,
        text,
        button
      },

      _type == "calendarSection" => {
        ...,
        "manualEvents": *[
    _type == "event" &&
    defined(coalesce(singleDate, startDate)) &&
    coalesce(singleDate, startDate) >= now()
  ] | order(coalesce(singleDate, startDate) asc) {
    ${eventFields}
  }
      },

      _type == "upcomingSection" => {
        ...,

        items[] {
          ...,
          event-> {
            ${eventFields}
          }
        },

        "automaticEvents": *[
          _type == "event" &&
          defined(coalesce(singleDate, startDate)) &&
          coalesce(singleDate, startDate) >= now()
        ] | order(coalesce(singleDate, startDate) asc) [0...12] {
          ${eventFields}
        }
      },

      _type == "testimonialSection" => {
        _type,
        _key,
        eyebrow,
        title,
        ctaLabel,
        ctaHref,

        testimonials[] {
          _key,
          name,
          from,
          event,
          title,
          text,
          rating,
          image
        }
      },

      _type == "faqSection" => {
        _type,
        _key,
        eyebrow,
        title,
        subtitle,

        categories[] {
          _key,
          label,
          "id": id.current,

          questions[] {
            _key,
            question,
            answerRichText,
            bulletPoints
          }
        }
      }
    }
  }
`;