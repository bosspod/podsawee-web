import assert from "node:assert/strict";
import test from "node:test";
import { calculateGpa, calculateGpax } from "../lib/grade/calculateGrade.ts";

test("weighted GPA matches the Thai 4-point formula", () => {
  assert.equal(calculateGpa([{ grade: "A", credits: 3 }, { grade: "B+", credits: 3 }, { grade: "A", credits: 2 }])?.value, 3.8125);
});

test("F contributes credits with zero grade points", () => {
  assert.equal(calculateGpa([{ grade: "A", credits: 3 }, { grade: "F", credits: 3 }])?.value, 2);
});

test("GPAX combines weighted term averages", () => {
  assert.equal(calculateGpax(3.25, 60, 3.75, 18)?.value, 3.3653846153846154);
});
