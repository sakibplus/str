import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, ArrowRight } from 'lucide-react';

type Course = {
  id: number;
  title: string;
  description: string;
  image: string;
  dataAiHint: string;
  price: string;
  students: number;
  lessons: number;
  link: string;
};

export function CoursesSection({ courses }: { courses: Course[] }) {
  return (
    <section id="courses" className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            আমাদের জনপ্রিয় কোর্সসমূহ
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            আপনার পছন্দের বিষয় নির্বাচন করে আজই শুরু করুন আপনার সফলতার যাত্রা।
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className="p-0">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={course.dataAiHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="mb-2 font-headline text-xl">{course.title}</CardTitle>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {course.description}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-start p-6 pt-0">
                <div className="w-full flex justify-between items-center mb-4">
                  <Badge variant="default" className="text-lg bg-accent text-accent-foreground py-1 px-3">
                    {course.price}
                  </Badge>
                </div>
                 <div className="w-full flex justify-between items-center text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons} লেসন</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{course.students} শিক্ষার্থী</span>
                  </div>
                </div>
                <Button asChild className="w-full mt-auto">
                  <Link href={course.link}>
                    বিস্তারিত দেখুন <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
