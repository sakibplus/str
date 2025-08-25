'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { userAccountCreation } from '@/ai/flows/user-account-creation';
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { href: '#courses', label: 'কোর্সসমূহ' },
  { href: '#about', label: 'আমাদের সম্পর্কে' },
  { href: '#blog', label: 'ব্লগ' },
  { href: '#contact', label: 'যোগাযোগ' },
];

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [relevantInfo, setRelevantInfo] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleLoginToggle = async () => {
    setIsLoading(true);
    const newLoginStatus = !isLoggedIn;

    const tutorialInfo = newLoginStatus
      ? 'User has just logged in. Provide a warm welcome and links to their dashboard and courses.'
      : 'User is logged out. Show them information about why they should create an account and the benefits of our courses.';

    try {
      const result = await userAccountCreation({
        loginStatus: newLoginStatus,
        tutorialInfo: tutorialInfo,
      });
      setRelevantInfo(result.relevantInformation);
      setIsLoggedIn(newLoginStatus);
      toast({
        title: newLoginStatus ? 'সফলভাবে লগইন হয়েছে' : 'সফলভাবে লগআউট হয়েছে',
        description: newLoginStatus
          ? 'SkillShikhun-এ আপনাকে স্বাগতম!'
          : 'আবার আসবেন!',
      });
    } catch (error) {
      console.error('AI call failed', error);
      setRelevantInfo('দুঃখিত, তথ্য আনতে একটি সমস্যা হয়েছে।');
      toast({
        variant: 'destructive',
        title: 'একটি ত্রুটি ঘটেছে',
        description: 'তথ্য আনতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    // Set initial info for logged out state
    const getInitialInfo = async () => {
      setIsLoading(true);
      const tutorialInfo =
        'User is not logged in. Show them information about creating an account.';
      try {
        const result = await userAccountCreation({
          loginStatus: false,
          tutorialInfo: tutorialInfo,
        });
        setRelevantInfo(result.relevantInformation);
      } catch (error) {
        console.error('Initial AI call failed', error);
      } finally {
        setIsLoading(false);
      }
    };
    getInitialInfo();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
           <Image src="/logo.png" alt="SkillShikhun Logo" width={150} height={40} />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
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
           <Button>লগইন করুন</Button>

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
                     <Image src="/logo.png" alt="SkillShikhun Logo" width={150} height={40} />
                  </Link>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
