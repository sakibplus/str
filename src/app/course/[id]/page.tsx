import { notFound } from 'next/navigation';
import { getCourseById, getCourses, getNavbarData, getNavLinks, getFooterData } from '@/lib/cms';
import CourseDetailClientPage from './client-page';

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id, 10);
  if (isNaN(courseId)) {
    notFound();
  }

  const [
    course,
    allCourses,
    navbarData,
    navLinks,
    footerData
  ] = await Promise.all([
    getCourseById(courseId),
    getCourses(),
    getNavbarData(),
    getNavLinks(),
    getFooterData()
  ]);

  if (!course) {
    notFound();
  }
  
  return <CourseDetailClientPage 
            course={course}
            courses={allCourses}
            navbarData={navbarData}
            navLinks={navLinks}
            footerData={footerData}
          />;
}
