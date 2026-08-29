import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { const now = new Date(); return ["", "/grade", "/en", "/en/grade", "/zh-CN", "/zh-CN/grade"].map((path) => ({ url: `https://podsawee.com${path}`, lastModified: now, changeFrequency: path.includes("grade") ? "monthly" : "weekly", priority: path === "" ? 1 : path === "/grade" ? .95 : .8 })); }
