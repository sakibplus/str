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
      {
        protocol: 'https',
        hostname: 'skill-shikhun.netlify.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ecdn.dhakatribune.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image4.owler.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
