/** CMS micro-elements — each field maps to a Sanity document field */

export type CmsLink = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

export type CmsIcon = {
  alt?: string;
  /** Local path or Sanity asset URL */
  src?: string;
};

export type PromoBannerContent = {
  enabled: boolean;
  icon?: CmsIcon;
  /** e.g. "Upcoming Ceremony" */
  label: string;
  /** e.g. "Join our next Ayahuasca ceremony this Friday, May 29" */
  message: string;
  link: CmsLink;
};

export type NavItem = CmsLink & {
  _key?: string;
};

export type NavbarContent = {
  brandName: string;
  logo?: CmsIcon;
  items: NavItem[];
};

export type HeroCta = CmsLink & {
  showTrailingArrow?: boolean;
};

export type HeroContent = {
  eyebrow: string;
  headlineLines: [string, string, string];
  /** Two lines displayed under the headline */
  paragraphLines: [string, string];
  backgroundImage: {
    src: string;
    alt: string;
  };
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
};

export type HomepageHeaderContent = {
  promoBanner: PromoBannerContent;
  navbar: NavbarContent;
  hero: HeroContent;
};
