import type { Metadata } from "next";
import { headers } from "next/headers";
import { gradePath, profilePath, type Locale } from "@/lib/i18n/config";

const site = "https://podsawee.com";
const profileCopy = {
  th: { title: "พศวีร์ วนาธรรม | Full-Stack Developer", description: "เว็บไซต์ส่วนตัวของ พศวีร์ วนาธรรม นักพัฒนาฟูลสแตกที่ทำงานด้านโปรแกรม ความปลอดภัยไซเบอร์ และธุรกิจ" },
  en: { title: "Podsawee Wanatham | Full-Stack Developer", description: "The personal website of Podsawee Wanatham, a full-stack developer working across programming, cybersecurity, and business." },
  "zh-CN": { title: "Podsawee Wanatham | 全栈开发者", description: "Podsawee Wanatham 的个人网站，专注于编程、网络安全与商业的全栈开发者。" },
} satisfies Record<Locale, { title: string; description: string }>;
const gradeCopy = {
  th: { title: "โปรแกรมคำนวณเกรด GPA และ GPAX ออนไลน์ฟรี", description: "คำนวณ GPA รายภาคเรียนและ GPAX สะสมออนไลน์ฟรี รองรับเกรดและหน่วยกิตตามระบบไทย ใช้งานง่ายบนมือถือ ไม่ต้องสมัครสมาชิกหรือดาวน์โหลดโปรแกรม" },
  en: { title: "Free Online GPA & GPAX Calculator", description: "Calculate weighted term GPA and cumulative GPAX online for free. Supports grades and credits in the Thai system on phones, tablets, and computers." },
  "zh-CN": { title: "免费在线 GPA 与 GPAX 成绩计算器", description: "免费在线计算学期加权 GPA 和累计 GPAX，支持泰国评分与学分制度，可在手机、平板和电脑上直接使用，无需安装。" },
} satisfies Record<Locale, { title: string; description: string }>;

const alternates = (grade: boolean, origin: string) => ({ languages: { "th": `${origin}${grade ? "/grade" : "/"}`, "en": `${origin}${grade ? "/en/grade" : "/en"}`, "zh-CN": `${origin}${grade ? "/zh-CN/grade" : "/zh-CN"}`, "x-default": `${origin}${grade ? "/grade" : "/"}` } });

export async function requestOrigin(): Promise<string> {
  if (process.env.NODE_ENV === "production") return site;

  const requestHeaders = await headers();
  const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"))?.split(",")[0].trim();
  if (!host) return site;

  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwardedProtocol === "http" || forwardedProtocol === "https"
    ? forwardedProtocol
    : host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";

  try { return new URL(`${protocol}://${host}`).origin; } catch { return site; }
}

export function profileMetadata(locale: Locale, assetOrigin = site): Metadata {
  const copy = profileCopy[locale]; const path = profilePath(locale);
  const thumbnail = `${assetOrigin}/images/thumbnail_podsawee.jpg`;
  const canonical = new URL(path, `${assetOrigin}/`).toString();
  return { metadataBase: new URL(assetOrigin), title: copy.title, description: copy.description, keywords: ["Podsawee Wanatham", "พศวีร์ วนาธรรม", "Boss_pod", "Full-Stack Developer"], authors: [{ name: "Podsawee Wanatham", url: site }], alternates: { canonical, ...alternates(false, assetOrigin) }, openGraph: { type: "profile", url: canonical, siteName: "Podsawee", locale: locale === "th" ? "th_TH" : locale === "en" ? "en_US" : "zh_CN", title: copy.title, description: copy.description, images: [{ url: thumbnail, secureUrl: thumbnail, width: 1200, height: 630, alt: "Podsawee Wanatham — Entrepreneur, Full-Stack Developer and Cyber Security", type: "image/jpeg" }] }, twitter: { card: "summary_large_image", title: copy.title, description: copy.description, images: [{ url: thumbnail, width: 1200, height: 630, alt: "Podsawee Wanatham — Entrepreneur, Full-Stack Developer and Cyber Security" }] }, robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } } };
}

export function gradeMetadata(locale: Locale, assetOrigin = site): Metadata {
  const copy = gradeCopy[locale]; const path = gradePath(locale);
  const thumbnail = `${assetOrigin}/images/thumbnail_podsawee.jpg`;
  const canonical = new URL(path, `${assetOrigin}/`).toString();
  return { metadataBase: new URL(assetOrigin), title: copy.title, description: copy.description, keywords: ["โปรแกรมคำนวณเกรด", "คำนวณ GPA", "คำนวณ GPAX", "Grade Calculator", "LCS"], authors: [{ name: "Podsawee Wanatham", url: site }], alternates: { canonical, ...alternates(true, assetOrigin) }, openGraph: { type: "website", url: canonical, siteName: "Podsawee", locale: locale === "th" ? "th_TH" : locale === "en" ? "en_US" : "zh_CN", title: copy.title, description: copy.description, images: [{ url: thumbnail, secureUrl: thumbnail, width: 1200, height: 630, alt: "Podsawee Wanatham — GPA and GPAX Calculator", type: "image/jpeg" }] }, twitter: { card: "summary_large_image", title: copy.title, description: copy.description, images: [{ url: thumbnail, width: 1200, height: 630, alt: "Podsawee Wanatham — GPA and GPAX Calculator" }] }, robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } } };
}
