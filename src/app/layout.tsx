import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Hind_Siliguri } from 'next/font/google';
import { BackToTopButton } from '@/components/back-to-top-button';
import { TopBanner } from '@/components/top-banner';
import { getTopBannerData } from '@/lib/cms';

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-hind-siliguri',
});

export const metadata: Metadata = {
  title: 'SkillShikhun',
  description: 'আপনার দক্ষতা বিকাশে আমাদের পথচলা।',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const topBannerData = await getTopBannerData();

  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          hindSiliguri.variable
        )}
      >
        <TopBanner data={topBannerData} />
        {children}
        <Toaster />
        <BackToTopButton />
      </body>
    </html>
  );
}
