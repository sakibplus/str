import Image from 'next/image';
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
  bgColor: string;
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
                <Card className={`overflow-hidden rounded-2xl border-0 shadow-lg ${course.bgColor}`}>
                  <CardContent className="p-0 text-white text-center">
                    <div className="relative p-2">
                       <div className="absolute top-4 left-4 z-10">
                          <div className="flex items-center gap-1.5 bg-red-500 text-white text-xs py-1 px-2 rounded-full">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            LIVE BATCH
                          </div>
                       </div>
                      <h3 className="font-bold text-lg mt-8 h-16">{course.title}</h3>
                    </div>
                    <div className="relative h-64">
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={250}
                        height={250}
                        className="w-full h-full object-contain absolute bottom-0"
                        data-ai-hint={course.dataAiHint}
                      />
                    </div>
                    {course.price ? (
                      <div className="p-4 space-y-2">
                         <div className="flex items-center justify-center gap-2">
                            <span className="text-sm line-through text-gray-300">{course.duration}</span>
                         </div>
                         <div className="flex items-center justify-center gap-2">
                            <span className="text-lg line-through text-gray-300">৳{course.price}</span>
                            <span className="text-2xl font-bold text-green-400">৳{course.discountedPrice}</span>
                         </div>
                         <p className="text-sm">প্রতি মাস</p>
                         <div className="bg-white text-gray-800 font-bold py-2 px-4 rounded-lg inline-block mt-1">
                           PROMO CODE: <span className="text-purple-600">{course.promoCode}</span>
                         </div>
                      </div>
                    ) : (
                       <div className="p-4 text-center mt-4">
                          <p className="text-sm">ক্র্যাশ কোর্স</p>
                          <div className="bg-white text-black rounded-full inline-block px-8 py-2 mt-2">
                            <p className="text-3xl font-bold">৭৫০৳</p>
                          </div>
                       </div>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
