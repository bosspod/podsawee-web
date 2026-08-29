"use client";

import { useMemo, useState } from "react";
import { calculateGpa, calculateGpax, gradePoints, type LetterGrade } from "@/lib/grade/calculateGrade";
import type { Messages } from "@/lib/i18n/config";

type Row = { id: number; subject: string; grade: LetterGrade; credits: string };
const initialRows: Row[] = [
  { id: 1, subject: "", grade: "A", credits: "3" },
  { id: 2, subject: "", grade: "B+", credits: "3" },
  { id: 3, subject: "", grade: "A", credits: "2" },
];

export function GradeCalculator({ messages: m }: { messages: Messages["grade"] }) {
  const [mode, setMode] = useState<"gpa" | "gpax">("gpa");
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [showResult, setShowResult] = useState(false);
  const [oldGpa, setOldGpa] = useState("3.25");
  const [oldCredits, setOldCredits] = useState("60");
  const [termGpa, setTermGpa] = useState("3.75");
  const [termCredits, setTermCredits] = useState("18");

  const result = useMemo(() => mode === "gpa"
    ? calculateGpa(rows.map((row) => ({ grade: row.grade, credits: Number(row.credits) })))
    : calculateGpax(Number(oldGpa), Number(oldCredits), Number(termGpa), Number(termCredits)),
    [mode, rows, oldGpa, oldCredits, termGpa, termCredits]);

  function updateRow(id: number, key: keyof Row, value: string) {
    setRows((current) => current.map((row) => row.id === id ? { ...row, [key]: value } : row));
    setShowResult(false);
  }

  function reset() {
    setRows(initialRows); setOldGpa("3.25"); setOldCredits("60"); setTermGpa("3.75"); setTermCredits("18"); setShowResult(false);
  }

  return (
    <section className="calculator-card" id="calculator" aria-labelledby="calculator-title">
      <div className="calculator-heading"><div><p className="grade-label">CALCULATOR</p><h2 id="calculator-title">{m.calculatorTitle}</h2><p>{m.calculatorIntro}</p></div><span className="calculator-badge" aria-hidden="true">∑</span></div>
      <div className="mode-tabs" role="tablist" aria-label={m.calculatorTitle}>
        <button role="tab" aria-selected={mode === "gpa"} onClick={() => { setMode("gpa"); setShowResult(false); }}>{m.gpa}</button>
        <button role="tab" aria-selected={mode === "gpax"} onClick={() => { setMode("gpax"); setShowResult(false); }}>{m.gpax}</button>
      </div>

      {mode === "gpa" ? <div className="course-list">
        <div className="course-head"><span>{m.subject}</span><span>{m.gradeLabel}</span><span>{m.credits}</span><span /></div>
        {rows.map((row, index) => <div className="course-row" key={row.id}>
          <label><span className="mobile-label">{m.subject}</span><input value={row.subject} onChange={(e) => updateRow(row.id, "subject", e.target.value)} placeholder={`${m.subject} ${index + 1}`} /></label>
          <label><span className="mobile-label">{m.gradeLabel}</span><select value={row.grade} onChange={(e) => updateRow(row.id, "grade", e.target.value)}>{Object.keys(gradePoints).map((grade) => <option key={grade}>{grade}</option>)}</select></label>
          <label><span className="mobile-label">{m.credits}</span><input type="number" inputMode="decimal" min="0" step="0.5" value={row.credits} onChange={(e) => updateRow(row.id, "credits", e.target.value)} /></label>
          <button className="remove-row" onClick={() => { setRows((current) => current.filter((item) => item.id !== row.id)); setShowResult(false); }} aria-label={`${m.remove} ${index + 1}`} disabled={rows.length === 1}>×</button>
        </div>)}
        <button className="add-row" onClick={() => setRows((current) => [...current, { id: Date.now(), subject: "", grade: "A", credits: "3" }])}>＋ {m.add}</button>
      </div> : <div className="gpax-grid">
        {[[m.previousGpa, oldGpa, setOldGpa, 4, ".01"], [m.previousCredits, oldCredits, setOldCredits, 999, ".5"], [m.currentGpa, termGpa, setTermGpa, 4, ".01"], [m.currentCredits, termCredits, setTermCredits, 999, ".5"]].map(([label, value, setter, max, step]) => <label key={label as string}><span>{label as string}</span><input type="number" min="0" max={max as number} step={step as string} value={value as string} onChange={(e) => { (setter as (v: string) => void)(e.target.value); setShowResult(false); }} /></label>)}
      </div>}

      {showResult && <div className={`grade-result ${result ? "valid" : "invalid"}`} role="status" aria-live="polite">
        {result ? <><span>{m.result}</span><strong>{result.value.toFixed(2)}</strong><small>{m.totalCredits}: {result.credits}</small></> : <p>{m.empty}</p>}
      </div>}
      <div className="calculator-actions"><button className="grade-button" onClick={() => setShowResult(true)}>{m.calculate} →</button><button className="reset-button" onClick={reset}>{m.reset}</button></div>
    </section>
  );
}
