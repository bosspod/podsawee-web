export const gradePoints = {
  A: 4,
  "B+": 3.5,
  B: 3,
  "C+": 2.5,
  C: 2,
  "D+": 1.5,
  D: 1,
  F: 0,
} as const;

export type LetterGrade = keyof typeof gradePoints;
export type Course = { grade: LetterGrade; credits: number };

export function calculateGpa(courses: Course[]) {
  const valid = courses.filter((course) => Number.isFinite(course.credits) && course.credits > 0);
  const credits = valid.reduce((sum, course) => sum + course.credits, 0);
  if (!credits) return null;
  const points = valid.reduce((sum, course) => sum + gradePoints[course.grade] * course.credits, 0);
  return { value: points / credits, credits, points };
}

export function calculateGpax(previousGpa: number, previousCredits: number, currentGpa: number, currentCredits: number) {
  const values = [previousGpa, previousCredits, currentGpa, currentCredits];
  if (values.some((value) => !Number.isFinite(value)) || previousGpa < 0 || currentGpa < 0 || previousGpa > 4 || currentGpa > 4 || previousCredits < 0 || currentCredits < 0) return null;
  const credits = previousCredits + currentCredits;
  if (!credits) return null;
  return { value: (previousGpa * previousCredits + currentGpa * currentCredits) / credits, credits };
}
