'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { NavLink, NavbarData } from '@/lib/cms';
import { ServiceInquiryDialog } from './service-inquiry-dialog';
import type { Course } from '@/lib/cms';


export function Navbar({ navLinks, data, courses }: { navLinks: NavLink[], data: NavbarData, courses: Course[] }) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const allNavLinks = [
    ...navLinks,
    { href: "/about", label: "আমাদের সম্পর্কে" },
    { href: "/contact", label: "যোগাযোগ" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={data.logo_url}
            alt="SkillShikhun Logo"
            width={120}
            height={32}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {allNavLinks?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button 
             className="hidden md:flex bg-accent text-white hover:bg-accent/90"
             onClick={() => setIsDialogOpen(true)}
          >
            সার্ভিস নিন
          </Button>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <Link href="/" className="flex items-center gap-2 mb-4">
                    <Image
                      src={data.logo_url}
                      alt="SkillShikhun Logo"
                      width={150}
                      height={40}
                    />
                  </Link>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                  {allNavLinks?.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                   <Button 
                    className="bg-accent text-white hover:bg-accent/90"
                    onClick={() => setIsDialogOpen(true)}
                   >
                     সার্ভিস নিন
                   </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <ServiceInquiryDialog 
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        courses={courses}
      />
    </header>
  );
}
