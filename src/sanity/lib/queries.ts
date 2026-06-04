import { groq } from "next-sanity";

export const eventFields = groq`
  _id,
  title,
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
  eventIcon,
  cardImage,
  detailedViewImage,
  features,
  whatsappTitle,
  whatsappDescription,
  whatsappButtonLabel,
  whatsappPhoneNumber
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    seoTitle,
    seoDescription,
    navigationTitle,
    showInNavigation,

    pageBuilder[] {
      ...,

      _type == "calendarSection" => {
        ...,
        manualEvents[]-> {
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