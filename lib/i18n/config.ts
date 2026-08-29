import en from "@/messages/en.json";
import th from "@/messages/th.json";
import zhCN from "@/messages/zh-CN.json";

export const locales = ["th", "en", "zh-CN"] as const;
export type Locale = (typeof locales)[number];
export type Messages = typeof en;

const dictionaries: Record<Locale, Messages> = { th, en, "zh-CN": zhCN };

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

export function profilePath(locale: Locale) {
  return locale === "th" ? "/" : `/${locale}`;
}

export function gradePath(locale: Locale) {
  return locale === "th" ? "/grade" : `/${locale}/grade`;
}

export const languageNames: Record<Locale, string> = {
  th: "ไทย",
  en: "English",
  "zh-CN": "简体中文",
};
