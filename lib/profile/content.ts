import type { Locale } from "@/lib/i18n/config";

export const profileUi = {
  th: {
    light: "เปลี่ยนเป็นโหมดสว่าง", dark: "เปลี่ยนเป็นโหมดมืด", profile: "โปรไฟล์", entrepreneur: "ผู้ประกอบการ · นักพัฒนาฟูลสแตก · ความปลอดภัยไซเบอร์", location: "กรุงเทพมหานคร ประเทศไทย", followers: "ผู้ติดตามบน LinkedIn", connections: "คอนเนกชัน", system: "ระบบพร้อมทำงาน", signal: "สัญญาณดิจิทัลจากกรุงเทพฯ", selectedStack: "เทคโนโลยีที่ใช้งาน",
    educationEyebrow: "การศึกษาและการรับรอง", educationTitle: "เรียนรู้อย่างต่อเนื่อง ทั้งในและนอกห้องเรียน",
    awardsEyebrow: "รางวัลและความสำเร็จ", awardsTitle: "หมุดหมายบนเส้นทางการสร้างนวัตกรรม", awardsIntro: "รวมทุนสนับสนุนโครงการ รางวัลชนะเลิศ และเวทีนวัตกรรมที่เข้าร่วมทั้งหมด", grantFunding: "ทุนสนับสนุนโครงการรวม",
    viewLinkedIn: "ดูโปรไฟล์ฉบับเต็มบน LinkedIn",
  },
  en: {
    light: "Switch to light mode", dark: "Switch to dark mode", profile: "Profile", entrepreneur: "Entrepreneur · Full-Stack Developer · Cyber Security", location: "Bangkok, Thailand", followers: "LinkedIn followers", connections: "connections", system: "System online", signal: "Digital signal from Bangkok", selectedStack: "Selected technology stack",
    educationEyebrow: "Education & credentials", educationTitle: "Continuous learning, in and beyond the classroom",
    awardsEyebrow: "Awards & achievements", awardsTitle: "Milestones along the builder's journey", awardsIntro: "The complete collection of project grants, championship titles, and innovation milestones.", grantFunding: "total project grants",
    viewLinkedIn: "View the complete profile on LinkedIn",
  },
  "zh-CN": {
    light: "切换到浅色模式", dark: "切换到深色模式", profile: "个人资料", entrepreneur: "创业者 · 全栈开发者 · 网络安全", location: "泰国曼谷", followers: "LinkedIn 关注者", connections: "人脉", system: "系统在线", signal: "来自曼谷的数字信号", selectedStack: "精选技术栈",
    educationEyebrow: "教育与认证", educationTitle: "课堂内外，持续学习",
    awardsEyebrow: "奖项与成就", awardsTitle: "创新实践路上的里程碑", awardsIntro: "完整收录项目资助、冠军荣誉与创新赛事经历。", grantFunding: "项目资助总额",
    viewLinkedIn: "在 LinkedIn 查看完整资料",
  },
} satisfies Record<Locale, Record<string, string>>;

export const educations = [
  {
    name: { th: "วิทยาลัยพาณิชย์กว่างโจว (广州商学院)", en: "Guangzhou College of Commerce (广州商学院)", "zh-CN": "广州商学院" },
    credential: { th: "ธุรกิจจีน - ภาษาจีน", en: "Chinese Business - Chinese Language", "zh-CN": "中国商务 - 汉语" },
    detail: { th: "ทุนการศึกษามหาลัย", en: "University Scholarship", "zh-CN": "大学奖学金" },
    period: { th: "ต.ค. 2026 - พ.ค. 2027", en: "Oct 2026 - May 2027", "zh-CN": "2026年10月 - 2027年5月" },
    logo: "/images/education/guangzhou-commerce.png",
    logoBackground: "#fff",
  },
  {
    name: { th: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี", en: "King Mongkut's University of Technology Thonburi", "zh-CN": "吞武里先皇技术大学" },
    credential: { th: "วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมคอมพิวเตอร์ (หลักสูตรนานาชาติ)", en: "Bachelor of Engineering in Computer Engineering (International Program)", "zh-CN": "计算机工程学士（国际课程）" },
    detail: { th: "ทุนเจียระไนเพชร", en: "Chiaranaiphet Scholarship", "zh-CN": "Chiaranaiphet 奖学金" },
    period: { th: "2022 - 2026 · สำเร็จการศึกษา", en: "2022 - 2026 · Graduated", "zh-CN": "2022 - 2026 · 已毕业" },
    logo: "/images/education/kmutt.png",
    logoBackground: "#fff",
  },
  {
    name: { th: "จุฬาลงกรณ์มหาวิทยาลัย", en: "Chulalongkorn University", "zh-CN": "朱拉隆功大学" },
    credential: { th: "ประกาศนียบัตรบริหารธุรกิจ ด้านการจัดการและบริหารธุรกิจ", en: "Diploma of Business Administration - Management & Business Administration", "zh-CN": "工商管理文凭 - 管理与工商管理" },
    detail: { th: "หลักสูตร MBA", en: "MBA program", "zh-CN": "MBA 课程" },
    period: { th: "พ.ค. 2024 - ก.ค. 2024", en: "May 2024 - Jul 2024", "zh-CN": "2024年5月 - 2024年7月" },
    logo: "/images/education/chula.svg",
    logoBackground: "#fff",
  },
  {
    name: { th: "โรงเรียนอัสสัมชัญ", en: "Assumption College", "zh-CN": "易三仓书院" },
    credential: { th: "มัธยมศึกษาตอนปลาย แผนการเรียนคณิตศาสตร์-วิทยาศาสตร์-เทคโนโลยี", en: "High School - Mathematics, Science & Technology", "zh-CN": "高中 - 数学、科学与技术方向" },
    detail: { th: "เกรดเฉลี่ย 3.66 · เกียรติบัตรความประพฤติและความขยันหมั่นเพียร", en: "GPA 3.66 · Good Conduct and Diligence Certificate", "zh-CN": "GPA 3.66 · 品行与勤学证书" },
    period: { th: "พ.ค. 2010 - มี.ค. 2022", en: "May 2010 - Mar 2022", "zh-CN": "2010年5月 - 2022年3月" },
    logo: "/images/education/assumption.png",
    logoBackground: "#10245a",
  },
  {
    name: { th: "สถาบัน Expert Programming Tutor", en: "Expert Programming Tutor Institute", "zh-CN": "Expert Programming Tutor 学院" },
    credential: { th: "ประกาศนียบัตรการเขียนโปรแกรม Java และการเขียนโปรแกรมเชิงวัตถุ", en: "Institute Certificate in Java Programming & OOP", "zh-CN": "Java 编程与面向对象编程证书" },
    detail: { th: "หลักสูตร J104", en: "J104 program", "zh-CN": "J104 课程" },
    period: { th: "เม.ย. 2019 - ต.ค. 2019", en: "Apr 2019 - Oct 2019", "zh-CN": "2019年4月 - 2019年10月" },
    logo: "/images/education/ept.gif",
    logoBackground: "#fff",
  },
] as const;

export const awards = [
  { year: "2025", title: "LCS Project Grant · 1,500,000 THB", org: "TED Fund · Batch 1/2025" },
  { year: "2024", title: "MEHUG Project Grant · 1,290,000 THB", org: "TED Fund · Batch 1/2024" },
  { year: "GRANT", title: "Artmosphere Project Grant · 1,200,000 THB", org: "TED Fund" },
  { year: "GRANT", title: "MEHUG Project Grant · 1,200,000 THB", org: "National Innovation Agency (NIA)" },
  { year: "GRANT", title: "MEHUG Project Grant · 1,000,000 THB", org: "Safe and Creative Media Development Fund" },
  { year: "GRANT", title: "AC METAVERSE", org: "Bangkok Bank Public Company Limited" },
  { year: "CHAMPION", title: "Champion", org: "U Power Digital Idea Challenge Season 7" },
  { year: "CHAMPION", title: "Champion", org: "Seub-ngob Prathetthai Competition Season 1" },
  { year: "NATIONAL", title: "National Level", org: "Startup Thailand League Season 8" },
  { year: "FINALIST", title: "Regional Finalist", org: "Nin-Mangkon: The Reality Season 2" },
  { year: "AWARD", title: "Innovation Award", org: "UBI Central Region" },
  { year: "20+", title: "Participated in 20+ additional startup and innovation competitions", org: "Startup & Innovation Competitions" },
] as const;
