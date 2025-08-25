import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    GOOGLE_SHEET_NAVLINKS_URL: process.env.GOOGLE_SHEET_NAVLINKS_URL,
    GOOGLE_SHEET_HERO_URL: process.env.GOOGLE_SHEET_HERO_URL,
    GOOGLE_SHEET_COURSE_CAROUSEL_URL: process.env.GOOGLE_SHEET_COURSE_CAROUSEL_URL,
    GOOGLE_SHEET_COURSES_URL: process.env.GOOGLE_SHEET_COURSES_URL,
    GOOGLE_SHEET_ABOUT_US_URL: process.env.GOOGLE_SHEET_ABOUT_US_URL,
    GOOGLE_SHEET_TESTIMONIALS_URL: process.env.GOOGLE_SHEET_TESTIMONIALS_URL,
    GOOGLE_SHEET_WHY_CHOOSE_US_URL: process.env.GOOGLE_SHEET_WHY_CHOOSE_US_URL,
    GOOGLE_SHEET_FOOTER_URL: process.env.GOOGLE_SHEET_FOOTER_URL,
  }
};

export default nextConfig;
