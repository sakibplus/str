import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

type Feature = {
  id: number;
  title: string;
  description: string;
  image: string;
  dataAiHint: string;
};

type WhyChooseUsData = {
    title: string;
    subtitle: string;
    features: Feature[];
}

export function WhyChooseUs({ data }: { data: WhyChooseUsData }) {
  return (
    <section id="why-us" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            {data.title}
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.features.map((feature) => (
            <Card key={feature.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden text-center">
              <CardContent className="p-8 flex flex-col items-center justify-center space-y-4">
                <div className="relative h-28 w-28">
                    <Image
                    src={feature.image}
                    alt={feature.title}
                    width={112}
                    height={112}
                    className="object-contain"
                    data-ai-hint={feature.dataAiHint}
                    />
                </div>
                <h3 className="text-xl font-bold font-headline text-primary">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
