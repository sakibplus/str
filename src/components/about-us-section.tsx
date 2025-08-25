import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { AboutUsData } from '@/lib/cms';


export function AboutUsSection({ data }: {data: AboutUsData}) {
  if (!data?.title) return null;

  return (
    <section id="about" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <span className="text-sm font-bold uppercase text-accent tracking-wider">{data.title}</span>
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mt-2 mb-4">
              {data.heading}
            </h2>
            <p className="text-muted-foreground mb-8">
              {data.description}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {data.stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Card className="overflow-hidden rounded-xl shadow-lg">
              <CardContent className="p-0">
                <Image
                  src={data.image}
                  alt="About Us"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  data-ai-hint={data.dataAiHint}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
