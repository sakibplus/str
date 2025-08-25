
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

type Course = {
    id: number;
    title: string;
    image: string;
    dataAiHint: string;
    price?: string | undefined;
    discountedPrice?: string | undefined;
    description?: string;
    details?: { heading: string; points: string[] }[];
    promoCode?: string;
    priceSuffix?: string;
};

type EnrollDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  course: Course;
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


export function EnrollDialog({
  isOpen,
  setIsOpen,
  course,
}: EnrollDialogProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleWhatsAppSubmit = () => {
    if(!name || !mobile || !address) {
      setError("অনুগ্রহ করে আপনার নাম, মোবাইল এবং ঠিকানা পূরণ করুন।");
      return;
    }
    setError('');

    const message = `
Hello SkillShikhun,

I want to enroll in the following course:
Course: ${course.title}

My Details:
Name: ${name}
Mobile: ${mobile}
Address: ${address}

Please guide me with the next steps. Thank you!
    `;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=8801234567890&text=${encodeURIComponent(
      message.trim()
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary font-headline">কোর্সে এনরোল করুন</DialogTitle>
          <DialogDescription className="text-center">
            আপনার তথ্য দিয়ে ফর্মটি পূরণ করুন এবং হোয়াটসঅ্যাপের মাধ্যমে আমাদের সাথে যোগাযোগ করুন।
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="p-4 border rounded-lg space-y-3 bg-gray-50 flex items-center gap-4">
               <Image src={course.image} alt={course.title} width={120} height={80} className="rounded-md object-cover aspect-video" data-ai-hint={course.dataAiHint} />
              <div>
                <h3 className="font-bold text-lg text-primary">{course.title}</h3>
                <div className="flex items-center text-sm">
                  {course.discountedPrice ? (
                      <p className="font-bold text-accent text-lg">৳{course.discountedPrice} {course.priceSuffix}</p>
                  ) : (
                      <p className="font-bold text-accent text-lg">৳৭৫০</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">আপনার নাম</Label>
                    <Input id="name" placeholder="সম্পূর্ণ নাম লিখুন" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mobile">আপনার মোবাইল নম্বর</Label>
                    <Input id="mobile" placeholder="মোবাইল নম্বর লিখুন" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">আপনার ঠিকানা</Label>
                    <Input id="address" placeholder="আপনার ঠিকানা লিখুন" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
            </div>
          

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="mt-2">
             <Button onClick={handleWhatsAppSubmit} className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6">
                <WhatsappIcon className="mr-2 h-6 w-6" />
                হোয়াটসঅ্যাপে অর্ডার করুন
             </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
