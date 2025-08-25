import { Megaphone } from 'lucide-react';

export function HeaderAd() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto flex h-10 items-center justify-center px-4 text-sm">
        <Megaphone className="mr-2 h-4 w-4" />
        <span>
          বিশেষ ছাড়! আমাদের সকল কোর্সে ৩০% ছাড় চলছে। এখনই ভর্তি হোন!
        </span>
      </div>
    </div>
  );
}
