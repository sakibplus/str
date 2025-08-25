import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNavLinks, getFooterData, getNavbarData } from "@/lib/cms";
import { Mail, Phone, MapPin } from "lucide-react";

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

export default async function ContactPage() {
  const [navLinks, footerData, navbarData] = await Promise.all([
    getNavLinks(),
    getFooterData(),
    getNavbarData(),
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
      <Navbar navLinks={navLinks} data={navbarData} />
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

        {/* Contact Info Section */}
        <section className="py-16 md:py-24">
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

        {/* WhatsApp & Map Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
                  দ্রুত যোগাযোগের জন্য
                </h2>
                <p className="text-lg text-muted-foreground mt-4 mb-8">
                  আপনার প্রশ্নটি সরাসরি আমাদের জানানোর জন্য হোয়াটসঅ্যাপে মেসেজ
                  দিন। আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবে।
                </p>
                <a
                  href={`https://api.whatsapp.com/send?phone=8801234567890&text=${encodeURIComponent("Hello SkillShikhun, I have a question.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="h-14 text-lg bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto">
                    <WhatsappIcon className="mr-3 h-6 w-6" />
                    হোয়াটসঅ্যাপে মেসেজ দিন
                  </Button>
                </a>
              </div>
              <div className="h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.879940198188!2d90.39053831543154!3d23.75167699462529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd552c2b3b%3A0x4e70f1178de1f6f3!2sDhaka!5e0!3m2!1sen!2sbd!4v1678886363028!5m2!1sen!2sbd"
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
