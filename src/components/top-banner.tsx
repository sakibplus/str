'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { TopBannerData } from '@/lib/types';

export function TopBanner({ data }: { data: TopBannerData }) {
  const [isVisible, setIsVisible] = useState(data.enabled);

  useEffect(() => {
    // Show banner based on initial data from server
    setIsVisible(data.enabled);
  }, [data.enabled]);

  if (!isVisible) {
    return null;
  }

  return (
    <div id="top-banner" className="bg-purple-800 text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <div>
                    <h3 className="font-bold text-lg">{data.title} <span className="text-yellow-400 text-sm">প্রতি মাস</span></h3>
                    <p className="text-sm">{data.subtitle}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 border-r pr-4">
                    <span className="text-sm">{data.promo_code_label}</span>
                    <span className="font-bold bg-white text-purple-900 px-2 py-1 rounded">{data.promo_code}</span>
                </div>
                <div className="hidden md:block">
                     <span className="font-bold text-yellow-400 text-lg">{data.sale_text_1} <span className="bg-yellow-400 text-purple-900 px-2 py-1 rounded-full">{data.sale_text_2}</span></span>
                </div>
                <button 
                    type="button" 
                    className="p-2 rounded-full hover:bg-white/20"
                    aria-label="Close banner"
                    onClick={() => setIsVisible(false)}
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    </div>
  );
}
