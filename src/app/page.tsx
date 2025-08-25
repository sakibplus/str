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
  heroData,
  courseCarouselData,
  courses,
  aboutUsData,
  testimonials,
  whyChooseUsData,
} from '@/lib/data';
import type { NavLink, FooterData } from '@/lib/cms';


const navLinks: NavLink[] = [
    { href: '/course/2', label: 'ওয়েব ডেভেলপমেন্ট' },
    { href: '/course/4', label: 'গ্রাফিক্স ডিজাইন' },
    { href: '#about', label: 'আমাদের সম্পর্কে' },
    { href: '#courses', label: 'আমাদের কোর্স' },
    { href: '#testimonials', label: 'শিক্ষার্থীদের মতামত' },
    { href: '#contact', label: 'যোগাযোগ' },
];

const footerData: FooterData = {
    description: "আপনার দক্ষতা বিকাশে আমাদের পথচলা।",
    newsletter_heading: "নিউজলেটার",
    newsletter_placeholder: "আমাদের নিউজলেটারে সাবস্ক্রাইব করে নতুন কোর্স এবং অফার সম্পর্কে জানুন।",
    links: [
        { href: "#about", label: "আমাদের সম্পর্কে"},
        { href: "#courses", label: "আমাদের কোর্স"},
        { href: "#blog", label: "ব্লগ"},
        { href: "#", label: "গোপনীয়তা নীতি"},
    ],
    contact: {
        line1: "ঢাকা, বাংলাদেশ",
        line2: "info@skillshikhun.com",
        line3: "+880 1234 567890",
    }
};

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBanner />
      <Navbar navLinks={navLinks} />
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
