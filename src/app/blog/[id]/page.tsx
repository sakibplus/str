import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBlogPosts, getNavbarData, getNavLinks, getFooterData, getCourses } from '@/lib/data';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, User } from 'lucide-react';

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const [
    posts,
    navbarData,
    navLinks,
    footerData,
    courses
  ] = await Promise.all([
    getBlogPosts(),
    getNavbarData(),
    getNavLinks(),
    getFooterData(),
    getCourses()
  ]);

  const post = posts.find((p) => p.id.toString() === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar navLinks={navLinks} data={navbarData} courses={courses} />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            <header className="mb-8 text-center">
              <h1 className="text-3xl md:text-5xl font-bold font-headline text-primary mb-4">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-6 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author_avatar} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
              </div>
            </header>

            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover rounded-2xl shadow-lg mb-8"
              data-ai-hint={post.dataAiHint}
            />

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\\n/g, '<br />') }} 
            />
          </article>
        </div>
      </main>
      <Footer data={footerData} />
    </div>
  );
}
