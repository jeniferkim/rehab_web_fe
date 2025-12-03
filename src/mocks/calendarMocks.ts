// 캘린더 페이지 mock
// mockEventsByDate 같은 “날짜별 스케줄”

import type { CalendarEvent } from "../components/calendar/DayScheduleList";

// 목데이터: 날짜별 일정
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