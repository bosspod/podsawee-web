import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/_next/", "/old_code/"] }, sitemap: "https://podsawee.com/sitemap.xml", host: "https://podsawee.com" }; }
