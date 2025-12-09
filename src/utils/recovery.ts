// src/utils/recovery.ts
import type { ExerciseLog } from "../types/apis/exerciseLog";

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

/** 단일 날짜 로그 리스트 → 회복 점수 0~100 */
export const calculateDailyRecoveryScore = (logs: ExerciseLog[]): number => {
  if (!logs.length) return 0;

  const completionAvg =
    logs.reduce((sum, log) => sum + (log.completionRate ?? 0), 0) /
    logs.length;

  let improvementSum = 0;
  let improvementCount = 0;

  logs.forEach((log) => {
    if (
      typeof log.painBefore === "number" &&
      typeof log.painAfter === "number"
    ) {
      const diff = log.painBefore - log.painAfter;
      if (diff > 0) {
        improvementSum += diff;
        improvementCount += 1;
      }
    }
  });

  const improvementAvg =
    improvementCount > 0 ? improvementSum / improvementCount : 0; // 0~10 가정

  const score =
    completionAvg * 0.6 + // 완수도 비중 60%
    improvementAvg * 5 * 0.4; // 개선(0~10) → 0~50점, 비중 40%

  return Math.round(clamp(score, 0, 100));
};

/**
 * 여러 날짜별 로그 맵 + 기준 날짜 → streak 계산
 * logsByDate: { "2025-12-08": ExerciseLog[], "2025-12-07": [...] }
 */
export const calculateStreak = (params: {
  logsByDate: Record<string, ExerciseLog[]>;
  today: string; // YYYY-MM-DD
}): number => {
  const { logsByDate, today } = params;

  const dateToObj = (s: string) => {
    const [y, m, d] = s.split("-").map((v) => Number(v));
    return new Date(y, m - 1, d);
  };

  const objToDateStr = (d: Date) => {
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  let streak = 0;
  let cur = dateToObj(today);

  // 최대 365일 정도만 확인 (무한 루프 방지)
  for (let i = 0; i < 365; i += 1) {
    const key = objToDateStr(cur);
    const logs = logsByDate[key] ?? [];

    const hasCompleted = logs.some((log) => (log.completionRate ?? 0) >= 80);

    if (!hasCompleted) break;

    streak += 1;
    cur.setDate(cur.getDate() - 1);
  }

  return streak;
};
