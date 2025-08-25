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
    getNavLinks,
    getHeroData,
    getCourseCarouselData,
    getCourses,
    getAboutUsData,
    getTestimonials,
    getWhyChooseUsData,
    getFooterData
} from '@/lib/cms';
import { getDebugInfo, type DebugInfo } from '@/lib/debug-cms';

// --- DEBUG COMPONENT ---
function DebugComponent({ debugInfo }: { debugInfo: DebugInfo[] }) {
  return (
    <div style={{ padding: '2rem', margin: '2rem', border: '2px solid red', backgroundColor: '#fff0f0' }}>
      <h1 style={{ fontSize: '24px', color: 'red', marginBottom: '1rem' }}>CMS DEBUGGING INFORMATION</h1>
      <p style={{ color: '#333', marginBottom: '1rem' }}>This box shows whether the Google Sheet URLs from your .env file are being loaded correctly. If a value shows 'Not Set', the corresponding environment variable is missing or not being read.</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Environment Variable</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Loaded?</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Value (first 50 chars)</th>
          </tr>
        </thead>
        <tbody>
          {debugInfo.map((info, index) => (
            <tr key={index}>
              <td style={{ padding: '8px', border: '1px solid #ddd', fontFamily: 'monospace' }}>{info.key}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', color: info.isSet ? 'green' : 'red', fontWeight: 'bold' }}>{info.isSet ? 'Yes' : 'No'}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', fontFamily: 'monospace' }}>{info.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default async function Home() {
  // Fetch all data from the CMS
  const navLinks = await getNavLinks();
  const heroData = await getHeroData();
  const courseCarouselData = await getCourseCarouselData();
  const courses = await getCourses();
  const aboutUsData = await getAboutUsData();
  const testimonials = await getTestimonials();
  const whyChooseUsData = await getWhyChooseUsData();
  const footerData = await getFooterData();

  // Fetch debug info
  const debugInfo = await getDebugInfo();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DebugComponent debugInfo={debugInfo} />
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
