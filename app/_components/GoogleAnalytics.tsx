import Script from "next/script";

const measurementId = process.env.NEXT_PUBLIC_GA_ID ?? "G-BXQ7R3053H";
const sendPageView = process.env.NODE_ENV === "production";

export function GoogleAnalytics() {
  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', { send_page_view: ${sendPageView} });
    `}</Script>
  </>;
}
