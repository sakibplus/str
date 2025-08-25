'use server';

// This file is the single source of truth for all data in the app.
// It fetches data from Google Sheets CSV URLs.

// URLs are hardcoded to bypass potential .env caching issues on some platforms.
const GOOGLE_SHEET_NAVLINKS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=0&single=true&output=csv";
const GOOGLE_SHEET_HERO_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=1013684368&single=true&output=csv"; // Also used for Navbar Data
const GOOGLE_SHEET_COURSE_CAROUSEL_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=1532617770&single=true&output=csv";
const GOOGLE_SHEET_COURSES_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=1672836539&single=true&output=csv";
const GOOGLE_SHEET_INQUIRY_COURSES_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=1672836539&single=true&output=csv"; // Using same as courses for now, user should change this
const GOOGLE_SHEET_ABOUT_US_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=1619751893&single=true&output=csv";
const GOOGLE_SHEET_ABOUT_US_STATS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=338665560&single=true&output=csv";
const GOOGLE_SHEET_TESTIMONIALS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=1600324589&single=true&output=csv";
const GOOGLE_SHEET_WHY_CHOOSE_US_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=1563300107&single=true&output=csv";
const GOOGLE_SHEET_WHY_CHOOSE_US_FEATURES_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=312235772&single=true&output=csv";
const GOOGLE_SHEET_FOOTER_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=2041864803&single=true&output=csv";
const GOOGLE_SHEET_FOOTER_LINKS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=1301954674&single=true&output=csv";
const GOOGLE_SHEET_FOOTER_CONTACT_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=1357018130&single=true&output=csv";
const GOOGLE_SHEET_BLOG_POSTS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=90967797&single=true&output=csv";
const GOOGLE_SHEET_CONTACT_PAGE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=215761925&single=true&output=csv";
// IMPORTANT: You need to create a new sheet for the contact info cards and update the GID in the URL below.
const GOOGLE_SHEET_CONTACT_INFO_CARDS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQzae0RQCcwOu5HBrAFbwffnkPKkuXrSp7bkUVhyo4lq4HfA5iGzi1_RTS9fZgbPfVaxt3eUDnh0ZV/pub?gid=215761925&single=true&output=csv";


// A robust, dependency-free CSV parser.
function parseCsvText(csvText: string): Record<string, any>[] {
    const lines = csvText.trim().split(/\r\n|\n/);
    if (lines.length < 2) return [];

    const header = lines[0].split(',').map(h => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const row: { [key: string]: any } = {};
        let currentLine = lines[i];
        
        // This regex handles quoted fields, including those with commas inside.
        const values = currentLine.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
        
        if (values.length !== header.length) {
             // Fallback for simple comma split if regex fails
             const simpleValues = currentLine.split(',');
             for (let j = 0; j < header.length; j++) {
                let value = simpleValues[j]?.trim();
                const key = header[j];
                
                if (typeof value === 'string') {
                    if (!isNaN(Number(value)) && value.trim() !== '') {
                        row[key] = Number(value);
                    } else if (value.toLowerCase() === 'true') {
                        row[key] = true;
                    } else if (value.toLowerCase() === 'false') {
                        row[key] = false;
                    } else {
                        row[key] = value.replace(/^"|"$/g, '');
                    }
                } else {
                    row[key] = value;
                }
             }
        } else {
            for (let j = 0; j < header.length; j++) {
                let value = values[j]?.trim();
                const key = header[j];

                if (typeof value === 'string') {
                    if (!isNaN(Number(value)) && value.trim() !== '') {
                        row[key] = Number(value);
                    } else if (value.toLowerCase() === 'true') {
                        row[key] = true;
                    } else if (value.toLowerCase() === 'false') {
                        row[key] = false;
                    } else {
                        row[key] = value.replace(/^"|"$/g, '');
                    }
                } else {
                    row[key] = value;
                }
            }
        }
        data.push(row);
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


export type NavbarData = {
    logo_url: string;
    button_text: string;
}
export const getNavbarData = async (): Promise<NavbarData> => {
    const fallback: NavbarData = { logo_url: '/logo.png', button_text: 'সার্ভিস নিন' };
    const data = await fetchAndParseCsv(GOOGLE_SHEET_HERO_URL, [fallback], 'NavbarData');
    const transformedData = transformKeyValue(data, fallback);
    return {
        logo_url: transformedData.logo_url || fallback.logo_url,
        button_text: transformedData.button_text || fallback.button_text,
    };
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
    priceSuffix?: string;
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


export const getInquiryCourses = async (): Promise<Course[]> => {
    const fallback: Course[] = [];
    const data = await fetchAndParseCsv(GOOGLE_SHEET_INQUIRY_COURSES_URL, fallback, 'InquiryCourses');
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
    logo_url: string;
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
        contact: { line1: "ঢাকা, বাংলাদেশ", line2: "info@skillshikhun.com", line3: "+8801234567890", logo_url: '/logo-white.png' }
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
            logo_url: contactData.logo_url || fallback.contact.logo_url,
        }
    };
}


export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  dataAiHint: string;
  date: string;
  author: string;
  author_avatar: string;
  content: string;
};
export const getBlogPosts = async (): Promise<BlogPost[]> => {
    const fallback: BlogPost[] = [];
    const data = await fetchAndParseCsv(GOOGLE_SHEET_BLOG_POSTS_URL, fallback, 'BlogPosts');
    return Array.isArray(data) ? data : fallback;
}

export type ContactPageData = {
    hero_title: string;
    hero_subtitle: string;
    form_title: string;
    form_subtitle: string;
}
export const getContactPageData = async (): Promise<ContactPageData> => {
    const fallback: ContactPageData = {
        hero_title: "যোগাযোগ করুন (ফলব্যাক)",
        hero_subtitle: "আপনার যেকোনো প্রশ্ন, পরামর্শ বা সহযোগিতার জন্য আমরা সর্বদা প্রস্তুত।",
        form_title: "আমাদের মেসেজ পাঠান (ফলব্যাক)",
        form_subtitle: "আমরা আপনার বার্তার অপেক্ষায় আছি।",
    };
    const data = await fetchAndParseCsv(GOOGLE_SHEET_CONTACT_PAGE_URL, [fallback], 'ContactPageData');
    const transformedData = transformKeyValue(data, fallback);
    return {
        hero_title: transformedData.hero_title || fallback.hero_title,
        hero_subtitle: transformedData.hero_subtitle || fallback.hero_subtitle,
        form_title: transformedData.form_title || fallback.form_title,
        form_subtitle: transformedData.form_subtitle || fallback.form_subtitle,
    };
}

export type ContactInfoCard = {
    icon: string;
    title: string;
    value: string;
    link?: string;
}
export const getContactInfoCards = async (): Promise<ContactInfoCard[]> => {
    const fallback: ContactInfoCard[] = [];
    const data = await fetchAndParseCsv(GOOGLE_SHEET_CONTACT_INFO_CARDS_URL, fallback, 'ContactInfoCards');
    return Array.isArray(data) ? data : fallback;
}
