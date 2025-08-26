
'use client'

import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import type { Course } from '@/lib/data';

export function CoursesSection({ courses }: { courses: Course[] }) {
  if (!courses || courses.length === 0) return null;

  return (
    <section id="courses" className="pb-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            আমাদের কোর্সগুলো থেকে বাছাই করুন আপনার পছন্দের স্কিল
          </h2>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {courses.map((course) => (
              <CarouselItem key={course.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Card
                  className="overflow-hidden flex flex-col bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
                >
                  <div className="relative">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover rounded-t-lg aspect-[4/3]"
                      data-ai-hint={course.dataAiHint}
                    />
                  </div>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <h3 className="mb-2 font-headline text-lg font-bold text-gray-800 flex items-center">
                      {course.title} {course.live && <span className="text-red-500 ml-2 text-xs">((🔴))</span>}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      - {course.duration}{' '}
                      {course.live && <span className="text-red-500 font-bold">LIVE</span>} কোর্স
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                     <span className="font-bold text-primary">৳{course.price}</span>
                     <Button asChild variant="outline" size="sm">
                      <Link href={`/course/${course.id}`}>
                        বিস্তারিত দেখুন
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 hidden md:flex" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
