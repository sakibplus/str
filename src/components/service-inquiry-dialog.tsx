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
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import type { Course } from '@/lib/types';
import { Mail } from 'lucide-react';

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


export function ServiceInquiryDialog({
  isOpen,
  setIsOpen,
  courses,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  courses: Course[];
}) {
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(
    courses[0]?.id.toString()
  );
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const selectedCourse = useMemo(() => {
    return courses.find((c) => c.id.toString() === selectedCourseId);
  }, [selectedCourseId, courses]);

  const generateMessage = () => {
    return `
Hello SkillShikhun,

I am interested in one of your courses/services. Here are my details:
Selected Course: ${selectedCourse?.title || 'Not Selected'}

Name: ${name}
Mobile: ${mobile}
Address: ${address}

Please provide me with more information. Thank you!
    `.trim();
  }

  const handleSubmit = (type: 'whatsapp' | 'email') => {
    if(!name || !address || !mobile) {
      setError("অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন।");
      return;
    }
    setError('');

    const message = generateMessage();

    if (type === 'whatsapp') {
        const whatsappUrl = `https://api.whatsapp.com/send?phone=8801234567890&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    } else if (type === 'email') {
        const email = 'info@skillshikhun.com'; // Your target email address
        const subject = `Service Inquiry: ${selectedCourse?.title || 'General Inquiry'}`;
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoUrl;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary font-headline">সার্ভিস নিতে যোগাযোগ করুন</DialogTitle>
          <DialogDescription className="text-center">
            আপনি কোন কোর্স সম্পর্কে জানতে আগ্রহী তা নির্বাচন করুন এবং আপনার তথ্য জমা দিন।
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">আপনার নাম</Label>
                <Input id="name" placeholder="সম্পূর্ণ নাম লিখুন" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">মোবাইল নম্বর</Label>
                <Input id="mobile" placeholder="মোবাইল নম্বর" value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </div>
          </div>
           <div className="space-y-2">
                <Label htmlFor="address">আপনার ঠিকানা</Label>
                <Input id="address" placeholder="আপনার ঠিকানা লিখুন" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          <div className="space-y-2">
            <Label htmlFor="course">কোর্স/সার্ভিস নির্বাচন করুন</Label>
            <Select
              value={selectedCourseId}
              onValueChange={setSelectedCourseId}
            >
              <SelectTrigger id="course">
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
            <div className="p-4 border rounded-lg space-y-3 bg-gray-50">
               <Image src={selectedCourse.image} alt={selectedCourse.title} width={400} height={200} className="rounded-md object-cover aspect-video w-full" data-ai-hint={selectedCourse.dataAiHint} />
              <h3 className="font-bold text-lg text-primary">{selectedCourse.title}</h3>
              <div className="flex justify-between items-center text-sm">
                <p className="text-muted-foreground">{selectedCourse.duration}</p>
                <p className="font-bold text-accent text-lg">৳{selectedCourse.price} {selectedCourse.priceSuffix}</p>
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="mt-2 grid sm:grid-cols-2 gap-2">
             <Button onClick={() => handleSubmit('whatsapp')} className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6">
                <WhatsappIcon className="mr-2 h-6 w-6" />
                হোয়াটসঅ্যাপ
             </Button>
             <Button onClick={() => handleSubmit('email')} className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6">
                <Mail className="mr-2 h-6 w-6" />
                ইমেইল করুন
             </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
