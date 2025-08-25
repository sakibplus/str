'use server';

// This file is the single source of truth for all data in the app.
// It fetches data from Google Sheets CSV URLs defined in environment variables.

import {
  GOOGLE_SHEET_NAVLINKS_URL,
  GOOGLE_SHEET_HERO_URL,
  GOOGLE_SHEET_COURSE_CAROUSEL_URL,
  GOOGLE_SHEET_COURSES_URL,
  GOOGLE_SHEET_ABOUT_US_URL,
  GOOGLE_SHEET_ABOUT_US_STATS_URL,
  GOOGLE_SHEET_TESTIMONIALS_URL,
  GOOGLE_SHEET_WHY_CHOOSE_US_URL,
  GOOGLE_SHEET_WHY_CHOOSE_US_FEATURES_URL,
  GOOGLE_SHEET_FOOTER_URL,
  GOOGLE_SHEET_FOOTER_LINKS_URL,
  GOOGLE_SHEET_FOOTER_CONTACT_URL,
} from './env';

// A simple, dependency-free CSV parser.
function parseCsvText(text: string): Record<string, any>[] {
    const lines = text.trim().split(/\r\n|\n/);
    if (lines.length < 2) return [];

    const header = lines[0].split(',').map(h => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length !== header.length) continue; // Skip malformed rows

        const rowObject: Record<string, any> = {};
        for (let j = 0; j < header.length; j++) {
            const key = header[j];
            const value = values[j];
            
            // Basic type conversion
            if (!isNaN(Number(value)) && value.trim() !== '') {
                rowObject[key] = Number(value);
            } else if (value.toLowerCase() === 'true') {
                rowObject[key] = true;
            } else if (value.toLowerCase() === 'false') {
                rowObject[key] = false;
            } else {
                rowObject[key] = value.replace(/^"|"$/g, ''); // Remove quotes
            }
        }
        data.push(rowObject);
    }
    return data;
}


// Helper function to fetch and parse CSV data reliably.
async function fetchAndParseCsv(url: string | undefined, fallback: any, sheetName: string): Promise<any> {
  if (!url || !url.startsWith('https://docs.google.com/spreadsheets/d/e/')) {
    console.warn(`Invalid or missing Google Sheet URL for ${sheetName}. Using fallback data.`);
    return fallback;
  }
  
  try {
    const response = await fetch(url, { 
        cache: 'no-store', // Ensures fresh data on every request
        next: { revalidate: 0 } // Revalidate cache every 0 seconds
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch CSV for ${sheetName} from ${url}: ${response.status} ${response.statusText}`);
      return fallback;
    }

    const text = await response.text();
    
    if (text.trim().toLowerCase().includes('<!doctype html>')) {
        console.error(`Failed to fetch CSV for ${sheetName}: Received HTML content. Please check the Google Sheet's 'Publish to the web' settings.`);
        return fallback;
    }
    
    const parsedData = parseCsvText(text);

    if (!parsedData || parsedData.length === 0) {
        console.warn(`CSV for ${sheetName} is empty or invalid after parsing. Using fallback.`);
        return fallback;
    }
    
    return parsedData;

  } catch (error) {
    console.error(`General error fetching or parsing CSV for ${sheetName} from ${url}:`, error);
    return fallback;
  }
}

// Helper function to transform key-value pair array into an object
function transformKeyValue(data: any, fallback: any): any {
    const dataArray = Array.isArray(data) ? data : (data ? [data] : []);
    if (dataArray.length === 0) return fallback;
    return dataArray.reduce((obj, item) => {
        if (item && typeof item === 'object' && item.key) {
            obj[item.key] = item.value;
        }
        return obj;
    }, {});
}


export type NavLink = {
    href: string;
    label: string;
};
export const getNavLinks = async (): Promise<NavLink[]> => {
    const fallback: NavLink[] = [
        { href: '#', label: 'ন্যাভলিঙ্ক (ফলব্যাক)' },
    ];
    const data = await fetchAndParseCsv(GOOGLE_SHEET_NAVLINKS_URL, fallback, 'NavLinks');
    return Array.isArray(data) && data.length > 0 ? data : fallback;
};


export type HeroData = {
    title: string;
    subtitle: string;
};
export const getHeroData = async (): Promise<HeroData> => {
    const fallback: HeroData = { title: 'হিরো টাইটেল (ফলব্যাক)', subtitle: 'হিরো সাবটাইটেল (ফলব্যাক)।' };
    const data = await fetchAndParseCsv(GOOGLE_SHEET_HERO_URL, [fallback], 'Hero');
    const transformedData = transformKeyValue(data, fallback);
    return {
        title: transformedData.title || fallback.title,
        subtitle: transformedData.subtitle || fallback.subtitle,
    };
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
    const fallback: CourseCarouselData[] = [];
    const data = await fetchAndParseCsv(GOOGLE_SHEET_COURSE_CAROUSEL_URL, fallback, 'CourseCarousel');
    return Array.isArray(data) ? data : fallback;
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
    const fallback: Course[] = [];
    const data = await fetchAndParseCsv(GOOGLE_SHEET_COURSES_URL, fallback, 'Courses');
    return Array.isArray(data) ? data : fallback;
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
    const fallback = {
        title: "আমরা কারা? (ফলব্যাক)",
        heading: "আপনার সফলতার পথে, আমরা আপনার বিশ্বস্ত সঙ্গী।",
        description: "SkillShikhun একটি শীর্ষস্থানীয় আইটি প্রশিক্ষণ কেন্দ্র...",
        image: "https://placehold.co/800x600.png",
        dataAiHint: "team meeting",
        stats: [],
    };
    const aboutUsInfo = await fetchAndParseCsv(GOOGLE_SHEET_ABOUT_US_URL, [], 'AboutUsInfo');
    const stats = await fetchAndParseCsv(GOOGLE_SHEET_ABOUT_US_STATS_URL, [], 'AboutUsStats');
    
    const transformedData = transformKeyValue(aboutUsInfo, fallback);

    return {
        title: transformedData.title || fallback.title,
        heading: transformedData.heading || fallback.heading,
        description: transformedData.description || fallback.description,
        image: transformedData.image || fallback.image,
        dataAiHint: transformedData.dataAiHint || fallback.dataAiHint,
        stats: Array.isArray(stats) && stats.length > 0 ? stats : fallback.stats,
    };
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
    const fallback: Testimonial[] = [];
    const data = await fetchAndParseCsv(GOOGLE_SHEET_TESTIMONIALS_URL, fallback, 'Testimonials');
    return Array.isArray(data) ? data : fallback;
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
    const fallback = {
        title: "স্কিলশিখুন কেন বেছে নেবেন? (ফলব্যাক)",
        subtitle: "ফিচারগুলো দেখে নিন!",
        features: []
    }
    const whyChooseUsInfo = await fetchAndParseCsv(GOOGLE_SHEET_WHY_CHOOSE_US_URL, [], 'WhyChooseUsInfo');
    const features = await fetchAndParseCsv(GOOGLE_SHEET_WHY_CHOOSE_US_FEATURES_URL, [], 'WhyChooseUsFeatures');

    const transformedData = transformKeyValue(whyChooseUsInfo, fallback);

    return { 
        title: transformedData.title || fallback.title,
        subtitle: transformedData.subtitle || fallback.subtitle,
        features: Array.isArray(features) && features.length > 0 ? features : fallback.features 
    };
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
    main: {
      description: string;
      newsletter_heading: string;
      newsletter_placeholder: string;
    };
    links: FooterLink[];
    contact: FooterContact;
}
export const getFooterData = async (): Promise<FooterData> => {
     const fallback: FooterData = {
        main: {
            description: "আপনার দক্ষতা বিকাশে আমাদের পথচলা। (ফলব্যাক)",
            newsletter_heading: "নিউজলেটার",
            newsletter_placeholder: "আমাদের নিউজলেটারে সাবস্ক্রাইব করুন।",
        },
        links: [],
        contact: { line1: "ঢাকা, বাংলাদেশ", line2: "info@skillshikhun.com", line3: "+8801234567890" }
    };
    const footerInfo = await fetchAndParseCsv(GOOGLE_SHEET_FOOTER_URL, [], 'FooterInfo');
    const links = await fetchAndParseCsv(GOOGLE_SHEET_FOOTER_LINKS_URL, [], 'FooterLinks');
    const contactInfo = await fetchAndParseCsv(GOOGLE_SHEET_FOOTER_CONTACT_URL, [], 'FooterContact');

    const mainData = transformKeyValue(footerInfo, fallback.main);
    const contactData = transformKeyValue(contactInfo, fallback.contact);
    
    return { 
        main: {
            description: mainData.description || fallback.main.description,
            newsletter_heading: mainData.newsletter_heading || fallback.main.newsletter_heading,
            newsletter_placeholder: mainData.newsletter_placeholder || fallback.main.newsletter_placeholder,
        },
        links: Array.isArray(links) && links.length > 0 ? links : fallback.links,
        contact: {
            line1: contactData.line1 || fallback.contact.line1,
            line2: contactData.line2 || fallback.contact.line2,
            line3: contactData.line3 || fallback.contact.line3,
        }
    };
}
