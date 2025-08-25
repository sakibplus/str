
// This file is the single source of truth for all data in the app.
// It fetches data from Google Sheets CSV URLs defined in environment variables.

import Papa from 'papaparse';

// Helper function to fetch and parse CSV data reliably.
async function fetchAndParseCsv(url: string | undefined, fallback: any, sheetName: string): Promise<any> {
  if (!url || !url.startsWith('https://docs.google.com/spreadsheets/d/e/')) {
    console.warn(`Invalid or missing Google Sheet URL for ${sheetName}. Using fallback data.`);
    return fallback;
  }
  try {
    const response = await fetch(url, { 
        cache: 'no-store',
        // Add a timeout to prevent long waits
        signal: AbortSignal.timeout(5000) 
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch CSV for ${sheetName} from ${url}: ${response.status} ${response.statusText}`);
      return fallback;
    }

    const text = await response.text();
    
    // Check if the content is HTML, which indicates a permissions or publishing error on the Sheet.
    if (text.trim().toLowerCase().includes('<!doctype html>')) {
        console.error(`Failed to fetch CSV for ${sheetName}: Received HTML content. Please check the Google Sheet's 'Publish to the web' settings.`);
        return fallback;
    }

    return new Promise((resolve) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: 'greedy',
        dynamicTyping: true,
        complete: (results) => {
          if (results.errors.length) {
            console.error(`Errors parsing CSV for ${sheetName} from ${url}:`, results.errors);
            resolve(fallback);
          } else {
             // If results.data is empty or just contains an empty object, use fallback
             if (!results.data || results.data.length === 0 || (results.data.length === 1 && Object.keys(results.data[0] as object).length === 0) ) {
                console.warn(`CSV for ${sheetName} is empty or invalid. Using fallback.`);
                resolve(fallback);
             } else {
                resolve(results.data);
             }
          }
        },
        error: (error: Error) => {
          console.error(`PapaParse error on URL ${url} for ${sheetName}:`, error);
          resolve(fallback);
        },
      });
    });
  } catch (error) {
    console.error(`General error fetching or parsing CSV for ${sheetName} from ${url}:`, error);
    return fallback;
  }
}


export type NavLink = {
    href: string;
    label: string;
};
export const getNavLinks = async (): Promise<NavLink[]> => {
    const fallback: NavLink[] = [
        { href: '/course/2', label: 'ওয়েব ডেভেলপমেন্ট (ফলব্যাক)' },
        { href: '/course/4', label: 'গ্রাফিক্স ডিজাইন (ফলব্যাক)' },
    ];
    const data = await fetchAndParseCsv(process.env.GOOGLE_SHEET_NAVLINKS_URL, fallback, 'NavLinks');
    return Array.isArray(data) ? data : fallback;
};


export type HeroData = {
    title: string;
    subtitle: string;
};
export const getHeroData = async (): Promise<HeroData> => {
    const fallback: HeroData = { title: 'SkillShikhun (ফলব্যাক)', subtitle: 'আপনার দক্ষতা বিকাশে আমাদের পথচলা।' };
    const data = await fetchAndParseCsv(process.env.GOOGLE_SHEET_HERO_URL, [fallback], 'Hero');
    return (Array.isArray(data) && data.length > 0) ? data[0] : fallback;
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
    const data = await fetchAndParseCsv(process.env.GOOGLE_SHEET_COURSE_CAROUSEL_URL, fallback, 'CourseCarousel');
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
    const data = await fetchAndParseCsv(process.env.GOOGLE_SHEET_COURSES_URL, fallback, 'Courses');
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
    const aboutUsInfo = await fetchAndParseCsv(process.env.GOOGLE_SHEET_ABOUT_US_URL, [fallback], 'AboutUsInfo');
    const stats = await fetchAndParseCsv(process.env.GOOGLE_SHEET_ABOUT_US_STATS_URL, [], 'AboutUsStats');
    
    const data = (Array.isArray(aboutUsInfo) && aboutUsInfo.length > 0) ? aboutUsInfo[0] : fallback;
    return { ...data, stats: Array.isArray(stats) ? stats : [] };
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
    const data = await fetchAndParseCsv(process.env.GOOGLE_SHEET_TESTIMONIALS_URL, fallback, 'Testimonials');
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
    const whyChooseUsInfo = await fetchAndParseCsv(process.env.GOOGLE_SHEET_WHY_CHOOSE_US_URL, [fallback], 'WhyChooseUsInfo');
    const features = await fetchAndParseCsv(process.env.GOOGLE_SHEET_WHY_CHOOSE_US_FEATURES_URL, [], 'WhyChooseUsFeatures');

    const data = (Array.isArray(whyChooseUsInfo) && whyChooseUsInfo.length > 0) ? whyChooseUsInfo[0] : fallback;
    return { ...data, features: Array.isArray(features) ? features : [] };
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
    const footerInfo = await fetchAndParseCsv(process.env.GOOGLE_SHEET_FOOTER_URL, [fallback.main], 'FooterInfo');
    const links = await fetchAndParseCsv(process.env.GOOGLE_SHEET_FOOTER_LINKS_URL, [], 'FooterLinks');
    const contactInfo = await fetchAndParseCsv(process.env.GOOGLE_SHEET_FOOTER_CONTACT_URL, [fallback.contact], 'FooterContact');

    const mainData = (Array.isArray(footerInfo) && footerInfo.length > 0) ? footerInfo[0] : fallback.main;
    const contactData = (Array.isArray(contactInfo) && contactInfo.length > 0) ? contactInfo[0] : fallback.contact;

    return { 
        main: mainData,
        links: Array.isArray(links) ? links : [], 
        contact: contactData
    };
}
