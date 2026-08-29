import { getMessages, gradePath, type Locale } from "@/lib/i18n/config";

const site = "https://podsawee.com";
const appUrl = "https://lcs.site/grade-calculator";

export function gradeStructuredData(locale: Locale) {
  const g = getMessages(locale).grade;
  const pageUrl = `${site}${gradePath(locale)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: g.title,
        description: g.lead,
        inLanguage: locale,
        mainEntity: { "@id": `${appUrl}#webapp` },
        author: { "@id": `${site}/#podsawee` },
        isPartOf: { "@id": `${site}/#website` },
      },
      {
        "@type": "WebApplication",
        "@id": `${appUrl}#webapp`,
        name: "LCS Grade Calculator",
        alternateName: [g.title, "GPA Calculator", "GPAX Calculator"],
        url: appUrl,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript and a modern web browser",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "THB" },
        provider: { "@type": "Organization", name: "LCS - Learning Center Station", url: "https://lcs.site/" },
        creator: { "@id": `${site}/#podsawee` },
      },
      {
        "@type": "Person",
        "@id": `${site}/#podsawee`,
        name: "Podsawee Wanatham",
        alternateName: "พศวีร์ วนาธรรม",
        url: `${site}/`,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [[g.faq1Q, g.faq1A], [g.faq2Q, g.faq2A], [g.faq3Q, g.faq3A]].map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text },
        })),
      },
    ],
  };
}
