
import { client } from './sanity.client';
import type {
  NavbarData,
  NavLink,
  HeroData,
  CourseCarouselData,
  Course,
  DetailedCourse,
  AboutUsSectionData,
  Testimonial,
  WhyChooseUsData,
  FooterData,
  BlogPost,
  BlogPageData,
  ContactPageData,
  ContactInfoCard,
  AboutUsData,
} from './types';
import { groq } from 'next-sanity';

// Reusable function to fetch a single document type
async function getSingleton(docType: string, query: string): Promise<any> {
  if (!client) return {};
  return client.fetch(groq`*[_type == "${docType}"][0]{ ${query} }`);
}

// Reusable function to fetch all documents of a certain type
async function getAllDocs(docType: string, query: string): Promise<any[]> {
  if (!client) return [];
  return client.fetch(groq`*[_type == "${docType}"]{ ${query} } | order(_createdAt asc)`);
}

export const getNavbarData = async (): Promise<NavbarData> => {
  return getSingleton('navbar', `"logo_url": logo.asset->url, button_text`);
};

export const getNavLinks = async (): Promise<NavLink[]> => {
  return getAllDocs('navLink', `href, label`);
};

export const getHeroData = async (): Promise<HeroData> => {
  return getSingleton('hero', `title, subtitle, helpline_text, phone_number`);
};

export const getCourseCarouselData = async (): Promise<CourseCarouselData[]> => {
  return getAllDocs('courseCarousel', `
    id, title, "image": image.asset->url, "dataAiHint": image.alt,
    discountedPrice, duration, priceSuffix
  `);
};

export const getCourses = async (): Promise<Course[]> => {
  return getAllDocs('course', `
    id, title, "image": image.asset->url, "dataAiHint": image.alt,
    duration, price, live, priceSuffix
  `);
};

export const getCourseById = async (id: number): Promise<DetailedCourse | undefined> => {
  if (!client) return undefined;
  const query = groq`*[_type == "detailedCourse" && id == ${id}][0]{
    "courseData": *[_type == "course" && id == ${id}][0]{
      id, title, "image": image.asset->url, "dataAiHint": image.alt,
      duration, price, live, priceSuffix
    },
    description, discountedPrice, promoCode,
    details[]{ heading, points }
  }`;
  const result = await client.fetch(query);
  if (!result || !result.courseData) return undefined;

  return {
    ...result.courseData,
    ...result,
  };
};


export const getAboutUsSectionData = async (): Promise<AboutUsSectionData> => {
  return getSingleton('aboutUsSection', `
    title, heading, description, "image": image.asset->url, "dataAiHint": image.alt,
    stats[]{ value, label }
  `);
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  return getAllDocs('testimonial', `
    id, name, role, quote, "avatar": avatar.asset->url, "dataAiHint": avatar.alt
  `);
};

export const getWhyChooseUsData = async (): Promise<WhyChooseUsData> => {
  return getSingleton('whyChooseUs', `
    title, subtitle,
    features[]{ id, title, description, "image": image.asset->url, "dataAiHint": image.alt }
  `);
};

export const getFooterData = async (): Promise<FooterData> => {
  return getSingleton('footer', `
    "logo_url": logo.asset->url, description, newsletter_heading, newsletter_placeholder,
    copyright_text, address_line1, address_line2, email, phone,
    links[]{ label, href }
  `);
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return getAllDocs('blogPost', `
    id, title, excerpt, "image": image.asset->url, "dataAiHint": image.alt,
    date, author, "author_avatar": author_avatar.asset->url, content
  `);
};

export const getBlogPageData = async (): Promise<BlogPageData> => {
  return getSingleton('blogPage', `hero_title, hero_subtitle`);
};

export const getContactPageData = async (): Promise<ContactPageData> => {
  return getSingleton('contactPage', `
    hero_title, hero_subtitle, info_title, info_subtitle,
    map_url, form_title, form_subtitle
  `);
};

export const getContactInfoCards = async (): Promise<ContactInfoCard[]> => {
  const pageData = await getSingleton('contactPage', 'infoCards');
  return pageData?.infoCards || [];
};

export const getAboutUsData = async (): Promise<AboutUsData> => {
  return getSingleton('aboutPage', `
    hero_title, hero_subtitle, story_tagline, story_heading,
    story_description_1, story_description_2, "story_image": story_image.asset->url,
    vision_title, vision_description, mission_title, mission_description,
    stats_heading, stats_subheading,
    stats[]{ value, label }
  `);
};
