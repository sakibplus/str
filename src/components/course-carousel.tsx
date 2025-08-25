import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
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
    <section className="bg-[#6f42c1] py-12">
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
                       <Badge variant="destructive" className="bg-red-500 text-white text-xs py-1 px-2 rounded-full absolute top-4 left-4 z-10">
                            <span className="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse"></span>
                            LIVE BATCH
                        </Badge>
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
                            <span className="text-sm">প্রতি মাস</span>
                         </div>
                         <div className="bg-white text-gray-800 font-bold py-2 px-4 rounded-lg inline-block">
                           PROMO CODE <span className="text-purple-600">{course.promoCode}</span>
                         </div>
                      </div>
                    ) : (
                       <div className="p-4 bg-yellow-400 text-black rounded-b-2xl mt-4">
                          <p className="text-sm">ক্র্যাশ কোর্স</p>
                          <p className="text-4xl font-bold">৭৫০৳</p>
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
