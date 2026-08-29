import type { Metadata } from "next";
import Link from "next/link";
import { notoSansThai } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — ไม่พบหน้าที่ต้องการ | Podsawee",
  description: "ไม่พบหน้าที่คุณกำลังค้นหา กลับไปยังหน้าแรกหรือใช้โปรแกรมคำนวณเกรด GPA และ GPAX",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return <html lang="th">
    <body className={notoSansThai.variable} style={{ background: "#071018", color: "#edf8ff" }}>
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
        <section style={{ width: "min(100%, 620px)", padding: "48px 32px", border: "1px solid rgba(1,171,255,.28)", borderRadius: 24, background: "#0c1c27", textAlign: "center" }}>
          <p style={{ margin: 0, color: "#01abff", fontSize: ".8rem", fontWeight: 800, letterSpacing: ".14em" }}>ERROR 404</p>
          <h1 style={{ margin: "18px 0 12px", fontSize: "clamp(2rem, 8vw, 4rem)", lineHeight: 1.1 }}>ไม่พบหน้าที่ต้องการ</h1>
          <p style={{ margin: "0 auto 30px", maxWidth: 480, color: "#9bb1be", lineHeight: 1.75 }}>ลิงก์อาจไม่ถูกต้องหรือหน้านี้ถูกย้ายแล้ว คุณสามารถกลับหน้าแรกหรือไปยังโปรแกรมคำนวณเกรดได้</p>
          <nav aria-label="ลิงก์ที่เป็นประโยชน์" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link href="/" style={{ padding: "12px 20px", borderRadius: 999, background: "#01abff", color: "#071018", fontWeight: 800, textDecoration: "none" }}>กลับหน้าแรก</Link>
            <Link href="/grade" style={{ padding: "12px 20px", border: "1px solid rgba(1,171,255,.5)", borderRadius: 999, color: "#edf8ff", fontWeight: 800, textDecoration: "none" }}>คำนวณ GPA / GPAX</Link>
          </nav>
        </section>
      </main>
    </body>
  </html>;
}
