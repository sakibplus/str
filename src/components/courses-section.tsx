import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Course = {
  id: number;
  title: string;
  image: string;
  dataAiHint: string;
  link: string;
};

export function CoursesSection({ courses }: { courses: Course[] }) {
  return (
    <section id="courses" className="py-12 md:py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-lg border-0 bg-card group"
            >
              <CardHeader className="p-0 relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-t-lg"
                  data-ai-hint={course.dataAiHint}
                />
                <div className="absolute top-2 left-2">
                    <Badge variant="destructive" className="bg-red-500 text-white text-xs py-1 px-2 rounded-full">
                        <span className="w-2 h-2 bg-white rounded-full mr-1.5"></span>
                        LIVE BATCH
                    </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="mb-2 font-headline text-md font-bold text-gray-800 group-hover:text-accent">
                  {course.title}
                </CardTitle>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                 <Button asChild className="w-full mt-auto" variant="outline">
                  <Link href={course.link}>
                    বিস্তারিত দেখুন
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
