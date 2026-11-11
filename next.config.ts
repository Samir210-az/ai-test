import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    "/api/pwa/[id]/icon": ["./lib/fonts/**/*"],
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  // Add custom static resource path configuration
  async rewrites() {
    return [
      {
        source: '/share/:path*',
        destination: '/:path*',
      },
    ];
  },
};

export default nextConfig;
