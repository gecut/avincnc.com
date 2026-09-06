import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  allowedDevOrigins: ['92.168.43.134'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
