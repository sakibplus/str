
import { notFound } from 'next/navigation';
import { getCourseCarouselData, getCourses } from '@/lib/cms';
import CourseDetailClientPage from './client-page';

// This is a server component to fetch data
export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  // Fetch data from both course sheets in parallel for better performance
  const carouselCoursesPromise = getCourseCarouselData();
  const regularCoursesPromise = getCourses();

  const [carouselCourses, regularCourses] = await Promise.all([
    carouselCoursesPromise,
    regularCoursesPromise,
  ]);

  // Combine the lists to search for the course in both
  const allCourses = [...carouselCourses, ...regularCourses];
  
  // Find the course by its ID from the combined list
  const course = allCourses.find((c) => c.id.toString() === params.id);

  // If the course is not found in either list, show a 404 page
  if (!course) {
    notFound();
  }

  // A mock details object, which can be expanded in the CMS later
  const courseDetails = {
    details: [
        { heading: 'কোর্সটি কাদের জন্য?', points: ['নতুন শিক্ষার্থী', 'যারা অনলাইনে আয় করতে চান', 'স্টুডেন্ট এবং চাকরিজীবী'] },
        { heading: 'কোর্সে কী কী থাকছে?', points: ['প্রজেক্ট-ভিত্তিক শিক্ষা', 'রিয়েল-লাইফ প্রবলেম সলভিং', 'লাইভ কোডিং সেশন', 'ক্যারিয়ার সাপোর্ট'] },
    ]
  };

  const fullCourseData = { ...course, ...courseDetails };

  return <CourseDetailClientPage course={fullCourseData} />;
}
