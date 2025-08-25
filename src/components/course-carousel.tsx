
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Card, CardContent } from './ui/card';

type Course = {
  id: number;
  title: string;
  image: string;
  dataAiHint: string;
  price?: string;
  discountedPrice?: string;
  promoCode?: string;
  duration?: string;
};

export function CourseCarousel({ courses }: { courses: Course[] }) {
  return (
    <section className="bg-primary py-12">
      <div className="container mx-auto">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {courses.map((course) => (
              <CarouselItem
                key={course.id}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <Link href={`/course/${course.id}`}>
                  <Card className="overflow-hidden rounded-2xl border-0 shadow-lg bg-transparent cursor-pointer">
                    <CardContent className="p-0 text-white text-center relative">
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={300}
                        height={450}
                        className="w-full h-full object-cover aspect-square sm:aspect-[2/3]"
                        data-ai-hint={course.dataAiHint}
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute inset-0 flex flex-col justify-between p-4">
                        <div className="flex justify-start">
                          <div className="flex items-center gap-1.5 bg-red-500 text-white text-xs py-1 px-2 rounded-full">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            LIVE BATCH
                          </div>
                        </div>
                        <h3 className="font-bold text-lg">{course.title}</h3>
                        
                        <div className="space-y-2">
                          {course.price ? (
                            <>
                              <p className="text-sm">{course.duration}</p>
                              <div className="bg-white text-gray-800 font-bold py-1 px-4 rounded-lg inline-block text-sm">
                                {course.discountedPrice}৳ প্রতি মাস
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-sm inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full">ক্র্যাশ কোর্স</div>
                              <div className="bg-white text-black rounded-full inline-block px-8 py-1 mt-2">
                                <p className="text-3xl font-bold">৭৫০৳</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
