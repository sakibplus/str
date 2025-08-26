
'use client';

import { useState, useEffect } from 'react';
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
import type { NavbarData, NavLink, HeroData, CourseCarouselData, Course, AboutUsSectionData, Testimonial, WhyChooseUsData, FooterData } from '@/lib/types';
import { seedSanityData } from '@/ai/flows/seed-sanity-data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [navbarData, setNavbarData] = useState<NavbarData | null>(null);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [courseCarouselData, setCourseCarouselData] = useState<CourseCarouselData[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [aboutUsData, setAboutUsData] = useState<AboutUsSectionData | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUsData | null>(null);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [
        navbar,
        nav,
        hero,
        carousel,
        allCourses,
        about,
        testimonialData,
        whyChoose,
        footer
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
      setNavbarData(navbar || null);
      setNavLinks(nav || []);
      setHeroData(hero || null);
      setCourseCarouselData(carousel || []);
      setCourses(allCourses || []);
      setAboutUsData(about || null);
      setTestimonials(testimonialData || []);
      setWhyChooseUsData(whyChoose || null);
      setFooterData(footer || null);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      const result = await seedSanityData();
      toast({
        title: "ডেটা আপলোড সফল হয়েছে!",
        description: "আপনার অ্যাডমিন প্যানেলে সমস্ত কনটেন্ট যুক্ত করা হয়েছে।",
      });
      // Refetch data to update the UI
      await fetchData();
    } catch (error: any) {
      console.error("Seeding failed:", error);
      toast({
        title: "ডেটা আপলোড ব্যর্থ হয়েছে",
        description: error.message || "অনুগ্রহ করে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const isDataMissing = !navbarData && !heroData && !footerData;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {isDataMissing && !isLoading && (
         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 container mx-auto my-4 rounded-md shadow-lg">
           <div className="flex items-center justify-between">
             <div>
               <p className="font-bold">ওয়েবসাইট সেটআপ করুন</p>
               <p>আপনার ওয়েবসাইটে কনটেন্ট যুক্ত করতে নিচের বাটনে ক্লিক করুন।</p>
             </div>
             <Button onClick={handleSeedData} disabled={isSeeding}>
               {isSeeding ? 'লোড হচ্ছে...' : 'Seed Initial Data'}
             </Button>
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
