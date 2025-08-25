import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  dataAiHint: string;
  date: string;
  link: string;
};

export function BlogSection({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="blog" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            আমাদের ব্লগ থেকে
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            প্রযুক্তি জগতের সর্বশেষ খবর এবং টিপস পেতে আমাদের সাথেই থাকুন।
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="p-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={post.dataAiHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <CardTitle className="font-headline text-xl mb-2">{post.title}</CardTitle>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link href={post.link}>
                    পড়তে থাকুন <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
