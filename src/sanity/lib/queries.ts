import { groq } from "next-sanity";

export const eventFields = groq`
  _id,

  title,
  status,

  displayTitle,
  displaySubtitle,

  "slug": slug.current,

  eventType,

  shortDescription,
  announcementNote,
  longDescription,

  showShortDescriptionOnCard,
  showAnnouncementOnCard,
  showLongDescriptionOnCard,

  showReserveCtaOnCard,
  cardReserveCtaLabel,

  singleDate,
  startDate,
  endDate,

  timeRange,

  reservationUrl,

  cardImage,

  useCardDateBadgeInDetail,
  useCardImageInDetail,

  showShortDescriptionInDetail,
  showAnnouncementInDetail,
  showLongDescriptionInDetail,

  showCountdown,
  showLocation,

  showReserveCtaInDetail,
  detailReserveCtaLabel,

  detailedViewImage,

  features,

  whatsappTitle,
  whatsappDescription,
  whatsappButtonLabel,
  whatsappPhoneNumber,

  showShareCta,
  shareTitle,
  shareDescription,
  sharePreviewImage
`;

const contentSectionFields = groq`
  _type,
  _key,

  image,
  displayTitle,
  displaySubtitle,
  body,

  ctas[] {
    _key,
    label,
    href,
    variant
  }
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

export const eventBySlugQuery = groq`
  *[
    _type == "event" &&
    slug.current == $slug &&
    coalesce(status, "published") == "published"
  ][0] {
    ${eventFields}
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

      _type == "navbarSection" => {
        _type,
        _key,
        brandName,
        logo,
        items
      },

      _type == "contentImageTopSection" => {
        ${contentSectionFields}
      },

      _type == "contentImageLeftSection" => {
        ${contentSectionFields}
      },

      _type == "contentImageRightSection" => {
        ${contentSectionFields}
      },

      _type == "zigzagContentSection" => {
        _type,
        _key,

        eyebrow,
        displayTitle,

        contentCells[] {
          _key,

          image,
          displayTitle,
          displaySubtitle,
          body,

          ctas[] {
            _key,
            label,
            href,
            variant
          }
        }
      },

      _type == "calendarSection" => {
        ...,

        "manualEvents": *[
          _type == "event" &&
          coalesce(status, "published") == "published" &&
          defined(coalesce(singleDate, startDate)) &&
          coalesce(singleDate, startDate) >= now()
        ]
        | order(coalesce(singleDate, startDate) asc) {
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
          coalesce(status, "published") == "published" &&
          defined(coalesce(singleDate, startDate)) &&
          coalesce(singleDate, startDate) >= now()
        ]
        | order(coalesce(singleDate, startDate) asc)[0...12] {
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