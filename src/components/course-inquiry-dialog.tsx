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
import { Whatsapp } from 'lucide-react';
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
                <Whatsapp className="mr-2 h-5 w-5" />
                হোয়াটসঅ্যাপে তথ্য পাঠান
             </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
