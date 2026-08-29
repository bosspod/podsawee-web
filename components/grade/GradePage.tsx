import Image from "next/image";
import Link from "next/link";
import { getMessages, profilePath, type Locale } from "@/lib/i18n/config";
import styles from "./GradePage.module.css";

const calculatorUrl = "https://lcs.site/grade-calculator";

function trackedCalculatorUrl(content: string) {
  const params = new URLSearchParams({
    utm_source: "podsawee.com",
    utm_medium: "referral",
    utm_campaign: "grade-calculator",
    utm_content: content,
  });
  return `${calculatorUrl}?${params.toString()}`;
}

function ArrowIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}

function CalculatorIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 10h2m4 0h2M8 14h2m4 0h2M8 18h2m4 0h2" /></svg>;
}

function CheckIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>;
}

const previewSubjects: Record<Locale, string[]> = {
  th: ["คณิตศาสตร์", "ภาษาอังกฤษ", "วิทยาศาสตร์"],
  en: ["Mathematics", "English", "Science"],
  "zh-CN": ["数学", "英语", "科学"],
};

export function GradePage({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  const g = m.grade;
  const features = [
    { title: g.feature1Title, body: g.feature1Body, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 11h2m4 0h2M8 15h2m4 0h2" /></svg> },
    { title: g.feature2Title, body: g.feature2Body, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19V9m6 10V5m6 14v-7m4 7H2" /></svg> },
    { title: g.feature3Title, body: g.feature3Body, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8m-4-4v4" /></svg> },
  ];
  const steps = [[g.step1Title, g.step1Body], [g.step2Title, g.step2Body], [g.step3Title, g.step3Body]];
  const faqs = [[g.faq1Q, g.faq1A], [g.faq2Q, g.faq2A], [g.faq3Q, g.faq3A]];

  return <div className={styles.page}>
    <a className={styles.skipLink} href="#main">{locale === "th" ? "ข้ามไปยังเนื้อหา" : locale === "en" ? "Skip to content" : "跳到主要内容"}</a>
    <header className={styles.siteHeader}>
      <div className={`${styles.container} ${styles.nav}`}>
        <Link className={styles.brand} href={profilePath(locale)} aria-label={g.back}>
          <Image src="/images/logo.png" alt="Podsawee" title="Podsawee" width={42} height={42} priority />
          <span className={styles.brandCopy}><strong>Podsawee</strong><span>Tools for better learning</span></span>
        </Link>
        <a className={styles.navLink} href="#about">{g.learn}</a>
      </div>
    </header>

    <main id="main">
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.eyebrowIcon}><CalculatorIcon size={17} /></span>{g.eyebrow}</p>
            <h1>{g.title}</h1>
            <p className={styles.heroDescription}>{g.lead}</p>
            <div className={styles.actions}>
              <a className={styles.button} href={trackedCalculatorUrl("hero-cta")} target="_blank" rel="noopener noreferrer">{g.start}<ArrowIcon /></a>
              <a className={styles.textLink} href="#about">{g.learn}</a>
            </div>
            <div className={styles.trust} aria-label={g.featuresTitle}>
              {[g.free, g.install, g.supports].map((item) => <span key={item}><CheckIcon />{item}</span>)}
            </div>
          </div>

          <div className={styles.calculatorPreview} aria-label={g.calculatorTitle}>
            <div className={styles.previewHead}>
              <div className={styles.previewTitle}><span className={styles.previewIcon}><CalculatorIcon /></span>{g.calculatorTitle}</div>
              <div className={styles.mode} aria-hidden="true"><span className={styles.active}>GPA</span><span>GPAX</span></div>
            </div>
            <div className={styles.previewTable} aria-hidden="true">
              {previewSubjects[locale].map((subject, index) => <div className={styles.previewRow} key={subject}><span className={styles.fakeInput}>{subject}</span><span className={styles.fakeInput}>{["A", "B+", "A"][index]}</span><span className={styles.fakeInput}>{[3, 3, 2][index]}</span></div>)}
            </div>
            <div className={styles.previewResult} aria-hidden="true"><span><small>{g.result}</small><strong>3.81</strong></span><span className={styles.miniButton}>{g.calculate}</span></div>
            <div className={styles.floatChip}><CheckIcon />{g.free} · LCS</div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`} aria-labelledby="features-title">
        <div className={styles.container}>
          <div className={styles.sectionHeading}><p className={styles.label}>{g.featuresEyebrow}</p><h2 id="features-title">{g.featuresTitle}</h2><p>{g.calculatorIntro}</p></div>
          <div className={styles.featureGrid}>{features.map((feature) => <article className={styles.featureCard} key={feature.title}><span className={styles.featureCardIcon}>{feature.icon}</span><h3>{feature.title}</h3><p>{feature.body}</p></article>)}</div>
          <a className={styles.adBanner} href="https://doodee-future.com/?utm_source=lcs&amp;utm_medium=grade&amp;utm_campaign=lcs" target="_blank" rel="noopener noreferrer" aria-label="Doodee Future">
            <Image src="/images/doodee_future_ads_800x200.png" alt="Doodee Future" title="Doodee Future" width={800} height={200} sizes="(max-width: 768px) calc(100vw - 40px), 560px" />
          </a>
        </div>
      </section>

      <section className={styles.section} id="about" aria-labelledby="how-title">
        <div className={`${styles.container} ${styles.contentGrid}`}>
          <div className={styles.contentHeading}><p className={styles.label}>{g.howEyebrow}</p><h2 id="how-title">{g.howTitle}</h2><p>{g.lead}</p></div>
          <div className={styles.contentList}>{steps.map(([title, body], index) => <article className={styles.contentItem} key={title}><h3><span className={styles.step}>{index + 1}</span>{title}</h3><p>{body}{index === 2 && <> <a className={styles.inlineLink} href={trackedCalculatorUrl("content-link")} target="_blank" rel="noopener noreferrer">{g.start}</a></>}</p></article>)}</div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`} aria-labelledby="faq-title">
        <div className={styles.container}><div className={styles.sectionHeading}><p className={styles.label}>{g.faqEyebrow}</p><h2 id="faq-title">{g.faqTitle}</h2></div><div className={styles.faq}>{faqs.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></div>
      </section>

      <section className={styles.ctaWrap}>
        <div className={styles.container}><div className={styles.cta}><div className={styles.ctaCopy}><p className={styles.label}>LCS · LEARNING CENTER STATION</p><h2>{g.start}</h2><p>{g.lcs}</p></div><a className={styles.button} href={trackedCalculatorUrl("final-cta")} target="_blank" rel="noopener noreferrer">{g.start}<ArrowIcon /></a></div></div>
      </section>
    </main>

    <footer className={styles.footer}><div className={`${styles.container} ${styles.footerInner}`}><p>© 2020–2026 Podsawee Wanatham</p><p>{g.lcs} <a href="https://lcs.site/?utm_source=podsawee.com&amp;utm_medium=referral&amp;utm_campaign=grade-calculator&amp;utm_content=footer" target="_blank" rel="noopener noreferrer">LCS</a></p></div></footer>
  </div>;
}
