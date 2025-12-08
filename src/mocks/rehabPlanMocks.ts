// src/mocks/rehabPlanMocks.ts
import type {
  RehabPlanSummary,
  RehabPlanItemsByDate,
} from "../types/apis/rehab";

// 🚩 프로젝트 다른 mock 들이랑 맞추려고 상수 분리
const TODAY = "2025-12-08";

/**
 * 현재 활성 플랜 목 데이터
 * - GET /api/v1/rehab/plans/current 응답용
 */
export const mockCurrentPlan: RehabPlanSummary = {
  rehabPlanId: 100,
  userId: 1,
  title: "허리 통증 완화 루틴",
  status: "ACTIVE",
  startDate: "2025-12-01",
  endDate: "2026-01-15",
  createdAt: "2025-12-01T00:00:00Z",
  updatedAt: "2025-12-01T00:00:00Z",
};

/**
 * 오늘 날짜 기준 플랜 항목 mock
 * - GET /api/v1/rehab/plans/{rehabPlanId}/items?date=YYYY-MM-DD 응답용
 */
export const mockPlanItemsToday: RehabPlanItemsByDate = {
  rehabPlanId: 100,
  date: TODAY,
//   title: "허리 통증 완화 루틴 · 1단계",
  items: [
    {
      planItemId: 1,
    //   rehabPlanId: 100,
      exerciseId: 10,
      phase: "PHASE_1",
      orderIndex: 1,
      status: "ACTIVE",
      doses: [
        { reps: 10, holdSeconds: 0, restSeconds: 30 },
        { reps: 10, holdSeconds: 0, restSeconds: 30 },
      ],
      recommendationReason:
        "기립 시 허리 통증 감소에 효과적인 기본 강화 운동",
      createdAt: "2025-12-08T03:51:12.909Z",
      updatedAt: "2025-12-08T03:51:12.909Z",
    },
    {
      planItemId: 2,
    //   rehabPlanId: 100,
      exerciseId: 11,
      phase: "PHASE_1",
      orderIndex: 2,
      status: "ACTIVE",
      doses: [
        { reps: 8, holdSeconds: 0, restSeconds: 30 },
        { reps: 8, holdSeconds: 0, restSeconds: 30 },
      ],
      recommendationReason: "요추 유연성 개선을 위한 스트레칭",
      createdAt: "2025-12-08T03:51:12.909Z",
      updatedAt: "2025-12-08T03:51:12.909Z",
    },
  ],
};

/**
 * 날짜별로도 쉽게 꺼낼 수 있게 Record 형태 추가
 * - 필요 없으면 안 써도 되고, 나중에 캘린더랑 연결할 때 편함
 */
export const mockPlanItemsByDate: Record<string, RehabPlanItemsByDate> = {
  [TODAY]: mockPlanItemsToday,
};
