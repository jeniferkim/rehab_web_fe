// CalendarPage와 RoutineDetailPage가 함께 쓰는 공유 mock이 된다.
// 라우트 이동 후 CalendarPage가 다시 렌더링될 때, 갱신된 상태를 읽어서 색이 바뀐다.

// src/mocks/calendarStatusMock.ts

export type DayCompletionStatus = "done" | "pending" | "rest";

export type DayStatusMeta = {
  completionStatus: DayCompletionStatus;
  streakCount: number;
  painScore?: number;
  hasExercise: boolean;
  hasMedication: boolean;
  hasReminder: boolean;
};

// ✅ 달력 색/상태용 mock 데이터
export const mockDayStatusByDate: Record<string, DayStatusMeta> = {
  "2025-12-01": {
    completionStatus: "done",
    streakCount: 5,
    painScore: 3,
    hasExercise: true,
    hasMedication: false,
    hasReminder: false,
  },
  "2025-12-02": {
    completionStatus: "pending",
    streakCount: 6,
    hasExercise: true,
    hasMedication: true,
    hasReminder: true,
  },
  "2025-12-03": {
    completionStatus: "rest",
    streakCount: 0,
    hasExercise: false,
    hasMedication: true,
    hasReminder: false,
  },
  "2025-12-04": {
    completionStatus: "pending",
    streakCount: 7,
    painScore: 4,
    hasExercise: true,
    hasMedication: true,
    hasReminder: true,
  },
  // 필요하면 계속 추가
};

// ✅ 루틴 상세/통증 모달에서 이 함수로 상태 갱신
export const updateDayStatus = (
  dateKey: string,
  updater: (prev?: DayStatusMeta) => DayStatusMeta
) => {
  const prev = mockDayStatusByDate[dateKey];
  mockDayStatusByDate[dateKey] = updater(prev);
};
