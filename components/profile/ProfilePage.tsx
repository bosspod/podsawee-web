import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { TechExperience } from "@/components/profile/TechExperience";
import { awards, educations, profileUi } from "@/lib/profile/content";
import { getMessages, profilePath, type Locale } from "@/lib/i18n/config";
import styles from "./ProfilePage.module.css";

const companies = [
  { name: "The Station Group", company: "The Station Group Holdings Co., Ltd.", url: "https://stationgroup.co.th/", logo: "/images/company/thestationgroup.png", status: "current", role: { th: "ประธานเจ้าหน้าที่บริหารและผู้ก่อตั้ง", en: "Chief Executive Officer & Founder", "zh-CN": "首席执行官兼创始人" }, period: { th: "มี.ค. 2024 - ปัจจุบัน", en: "Mar 2024 - Present", "zh-CN": "2024年3月 - 至今" } },
  { name: "Loopika AI", company: "The Station Group Holdings Co., Ltd.", description: { th: "Loopika AI โซลูชัน AI ที่ช่วยให้ขั้นตอนการทำงานของธุรกิจฉลาดและรวดเร็วขึ้น", en: "Loopika AI, an AI solution that makes business workflows smarter and faster", "zh-CN": "Loopika AI，让企业工作流程更智能、更高效的 AI 解决方案" }, url: "https://loopika.ai/th", logo: "/images/company/loopika.png", status: "current", role: { th: "ประธานเจ้าหน้าที่บริหารและผู้ก่อตั้ง", en: "Chief Executive Officer & Founder", "zh-CN": "首席执行官兼创始人" }, period: { th: "ก.ค. 2026 - ปัจจุบัน", en: "Jul 2026 - Present", "zh-CN": "2026年7月 - 至今" } },
  { name: "Learning Center Station", company: "Technology Education", description: { th: "LCS Platform แพลตฟอร์มเรียนรู้ทักษะการเขียนโปรแกรมและทักษะดิจิทัล", en: "LCS Platform, a learning platform for programming and digital skills", "zh-CN": "LCS Platform，编程与数字技能学习平台" }, url: "https://lcs.stationgroup.co.th/", logo: "/images/company/learningcodestation.png", status: "current", role: { th: "ประธานเจ้าหน้าที่บริหารและผู้ก่อตั้ง", en: "Chief Executive Officer & Founder", "zh-CN": "首席执行官兼创始人" }, period: { th: "มิ.ย. 2022 - ปัจจุบัน", en: "Jun 2022 - Present", "zh-CN": "2022年6月 - 至今" } },
  { name: "ME HUG", company: "Bear and Friend Co., Ltd.", url: "https://mehug.me/", logo: "/images/company/mehug.png", status: "former", role: { th: "อดีตประธานเจ้าหน้าที่ฝ่ายเทคโนโลยี · ที่ปรึกษาด้านเทคนิคอาวุโส", en: "Former Chief Technology Officer · Senior Technical Consultant", "zh-CN": "前首席技术官 · 高级技术顾问" }, period: { th: "CTO: ก.ค. 2022 - ก.ค. 2023 · ที่ปรึกษา: ก.ย. 2025 - ปัจจุบัน", en: "CTO: Jul 2022 - Jul 2023 · Consultant: Sep 2025 - Present", "zh-CN": "CTO：2022年7月 - 2023年7月 · 顾问：2025年9月 - 至今" } },
  { name: "BualoiTech", company: "BualoiTech Co., Ltd.", url: "https://bualoi.tech/", logo: "/images/company/bualoi.jpg", status: "former", role: { th: "ประธานเจ้าหน้าที่บริหารร่วม", en: "Co-Chief Executive Officer", "zh-CN": "联席首席执行官" }, period: { th: "ม.ค. 2025 - ก.ย. 2025", en: "Jan 2025 - Sep 2025", "zh-CN": "2025年1月 - 2025年9月" } },
  { name: "REEZLIVE", company: "Feitian Co., Ltd.", url: "https://www.reezlive.com/", logo: "/images/company/reezlive.png", status: "former", role: { th: "ประธานเจ้าหน้าที่ฝ่ายเทคโนโลยี", en: "Chief Technology Officer", "zh-CN": "首席技术官" }, period: { th: "มี.ค. 2025 - ก.ย. 2025", en: "Mar 2025 - Sep 2025", "zh-CN": "2025年3月 - 2025年9月" } },
  { name: "Contester.life", company: "Contester Co., Ltd.", url: "https://contester.life/", logo: "/images/company/contester.jpg", status: "former", role: { th: "ผู้ร่วมก่อตั้ง", en: "Co-Founder", "zh-CN": "联合创始人" }, period: { th: "มี.ค. 2025 - ก.ย. 2025", en: "Mar 2025 - Sep 2025", "zh-CN": "2025年3月 - 2025年9月" } },
  { name: "Artmosphere", company: "Artmosphere Co., Ltd.", url: "https://artmosphere.cloud/", logo: "/images/company/artmosphere.png", status: "former", role: { th: "ประธานเจ้าหน้าที่ฝ่ายเทคโนโลยีและผู้ร่วมก่อตั้ง", en: "Chief Technology Officer & Co-Founder", "zh-CN": "首席技术官兼联合创始人" }, period: { th: "ม.ค. 2024 - พ.ค. 2025", en: "Jan 2024 - May 2025", "zh-CN": "2024年1月 - 2025年5月" } },
] as const;

const socials = [
  ["LinkedIn", "Podsawee Wanatham", "https://www.linkedin.com/in/podsawee-wanatham/", "/images/social-icons/linkedin.svg"],
  ["GitHub", "bosspod", "https://github.com/bosspod", "/images/social-icons/github.svg"],
  ["Facebook", "Podsawee Wanatham", "https://www.facebook.com/Podsawee.Wanatham", "/images/social-icons/facebook.svg"],
  ["Instagram", "boss_pod", "https://www.instagram.com/boss_pod/", "/images/social-icons/instagram.svg"],
] as const;

function SectionTitle({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: string; description?: string }) {
  return (
    <div className={styles.sectionTitle}>
      <p><span>{number}</span>{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <div className={styles.sectionDescription}>{description}</div> : null}
    </div>
  );
}

function SkillItems({ items }: { items: readonly string[] }) {
  return <dd>{items.map((item) => <span key={item}>{item}</span>)}</dd>;
}

export function ProfilePage({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  const p = profileUi[locale];

  return (
    <div className={styles.page}>
      <TechExperience />
      <a className={styles.skipLink} href="#main">Skip to content</a>

      <header className={styles.header}>
        <nav className={`${styles.shell} ${styles.nav}`} aria-label="Primary navigation">
          <Link href={profilePath(locale)} className={styles.brand} aria-label="Podsawee home">
            <Image src="/images/logo.png" width={42} height={42} alt="" priority />
            <span><strong>Podsawee</strong><small>WANATHAM</small></span>
          </Link>
          <div className={styles.navLinks}>
            <div className={styles.navMenu}>
              <a href="#companies">{m.nav.work}</a>
              <a href="#about">{m.nav.about}</a>
              <a href="#education">{p.educationEyebrow}</a>
              <a href="#contact">{m.nav.contact}</a>
            </div>
            <div className={styles.navControls}>
              <LanguageSwitcher locale={locale} label={m.nav.language} />
              <ThemeToggle lightLabel={p.light} darkLabel={p.dark} />
            </div>
          </div>
        </nav>
      </header>

      <main id="main">
        <section className={`${styles.shell} ${styles.hero}`} id="top">
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span />{m.hero.eyebrow}</p>
            <h1>{m.hero.name}</h1>
            <p className={styles.heroRole}>{p.entrepreneur}</p>
            <p className={styles.heroIntro}>{m.hero.intro}</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="https://www.linkedin.com/in/podsawee-wanatham/" target="_blank" rel="noopener noreferrer">{m.hero.cv}<span>↗</span></a>
              <a className={styles.textButton} href="#companies">{m.hero.explore}<span>↓</span></a>
            </div>
            <div className={styles.proof} aria-label={p.profile}>
              <div><strong>718+</strong><span>{p.followers}</span></div>
              <div><strong>500+</strong><span>{p.connections}</span></div>
              <div><strong>BKK</strong><span>{p.location}</span></div>
            </div>
          </div>

          <div className={styles.portraitCard}>
            <div className={styles.portraitTop}><span><i />{p.system}</span><b>01</b></div>
            <div className={styles.portraitFrame}>
              <Image src="/images/podsawee-portrait.jpg" alt="Podsawee Wanatham" fill sizes="(max-width: 780px) 88vw, 460px" style={{ objectFit: "cover", objectPosition: "center 30%" }} priority />
              <span className={styles.scanLine} aria-hidden="true" />
            </div>
            <div className={styles.portraitBottom}>
              <strong>COMPUTER ENGINEER<br />× ENTREPRENEUR</strong>
              <span>43.9808° N<br />15.3854° E</span>
            </div>
            <div className={styles.floatingChip}>PW · BKK</div>
          </div>
        </section>

        <div className={styles.marquee} aria-label={p.selectedStack}>
          <div>{["NEXT.JS", "TYPESCRIPT", "CYBER SECURITY", "PRODUCT", "REACT", "BUSINESS", "NEXT.JS", "TYPESCRIPT", "CYBER SECURITY", "PRODUCT", "REACT", "BUSINESS"].map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}</div>
        </div>

        <section className={`${styles.shell} ${styles.section}`} id="companies">
          <SectionTitle number="02" eyebrow={m.companies.eyebrow} title={m.companies.title} description={m.companies.intro} />
          <div className={styles.companyGroups}>
            {(["current", "former"] as const).map((status) => {
              const group = companies.filter((company) => company.status === status);
              return <div className={styles.companyGroup} key={status}>
                <div className={styles.companyGroupHeading}><h3><i data-status={status} />{status === "current" ? m.companies.current : m.companies.former}</h3><span>{String(group.length).padStart(2, "0")}</span></div>
                <div className={`${styles.companyGrid} ${status === "current" ? styles.companyGridCurrent : styles.companyGridFormer}`}>
                  {group.map((company, index) => (
                    <a className={styles.companyCard} key={company.name} href={company.url} target="_blank" rel="noopener noreferrer">
                      <div className={styles.companyCardTop}><span>{String(index + 1).padStart(2, "0")}</span><b>↗</b></div>
                      <div className={styles.companyLogo}><Image src={company.logo} alt={`${company.name} logo`} fill sizes="68px" /></div>
                      <h3>{company.name}</h3><p>{"description" in company ? company.description[locale] : company.company}</p>
                      <div className={styles.companyRole}><span>{company.period[locale]}</span><strong>{company.role[locale]}</strong></div>
                      <small>{m.companies.visit}</small>
                    </a>
                  ))}
                </div>
              </div>;
            })}
          </div>
          <a className={styles.inlineLink} href="https://www.linkedin.com/in/podsawee-wanatham/" target="_blank" rel="noopener noreferrer">in&nbsp; {m.companies.experience} ↗</a>
        </section>

        <section className={styles.about} id="about">
          <div className={`${styles.shell} ${styles.aboutGrid}`}>
            <div className={styles.aboutIntro}>
              <div className={styles.aboutVisual}>
                <span>ENGINEERING × BUSINESS</span>
              </div>
              <SectionTitle number="03" eyebrow={m.about.eyebrow} title={m.about.title} />
              <div className={styles.aboutStory}><p>{m.about.body}</p><p>{m.about.body2}</p></div>
              <div className={styles.aboutPrinciple}><span aria-hidden="true">✦</span><p>{m.about.principle}</p></div>
            </div>
            <div className={styles.skillGrid}>
              <article><span>01</span><h3>{m.about.programming}</h3><p className={styles.skillIntro}>{m.about.programmingIntro}</p><dl><div><dt>{m.about.frontend}</dt><SkillItems items={["HTML", "CSS", "Tailwind", "React", "Next.js", "Svelte"]} /></div><div><dt>{m.about.backend}</dt><SkillItems items={["JavaScript", "TypeScript", "PHP", "Node.js"]} /></div><div><dt>{m.about.languages}</dt><SkillItems items={["C", "C++", "C#", "Python", "Java", "Perl"]} /></div><div><dt>{m.about.database}</dt><SkillItems items={["MariaDB", "MySQL", "PostgreSQL", "MongoDB"]} /></div></dl></article>
              <article><span>02</span><h3>{m.about.cybersecurity}</h3><p className={styles.skillIntro}>{m.about.cybersecurityIntro}</p><dl><div><dt>{m.about.security}</dt><SkillItems items={["Wireshark", "Metasploit", "Command Line"]} /></div><div><dt>{m.about.infrastructure}</dt><SkillItems items={["CentOS", "Kali Linux", "Ubuntu", "macOS", "Windows"]} /></div></dl></article>
              <article><span>03</span><h3>{m.about.business}</h3><p className={styles.skillIntro}>{m.about.businessIntro}</p><dl><div><dt>{m.about.management}</dt><SkillItems items={["Data Analysis", "Management", "Branding", "Strategy"]} /></div><div><dt>{m.about.marketing}</dt><SkillItems items={["Digital Marketing", "Public Relations", "Emerging Trends"]} /></div><div><dt>{m.about.finance}</dt><SkillItems items={["Accounting", "Business Tax", "Financial Analysis"]} /></div></dl></article>
            </div>
          </div>
        </section>

        <section className={`${styles.shell} ${styles.section}`} id="education">
          <SectionTitle number="04" eyebrow={p.educationEyebrow} title={p.educationTitle} />
          <div className={styles.educationList}>
            {educations.map((education, index) => (
              <article className={styles.educationCard} key={education.name.en}>
                <span className={styles.educationIndex}>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.educationLogo} style={{ background: education.logoBackground }}><Image src={education.logo} alt={`${education.name[locale]} logo`} fill sizes="84px" style={{ objectFit: "contain", padding: 9 }} /></div>
                <div className={styles.educationCopy}><p>{education.period[locale]}</p><h3>{education.name[locale]}</h3><strong>{education.credential[locale]}</strong><small>{education.detail[locale]}</small></div>
                <b aria-hidden="true">↗</b>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.awards} id="awards">
          <div className={`${styles.shell} ${styles.awardsGrid}`}>
            <div className={styles.awardsIntro}>
              <SectionTitle number="05" eyebrow={p.awardsEyebrow} title={p.awardsTitle} description={p.awardsIntro} />
              <div className={styles.awardMeta} aria-label={p.awardsEyebrow}>
                <span><strong>{String(awards.length).padStart(2, "0")}</strong><small>{p.awardsEyebrow}</small></span>
                <span><strong>฿5.25M+</strong><small>{p.grantFunding}</small></span>
              </div>
              <a className={styles.awardsLink} href="https://www.linkedin.com/in/podsawee-wanatham/" target="_blank" rel="noopener noreferrer"><span>in</span>{p.viewLinkedIn}<b>↗</b></a>
            </div>
            <div className={styles.awardList}>
              {awards.map((award, index) => (
                <article key={`${award.title}-${award.org}`}>
                  <div className={styles.awardCardTop}><span>{award.year}</span><em>{String(index + 1).padStart(2, "0")}</em></div>
                  <span className={styles.awardStar} aria-hidden="true">✦</span>
                  <div><h3>{award.title}</h3><p>{award.org}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.shell} ${styles.section} ${styles.contact}`} id="contact">
          <SectionTitle number="06" eyebrow={m.contact.eyebrow} title={m.contact.title} description={m.contact.intro} />
          <div className={styles.contactGrid}>
            <a className={styles.contactPrimary} href="mailto:me@podsawee.com"><span className={styles.contactType}><i className={`${styles.contactIcon} ${styles.emailIcon}`} aria-hidden="true">@</i><span>EMAIL</span></span><strong>me@podsawee.com</strong><em>{m.contact.email} ↗</em></a>
            <a className={styles.contactPrimary} href="tel:+66980004200"><span className={styles.contactType}><i className={`${styles.contactIcon} ${styles.phoneIcon}`} aria-hidden="true" /><span>PHONE</span></span><strong>+66 (0)98-000-4200</strong><em>{m.contact.call} ↗</em></a>
            {socials.map(([name, handle, url, icon]) => <a className={styles.socialCard} key={name} href={url} target="_blank" rel="noopener noreferrer"><Image src={icon} width={26} height={26} alt="" /><div><span>{name}</span><strong>{handle}</strong></div><em>↗</em></a>)}
          </div>
        </section>
      </main>

      <footer className={styles.footer}><div className={styles.shell}><p>© 2020–2026 Podsawee Wanatham. {m.footer.note}</p><a href="#top">{m.footer.top} ↑</a></div></footer>
    </div>
  );
}
