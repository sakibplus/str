
// This file is the single source of truth for all data in the app.
// You can edit the data here, and it will be reflected on the website.

export const navLinks = [
    { href: '/course/2', label: 'ওয়েব ডেভেলপমেন্ট' },
    { href: '/course/4', label: 'গ্রাফিক্স ডিজাইন' },
    { href: '#about', label: 'আমাদের সম্পর্কে' },
    { href: '#courses', label: 'আমাদের কোর্স' },
    { href: '#testimonials', label: 'শিক্ষার্থীদের মতামত' },
    { href: '#contact', label: 'যোগাযোগ' },
];


// For Hero Section
export type HeroData = {
    title: string;
    subtitle: string;
};
export const getHeroData = async (): Promise<HeroData> => {
    return {
      title: 'স্কিল শিখুন এর হাত ধরে শিখুন ঘরে বসে আয় করার মাধ্যম!',
      subtitle: 'সাশ্রয়ী মূল্যে ঘরে বসে লাইভ ক্লাস করুন ইন্সট্রাক্টর এর সাথে!',
    };
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
export const getCourseCarouselData = async (): Promise<CourseCarouselData[]> => {
    return [
        {
            id: 1,
            title: 'ফ্রিল্যান্সিং কমপ্লিট গাইডলাইন',
            image: '/images/carousel-1.png',
            dataAiHint: 'freelancing guide instructor',
            description: 'ফ্রিল্যান্সিং করে কিভাবে সফল হবেন তার পূর্ণাঙ্গ গাইডলাইন। মার্কেটপ্লেস পরিচিতি, কাজ পাওয়ার উপায় এবং ক্লায়েন্ট ম্যানেজমেন্ট শিখুন।',
        },
        {
            id: 2,
            title: 'ওয়েব ডেভেলপমেন্ট',
            image: '/images/carousel-2.png',
            dataAiHint: 'web development instructor',
            price: "১,৫০০",
            discountedPrice: "৯৯৯",
            promoCode: "SKILL999",
            duration: "৩ মাসের কোর্স",
            description: 'সম্পূর্ণ নতুনদের জন্য ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট। HTML, CSS, JavaScript, React, এবং Node.js শিখে একজন প্রফেশনাল ডেভেলপার হোন।',
        },
        {
            id: 3,
            title: 'ভিডিও এডিটিং',
            image: '/images/carousel-3.png',
            dataAiHint: 'video editing instructor',
            price: "১,৫০০",
            discountedPrice: "৯৯৯",
            promoCode: "SKILL999",
            duration: "২ মাসের কোর্স",
            description: 'অ্যাডোবি প্রিমিয়ার প্রো এবং আফটার ইফেক্টস ব্যবহার করে প্রফেশনাল ভিডিও এডিটিং শিখুন। ইউটিউবিং, শর্ট ফিল্ম এবং কমার্শিয়াল প্রজেক্টের জন্য নিজেকে তৈরি করুন।',
        },
        {
            id: 4,
            title: 'গ্রাফিক ডিজাইন',
            image: '/images/carousel-4.png',
            dataAiHint: 'graphic design instructor',
            price: "১,৫০০",
            discountedPrice: "৯৯৯",
            promoCode: "SKILL999",
            duration: "৩ মাসের কোর্স",
            description: 'অ্যাডোবি ফটোশপ এবং ইলাস্ট্রেটর দিয়ে আকর্ষণীয় ডিজাইন তৈরি করুন। লোগো, ব্র্যান্ডিং, সোশ্যাল মিডিয়া পোস্ট এবং আরও অনেক কিছু শিখুন।',
        },
        {
            id: 5,
            title: 'ডিজিটাল মার্কেটিং',
            image: '/images/carousel-5.png',
            dataAiHint: 'digital marketing instructor',
            price: "১,৫০০",
            discountedPrice: "৯৯৯",
            promoCode: "SKILL999",
            duration: "২ মাসের কোর্স",
            description: 'সোশ্যাল মিডিয়া মার্কেটিং, এসইও, ইমেইল মার্কেটিং এবং কনটেন্ট মার্কেটিং এর মাধ্যমে যেকোনো ব্যবসাকে অনলাইন প্ল্যাটফর্মে সফল করুন।',
        }
    ];
}


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
export const getCourses = async (): Promise<Course[]> => {
    return [
      {
        id: 1,
        title: 'সবার জন্য ফ্রিল্যান্সিং',
        image: '/images/freelancing.jpg',
        dataAiHint: 'freelancing course',
        link: '/course/1',
        duration: '৭ দিনের',
        price: '৭৫০',
        live: true,
      },
      {
        id: 2,
        title: 'ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট',
        image: '/images/web-development-course.png',
        dataAiHint: 'web development course',
        link: '/course/2',
        duration: '৩ মাসের',
        price: '১৫০০',
        live: true,
        priceSuffix: 'প্রতি মাস',
      },
      {
        id: 5,
        title: 'ডিজিটাল মার্কেটিং',
        image: '/images/digital-marketing-course-2.png',
        dataAiHint: 'digital marketing course',
        link: '/course/5',
        duration: '২ মাসের',
        price: '১৫০০',
        live: true,
        priceSuffix: 'প্রতি মাস',
      },
      {
        id: 4,
        title: 'গ্রাফিক্স ডিজাইন',
        image: '/images/graphic-design-course.png',
        dataAiHint: 'graphic design course',
        link: '/course/4',
        duration: '৩ মাসের',
        price: '১৫০০',
        live: true,
        priceSuffix: 'প্রতি মাস',
      },
      {
        id: 6,
        title: 'সিসি ক্যামেরা সেটআপ',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'cctv camera',
        link: '/course/6',
        duration: '১ মাসের',
        price: '১০০০',
        live: true,
        priceSuffix: 'প্রতি মাস',
      },
      {
        id: 7,
        title: 'অফিস অ্যাপ্লিকেশন কোর্স',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'office software',
        link: '/course/7',
        duration: '২ মাসের',
        price: '১২০০',
        live: true,
        priceSuffix: 'প্রতি মাস',
      },
    ];
}


// For About Us Section
export type AboutUsData = {
    title: string;
    heading: string;
    description: string;
    image: string;
    dataAiHint: string;
    stats: { value: string; label: string }[];
};
export const getAboutUsData = async (): Promise<AboutUsData> => {
    return {
      title: 'আমরা কারা?',
      heading: 'আপনার সফলতার পথে, আমরা আপনার বিশ্বস্ত সঙ্গী।',
      description:
        'SkillShikhun একটি শীর্ষস্থানীয় আইটি প্রশিক্ষণ কেন্দ্র যেখানে আমরা শিক্ষার্থীদের প্রযুক্তিগত জ্ঞান এবং দক্ষতার মাধ্যমে তাদের স্বপ্ন পূরণে সহায়তা করি। আমাদের লক্ষ্য হল দেশের প্রতিটি প্রান্তে মানসম্মত আইটি শিক্ষা পৌঁছে দেওয়া এবং একটি ডিজিটাল বাংলাদেশ গঠনে ভূমিকা রাখা।',
      image: 'https://placehold.co/800x600.png',
      dataAiHint: 'team meeting',
      stats: [
        { value: '5k+', label: 'সফল শিক্ষার্থী' },
        { value: '10+', label: 'দক্ষ প্রশিক্ষক' },
        { value: '20+', label: 'কোর্সসমূহ' },
      ],
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
export const getTestimonials = async (): Promise<Testimonial[]> => {
    return [
      {
        id: 1,
        name: 'আরিফুল ইসলাম',
        role: 'ওয়েব ডেভেলপার',
        quote:
          'SkillShikhun থেকে ওয়েব ডেভেলপমেন্ট কোর্সটি করে আমি আজ একজন সফল ফ্রিল্যান্সার। এখানকার প্রশিক্ষকরা খুবই আন্তরিক।',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'man portrait',
      },
      {
        id: 2,
        name: 'সুমাইয়া আক্তার',
        role: 'গ্রাফিক ডিজাইনার',
        quote:
          'গ্রাফিক ডিজাইন কোর্সটি আমার ক্যারিয়ারের মোড় ঘুরিয়ে দিয়েছে। এখন আমি আন্তর্জাতিক মার্কেটে কাজ করছি। ধন্যবাদ SkillShikhun।',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'woman portrait',
      },
      {
        id: 3,
        name: 'রাকিবুল হাসান',
        role: 'ডিজিটাল মার্কেটার',
        quote:
          ' এখানকার ডিজিটাল মার্কেটিং কোর্সটি খুবই কার্যকরী। আমি নিজের ব্যবসাকে অনলাইন প্ল্যাটফর্মে সফলভাবে প্রতিষ্ঠিত করতে পেরেছি।',
        avatar: 'https://placehold.co/100x100.png',
        dataAiHint: 'person smiling',
      },
    ];
}


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
    features: WhyChooseUsFeature[];
}
export const getWhyChooseUsData = async (): Promise<WhyChooseUsData> => {
    return {
      title: 'স্কিলশিখুন কেন বেছে নেবেন?',
      subtitle: 'ফিচারগুলো দেখে নিন!',
      features: [
        {
          id: 1,
          title: 'এক্সক্লুসিভ কন্টেন্ট',
          description: 'সেরা এবং অভিজ্ঞ মেন্টরদের দ্বারা তৈরি ও যাচাইকৃত মানসম্মত কন্টেন্ট',
          image: '/images/feature-1.png',
          dataAiHint: 'exclusive content',
        },
        {
          id: 2,
          title: 'সোশ্যাল মিডিয়ায় নিয়মিত আপডেট',
          description: 'কোর্স সম্পর্কিত আপডেট এবং তথ্য পাবেন নিয়মিত',
          image: '/images/feature-2.png',
          dataAiHint: 'social media update',
        },
        {
          id: 3,
          title: '২৪ ঘন্টা সাপোর্ট সিস্টেম',
          description: 'সব প্রয়োজনে সহায়তার জন্য থাকছে সার্বক্ষনিক এক্টিভ সাপোর্ট টিম',
          image: '/images/feature-3.png',
          dataAiHint: '24/7 support',
        },
        {
          id: 4,
          title: 'হাতে-কলমে শেখানো',
          description: 'কোর্সগুলো সাজানো হয়েছে পূর্ব অভিজ্ঞতা ছাড়া সকল মেধার শিক্ষার্থীর জন্য',
          image: '/images/feature-4.png',
          dataAiHint: 'hands-on learning',
        },
      ],
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
    links: FooterLink[];
    contact: FooterContact;
}
export const getFooterData = async (): Promise<FooterData> => {
    return {
        description: "আপনার দক্ষতা বিকাশে আমাদের পথচলা।",
        newsletter_heading: "নিউজলেটার",
        newsletter_placeholder: "আমাদের নিউজলেটারে সাবস্ক্রাইব করে নতুন কোর্স এবং অফার সম্পর্কে জানুন।",
        links: [
            { href: "#about", label: "আমাদের সম্পর্কে"},
            { href: "#courses", label: "আমাদের কোর্স"},
            { href: "#blog", label: "ব্লগ"},
            { href: "#", label: "গোপনীয়তা নীতি"},
        ],
        contact: {
            line1: "ঢাকা, বাংলাদেশ",
            line2: "info@skillshikhun.com",
            line3: "+880 1234 567890",
        }
    }
}
export type NavLink = {
    href: string;
    label: string;
};

export const getNavLinks = async (): Promise<NavLink[]> => {
    return navLinks;
};
