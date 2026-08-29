import { GoogleAnalytics } from "@/app/_components/GoogleAnalytics";
import { ThemeScript } from "@/app/_components/ThemeScript";
import { siteMetadata, siteViewport } from "@/lib/seo/siteMetadata";
import { notoSansThai } from "../fonts";
import "../globals.css";

export const metadata = siteMetadata;
export const viewport = siteViewport;
export default function ThaiLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="th" data-scroll-behavior="smooth" suppressHydrationWarning><head><ThemeScript /></head><body className={notoSansThai.variable} suppressHydrationWarning>{children}<GoogleAnalytics /></body></html>; }
