
'use client';

import { useState } from 'react';
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNavLinks, getFooterData, getNavbarData, getCourses } from "@/lib/cms";
import { Mail, Phone, MapPin } from "lucide-react";

// This is a dummy fetch function because we are in a client component.
// In a real app, this data would likely be fetched in a parent server component
// or from a global state/context.
const useDummyData = () => {
    const DUMMY_NAVBAR_DATA = { logo_url: '/logo.png', button_text: 'লগ ইন' };
      const DUMMY_NAV_LINKS = [
        { href: '/course/2', label: 'ওয়েব ডেভেলপমেন্ট' },
        { href: '/course/4', label: 'গ্রাফিক্স ডিজাইন' },
        { href: '/about', label: 'আমাদের সম্পর্কে' },
        { href: '/contact', label: 'যোগাযোগ' },
      ];
      const DUMMY_FOOTER_DATA = {
        main: {
          description: "আপনার দক্ষতা বিকাশে আমাদের পথচলা।",
          newsletter_heading: "নিউজলেটার",
          newsletter_placeholder: "আমাদের নিউজলেটারে সাবস্ক্রাইব করে নতুন কোর্স এবং অফার সম্পর্কে জানুন।",
        },
        links: [
            { href: "/about", label: "আমাদের সম্পর্কে"},
            { href: "#courses", label: "আমাদের কোর্স"},
            { href: "#blog", label: "ব্লগ"},
            { href: "/contact", label: "যোগাযোগ"},
        ],
        contact: {
            line1: "ঢাকা, বাংলাদেশ",
            line2: "info@skillshikhun.com",
            line3: "+880 1234 567890",
            logo_url: '/logo-white.png',
        }
      };
      const DUMMY_COURSES_DATA = [
          { id: 1, title: 'Course 1' },
          { id: 2, title: 'Course 2' },
      ] as any[];

      return {
          navLinks: DUMMY_NAV_LINKS,
          footerData: DUMMY_FOOTER_DATA,
          navbarData: DUMMY_NAVBAR_DATA,
          courses: DUMMY_COURSES_DATA,
      }
}

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

export default function ContactPage() {
  const { navLinks, footerData, navbarData, courses } = useDummyData();
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

  const contactInfo = [
    {
      icon: <Mail className="h-8 w-8 text-accent" />,
      title: "ইমেইল",
      value: footerData.contact.line2,
      link: `mailto:${footerData.contact.line2}`,
    },
    {
      icon: <Phone className="h-8 w-8 text-accent" />,
      title: "ফোন",
      value: footerData.contact.line3,
      link: `tel:${footerData.contact.line3}`,
    },
    {
      icon: <MapPin className="h-8 w-8 text-accent" />,
      title: "অফিস",
      value: footerData.contact.line1,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar navLinks={navLinks} data={navbarData} courses={courses} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">
              যোগাযোগ করুন
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/80">
              আপনার যেকোনো প্রশ্ন, পরামর্শ বা সহযোগিতার জন্য আমরা সর্বদা প্রস্তুত।
              নিচের যেকোনো মাধ্যমে আমাদের সাথে যোগাযোগ করুন।
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactInfo.map((item, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 flex flex-col items-center">
                    <div className="bg-accent/10 p-4 rounded-full mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold font-headline text-primary mb-2">
                      {item.title}
                    </h3>
                    <a href={item.link} className="text-muted-foreground hover:text-accent">
                      {item.value}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Form and Map Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">আমাদের মেসেজ পাঠান</h2>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">আমরা আপনার বার্তার অপেক্ষায় আছি।</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
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

              {/* Google Map */}
              <div className="h-96 lg:h-full w-full rounded-xl overflow-hidden shadow-lg border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.879940198188!2d90.39053831543154!3d23.75167699462529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd552c2b3b%3A0x4e70f1f1178de1f6f3!2sDhaka!5e0!3m2!1sen!2sbd!4v1678886363028!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SkillShikhun Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer data={footerData} />
    </div>
  );
}
