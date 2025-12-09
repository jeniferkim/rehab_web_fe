// ExerciseLog[] → DayStatusMeta 변환 헬퍼
// src/utils/buildDayStatusFromLogs.ts

import type { ExerciseLog } from "../types/apis/exerciseLog";
import type { DayStatusMeta, DayCompletionStatus } from "../mocks/calendarStatusMock";

/**
 * 하루치 ExerciseLog[] 를 받아서
 * DayStatusMeta(완료/미완료/휴식, streak, 통증 등)로 변환하는 헬퍼.
 *
 * DayStatusMeta는 mockDayStatusByDate와 동일한 형태.
 */

export const buildDayStatusFromLogs = (
  logs: ExerciseLog[],
): DayStatusMeta => {

  // -----------------------------
  // 1) 로그가 아예 없는 날 → 휴식(rest)
  // -----------------------------
  if (!logs || logs.length === 0) {
    return {
      completionStatus: "rest",
      streakCount: 0,
      painScore: undefined,
      hasExercise: false,
      hasMedication: false,
      hasReminder: false,
    };
  }

  // -----------------------------
  // 2) 완료/미완료 상태 계산
  // -----------------------------
  const completed = logs.some(
    (log) => (log.completionRate ?? 0) >= 80,
  );

  const partiallyDone = logs.some(
    (log) =>
      (log.completionRate ?? 0) > 0 &&
      (log.completionRate ?? 0) < 80,
  );

  let completionStatus: DayCompletionStatus;
  if (completed) {
    completionStatus = "done";
  } else if (partiallyDone) {
    completionStatus = "pending";
  } else {
    // completionRate 전부 0인 경우 or 측정 X
    completionStatus = "rest";
  }

  // -----------------------------
  // 3) painScore 계산 (painAfter 평균)
  // -----------------------------
  const painAfterValues = logs
    .map((log) => log.painAfter)
    .filter((v): v is number => typeof v === "number");

  let painScore: number | undefined = undefined;

  if (painAfterValues.length > 0) {
    const avg =
      painAfterValues.reduce((sum, v) => sum + v, 0) /
      painAfterValues.length;
    painScore = Math.round(avg); // 4.2 → 4, 4.6 → 5
  }

  // -----------------------------
  // 4) hasExercise / hasMedication / hasReminder
  //    → 일단 ExerciseLog에는 운동 정보밖에 없으므로
  //       운동은 true, 나머지는 false 로 설정.
  //    (나중에 약/리마인더 로그 생기면 여기에서 확장)
  // -----------------------------
  const hasExercise = logs.length > 0;
  const hasMedication = false; // 추후 medication log interface 생기면 교체
  const hasReminder = false;

  return {
    completionStatus,
    streakCount: 0, // 여러 날짜 DayStatus 생성 후 채우는 단계에서 계산
    painScore,
    hasExercise,
    hasMedication,
    hasReminder,
  };
};
