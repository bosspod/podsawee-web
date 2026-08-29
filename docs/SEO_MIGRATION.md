# Legacy audit and SEO migration report

Audit date: 2026-08-28. Source of truth: `old_code/index.php`, `old_code/grade.php`, and `old_code/assets/style.css`. The legacy directory remains untouched.

## Source limitations

The repository initially contained only those three legacy files. Referenced images were absent locally, so owned profile imagery, the primary logo, seven company logos, and the grade social thumbnail were retrieved from their original `podsawee.com` URLs on 2026-08-28 and stored under `public/images/`. Referenced scripts, stylesheets, the grade advertisement, and the old localization dictionaries remain absent. Several strings in `old_code/index.php` are mojibake or broken HTML entities. The email obfuscation is corrupted in the checked-in source; the migration uses `me@podsawee.com`, which should be confirmed before deployment.

The profile's education, selected projects, awards, certifications, public follower count, location, and professional positioning were updated from the public LinkedIn profile at `linkedin.com/in/podsawee-wanatham/` on 2026-08-28. Entries whose titles were hidden on the public page were not inferred.

Despite the brief's reference to PHP calculator logic, `old_code/grade.php` contains no PHP or calculator form/business logic. It is a static Thai marketing page that links to the calculator on `lcs.site`. The migration preserves the page's search intent and LCS links, then adds a browser-only GPA/GPAX calculator using the standard Thai 4-point weighted-average formula.

## Legacy profile baseline (`/`)

| Element | Legacy value |
| --- | --- |
| URL | `https://podsawee.com/` |
| Title | `Podsawee Wanatham` |
| Description | `Podsawee Wanatham \| E-Portfolio , E-Yearbook , Covid Report , S-URL` |
| Canonical | Missing |
| Robots | Missing (default indexable) |
| Open Graph | Website, Home \| Podsawee, root URL, missing referenced thumbnail |
| Twitter | `summary_large_image` |
| H1 | Podsawee Wanatham |
| Main content | Hero, seven companies/organizations, About/skills, contact and social cards |
| Internal links | Page anchors; the former `/cv` CTA now points directly to LinkedIn |
| External links | Station Group, Learning Center Station, Contester, BualoiTech, REEZLIVE, ME HUG, Artmosphere, LinkedIn, GitHub, Facebook, Instagram |
| Images | Profile, portrait, and company logos referenced but absent; most company alts are present, hero alt is empty |
| Structured data | None |
| JavaScript | Theme toggle, skill panels, localization, ScrollReveal, Swiper and MixItUp referenced but source files absent |

Legacy visible content retained: Podsawee's name, Full-Stack Developer role, company names and legal/parent descriptions, the programming/cybersecurity/business positioning, enumerated programming stack, phone, social accounts, LinkedIn profile, and company links. The new page does not reproduce corrupted or unverifiable text.

## Legacy grade baseline (`/grade`)

| Element | Legacy value |
| --- | --- |
| URL / status | `/grade` expected 200; legacy canonical uses `/grade/` |
| Title | `โปรแกรมคำนวณเกรดGPA และGPAX ออนไลน์ฟรี\| Podsawee` |
| Description | Free GPA/GPAX calculator; subject and cumulative calculation; Podsawee and LCS attribution |
| Keywords | โปรแกรมคำนวณเกรด, common misspelling โปรแกรมคำนวนเกรด, คำนวณ GPA, คำนวณ GPAX, Grade Calculator, LCS |
| Canonical | `https://podsawee.com/grade/` |
| Robots | `index, follow, max-snippet:-1, max-image-preview:large` plus Googlebot equivalent |
| Open Graph / Twitter | Thai title/description, `th_TH`, legacy thumbnail URL |
| H1 | โปรแกรมคำนวณเกรด GPA และ GPAX ออนไลน์ฟรี |
| H2 groups | Benefits/features, three-step instructions, FAQ, final CTA |
| Main content | Thai calculator-focused landing content and three visible FAQs |
| Links | Home/profile, page anchor, tracked LCS calculator CTAs, LCS home, doodee-future advertisement |
| Images | Logo/favicon, social thumbnail, and advertisement are referenced but absent from repository |
| Structured data | WebPage, WebApplication, Person, FAQPage |
| Calculator logic | None in the checked-in page; all CTAs lead to `lcs.site/grade-calculator` |

The advertisement was not migrated because its image asset is missing and including a broken advertising link would reduce quality. The tracked LCS calculator/content relationship is retained.

## Brand / CI extraction

The legacy profile uses Poppins/Kanit, a dark navy background (`hsl(219 48% 8%)`), navy surfaces (`hsl(219 32% 12%)`), cyan (`hsl(203 93% 64%)`), rounded cards/buttons, blue gradients, and a light-theme option. The legacy grade page uses white and pale-blue surfaces, dark navy text (`#172554`), cyan (`#36a9ed`), blue (`#087bec`), 10–16 px radii, and raised blue buttons.

The rebuild turns these into shared design tokens in `app/globals.css`. The profile remains dark, technical, cyan-led, and monospaced in its small labels. `/grade` deliberately keeps the established light-blue LCS identity. No legacy stylesheet is imported.

## Old vs new SEO comparison

| SEO element | Legacy | Next.js | Result |
| --- | --- | --- | --- |
| Ranking URL | `/grade` with slash canonical | `/grade`, direct 200 | Preserved; no redirect to another page |
| PHP aliases | `/grade.php`, `/index.php` | Permanent redirects to canonical routes | Improved migration safety |
| Indexability | Explicit index/follow on grade | Explicit Metadata API robots on all routes | Preserved |
| Title/description | Thai keyword-led | Thai keyword-led, natural spacing and same intent | Preserved/improved |
| Canonical | Absolute trailing-slash grade URL | Absolute effective `/grade` URL | Self-consistent with deployed route |
| H1 | GPA/GPAX calculator intent | Same Thai GPA/GPAX calculator intent | Preserved |
| H2/H3 | Features, steps, FAQ | Same semantic groups | Preserved |
| Main content | Server-delivered landing content | Fully prerendered content plus calculator | Improved |
| Internal links | Root and anchors | Root, anchors, calculator, locale routes | Improved |
| External links | LCS CTAs | Tracked LCS CTA retained with safe rel | Preserved |
| Images/alts | Referenced assets absent locally | Owned images restored from the live site with descriptive alts and Next.js optimization | Restored/improved |
| Structured data | WebPage, WebApplication, Person, FAQ | Accurate WebPage/WebApplication/FAQ; Person on profile | Preserved/improved |
| Multilingual | Thai grade, JS-switched profile | Static locale URLs, canonicals and hreflang | Improved |
| Search intent | Thai students seeking GPA/GPAX tool | Same, with working on-page tool | Preserved/improved |

## Deployment and post-deployment checklist

- Configure the platform so Next.js handles `/`, `/grade`, `/en`, `/en/grade`, `/zh-CN`, and `/zh-CN/grade` directly.
- Confirm the production proxy does not append a second redirect around `/grade`; one stable 200 URL is required.
- Confirm `me@podsawee.com` with the site owner.
- Decide whether to restore an owned 1200×630 social image before launch; do not reuse an absent legacy path.
- Crawl all sitemap URLs and verify 200 status, self-canonical, correct language, hreflang reciprocity, and rendered headings.
- Validate JSON-LD with Schema.org/Google tools. FAQ markup mirrors visible content but does not imply eligibility for rich results.
- Run mobile and desktop Lighthouse in the production-like environment. Targets: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥95.
- Test keyboard controls, small-screen wrapping, calculator error states, and reduced-motion mode in a real browser. In-app browser visual QA was unavailable during this implementation session.
- Check Google Search Console indexing, sitemap processing, canonical selection, Core Web Vitals, crawl errors, and `/grade` queries immediately after release and weekly for at least four weeks.
- Keep `old_code/` until rankings, crawl state, analytics, and production behavior are confirmed.
