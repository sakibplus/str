
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getNavLinks, getFooterData, getNavbarData, getCourses, getContactPageData, getContactInfoCards } from "@/lib/cms";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "./contact-form";
import { Card, CardContent } from "@/components/ui/card";
import type { ContactInfoCard } from "@/lib/cms";

const iconComponents: { [key: string]: React.ElementType } = {
  Mail,
  Phone,
  MapPin,
};


export default async function ContactPage() {
  const [
    navLinks,
    footerData,
    navbarData,
    courses,
    contactPageData,
    contactInfoCards,
  ] = await Promise.all([
    getNavLinks(),
    getFooterData(),
    getNavbarData(),
    getCourses(),
    getContactPageData(),
    getContactInfoCards(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar navLinks={navLinks} data={navbarData} courses={courses} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">
              {contactPageData.hero_title}
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/80">
              {contactPageData.hero_subtitle}
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {contactInfoCards.map((item: ContactInfoCard, index: number) => {
                const IconComponent = iconComponents[item.icon] || Mail;
                return (
                  <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6 flex flex-row items-center gap-4">
                      <div className="bg-accent/10 p-3 rounded-full">
                        <IconComponent className="h-8 w-8 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-headline text-primary mb-1">
                          {item.title}
                        </h3>
                        <a href={item.link} className="text-muted-foreground hover:text-accent text-sm md:text-base">
                          {item.value}
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Form and Map Section */}
        <section className="pb-12 md:pb-24 bg-white pt-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">{contactPageData.form_title}</h2>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">{contactPageData.form_subtitle}</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Contact Form */}
              <div className="order-2 lg:order-1">
                <ContactForm />
              </div>

              {/* Google Map */}
              <div className="order-1 lg:order-2 h-80 lg:h-full w-full rounded-xl overflow-hidden shadow-lg border">
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
