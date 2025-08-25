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
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white">
      <Image
        src={data.image}
        alt="Hero background"
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
        data-ai-hint="programming class"
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 text-center p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight mb-4 animate-fade-in-down">
          {data.title}
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 mb-8 animate-fade-in-up">
          {data.subtitle}
        </p>
        <Link href={data.ctaLink}>
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            {data.ctaText}
            <MoveRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
