import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Hind_Siliguri } from 'next/font/google';

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-hind-siliguri',
});

export const metadata: Metadata = {
  title: 'SkillShikhun',
  description: 'আপনার দক্ষতা বিকাশে আমাদের পথচলা।',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          hindSiliguri.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
