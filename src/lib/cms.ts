import data from './content.json';
import type {
  NavbarData,
  NavLink,
  HeroData,
  CourseCarouselData,
  Course,
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

// Since we are using a local JSON file, all functions will be synchronous.
// We keep the async structure to minimize changes in the components.

export const getNavbarData = async (): Promise<NavbarData> => {
  return data.navbar;
};

export const getNavLinks = async (): Promise<NavLink[]> => {
  return data.navLinks;
};

export const getHeroData = async (): Promise<HeroData> => {
  return data.homePage.hero;
};

export const getCourseCarouselData = async (): Promise<CourseCarouselData[]> => {
  return data.courseCarousel;
};

export const getCourses = async (): Promise<Course[]> => {
  return data.courses;
};

export const getCourseById = async (id: number): Promise<Course | undefined> => {
  const course = data.courses.find((c) => c.id === id);
  if (!course) return undefined;
  
  // Find details from the detailedCourses section in JSON
  const courseDetails = data.detailedCourses.find(dc => dc.id === id);
  
  return {
    ...course,
    ...courseDetails, // Combine basic and detailed info
  };
};

export const getAboutUsSectionData = async (): Promise<AboutUsSectionData> => {
  return data.homePage.aboutUsSection;
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  return data.testimonials;
};

export const getWhyChooseUsData = async (): Promise<WhyChooseUsData> => {
  return data.homePage.whyChooseUs;
};

export const getFooterData = async (): Promise<FooterData> => {
  return data.footer;
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return data.blog.posts;
};

export const getBlogPageData = async (): Promise<BlogPageData> => {
  return data.blog.pageData;
};

export const getContactPageData = async (): Promise<ContactPageData> => {
  return data.contactPage.pageData;
};

export const getContactInfoCards = async (): Promise<ContactInfoCard[]> => {
  return data.contactPage.infoCards;
};

export const getAboutUsData = async (): Promise<AboutUsData> => {
  return data.aboutPage;
};
