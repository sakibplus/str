
export type NavbarData = {
    logo_url: string;
    button_text: string;
}
export const getNavbarData = async (): Promise<NavbarData> => {
    return { 
        logo_url: 'https://image4.owler.com/logo/shikho-technologies-bangladesh_owler_20230320_171601_original.png', 
        button_text: 'সার্ভিস নেন' 
    };
}


export type NavLink = {
    href: string;
    label: string;
};
export const getNavLinks = async (): Promise<NavLink[]> => {
    return [
        { href: "/course/2", label: "ওয়েব ডেভেলপমেন্ট" },
        { href: "/course/4", label: "গ্রাফিক্স ডিজাইন" },
        { href: "/about", label: "আমাদের সম্পর্কে" },
        { href: "#courses", label: "আমাদের কোর্স" },
        { href: "#testimonials", label: "শিক্ষার্থীদের মতামত" },
        { href: "/blog", label: "ব্লগ" },
        { href: "/contact", label: "যোগাযোগ" },
      ];
};


export type HeroData = {
    title: string;
    subtitle: string;
};
export const getHeroData = async (): Promise<HeroData> => {
    return { 
        title: 'রঙিনবাড়ি আইটির হাত ধরে স্কিল শিখুন!', 
        subtitle: 'সাশ্রয়ী মূল্যে রঙিনবাড়ি আইটিতে কিংবা ঘরে বসে লাইভ ক্লাস করুন ইন্সট্রাক্টর এর সাথে!' 
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
    return [
        {
            id: 1,
            title: 'ফ্রিল্যান্সিং কমপ্লিট গাইডলাইন',
            image: 'https://i.ytimg.com/vi/OimhhvuKRAQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAD6SWHpDH6OT6yRy_299ZXEIUwrA',
            dataAiHint: 'freelancing guide',
            price: "1500",
            discountedPrice: "10000",
            promoCode: "SKILL750",
            duration: "২ মাসের কোর্স",
            description: 'ফ্রিল্যান্সিং করে কিভাবে সফল হবেন তার পূর্ণাঙ্গ গাইডলাইন।',
        },
        {
            id: 2,
            title: 'ওয়েব ডেভেলপমেন্ট',
            image: 'https://skill-shikhun.netlify.app/static/media/DM.f0f690691a1af9996b02.png',
            dataAiHint: 'web development',
            price: "1500",
            discountedPrice: "6000",
            promoCode: "SKILL999",
            duration: "৩ মাসের কোর্স",
            description: 'নতুনদের জন্য ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট শিখুন।',
        },
        {
            id: 3,
            title: 'কম্পিউটার সেলস এন্ড সার্ভিস',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToc09JsYio5-dpOBHS7DdMpbvJVocCvGmqKw&s',
            dataAiHint: 'video editing',
            price: "1500",
            discountedPrice: "১৩০০০ থেকে শুরু",
            promoCode: "SKILL999",
            duration: "২ মাসের কোর্স",
            description: 'অ্যাডোবি প্রিমিয়ার প্রো দিয়ে প্রফেশনাল ভিডিও এডিটিং শিখুন।',
        },
        {
            id: 4,
            title: 'গ্রাফিক্স ডিজাইন',
            image: 'https://tripleclickacademy.com/wp-content/uploads/2023/12/WEBSITE-SQUARE-GRAPHICS.webp',
            dataAiHint: 'graphic design',
            price: "1500",
            discountedPrice: "4000",
            promoCode: "SKILL999",
            duration: "৩ মাসের কোর্স",
            description: 'অ্যাডোবি ফটোশপ ও ইলাস্ট্রেটর দিয়ে আকর্ষণীয় ডিজাইন তৈরি করুন।',
        },
        {
            id: 5,
            title: 'সিসি ক্যামেরা সেটআপ',
            image: 'https://cdn.bdstall.com/product-image/giant_283097.jpg',
            dataAiHint: 'cctv setup',
            price: "1500",
            discountedPrice: "৪৫০০ টাকা",
            promoCode: "SKILL999",
            duration: "আলোচনা সাপেক্ষে",
            description: 'নিজেই শিখুন সিসি ক্যামেরা সেটআপ এবং হোন একজন দক্ষ টেকনিশিয়ান।',
        }
    ];
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
    return [
        {
          id: 1,
          title: 'সবার জন্য ফ্রিল্যান্সিং',
          image: 'https://skill-shikhun.netlify.app/static/media/FL.36b4e5cbb64728ca3c0a.png',
          dataAiHint: 'freelancing course',
          link: '/course/1',
          duration: '৬ মাসের',
          price: '750',
          live: true,
          priceSuffix: ''
        },
        {
          id: 2,
          title: 'ওয়েব ডেভেলপমেন্ট',
          image: 'https://skill-shikhun.netlify.app/static/media/WD.3c2e0df1e4412a1f69a5.png',
          dataAiHint: 'web development',
          link: '/course/2',
          duration: '৩ মাসের',
          price: '1500',
          live: true,
          priceSuffix: 'প্রতি মাস',
        },
        {
          id: 3,
          title: 'ডিজিটাল মার্কেটিং',
          image: 'https://skill-shikhun.netlify.app/static/media/GD.63300e1ce24623e1f031.png',
          dataAiHint: 'digital marketing',
          link: '/course/3',
          duration: '২ মাসের',
          price: '1500',
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
            price: '1500',
            live: true,
            priceSuffix: 'প্রতি মাস',
        },
        {
            id: 5,
            title: 'সিসি ক্যামেরা সেটআপ',
            image: 'https://placehold.co/600x400.png',
            dataAiHint: 'cctv camera',
            link: '/course/5',
            duration: 'আলোচনা সাপেক্ষে',
            price: '7000',
            live: true,
            priceSuffix: 'প্রতি মাস',
        },
      ];
}


export const getInquiryCourses = async (): Promise<Course[]> => {
    return getCourses();
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
    return {
        title: "আমরা কারা?",
        heading: "আপনার সফলতার পথে, আমরা আপনার বিশ্বস্ত সঙ্গী।",
        description: "রঙিনবাড়ি আইটি একটি শীর্ষস্থানীয় আইটি প্রশিক্ষণ কেন্দ্র যেখানে আমরা শিক্ষার্থীদের প্রযুক্তিগত জ্ঞান এবং দক্ষতার মাধ্যমে তাদের স্বপ্ন পূরণে সহায়তা করি।",
        image: "https://img.freepik.com/premium-photo/education-technology-friendship-school-concept-smiling-male-student-with-classmates-computer-class_380164-79006.jpg?semt=ais_hybrid&w=740&q=80",
        dataAiHint: "team meeting",
        stats: [
            { value: '1k+', label: 'সফল শিক্ষার্থী' },
            { value: '5+', label: 'দক্ষ প্রশিক্ষক' },
            { value: '10+', label: 'কোর্সসমূহ' },
        ],
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
    return [
        {
          id: 1,
          name: 'আকাশ রহমান',
          role: 'ওয়েব ডেভেলপার',
          quote: 'রঙিনবাড়ি আইটি থেকে ওয়েব ডেভেলপমেন্ট কোর্সটি করে আমি আজ একজন সফল ফ্রিল্যান্সার।',
          avatar: 'https://ddn.ezzecloud.com/assets/2139/Pic-12.jpeg',
          dataAiHint: 'man portrait',
        },
        {
          id: 2,
          name: 'সুমাইয়া আক্তার',
          role: 'গ্রাফিক ডিজাইনার',
          quote: 'গ্রাফিক ডিজাইন কোর্সটি আমার ক্যারিয়ারের মোড় ঘুরিয়ে দিয়েছে। ধন্যবাদ রঙিনবাড়ি আইটিকে।',
          avatar: 'https://asset.kalerkantho.com/public/news_images/2016/11/05/030220Program_kalerkantho_pic.jpg',
          dataAiHint: 'woman portrait',
        },
        {
          id: 3,
          name: 'রাকিবুল হাসান',
          role: 'ডিজিটাল মার্কেটার',
          quote: 'এখানকার ডিজিটাল মার্কেটিং কোর্সটি খুবই কার্যকরী। আমি নিজের অনলাইন ব্যবসাকে সফলভাবে প্রতিষ্ঠিত করতে পেরেছি।',
          avatar: 'https://techtunes.tech/wp-content/uploads/2021/08/%E0%A6%A8%E0%A6%A4%E0%A7%81%E0%A6%A8-%E0%A6%95%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%BF%E0%A6%89%E0%A6%9F%E0%A6%BE%E0%A6%B0-%E0%A6%AC%E0%A7%8D%E0%A6%AF%E0%A6%AC%E0%A6%B9%E0%A6%BE%E0%A6%B0%E0%A6%95%E0%A6%BE%E0%A6%B0%E0%A7%80%E0%A6%A6%E0%A7%87%E0%A6%B0-%E0%A6%9C%E0%A6%A8%E0%A7%8D%E0%A6%AF-%E0%A7%A7%E0%A7%A6-%E0%A6%9F%E0%A6%BF-%E0%A6%9F%E0%A6%BF%E0%A6%AA%E0%A6%B8-Feature.jpeg',
          dataAiHint: 'person smiling',
        },
        {
          id: 4,
          name: 'সাগর রেজা',
          role: 'অফিস প্রোগ্রাম',
          quote: 'এখানকার অফিস প্রোগ্রাম কোর্সটি খুবই কার্যকরী। আমি নিজেকে সফলভাবে প্রতিষ্ঠিত করতে পেরেছি।',
          avatar: 'https://prosnouttor.com/wp-content/uploads/2022/09/1-2.jpg.webp',
          dataAiHint: 'person smiling',
        },
        {
          id: 5,
          name: 'প্রীতি ইসলাম',
          role: 'টি-শার্ট ডিজাইনার',
          quote: 'এখানকার গ্রাফিক্স ডিজাইন কোর্সটি খুবই কার্যকরী। আমি নিজের টিশার্ট ডিজাইন ক্যারীয়ারকে সফলভাবে প্রতিষ্ঠিত করতে পেরেছি।',
          avatar: 'https://cdn.dhakapost.com/media/imgAll/BG/2022October/pharma-jobs-20220919135453-20220929134754-20221025152732.jpg',
          dataAiHint: 'person smiling',
        },
      ];
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
    return {
        title: "রঙিনবাড়ি আইটি কেন বেছে নেবেন?",
        subtitle: "আমাদের সেরা ফিচারগুলো যা আপনাকে অন্যদের থেকে এগিয়ে রাখবে।",
        features: [
            {
              id: 1,
              title: 'এক্সক্লুসিভ সার্ভিস',
              description: 'সেরা এবং অভিজ্ঞ মেন্টরদের দ্বারা বেসিক অফিস এ্যাপ্লিকেশন সহ কম্পিউটার প্রশিক্ষণ।',
              image: 'https://skill-shikhun.netlify.app/static/media/highQuality.289c84fe6bbdf15c09bf541534eea20f.svg',
              dataAiHint: 'exclusive content',
            },
            {
              id: 2,
              title: '২৪ ঘন্টা সাপোর্ট',
              description: 'সব প্রয়োজনে সহায়তার জন্য থাকছে সার্বক্ষনিক এক্টিভ সাপোর্ট টিম।',
              image: 'https://skill-shikhun.netlify.app/static/media/socialMedia.4d07e703643b0c028cc96b25ed6f3f37.svg',
              dataAiHint: '24/7 support',
            },
            {
              id: 3,
              title: 'হাতে-কলমে শেখানো',
              description: 'কোর্সগুলো সাজানো হয়েছে পূর্ব অভিজ্ঞতা ছাড়া সকল মেধার শিক্ষার্থীর জন্য।',
              image: 'https://skill-shikhun.netlify.app/static/media/24Hour.39ab995a260bcfb40163b1604ff65966.svg',
              dataAiHint: 'hands-on learning',
            },
            {
              id: 4,
              title: 'সনদ প্রদান',
              description: 'কোর্স শেষে রঙিন বাড়ি আইটি হতে সরকারি সনদ গ্রহণ।',
              image: 'https://skill-shikhun.netlify.app/static/media/easyToPractice.c391f04a500bce36c7ada1f517a0b015.svg',
              dataAiHint: 'social media',
            },
          ]
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
    return { 
        main: {
            description: "আপনার দক্ষতা বিকাশে আমাদের পথচলা।",
            newsletter_heading: "নিউজলেটার",
            newsletter_placeholder: "আমাদের নিউজলেটারে সাবস্ক্রাইব করে নতুন কোর্স এবং অফার সম্পর্কে জানুন।",
        },
        links: [
            { label: "বাংলা টাইপিং", href: "https://Banglatype.vercel.app" },
            { label: "গোপনীয়তা নীতি", href: "/privacy-policy" },
            { label: "ব্লগ", href: "/blog" },
            { label: "রঙিনবাড়ি শপ", href: "https://shop.ronginbari.com" },
        ],
        contact: { 
            line1: "কোর্ট রোড, সোনালী ব্যাংক সংলগ্ন, কেন্দুয়া, নেত্রকোণা।", 
            line2: "info@ronginbari.com", 
            line3: "01711 466 850",
            logo_url: 'https://image4.owler.com/logo/shikho-technologies-bangladesh_owler_20230320_171601_original.png' 
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
    return [
        {
            id: 1,
            title: "ফ্রিল্যান্সিংয়ে সফল হওয়ার উপায়",
            excerpt: "ফ্রিল্যান্সিং এখন তরুণদের কাছে খুবই জনপ্রিয় একটি পেশা। কিন্তু না জেনেশুনে এই পথে নামলে...",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
            dataAiHint: "freelancing tips",
            date: "জুলাই ২৫, ২০২৪",
            author: "আরিফুল ইসলাম",
            author_avatar: "https://placehold.co/100x100.png",
            content: "ফ্রিল্যান্সিং এখন তরুণদের কাছে খুবই জনপ্রিয় একটি পেশা। কিন্তু না জেনেশুনে এই পথে নামলে সফল হওয়া কঠিন। সফল ফ্রিল্যান্সার হতে হলে আপনাকে কয়েকটি বিষয় মাথায় রাখতে হবে।\\n\\nপ্রথমত, দক্ষতা অর্জন করুন। যে বিষয়ে আপনার আগ্রহ আছে, সেই বিষয়ে ভালোভাবে শিখুন। ওয়েব ডেভেলপমেন্ট, গ্রাফিক ডিজাইন, ডিজিটাল মার্কেটিংয়ের মতো অনেক জনপ্রিয় বিষয় রয়েছে।\\n\\nদ্বিতীয়ত, একটি সুন্দর পোর্টফোলিও তৈরি করুন। আপনার সেরা কাজগুলো দিয়ে পোর্টফোলিও সাজান। এটি ক্লায়েন্টদের আপনার দক্ষতা সম্পর্কে ধারণা দেবে।\\n\\nতৃতীয়ত, মার্কেটপ্লেসে সক্রিয় থাকুন। ফাইবার, আপওয়ার্কের মতো প্ল্যাটফর্মে প্রোফাইল তৈরি করুন এবং নিয়মিত কাজের জন্য আবেদন করুন।"
        },
        {
            id: 2,
            title: "ওয়েব ডেভেলপারদের জন্য ৫টি প্রয়োজনীয় টুলস",
            excerpt: "একজন ওয়েব ডেভেলপারের কাজকে আরও সহজ ও গতিময় করতে কিছু টুলস খুবই দরকারি...",
            image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
            dataAiHint: "web development tools",
            date: "জুলাই ২২, ২০২৪",
            author: "সুমাইয়া আক্তার",
            author_avatar: "https://placehold.co/100x100.png",
            content: "ওয়েব ডেভেলপারদের কাজকে আরও সহজ করার জন্য বর্তমানে অনেক টুলস রয়েছে। এর মধ্যে কয়েকটি প্রয়োজনীয় টুলস হলো:\\n\\n১. VS Code: এটি একটি শক্তিশালী এবং জনপ্রিয় কোড এডিটর।\\n২. Git: ভার্সন কন্ট্রোলের জন্য গিট অপরিহার্য।\\n৩. Chrome DevTools: ডিবাগিং এবং ওয়েবসাইট বিশ্লেষণের জন্য এটি সেরা।\\n৪. Figma: UI/UX ডিজাইনের জন্য ফিগমা এখন খুবই জনপ্রিয়।\\n৫. Postman: API টেস্টিংয়ের জন্য পোস্টম্যান একটি চমৎকার টুল।"
        }
    ];
}

export type ContactPageData = {
    hero_title: string;
    hero_subtitle: string;
    form_title: string;
    form_subtitle: string;
}
export const getContactPageData = async (): Promise<ContactPageData> => {
    return {
        hero_title: "যোগাযোগ করুন",
        hero_subtitle: "আপনার যেকোনো প্রশ্ন, পরামর্শ বা সহযোগিতার জন্য আমরা সর্বদা প্রস্তুত।",
        form_title: "আমাদের মেসেজ পাঠান",
        form_subtitle: "আমরা আপনার বার্তার অপেক্ষায় আছি।",
    };
}

export type ContactInfoCard = {
    icon: string;
    title: string;
    value: string;
    link?: string;
}
export const getContactInfoCards = async (): Promise<ContactInfoCard[]> => {
    return [
        {
            icon: "Mail",
            title: "ইমেইল",
            value: "info@ronginbari.com",
            link: "mailto:info@ronginbari.com"
        },
        {
            icon: "Phone",
            title: "ফোন",
            value: "01711 466 850",
            link: "tel:01711466850"
        },
        {
            icon: "MapPin",
            title: "অফিস",
            value: "কোর্ট রোড, সোনালী ব্যাংক সংলগ্ন, কেন্দুয়া, নেত্রকোণা।",
            link: "#"
        }
    ];
}
