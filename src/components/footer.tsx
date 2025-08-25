import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import type { FooterData } from '@/lib/cms';

export function Footer({ data }: { data: FooterData }) {

  if (!data?.main) return null;
  const { main, links, contact } = data;
  const { description, newsletter_heading, newsletter_placeholder } = main;
  
  const existingHrefs = new Set(links.map(link => link.href));
  const staticLinks = [
      { href: "/about", label: "আমাদের সম্পর্কে" },
      { href: "/contact", label: "যোগাযোগ" },
  ].filter(link => !existingHrefs.has(link.href));

  const allFooterLinks = [...links, ...staticLinks];


  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src={contact.logo_url} alt="SkillShikhun Logo" width={150} height={40} />
            </Link>
            <p className="text-sm text-primary-foreground/80">
              {description}
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
              {allFooterLinks?.map((link, index) => (
                 <li key={`${link.href}-${index}`}><Link href={link.href} className="text-primary-foreground/80 hover:text-primary-foreground">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold font-headline mb-4">যোগাযোগ</h3>
            {contact && (
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>{contact.line1}</li>
                <li>{contact.line2}</li>
                <li>{contact.line3}</li>
                </ul>
            )}
          </div>
          <div>
            <h3 className="font-bold font-headline mb-4">{newsletter_heading}</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">{newsletter_placeholder}</p>
            <form className="flex">
              <input type="email" placeholder="আপনার ইমেইল" className="w-full rounded-l-md px-3 py-2 text-foreground focus:outline-none" />
              <button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-r-md">সাবস্ক্রাইব</button>
            </form>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/80">
          <p>&copy; ২০২৪ SkillShikhun। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
