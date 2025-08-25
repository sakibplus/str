import Link from 'next/link';
import { Book, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Book className="h-8 w-8" />
              <span className="text-2xl font-bold font-headline">
                রঙিনবাড়ি আইটি
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/80">
              আপনার দক্ষতা বিকাশে আমাদের পথচলা।
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
              <li><Link href="#about" className="text-primary-foreground/80 hover:text-primary-foreground">আমাদের সম্পর্কে</Link></li>
              <li><Link href="#courses" className="text-primary-foreground/80 hover:text-primary-foreground">আমাদের কোর্স</Link></li>
              <li><Link href="#blog" className="text-primary-foreground/80 hover:text-primary-foreground">ব্লগ</Link></li>
              <li><Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">গোপনীয়তা নীতি</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold font-headline mb-4">যোগাযোগ</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>ঢাকা, বাংলাদেশ</li>
              <li>info@ronginbariit.com</li>
              <li>+880 1234 567890</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold font-headline mb-4">নিউজলেটার</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">আমাদের নিউজলেটারে সাবস্ক্রাইব করে নতুন কোর্স এবং অফার সম্পর্কে জানুন।</p>
            <form className="flex">
              <input type="email" placeholder="আপনার ইমেইল" className="w-full rounded-l-md px-3 py-2 text-foreground focus:outline-none" />
              <button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-r-md">সাবস্ক্রাইব</button>
            </form>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/80">
          <p>&copy; ২০২৪ রঙিনবাড়ি আইটি। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
