/** Reusable share + social preview config for ceremony/event pages */
export type EventShareConfig = {
  /** og:title / share sheet title */
  title: string;
  /** og:description / share sheet text */
  description: string;
  /** Path or absolute URL — use absolute in metadata */
  image: string;
  imageAlt: string;
  /** Canonical path, e.g. `/ceremonies/may-2026-ayahuasca` */
  canonicalPath: string;
  /** Modal/sheet heading (can differ from og:title) */
  detailsTitle?: string;
};
