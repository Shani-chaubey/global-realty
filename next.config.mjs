/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/agents", destination: "/team", permanent: true },
      { source: "/agents-details/:slug*", destination: "/team/:slug*", permanent: true },
    ];
  },
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
