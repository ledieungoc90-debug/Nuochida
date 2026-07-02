import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    localPatterns: [
      {
        pathname: "/api/directus-assets/**",
      },
    ],
  },
};

export default nextConfig;
