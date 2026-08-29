"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const THEME_KEY = "podsawee-theme";
const THEME_CHANGE_EVENT = "podsawee-theme-change";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

function getTheme(): Theme | null {
  if (typeof document === "undefined") return null;

  const theme = document.documentElement.dataset.theme;
  return isTheme(theme) ? theme : null;
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function subscribeToTheme(onStoreChange: () => void) {
  const colorScheme = window.matchMedia("(prefers-color-scheme: light)");

  const handleThemeChange = () => onStoreChange();
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== THEME_KEY) return;
    applyTheme(isTheme(event.newValue) ? event.newValue : getSystemTheme());
  };
  const handleSystemThemeChange = () => {
    let savedTheme: string | null = null;
    try {
      savedTheme = localStorage.getItem(THEME_KEY);
    } catch {
      // Keep following the system preference when storage is unavailable.
    }

    if (!isTheme(savedTheme)) applyTheme(getSystemTheme());
  };

  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  window.addEventListener("storage", handleStorage);
  colorScheme.addEventListener("change", handleSystemThemeChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.removeEventListener("storage", handleStorage);
    colorScheme.removeEventListener("change", handleSystemThemeChange);
  };
}

export function ThemeToggle({ lightLabel, darkLabel }: { lightLabel: string; darkLabel: string }) {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => null);

  function toggleTheme() {
    const current = getTheme() ?? getSystemTheme();
    const next = current === "light" ? "dark" : "light";

    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // The theme still works for this page when storage is blocked.
    }
  }

  const label = theme === "light" ? darkLabel : theme === "dark" ? lightLabel : `${lightLabel} / ${darkLabel}`;

  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={label} title={label} aria-pressed={theme === "light"}>
    <span className="theme-icon-sun" aria-hidden="true"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg></span>
    <span className="theme-icon-moon" aria-hidden="true"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" /></svg></span>
  </button>;
}
