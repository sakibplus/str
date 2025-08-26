import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getNavLinks, getFooterData, getNavbarData, getCourses, getContactPageData, getContactInfoCards } from "@/lib/cms";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "./contact-form";
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
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">
              {contactPageData.hero_title || "যোগাযোগ করুন"}
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/80">
              {contactPageData.hero_subtitle || "আপনার যেকোনো প্রশ্ন, পরামর্শ বা সহযোগিতার জন্য আমরা সর্বদা প্রস্তুত।"}
            </p>
          </div>
        </section>
        
        {/* Combined Contact Info and Form Section */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left side: Info Cards and Map */}
                    <div className="space-y-8">
                         <div className="text-left">
                            <h2 className="text-3xl font-bold font-headline text-primary">{contactPageData.info_title || "যোগাযোগের তথ্য"}</h2>
                            <p className="text-muted-foreground mt-2">{contactPageData.info_subtitle || "যেকোনো প্রয়োজনে আমাদের সাথে সরাসরি যোগাযোগ করুন।"}</p>
                        </div>
                        
                        <div className="space-y-6">
                            {contactInfoCards.map((item: ContactInfoCard, index: number) => {
                                const IconComponent = iconComponents[item.icon] || Mail;
                                return (
                                    <div key={index} className="flex items-start gap-5">
                                        <div className="bg-accent/10 p-4 rounded-full mt-1">
                                            <IconComponent className="h-7 w-7 text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold font-headline text-primary">
                                            {item.title}
                                            </h3>
                                            <a href={item.link || '#'} className="text-lg text-muted-foreground hover:text-accent break-all">
                                            {item.value}
                                            </a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        
                        {/* Google Map */}
                        <div className="h-72 lg:h-80 w-full rounded-xl overflow-hidden shadow-lg border">
                            <iframe
                            src={contactPageData.map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.879940198188!2d90.39053831543154!3d23.75167699462529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd552c2b3b%3A0x4e70f1f1178de1f6f3!2sDhaka!5e0!3m2!1sen!2sbd!4v1678886363028!5m2!1sen!2sbd"}
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

                    {/* Right side: Contact Form */}
                     <div>
                        <div className="text-left mb-8">
                            <h2 className="text-3xl font-bold font-headline text-primary">{contactPageData.form_title || "আমাদের মেসেজ পাঠান"}</h2>
                            <p className="text-muted-foreground mt-2">{contactPageData.form_subtitle || "আমরা আপনার বার্তার অপেক্ষায় আছি।"}</p>
                        </div>
                         <ContactForm />
                     </div>
                </div>
            </div>
        </section>
      </main>
      <Footer data={footerData} />
    </div>
  );
}
