import { notFound } from 'next/navigation';
import { getCourseCarouselData } from '@/lib/cms';
import CourseDetailClientPage from './client-page';

// This is a server component to fetch data
export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const allCourses = await getCourseCarouselData();
  
  // In a real app, you would fetch the specific course details.
  // Here we are filtering from the carousel data for simplicity.
  const course = allCourses.find((c) => c.id.toString() === params.id);

  if (!course) {
    notFound();
  }

  // A mock details object, since it's not in our current CMS sheet
  const courseDetails = {
    details: [
        { heading: 'কোর্সটি কাদের জন্য?', points: ['নতুন শিক্ষার্থী', 'যারা অনলাইনে আয় করতে চান', 'স্টুডেন্ট এবং চাকরিজীবী'] },
        { heading: 'কোর্সে কী কী থাকছে?', points: ['প্রজেক্ট-ভিত্তিক শিক্ষা', 'রিয়েল-লাইফ প্রবলেম সলভিং', 'লাইভ কোডিং সেশন', 'ক্যারিয়ার সাপোর্ট'] },
    ]
  };

  const fullCourseData = { ...course, ...courseDetails };

  return <CourseDetailClientPage course={fullCourseData} />;
}
