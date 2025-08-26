'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CourseInquiryDialog } from './course-inquiry-dialog';
import type { Course } from '@/lib/cms';

export function FreeVideosForm({ courses }: { courses: Course[] }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.trim()) {
      setIsDialogOpen(true);
    }
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto flex justify-center">
        <Card className="w-full max-w-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-primary">
              লাইভ কোর্সের কিছু ভিডিও দেখুন ফ্রি!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex gap-2" onSubmit={handleSubmit}>
              <div className="flex-none w-24">
                <Input
                  type="text"
                  value="+88"
                  readOnly
                  className="bg-gray-200 text-center"
                />
              </div>
              <Input
                type="tel"
                placeholder="আপনার মোবাইল নম্বর দিন"
                className="flex-grow"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
              <Button type="submit" className="bg-accent hover:bg-accent/90">
                সাবমিট
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <CourseInquiryDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        mobileNumber={mobileNumber}
        courses={courses}
      />
    </section>
  );
}
