'use client';

import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

type Course = {
  id: number;
  title: string;
  image: string;
  dataAiHint: string;
  link: string;
  duration: string;
  price: string;
};

type CourseInquiryDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  mobileNumber: string;
  courses: Course[];
};

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.47 14.38c-.29-.14-1.71-.84-1.98-.94s-.46-.14-.66.14-.75.94-.92 1.13-.34.21-.63.07s-1.22-.45-2.32-1.43c-.86-.76-1.44-1.71-1.61-2.01s-.18-.45.07-.6l.4-.46c.18-.21.24-.36.36-.6s.06-.45-.03-.63c-.09-.18-.66-1.58-.9-2.15s-.48-.48-.66-.49h-.53c-.18 0-.48.07-.73.36s-.98.96-.98 2.34c0 1.38 1 2.71 1.14 2.89s1.98 3.01 4.8 4.25c.7.32 1.23.51 1.66.65.69.21 1.32.18 1.81.11.53-.07 1.71-.7 1.95-1.38s.24-1.28.17-1.38c-.07-.1-.24-.17-.53-.31z" />
  </svg>
);


export function CourseInquiryDialog({
  isOpen,
  setIsOpen,
  mobileNumber,
  courses,
}: CourseInquiryDialogProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(
    courses[0]?.id.toString()
  );

  const selectedCourse = useMemo(() => {
    return courses.find((c) => c.id.toString() === selectedCourseId);
  }, [selectedCourseId, courses]);

  const handleWhatsAppSubmit = () => {
    if (!selectedCourse) return;

    const message = `
Hello SkillShikhun,

I am interested in one of your courses. Here are my details:
Mobile Number: +88${mobileNumber}
Selected Course: ${selectedCourse.title}

Please provide me with more information. Thank you!
    `;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=8801234567890&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>কোর্স নির্বাচন করুন</DialogTitle>
          <DialogDescription>
            আপনি কোন কোর্স সম্পর্কে জানতে আগ্রহী তা নির্বাচন করুন এবং তথ্য জমা দিন।
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="course" className="text-right">
              কোর্স
            </Label>
            <Select
              value={selectedCourseId}
              onValueChange={setSelectedCourseId}
            >
              <SelectTrigger id="course" className="col-span-3">
                <SelectValue placeholder="কোর্স সিলেক্ট করুন" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id.toString()}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCourse && (
            <div className="p-4 border rounded-lg space-y-3">
               <Image src={selectedCourse.image} alt={selectedCourse.title} width={400} height={200} className="rounded-md object-cover" />
              <h3 className="font-bold text-lg">{selectedCourse.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedCourse.duration}</p>
              <p className="font-bold text-primary text-md">৳{selectedCourse.price} প্রতি মাস</p>
            </div>
          )}

          <div className="mt-4">
             <Button onClick={handleWhatsAppSubmit} className="w-full bg-green-500 hover:bg-green-600 text-white">
                <WhatsappIcon className="mr-2 h-5 w-5" />
                হোয়াটসঅ্যাপে তথ্য পাঠান
             </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
