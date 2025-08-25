import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';

type HeroData = {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
};

export function HeroSection({ data }: { data: HeroData }) {
  return (
    <section className="bg-primary">
      <div className="container mx-auto px-4 grid md:grid-cols-2 items-center gap-8 text-white min-h-[70vh] pt-20 pb-10 md:pt-10">
        <div className="relative z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-4 animate-fade-in-down">
            {data.title}
          </h1>
          <p className="max-w-2xl mx-auto md:mx-0 text-lg md:text-xl text-neutral-200 mb-8 animate-fade-in-up">
            {data.subtitle}
          </p>
          <Link href={data.ctaLink}>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 text-lg"
            >
              {data.ctaText}
              <MoveRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="relative h-64 md:h-full w-full animate-fade-in-up">
           <Image
            src={data.image}
            alt="Hero background"
            layout="fill"
            objectFit="contain"
            className="z-0"
            data-ai-hint="programming class"
          />
        </div>
      </div>
    </section>
  );
}
