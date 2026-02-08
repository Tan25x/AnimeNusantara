import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'otakudesu.best',
      },
      {
        protocol: 'https',
        hostname: 'komikindo.ch',
      },
      {
        protocol: 'https',
        hostname: 'shivraapi.my.id',
      }
    ],
  },
};

export default nextConfig;
