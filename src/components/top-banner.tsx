'use client';
import { X } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

export function TopBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-purple-800 text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <div>
                    <h3 className="font-bold text-lg">স্কিলশিখুনের সকল কোর্স ৯৯৯ টাকা <span className="text-yellow-400 text-sm">প্রতি মাস</span></h3>
                    <p className="text-sm">অফার শেষ হচ্ছে অতি শীঘ্রই</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 border-r pr-4">
                    <span className="text-sm">PROMO CODE</span>
                    <span className="font-bold bg-white text-purple-900 px-2 py-1 rounded">SKILL999</span>
                </div>
                <div className="hidden md:block">
                     <span className="font-bold text-yellow-400 text-lg">SUPER <span className="bg-yellow-400 text-purple-900 px-2 py-1 rounded-full">SALE</span></span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)} className="hover:bg-white/20">
                    <X className="h-5 w-5" />
                </Button>
            </div>
        </div>
    </div>
  );
}
