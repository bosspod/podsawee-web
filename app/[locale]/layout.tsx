import { GoogleAnalytics } from "@/app/_components/GoogleAnalytics";
import { ThemeScript } from "@/app/_components/ThemeScript";
import { isLocale } from "@/lib/i18n/config";
import { siteMetadata, siteViewport } from "@/lib/seo/siteMetadata";
import { notoSansThai } from "../fonts";
import "../globals.css";
export const metadata = siteMetadata;
export const viewport = siteViewport;
export function generateStaticParams() { return [{ locale: "en" }, { locale: "zh-CN" }]; }
export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) { const { locale } = await params; const lang = isLocale(locale) && locale !== "th" ? locale : "th"; return <html lang={lang} data-scroll-behavior="smooth" suppressHydrationWarning><head><ThemeScript /></head><body className={notoSansThai.variable} suppressHydrationWarning>{children}<GoogleAnalytics /></body></html>; }
