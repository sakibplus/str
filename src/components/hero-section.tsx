import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import type { HeroData } from '@/lib/types';

export function HeroSection({ data }: { data: HeroData }) {
  if (!data) return null;

  return (
    <section className="bg-primary text-white">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center pt-12 pb-0">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-4">
          {data.title}
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-neutral-200 mb-8">
          {data.subtitle}
        </p>
        <div className="bg-white/10 p-6 rounded-lg border border-white/20">
          <p className="text-neutral-200 mb-2">{data.helpline_text}</p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 text-lg w-full" asChild>
            <a href={`tel:${data.phone_number}`}>
              <Phone className="mr-2 h-5 w-5" />
              {data.phone_number}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
