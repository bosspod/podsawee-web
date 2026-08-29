import Script from "next/script";

const themeScript = `(function(){try{var saved=localStorage.getItem('podsawee-theme');var theme=saved==='light'||saved==='dark'?saved:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.style.colorScheme='dark'}})()`;

export function ThemeScript() {
  return <Script id="theme-init" strategy="beforeInteractive">{themeScript}</Script>;
}
