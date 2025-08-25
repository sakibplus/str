
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from "@/components/ui/card";

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

export default function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
  
    const handleWhatsAppSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(!name || !email || !message) {
        setError("অনুগ্রহ করে সকল তথ্য পূরণ করুন।");
        return;
      }
      setError('');
  
      const whatsappMessage = `
Hello SkillShikhun,

I have an inquiry.
Name: ${name}
Email: ${email}
Message: ${message}
      `;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=8801234567890&text=${encodeURIComponent(
        whatsappMessage.trim()
      )}`;
      window.open(whatsappUrl, '_blank');
    };

    return (
        <Card className="shadow-lg p-8">
            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="name" className="font-semibold">আপনার নাম</Label>
                    <Input id="name" type="text" placeholder="সম্পূর্ণ নাম" className="mt-2" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="email" className="font-semibold">আপনার ইমেইল</Label>
                    <Input id="email" type="email" placeholder="ইমেইল অ্যাড্রেস" className="mt-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="message" className="font-semibold">আপনার বার্তা</Label>
                    <Textarea id="message" placeholder="আপনার প্রশ্ন বা বার্তাটি এখানে লিখুন..." className="mt-2" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <Button type="submit" size="lg" className="w-full h-14 text-lg bg-green-500 hover:bg-green-600 text-white">
                    <WhatsappIcon className="mr-3 h-6 w-6" />
                    হোয়াটসঅ্যাপে পাঠান
                </Button>
            </form>
        </Card>
    )
}
