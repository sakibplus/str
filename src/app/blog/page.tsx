import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getNavLinks, getFooterData, getNavbarData, getCourses, getBlogPosts } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function BlogPage() {
  const [navLinks, footerData, navbarData, courses, posts] = await Promise.all([
    getNavLinks(),
    getFooterData(),
    getNavbarData(),
    getCourses(),
    getBlogPosts()
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar navLinks={navLinks} data={navbarData} courses={courses} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">
              আমাদের ব্লগ
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/80">
              প্রযুক্তি, ফ্রিল্যান্সিং এবং অনলাইন ক্যারিয়ার নিয়ে আমাদের লেখাগুলো পড়ুন।
            </p>
          </div>
        </section>

        {/* Blog Grid Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <Link href={`/blog/${post.id}`}>
                    <CardHeader className="p-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-56 object-cover"
                        data-ai-hint={post.dataAiHint}
                      />
                    </CardHeader>
                  </Link>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="font-headline text-xl mb-3 leading-snug">
                      <Link href={`/blog/${post.id}`} className="hover:text-accent">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={post.author_avatar} alt={post.author} />
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-foreground">{post.author}</p>
                            <p className="text-xs">{post.date}</p>
                        </div>
                    </div>
                     <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                        <Link href={`/blog/${post.id}`}>
                           <ArrowRight />
                        </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer data={footerData} />
    </div>
  );
}
