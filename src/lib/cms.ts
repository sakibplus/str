
// A single spreadsheet is used to manage all the content of the app.
// The spreadsheet is identified by its ID, and each sheet is identified by its GID.
const GOOGLE_SHEET_ID = '11GvjXxj3avIxByflfGPeFbxTzmkHxnErPYQ5H7o_66E';

// Each constant below represents the GID of a sheet in the spreadsheet.
const GID_HOME_PAGE = '0';
const GID_ABOUT_PAGE = '95589139';
const GID_BLOG_PAGE = '1238682855';
const GID_CONTACT_PAGE = '1963283226';
const GID_NAVBAR = '1397233762';
const GID_FOOTER = '2093557174';
const GID_COURSES = '159174154';
const GID_COURSE_CAROUSEL = '1483896503';
const GID_TESTIMONIALS = '1194943323';
const GID_WHY_CHOOSE_US = '1308359531';
const GID_BLOG_POSTS = '1894950942';

/**
 * Fetches and parses a CSV from a public Google Sheet.
 * @param gid The GID of the sheet to fetch.
 * @returns A promise that resolves to an array of objects, where each object represents a row.
 */
async function fetchAndParseCsv(gid: string): Promise<any[]> {
  const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=${gid}`;
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Revalidate every hour
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet with GID ${gid}: ${response.statusText}`);
    }
    const text = await response.text();
    return parseCsvText(text);
  } catch (error) {
    console.error(`Error fetching or parsing CSV for GID ${gid}:`, error);
    return []; // Return empty array on error to prevent crashes
  }
}

/**
 * Parses CSV text into an array of objects.
 * Handles quoted fields containing commas.
 * @param csvText The raw CSV text.
 * @returns An array of objects.
 */
function parseCsvText(csvText: string): any[] {
  const lines = csvText.trim().split(/\r\n|\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    if (values.length === 0) continue;
    
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      let value = values[j] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1).replace(/""/g, '"');
      }
      row[headers[j]] = value;
    }
    data.push(row);
  }
  return data;
}

/**
 * Transforms an array of key-value pairs into a single object.
 * @param data The array of key-value objects.
 * @returns A single object with all the key-value pairs.
 */
function transformKeyValue(data: any[]): Record<string, any> {
  return data.reduce((obj, item) => {
    if (item.key) {
      obj[item.key] = item.value;
    }
    return obj;
  }, {});
}

// Type definitions
export type NavbarData = {
  logo_url: string;
  button_text: string;
};
export type NavLink = {
  href: string;
  label: string;
};
export type HeroData = {
  title: string;
  subtitle: string;
  helpline_text: string;
  phone_number: string;
};
export type CourseCarouselData = {
  id: number;
  title: string;
  image: string;
  dataAiHint: string;
  discountedPrice?: string;
  duration?: string;
  priceSuffix?: string;
};
export type Course = {
  id: number;
  title: string;
  image: string;
  dataAiHint: string;
  duration: string;
  price: string;
  live?: boolean;
  priceSuffix?: string;
  description?: string;
  promoCode?: string;
  details?: { heading: string; points: string[] }[];
};
export type AboutUsSectionData = {
    title: string;
    heading: string;
    description: string;
    image: string;
    dataAiHint: string;
    stats: { value: string; label: string }[];
}
export type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  dataAiHint: string;
};
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
export type FooterLink = {
    label: string;
    href: string;
}
export type FooterData = {
    logo_url: string;
    description: string;
    newsletter_heading: string;
    newsletter_placeholder: string;
    copyright_text: string;
    address_line1: string;
    address_line2: string;
    email: string;
    phone: string;
    links: FooterLink[];
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
export type BlogPageData = {
    hero_title: string;
    hero_subtitle: string;
}
export type ContactPageData = {
    hero_title: string;
    hero_subtitle: string;
    info_title: string;
    info_subtitle: string;
    map_url: string;
    form_title: string;
    form_subtitle: string;
}
export type ContactInfoCard = {
    icon: string;
    title: string;
    value: string;
    link?: string;
}
export type AboutUsData = {
    hero_title: string;
    hero_subtitle: string;
    story_tagline: string;
    story_heading: string;
    story_description_1: string;
    story_description_2: string;
    story_image: string;
    vision_title: string;
    vision_description: string;
    mission_title: string;
    mission_description: string;
    stats_heading: string;
    stats_subheading: string;
    stats: { value: string; label: string }[];
};


// Data fetching functions
export const getNavbarData = async (): Promise<NavbarData> => {
    const data = await fetchAndParseCsv(GID_NAVBAR);
    return transformKeyValue(data);
}
export const getNavLinks = async (): Promise<NavLink[]> => {
    const data = await fetchAndParseCsv(GID_NAVBAR);
    return data.filter(item => item.type === 'link');
};

export const getHeroData = async (): Promise<HeroData> => {
    const data = await fetchAndParseCsv(GID_HOME_PAGE);
    return transformKeyValue(data);
};

export const getCourseCarouselData = async (): Promise<CourseCarouselData[]> => {
    return fetchAndParseCsv(GID_COURSE_CAROUSEL);
}

export const getCourses = async (): Promise<Course[]> => {
    return fetchAndParseCsv(GID_COURSES);
}

export const getCourseById = async (id: number): Promise<Course | undefined> => {
    const allCourses = await fetchAndParseCsv(GID_COURSES);
    const carouselCourses = await fetchAndParseCsv(GID_COURSE_CAROUSEL);
    const courseDetailsData = await fetchAndParseCsv(GID_HOME_PAGE);

    const combined = [...allCourses, ...carouselCourses];
    const course = combined.find(c => c.id.toString() === id.toString());

    if (!course) return undefined;

    // A bit of a hack to get details from the key-value sheet
    const details = courseDetailsData
        .filter(item => item.key && item.key.startsWith(`course_${id}_details_`))
        .reduce((acc, item) => {
            const [, , headingKey, pointIndex] = item.key.split('_');
            const heading = courseDetailsData.find(h => h.key === `course_${id}_heading_${headingKey}`)?.value;
            if (heading) {
                const existing = acc.find(d => d.heading === heading);
                if (existing) {
                    existing.points.push(item.value);
                } else {
                    acc.push({ heading, points: [item.value] });
                }
            }
            return acc;
        }, [] as { heading: string; points: string[] });
        
    return { ...course, details };
}

export const getAboutUsSectionData = async (): Promise<AboutUsSectionData> => {
    const pageData = await fetchAndParseCsv(GID_HOME_PAGE);
    const keyValuePairs = transformKeyValue(pageData);
    
    const stats = pageData
        .filter(item => item.type === 'stat')
        .map(item => ({ value: item.value, label: item.label }));
        
    return {
        title: keyValuePairs.about_title,
        heading: keyValuePairs.about_heading,
        description: keyValuePairs.about_description,
        image: keyValuePairs.about_image,
        dataAiHint: keyValuePairs.about_dataAiHint,
        stats: stats
    };
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
    return fetchAndParseCsv(GID_TESTIMONIALS);
}

export const getWhyChooseUsData = async (): Promise<WhyChooseUsData> => {
    const pageData = await fetchAndParseCsv(GID_WHY_CHOOSE_US);
    const features = pageData.filter(item => item.type === 'feature');
    const texts = transformKeyValue(pageData.filter(item => item.type === 'text'));
    return {
        title: texts.title,
        subtitle: texts.subtitle,
        features: features
    };
}

export const getFooterData = async (): Promise<FooterData> => {
    const data = await fetchAndParseCsv(GID_FOOTER);
    const links = data.filter(item => item.type === 'link');
    const textData = transformKeyValue(data.filter(item => item.type === 'text'));
    return { ...textData, links };
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
    return fetchAndParseCsv(GID_BLOG_POSTS);
}

export const getBlogPageData = async (): Promise<BlogPageData> => {
    const data = await fetchAndParseCsv(GID_BLOG_PAGE);
    return transformKeyValue(data);
}

export const getContactPageData = async (): Promise<ContactPageData> => {
    const data = await fetchAndParseCsv(GID_CONTACT_PAGE);
    return transformKeyValue(data);
}

export const getContactInfoCards = async (): Promise<ContactInfoCard[]> => {
    const data = await fetchAndParseCsv(GID_CONTACT_PAGE);
    return data.filter(item => item.type === 'card');
}

export const getAboutUsData = async (): Promise<AboutUsData> => {
    const data = await fetchAndParseCsv(GID_ABOUT_PAGE);
    const stats = data.filter(item => item.type === 'stat').map(s => ({label: s.label, value: s.value}));
    const pageData = transformKeyValue(data.filter(item => item.type === 'text'));
    return { ...pageData, stats };
}
