
'use client';

import { useState } from 'react';
import { courseCarouselData } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { EnrollDialog } from '@/components/enroll-dialog';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const course = courseCarouselData.find((c) => c.id.toString() === params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">{course.title}</h1>
                    <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
                    
                    <div className="space-y-6">
                        {course.details?.map((detail, index) => (
                             <div key={index}>
                                <h3 className="font-bold font-headline text-xl mb-3">{detail.heading}</h3>
                                <ul className="space-y-2">
                                    {detail.points.map((point, pIndex) => (
                                        <li key={pIndex} className="flex items-start gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    
                </div>
                <div>
                    <div className="sticky top-24">
                        <div className="rounded-xl overflow-hidden shadow-lg border">
                            <Image
                                src={course.image}
                                alt={course.title}
                                width={800}
                                height={450}
                                className="w-full h-auto object-cover"
                                data-ai-hint={course.dataAiHint}
                            />
                            <div className="p-6 bg-white">
                                <div className="flex justify-between items-center mb-4">
                                    {course.price && course.discountedPrice ? (
                                        <div>
                                            <p className="text-3xl font-bold text-primary">৳{course.discountedPrice}<span className="text-lg font-normal text-muted-foreground">/মাস</span></p>
                                            <p className="line-through text-muted-foreground">৳{course.price}</p>
                                        </div>
                                    ) : (
                                        <p className="text-3xl font-bold text-primary">৭৫০৳</p>
                                    )}
                                     <div className="bg-red-500 text-white text-sm py-1 px-3 rounded-full">
                                        LIVE
                                     </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">কোর্সটি করে নিজের পছন্দের জবে জয়েন করুন অথবা ফ্রিল্যান্সিং করে আয় করুন।</p>
                                <Button size="lg" className="w-full h-12 text-lg" onClick={() => setIsDialogOpen(true)}>কোর্সে এনরোল করুন</Button>

                                <div className="text-center mt-4">
                                     <p className="text-sm text-muted-foreground">কোর্স প্রোমো কোড: <span className="font-bold text-accent">{course.promoCode || 'SKILL750'}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
      <EnrollDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} course={course} />
    </div>
  );
}
