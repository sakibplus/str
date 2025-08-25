
// This file is the single source of truth for all data in the app.
// It fetches data from Google Sheets CSV URLs defined in environment variables.

import Papa from 'papaparse';

// Helper function to fetch and parse CSV data reliably.
async function fetchAndParseCsv(url: string | undefined, fallback: any[] = []): Promise<any[]> {
  if (!url || !url.startsWith('https://docs.google.com/spreadsheets/d/e/')) {
    console.warn(`Invalid or missing Google Sheet URL. Using fallback data.`);
    return fallback;
  }
  try {
    const response = await fetch(url, { 
        cache: 'no-store',
        // Add a timeout to prevent long waits
        signal: AbortSignal.timeout(5000) 
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch CSV from ${url}: ${response.status} ${response.statusText}`);
      return fallback;
    }

    const text = await response.text();
    
    if (text.trim().startsWith('<!DOCTYPE html>')) {
        console.error(`Failed to fetch CSV from ${url}: Received HTML content. Check sheet's publish settings.`);
        return fallback;
    }

    return new Promise((resolve) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          if (results.errors.length) {
            console.error(`Errors parsing CSV from ${url}:`, results.errors);
            resolve(fallback);
          } else {
            resolve(results.data || fallback);
          }
        },
        error: (error: Error) => {
          console.error(`PapaParse error on URL ${url}:`, error);
          resolve(fallback);
        },
      });
    });
  } catch (error) {
    console.error(`General error fetching or parsing CSV from ${url}:`, error);
    return fallback;
  }
}


export type NavLink = {
    href: string;
    label: string;
};
export const getNavLinks = async (): Promise<NavLink[]> => {
    return fetchAndParseCsv(process.env.GOOGLE_SHEET_NAVLINKS_URL, []);
};


export type HeroData = {
    title: string;
    subtitle: string;
};
export const getHeroData = async (): Promise<HeroData> => {
    const data = await fetchAndParseCsv(process.env.GOOGLE_SHEET_HERO_URL, []);
    return data[0] || { title: 'SkillShikhun', subtitle: 'আপনার দক্ষতা বিকাশে আমাদের পথচলা।' };
};


export type CourseCarouselData = {
    id: number;
    title: string;
    image: string;
    dataAiHint: string;
    price?: string;
    discountedPrice?: string;
    promoCode?: string;
    duration?: string;
    description: string;
};
export const getCourseCarouselData = async (): Promise<CourseCarouselData[]> => {
    return fetchAndParseCsv(process.env.GOOGLE_SHEET_COURSE_CAROUSEL_URL, []);
}


export type Course = {
    id: number;
    title: string;
    image: string;
    dataAiHint: string;
    link: string;
    duration: string;
    price: string;
    live?: boolean;
    priceSuffix?: string;
};
export const getCourses = async (): Promise<Course[]> => {
    return fetchAndParseCsv(process.env.GOOGLE_SHEET_COURSES_URL, []);
}


export type AboutUsData = {
    title: string;
    heading: string;
    description: string;
    image: string;
    dataAiHint: string;
    stats: { value: string; label: string }[];
};
export const getAboutUsData = async (): Promise<AboutUsData> => {
    const aboutUsInfo = await fetchAndParseCsv(process.env.GOOGLE_SHEET_ABOUT_US_URL, []);
    const stats = await fetchAndParseCsv(process.env.GOOGLE_SHEET_ABOUT_US_STATS_URL, []);
    
    const data = aboutUsInfo[0] || {};
    return { ...data, stats: stats };
};


export type Testimonial = {
    id: number;
    name: string;
    role: string;
    quote: string;
    avatar: string;
    dataAiHint: string;
};
export const getTestimonials = async (): Promise<Testimonial[]> => {
    return fetchAndParseCsv(process.env.GOOGLE_SHEET_TESTIMONIALS_URL, []);
}


export type WhyChooseUsFeature = {
    id: number;
    title: string;
    description: string;
    image: string;
    dataAiHint: string;
};
export type WhyChooseUsData = {
    title: string;
    subtitle: string;
    features: WhyChooseUsFeature[];
}
export const getWhyChooseUsData = async (): Promise<WhyChooseUsData> => {
    const whyChooseUsInfo = await fetchAndParseCsv(process.env.GOOGLE_SHEET_WHY_CHOOSE_US_URL, []);
    const features = await fetchAndParseCsv(process.env.GOOGLE_SHEET_WHY_CHOOSE_US_FEATURES_URL, []);

    const data = whyChooseUsInfo[0] || {};
    return { ...data, features: features };
}


export type FooterLink = {
    label: string;
    href: string;
}
export type FooterContact = {
    line1: string;
    line2: string;
    line3: string;
}
export type FooterData = {
    description: string;
    newsletter_heading: string;
    newsletter_placeholder: string;
    links: FooterLink[];
    contact: FooterContact;
}
export const getFooterData = async (): Promise<FooterData> => {
    const footerInfo = await fetchAndParseCsv(process.env.GOOGLE_SHEET_FOOTER_URL, []);
    const links = await fetchAndParseCsv(process.env.GOOGLE_SHEET_FOOTER_LINKS_URL, []);
    const contactInfo = await fetchAndParseCsv(process.env.GOOGLE_SHEET_FOOTER_CONTACT_URL, []);

    const mainData = footerInfo[0] || {};
    const contactData = contactInfo[0] || {};

    return { 
        ...mainData, 
        links: links, 
        contact: contactData
    };
}
