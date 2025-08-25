import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

type HeroData = {
  title: string;
  subtitle: string;
};

export function HeroSection({ data }: { data: HeroData }) {
  return (
    <section className="bg-primary text-white">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center pt-20 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-4">
          {data.title}
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-neutral-200 mb-8">
          {data.subtitle}
        </p>
        <div className="bg-white/10 p-6 rounded-lg border border-white/20">
          <p className="text-neutral-200 mb-2">কোর্স সম্পর্কিত যেকোনো তথ্যের জন্য কল করুন</p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 text-lg w-full">
            <Phone className="mr-2 h-5 w-5" />
            09613823645
          </Button>
        </div>
      </div>
    </section>
  );
}
