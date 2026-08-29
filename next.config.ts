import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["**.trycloudflare.com"],
  htmlLimitedBots: /.*/,
  poweredByHeader: false,
  trailingSlash: false,
  experimental: {
    globalNotFound: true,
    inlineCss: true,
  },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    }];
  },
  async redirects() {
    return [
      { source: "/grade.php", destination: "/grade", statusCode: 301 },
      { source: "/index.php", destination: "/", statusCode: 301 },
    ];
  },
};

export default nextConfig;
