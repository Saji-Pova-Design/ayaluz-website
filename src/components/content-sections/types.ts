export type SectionCTA = {
    label: string;
    href: string;
  };
  
  export type SectionImageProps = {
    src: string;
    alt: string;
  };
  
  export type BaseSectionProps = {
    title: string;
  
    body: string[];
  
    image: SectionImageProps;
  
    cta?: SectionCTA;
  };