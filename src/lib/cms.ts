import Papa from 'papaparse';

// A simple cache to avoid re-fetching the same URL multiple times during a single request.
const cache = new Map<string, any>();

async function fetchAndParseCsv<T>(url: string | undefined): Promise<T[]> {
    if (!url) {
        // Return empty array if URL is not defined, instead of trying to fetch.
        // This prevents errors for optional sheets.
        return [];
    }

    if (cache.has(url)) {
        return Promise.resolve(cache.get(url));
    }

    try {
        const response = await fetch(url, { next: { revalidate: 3600 } }); // Revalidate every hour
        if (!response.ok) {
            // Don't throw, just log the error and return an empty array.
            console.error(`Failed to fetch CSV from ${url}: ${response.status} ${response.statusText}`);
            return [];
        }
        const text = await response.text();
        
        return new Promise<T[]>((resolve, reject) => {
            Papa.parse<T>(text, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (results) => {
                    if (results.errors.length) {
                        console.error("Errors parsing CSV from", url, results.errors);
                        // Resolve with empty array instead of rejecting
                        resolve([]); 
                    } else {
                        cache.set(url, results.data);
                        resolve(results.data);
                    }
                },
                error: (error: Error) => {
                    console.error("PapaParse error:", error);
                    resolve([]); // Resolve with empty array on error
                },
            });
        });
    } catch (error) {
        console.error("Error fetching or parsing CSV:", error);
        return [];
    }
}


// Types based on original data.ts structure
// You should create a Google Sheet with headers matching these fields.

// For Navbar
export type NavLink = {
    href: string;
    label: string;
};
export const getNavLinks = () => fetchAndParseCsv<NavLink>(process.env.GOOGLE_SHEET_NAVLINKS_URL);


// For Hero Section
export type HeroData = {
    title: string;
    subtitle: string;
};
export const getHeroData = async () => {
    const data = await fetchAndParseCsv<HeroData>(process.env.GOOGLE_SHEET_HERO_URL);
    return data[0] || { title: 'Welcome', subtitle: 'Please configure the Hero section in your Google Sheet.' };
};


// For Course Carousel
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
export const getCourseCarouselData = () => fetchAndParseCsv<CourseCarouselData>(process.env.GOOGLE_SHEET_COURSE_CAROUSEL_URL);

// For Main Courses Section
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
export const getCourses = () => fetchAndParseCsv<Course>(process.env.GOOGLE_SHEET_COURSES_URL);

// For About Us Section
export type AboutUsData = {
    title: string;
    heading: string;
    description: string;
    image: string;
    dataAiHint: string;
};
export type AboutUsStat = {
    value: string;
    label: string;
}
export const getAboutUsData = async () => {
    const data = await fetchAndParseCsv<AboutUsData>(process.env.GOOGLE_SHEET_ABOUT_US_URL);
    const stats = await fetchAndParseCsv<AboutUsStat>(process.env.GOOGLE_SHEET_ABOUT_US_STATS_URL);
    const mainData = data[0] || { title: 'About Us', heading: 'Please configure this section', description: 'in your Google Sheet', image: 'https://placehold.co/800x600.png', dataAiHint: 'placeholder'};
    return { 
        ...mainData,
         stats: stats || []
    };
};


// For Testimonials Section
export type Testimonial = {
    id: number;
    name: string;
    role: string;
    quote: string;
    avatar: string;
    dataAiHint: string;
};
export const getTestimonials = () => fetchAndParseCsv<Testimonial>(process.env.GOOGLE_SHEET_TESTIMONIALS_URL);

// For Why Choose Us Section
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
}
export const getWhyChooseUsData = async () => {
    const data = await fetchAndParseCsv<WhyChooseUsData>(process.env.GOOGLE_SHEET_WHY_CHOOSE_US_URL);
    const features = await fetchAndParseCsv<WhyChooseUsFeature>(process.env.GOOGLE_SHEET_WHY_CHOOSE_US_FEATURES_URL);
    const mainData = data[0] || { title: 'Why Choose Us?', subtitle: 'Configure in Google Sheets.' };
    return {
        ...mainData,
        features: features || []
    };
}


// For Footer
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
}
export const getFooterData = async () => {
    const main = await fetchAndParseCsv<FooterData>(process.env.GOOGLE_SHEET_FOOTER_URL);
    const links = await fetchAndParseCsv<FooterLink>(process.env.GOOGLE_SHEET_FOOTER_LINKS_URL);
    const contact = await fetchAndParseCsv<FooterContact>(process.env.GOOGLE_SHEET_FOOTER_CONTACT_URL);

    return {
        main: main[0] || {},
        links: links || [],
        contact: contact[0] || {}
    }
}
