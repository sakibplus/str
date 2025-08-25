
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNavLinks, getFooterData, getNavbarData, getCourses } from "@/lib/cms";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "./contact-form";


export default async function ContactPage() {
  const [navLinks, footerData, navbarData, courses] = await Promise.all([
    getNavLinks(),
    getFooterData(),
    getNavbarData(),
    getCourses()
  ]);

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
              <ContactForm />

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
