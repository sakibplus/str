import navbarData from './content/navbar.json';
import navLinksData from './content/navLinks.json';
import homePageData from './content/home.json';
import courseCarouselData from './content/courseCarousel.json';
import coursesData from './content/courses.json';
import detailedCoursesData from './content/detailedCourses.json';
import testimonialsData from './content/testimonials.json';
import footerData from './content/footer.json';
import blogData from './content/blog.json';
import contactPageData from './content/contact.json';
import aboutPageData from './content/about.json';
import topBannerData from './content/topBanner.json';

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
  DetailedCourse,
  TopBannerData,
} from './types';

// These functions read directly from the imported JSON files.
// This is extremely fast and reliable as it doesn't involve any network requests.

export const getTopBannerData = async (): Promise<TopBannerData> => {
  return topBannerData;
};

export const getNavbarData = async (): Promise<NavbarData> => {
  return navbarData;
};

export const getNavLinks = async (): Promise<NavLink[]> => {
  return navLinksData;
};

export const getHeroData = async (): Promise<HeroData> => {
  return homePageData.hero;
};

export const getCourseCarouselData = async (): Promise<CourseCarouselData[]> => {
  return courseCarouselData;
};

export const getCourses = async (): Promise<Course[]> => {
  return coursesData;
};

export const getCourseById = async (id: number): Promise<DetailedCourse | undefined> => {
  const course = coursesData.find((c) => c.id === id);
  if (!course) return undefined;
  
  const courseDetails = detailedCoursesData.find(dc => dc.id === id);
  
  return {
    ...course,
    ...courseDetails, 
  };
};

export const getAboutUsSectionData = async (): Promise<AboutUsSectionData> => {
  return homePageData.aboutUsSection;
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  return testimonialsData;
};

export const getWhyChooseUsData = async (): Promise<WhyChooseUsData> => {
  return homePageData.whyChooseUs;
};

export const getFooterData = async (): Promise<FooterData> => {
  return footerData;
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return blogData.posts;
};

export const getBlogPageData = async (): Promise<BlogPageData> => {
  return blogData.pageData;
};

export const getContactPageData = async (): Promise<ContactPageData> => {
  return contactPageData.pageData;
};

export const getContactInfoCards = async (): Promise<ContactInfoCard[]> => {
  return contactPageData.infoCards;
};

export const getAboutUsData = async (): Promise<AboutUsData> => {
  return aboutPageData;
};
