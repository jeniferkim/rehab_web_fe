// src/apis/rehabPlanApi.ts
import { apiClient } from "./client";
import type { ApiResponse } from "../types/apis/common";
import type {
  RehabPlanSummary,
  RehabPlanItemsByDate,
} from "../types/apis/rehab";
import {
  mockCurrentPlan,
  mockPlanItemsToday,
} from "../mocks/rehabPlanMocks";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 나중에 BE 붙일 때 이 값만 false 로 바꾸고, 아래 axios 부분 주석 풀면 됨
const USE_MOCK = true;

export const rehabPlanApi = {
  /**
   * 현재 활성 플랜 조회
   * (예: GET /api/v1/rehab/plans/current?userId=...)
   */
  async getCurrentPlanForUser(userId: number): Promise<RehabPlanSummary | null> {
    if (USE_MOCK) {
      await delay(300);
      console.log("[MOCK] GET /rehab/plans/current", { userId });

      // mockCurrentPlan 내부에 이미 타입이 맞춰져 있으므로 그대로 반환
      // 단 userId는 외부에서 지정
      const result: RehabPlanSummary = {
        ...mockCurrentPlan,
        userId,
      };

      return result;
    }

    // 🔹 실제 서버 연결 시 (엔드포인트는 스웨거 보고 맞춰서 수정)
    const { data } = await apiClient.get<ApiResponse<RehabPlanSummary>>(
      "/api/v1/rehab/plans/current",
      { params: { userId } },
    );
    return data.result ?? null;
  },

  /**
   * 특정 플랜의 "오늘" 운동 항목 조회
   * RoutineDetailPage 에서 사용
   *
   * 예: GET /api/v1/rehab/plans/{rehabPlanId}/items?date=YYYY-MM-DD
   */
  async getPlanItemsByDate(
    rehabPlanId: number,
    date: string,
  ): Promise<RehabPlanItemsByDate> {
    if (USE_MOCK) {
      await delay(300);
      console.log("[MOCK] GET /rehab/plans/{id}/items", { rehabPlanId, date });

      return {
        rehabPlanId,
        date,
        items: mockPlanItemsToday.items,
      };
    }

    // 🔹 실제 서버 연결 시 (엔드포인트는 스웨거 보고 맞춰서 수정)
    const { data } = await apiClient.get<
      ApiResponse<RehabPlanItemsByDate>
    >(`/api/v1/rehab/plans/${rehabPlanId}/items`, {
      params: { date },
    });
    return data.result;
  },
};
