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
    <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-white bg-[#2B275A]">
      <Image
        src={data.image}
        alt="Hero background"
        layout="fill"
        objectFit="cover"
        className="absolute z-0 opacity-10"
        data-ai-hint="programming class"
      />
      <div className="relative z-20 text-center p-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-4 animate-fade-in-down">
          {data.title}
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 mb-8 animate-fade-in-up">
          {data.subtitle}
        </p>
        <Link href={data.ctaLink}>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 text-lg">
            {data.ctaText}
            <MoveRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
