
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { CoursesSection } from '@/components/courses-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { Footer } from '@/components/footer';
import { AboutUsSection } from '@/components/about-us-section';
import { TopBanner } from '@/components/top-banner';
import { CourseCarousel } from '@/components/course-carousel';
import { FreeVideosForm } from '@/components/free-videos-form';
import { WhyChooseUs } from '@/components/why-choose-us';
import { 
    getNavbarData,
    getNavLinks,
    getHeroData,
    getCourseCarouselData,
    getCourses,
    getAboutUsData,
    getTestimonials,
    getWhyChooseUsData,
    getFooterData
} from '@/lib/cms';

export default async function Home() {
  // Fetch all data from the CMS in parallel
  const [
    navbarData,
    navLinks,
    heroData,
    courseCarouselData,
    courses,
    aboutUsData,
    testimonials,
    whyChooseUsData,
    footerData
  ] = await Promise.all([
    getNavbarData(),
    getNavLinks(),
    getHeroData(),
    getCourseCarouselData(),
    getCourses(),
    getAboutUsData(),
    getTestimonials(),
    getWhyChooseUsData(),
    getFooterData()
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBanner />
      <Navbar navLinks={navLinks} data={navbarData} courses={courses} />
      <main className="flex-1">
        <HeroSection data={heroData} />
        <CourseCarousel courses={courseCarouselData} />
        <FreeVideosForm courses={courses} />
        <CoursesSection courses={courses} />
        <AboutUsSection data={aboutUsData} />
        <TestimonialsSection testimonials={testimonials} />
        <WhyChooseUs data={whyChooseUsData} />
      </main>
      <Footer data={footerData} />
    </div>
  );
}
