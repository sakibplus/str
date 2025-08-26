// Type definitions for the entire application content.
// This provides a single source of truth for all data structures.

export type TopBannerData = {
  enabled: boolean;
  title: string;
  subtitle: string;
  promo_code_label: string;
  promo_code: string;
  sale_text_1: string;
  sale_text_2: string;
};

export type NavbarData = {
  logo_url: string;
  button_text: string;
};

export type NavLink = {
  href: string;
  label: string;
};

export type HeroData = {
  title: string;
  subtitle:string;
  helpline_text: string;
  phone_number: string;
};

export type CourseCarouselData = {
  id: number;
  title: string;
  image: string;
  dataAiHint: string;
  discountedPrice?: string;
  duration?: string;
  priceSuffix?: string;
};

export type Course = {
  id: number;
  title: string;
  image: string;
  dataAiHint: string;
  duration: string;
  price: string;
  live?: boolean;
  priceSuffix?: string;
};

export type DetailedCourse = Course & {
  description?: string;
  discountedPrice?: string;
  promoCode?: string;
  details?: { heading: string; points: string[] }[];
}

export type AboutUsSectionData = {
    title: string;
    heading: string;
    description: string;
    image: string;
    dataAiHint: string;
    stats: { value: string; label: string }[];
}

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  dataAiHint: string;
};

export type WhyChooseUsFeature = {
  id: number;
  title: string;
  description: string;
  image: string;
  dataAiHint: string;
};

export type WhyChooseUsData = {
    title: string;
    subtitle: string;
    features: WhyChooseUsFeature[];
}

export type FooterLink = {
    label: string;
    href: string;
}

export type FooterData = {
    logo_url: string;
    description: string;
    newsletter_heading: string;
    newsletter_placeholder: string;
    copyright_text: string;
    address_line1: string;
    address_line2: string;
    email: string;
    phone: string;
    links: FooterLink[];
}

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  dataAiHint: string;
  date: string;
  author: string;
  author_avatar: string;
  content: string;
};

export type BlogPageData = {
    hero_title: string;
    hero_subtitle: string;
}

export type ContactPageData = {
    hero_title: string;
    hero_subtitle: string;
    info_title: string;
    info_subtitle: string;
    map_url: string;
    form_title: string;
    form_subtitle: string;
}

export type ContactInfoCard = {
    icon: string;
    title: string;
    value: string;
    link?: string;
}

export type AboutUsData = {
    hero_title: string;
    hero_subtitle: string;
    story_tagline: string;
    story_heading: string;
    story_description_1: string;
    story_description_2: string;
story_image: string;
    vision_title: string;
    vision_description: string;
    mission_title: string;
    mission_description: string;
    stats_heading: string;
    stats_subheading: string;
    stats: { value: string; label: string }[];
};
