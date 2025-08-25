import Image from "next/image";
import { Building, Goal, Eye } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getNavLinks, getFooterData, getAboutUsData, getNavbarData } from "@/lib/cms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AboutPage() {
  const [navLinks, footerData, aboutUsData, navbarData] = await Promise.all([
    getNavLinks(),
    getFooterData(),
    getAboutUsData(),
    getNavbarData(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar navLinks={navLinks} data={navbarData} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">
              আমাদের সম্পর্কে
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/80">
              আপনার সফলতার পথে, আমরা আপনার বিশ্বস্ত সঙ্গী। SkillShikhun-এ আমরা
              প্রযুক্তির মাধ্যমে আপনার স্বপ্ন পূরণে সহায়তা করি।
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src={aboutUsData.image}
                  alt="SkillShikhun Team"
                  width={800}
                  height={600}
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                  data-ai-hint={aboutUsData.dataAiHint}
                />
              </div>
              <div>
                <span className="text-sm font-bold uppercase text-accent tracking-wider">
                  আমাদের পথচলা
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mt-2 mb-4">
                  {aboutUsData.heading}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {aboutUsData.description}
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mt-4">
                  আমাদের লক্ষ্য হল দেশের প্রতিটি প্রান্তে মানসম্মত আইটি শিক্ষা
                  পৌঁছে দেওয়া এবং একটি ডিজিটাল বাংলাদেশ গঠনে ভূমিকা রাখা। আমরা
                  বিশ্বাস করি, সঠিক দক্ষতা অর্জনের মাধ্যমে যে কেউ নিজের পায়ে
                  দাঁড়াতে পারে এবং দেশের অর্থনীতিতে অবদান রাখতে পারে।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Vision Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-accent">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Eye className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl font-headline text-primary">
                    আমাদের লক্ষ্য (Our Vision)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    বাংলাদেশের তরুণ প্রজন্মকে বিশ্বমানের প্রযুক্তিগত শিক্ষায়
                    শিক্ষিত করে একটি দক্ষ ও স্বনির্ভর জাতি হিসেবে গড়ে তোলা,
                    যেখানে প্রত্যেকেই ডিজিটাল অর্থনীতির অংশীদার হবে।
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-primary">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Goal className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-headline text-primary">
                    আমাদের উদ্দেশ্য (Our Mission)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    সাশ্রয়ী মূল্যে মানসম্মত ও praticamente আইটি প্রশিক্ষণ প্রদান
                    করা। শিক্ষার্থীদের জন্য সার্বক্ষণিক সাপোর্ট নিশ্চিত করা এবং
                    ক্যারিয়ার গড়তে প্রয়োজনীয় গাইডলাইন প্রদান করা।
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-primary/5">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">এক নজরে SkillShikhun</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">আমরা যা অর্জন করেছি এবং যা নিয়ে আমরা গর্বিত</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {aboutUsData.stats.map((stat, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                            <p className="text-4xl font-bold text-accent">{stat.value}</p>
                            <p className="text-lg text-muted-foreground mt-2">{stat.label}</p>
                        </div>
                    ))}
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <p className="text-4xl font-bold text-accent">95%</p>
                        <p className="text-lg text-muted-foreground mt-2">সাকসেস রেট</p>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <Footer data={footerData} />
    </div>
  );
}
