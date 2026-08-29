import { notFound } from "next/navigation";
import { GradePage } from "@/components/grade/GradePage";
import { StructuredData } from "@/components/ui/StructuredData";
import { isLocale } from "@/lib/i18n/config";
import { gradeStructuredData } from "@/lib/seo/gradeStructuredData";
import { gradeMetadata, requestOrigin } from "@/lib/seo/metadata";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return isLocale(locale) ? gradeMetadata(locale, await requestOrigin()) : {}; }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale) || locale === "th") notFound(); return <><StructuredData data={gradeStructuredData(locale)} /><GradePage locale={locale} /></>; }
