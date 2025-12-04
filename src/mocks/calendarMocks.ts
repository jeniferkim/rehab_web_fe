// 캘린더 페이지 mock
// mockEventsByDate 같은 “날짜별 스케줄”

import type { CalendarEvent } from "../components/calendar/DayScheduleList";
import type { CalendarDayMetaMap } from "../types/apis/calendar";

// 오늘 해야 할 일정 리스트
export const mockEventsByDate: Record<string, CalendarEvent[]> = {
  "2025-12-04": [
    {
      id: "1",
      time: "09:00",
      type: "exercise",
      title: "허리 통증 완화 루틴",
      done: true,
    },
    {
      id: "2",
      time: "13:00",
      type: "medicine",
      title: "점심 약 복용 (진통제)",
    },
    {
      id: "3",
      time: "18:00",
      type: "meal",
      title: "저녁 식사 (단백질 위주)",
    },
  ],
};

// 날짜별 오늘 완료/상태/통증/streak 상태 요약
export const mockDayMetaByDate: CalendarDayMetaMap = {
  "2025-12-01": {
    date: "2025-12-01",
    completionStatus: "done",
    streakCount: 5,
    painScore: 3,
    hasExercise: true,
    hasMedication: false,
    hasReminder: false,
  },
  "2025-12-02": {
    date: "2025-12-02",
    completionStatus: "pending",
    streakCount: 6,
    hasExercise: true,
    hasMedication: true,
    hasReminder: true,
  },
  "2025-12-03": {
    date: "2025-12-03",
    completionStatus: "rest",
    streakCount: 0,
    hasExercise: false,
    hasMedication: true,
    hasReminder: false,
  },
  "2025-12-04": {
    date: "2025-12-04",
    completionStatus: "pending",
    streakCount: 7,
    painScore: 4,
    hasExercise: true,
    hasMedication: true,
    hasReminder: true,
  },
  // ...
};