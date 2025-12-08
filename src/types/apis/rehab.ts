// src/types/apis/rehab.ts

// 재활 플랜 상태
export type RehabPlanStatus = "ACTIVE" | "INACTIVE" | "COMPLETED";

// 현재 활성 플랜 요약 (GET /rehab/plans/current)
export interface RehabPlanSummary {
  rehabPlanId: number;
  userId: number;
  title: string;
  status: RehabPlanStatus;
  startDate: string; // ISO string or YYYY-MM-DD
  endDate: string;   // ISO string or YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}
