// src/mocks/rehabPlanMocks.ts
import type {
  RehabPlanSummary,
  RehabPlanItemsByDate,
} from "../types/apis/rehab";

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

// 오늘 날짜 기준 플랜 항목 mock
export const mockPlanItemsToday: RehabPlanItemsByDate = {
  rehabPlanId: 100,
  date: "2025-12-08",
  title: "허리 통증 완화 루틴 · 1단계",
  items: [
    {
      planItemId: 1,
      rehabPlanId: 100,
      exerciseId: 10,
      phase: "PHASE_1",
      orderIndex: 1,
      status: "ACTIVE",
      doses: [
        { reps: 10, holdSeconds: 0, restSeconds: 30 },
        { reps: 10, holdSeconds: 0, restSeconds: 30 },
      ],
      recommendationReason: "기립 시 허리 통증 감소에 효과적인 기본 강화 운동",
      createdAt: "2025-12-08T03:51:12.909Z",
      updatedAt: "2025-12-08T03:51:12.909Z",
    },
    {
      planItemId: 2,
      rehabPlanId: 100,
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
