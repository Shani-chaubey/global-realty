/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow external property image URLs from admin/data sources
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "localhost" },
    ],
    // Keep images unoptimized to avoid runtime host blocking for mixed legacy URLs
    unoptimized: true,
  },
};

export default nextConfig;
