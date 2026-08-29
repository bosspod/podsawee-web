"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { languageNames, type Locale } from "@/lib/i18n/config";

const localeKeys = Object.keys(languageNames) as Locale[];

function persistLocale(nextLocale: Locale) {
  localStorage.setItem("podsawee-locale", nextLocale);
  document.cookie = `podsawee-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({ locale, label, grade = false }: { locale: Locale; label: string; grade?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && rootRef.current?.contains(document.activeElement)) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (open) itemRefs.current[localeKeys.indexOf(locale)]?.focus();
  }, [open, locale]);

  function change(nextLocale: Locale) {
    setOpen(false);
    if (nextLocale === locale) return;
    persistLocale(nextLocale);
    const nextPath = grade
      ? nextLocale === "th" ? "/grade" : `/${nextLocale}/grade`
      : nextLocale === "th" ? "/" : `/${nextLocale}`;
    if (pathname !== nextPath) router.push(nextPath);
  }

  function moveFocus(currentIndex: number, direction: 1 | -1) {
    const nextIndex = (currentIndex + direction + localeKeys.length) % localeKeys.length;
    itemRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="language-dropdown" ref={rootRef}>
      <button
        className="language-trigger"
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
        <span>{languageNames[locale]}</span>
        <svg className="language-chevron" viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5" /></svg>
      </button>
      <div className="language-menu" role="menu" aria-label={label} data-open={open || undefined}>
        {localeKeys.map((key, index) => (
          <button
            key={key}
            ref={(element) => { itemRefs.current[index] = element; }}
            type="button"
            role="menuitemradio"
            aria-checked={key === locale}
            tabIndex={open ? 0 : -1}
            onClick={() => change(key)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                moveFocus(index, event.key === "ArrowDown" ? 1 : -1);
              }
              if (event.key === "Home" || event.key === "End") {
                event.preventDefault();
                itemRefs.current[event.key === "Home" ? 0 : localeKeys.length - 1]?.focus();
              }
            }}
          >
            <span>{languageNames[key]}</span>
            <small>{key === "th" ? "TH" : key === "en" ? "EN" : "ZH"}</small>
            <svg viewBox="0 0 12 10" aria-hidden="true"><path d="m1 5 3 3 7-7" /></svg>
          </button>
        ))}
      </div>
    </div>
  );
}
