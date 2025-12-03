// src/types/apis/calendar.ts
export type DayCompletionStatus = "done" | "pending" | "rest";

export type CalendarDayMeta = {
  date: string; // ISO string: "2025-12-04"
  completionStatus: DayCompletionStatus;

  // streak / 통증
  streakCount: number;       // 오늘까지 연속 일수
  painScore?: number;        // 1~10, 없으면 미기록

  // 오늘 할 일 존재 여부
  hasExercise: boolean;
  hasMedication: boolean;
  hasReminder: boolean;
};

export type CalendarDayMetaMap = Record<string, CalendarDayMeta>;
