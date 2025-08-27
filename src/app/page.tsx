
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
    getAboutUsSectionData,
    getTestimonials,
    getWhyChooseUsData,
    getFooterData
} from '@/lib/cms';

export default async function Home() {
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
    getAboutUsSectionData(),
    getTestimonials(),
    getWhyChooseUsData(),
    getFooterData()
  ]);

  const isDataMissing = !navbarData || !heroData || !footerData || courses.length === 0;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {isDataMissing && (
         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 container mx-auto my-4 rounded-md shadow-lg">
           <div className="flex items-center justify-between">
             <div>
               <p className="font-bold">ওয়েবসাইট সেটআপ করুন</p>
               <p>আপনার ওয়েবসাইটে কনটেন্ট যুক্ত করতে অ্যাডমিন প্যানেলে (/studio) যান এবং "Seed Content" টুলটি ব্যবহার করুন।</p>
             </div>
           </div>
         </div>
      )}
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
