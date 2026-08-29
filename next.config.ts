import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["**.trycloudflare.com"],
  htmlLimitedBots: /.*/,
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  trailingSlash: false,
  experimental: {
    globalNotFound: true,
    inlineCss: true,
  },
};

export default nextConfig;
