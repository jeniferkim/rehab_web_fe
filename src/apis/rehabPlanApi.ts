// src/apis/rehabPlanApi.ts
import type { RehabPlanSummary } from "../types/apis/rehab";

// 일단 프론트용 mock 데이터
const mockCurrentPlan: RehabPlanSummary = {
  rehabPlanId: 1,
  userId: 1,
  title: "거북목 교정 루틴",
  status: "ACTIVE",
  startDate: "2025-12-01",
  endDate: "2026-01-15",
  createdAt: "2025-12-01T00:00:00Z",
  updatedAt: "2025-12-01T00:00:00Z",
};

export const rehabPlanApi = {
  // 현재 활성 플랜 조회 (GET /rehab/plans/current)
  async getCurrentPlanForUser(userId: number): Promise<RehabPlanSummary | null> {
    // 👉 백엔드 붙으면 아래 주석 해제하고 axios 호출로 교체하면 됨
    /*
    const { data } = await apiClient.get<ApiResponse<RehabPlanSummary>>(
      "/rehab/plans/current",
      { params: { userId } }
    );
    return data.result;
    */

    // 지금은 프론트 데모용 mock
    await new Promise((r) => setTimeout(r, 300));
    return { ...mockCurrentPlan, userId };
  },
};
