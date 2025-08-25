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

type Course = {
  id: number;
  title: string;
  image: string;
  dataAiHint: string;
  link: string;
  duration: string;
  price: string;
};

export function CoursesSection({ courses }: { courses: Course[] }) {
  return (
    <section id="courses" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            আমাদের কোর্সগুলো থেকে বাছাই করুন আপনার পছন্দের স্কিল
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden flex flex-col bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
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
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                <CardTitle className="mb-2 font-headline text-lg font-bold text-gray-800 flex items-center">
                  {course.title}
                  <span className="text-red-500 ml-2 text-xs">((🔴))</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  - {course.duration}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                 <span className="font-bold text-primary">৳{course.price} প্রতি মাস</span>
                 <Button asChild variant="outline" size="sm">
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
