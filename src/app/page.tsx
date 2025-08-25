import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { CoursesSection } from '@/components/courses-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { BlogSection } from '@/components/blog-section';
import { Footer } from '@/components/footer';
import { AboutUsSection } from '@/components/about-us-section';
import { TopBanner } from '@/components/top-banner';
import {
  heroData,
  courses,
  testimonials,
  blogPosts,
  aboutUsData,
  courseCarouselData,
} from '@/lib/data';
import { CourseCarousel } from '@/components/course-carousel';
import { FreeVideosForm } from '@/components/free-videos-form';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBanner />
      <Navbar />
      <main className="flex-1">
        <HeroSection data={heroData} />
        <CourseCarousel courses={courseCarouselData} />
        <FreeVideosForm />
        <CoursesSection courses={courses} />
        <AboutUsSection data={aboutUsData} />
        <TestimonialsSection testimonials={testimonials} />
        <BlogSection posts={blogPosts} />
      </main>
      <Footer />
    </div>
  );
}
