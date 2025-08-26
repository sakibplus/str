import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import type { FooterData } from '@/lib/types';

export function Footer({ data }: { data: FooterData }) {

  if (!data?.description) return null;

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src={data.logo_url} alt="SkillShikhun Logo" width={150} height={40} />
            </Link>
            <p className="text-sm text-primary-foreground/80">
              {data.description}
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold font-headline mb-4">গুরুত্বপূর্ণ লিংক</h3>
            <ul className="space-y-2 text-sm">
              {data.links?.map((link, index) => (
                 <li key={`${link.href}-${index}`}><Link href={link.href} className="text-primary-foreground/80 hover:text-primary-foreground">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold font-headline mb-4">যোগাযোগ</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>{data.address_line1}</li>
              <li>{data.address_line2}</li>
              <li>{data.email}</li>
              <li>{data.phone}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold font-headline mb-4">{data.newsletter_heading}</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">{data.newsletter_placeholder}</p>
            <form className="flex">
              <input type="email" placeholder="আপনার ইমেইল" className="w-full rounded-l-md px-3 py-2 text-foreground focus:outline-none" />
              <button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-r-md">সাবস্ক্রাইব</button>
            </form>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/80">
          <p>{data.copyright_text}</p>
        </div>
      </div>
    </footer>
  );
}
