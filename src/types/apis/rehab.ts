// 얘도 픽스. 스웨거랑 맞춰놓음. 수정할 거면 잘 보고 하세용
// src/types/apis/rehab.ts

export type RehabPlanStatus = "ACTIVE" | "INACTIVE" | "COMPLETED";

export interface RehabPlanSummary {
  rehabPlanId: number;
  userId: number;
  title: string;
  status: RehabPlanStatus;
  startDate: string; // YYYY-MM-DD or ISO
  endDate: string;   // YYYY-MM-DD or ISO
  createdAt?: string;
  updatedAt?: string;
}

export type RehabPlanPhase = "PHASE_1" | "PHASE_2" | "PHASE_3" | "PHASE_4" | string;

export type PlanItemStatus = "ACTIVE" | "INACTIVE" | "PAUSED" | string;

// 플랜 안에 들어있는 단일 운동 항목
export interface RehabPlanItem {
  planItemId: number;
  // rehabPlanId: number;
  exerciseId: number;
  phase: RehabPlanPhase;
  orderIndex: number;
  status: PlanItemStatus;
  doses: any; // 나중에 BE에서 스키마 확정되면 타입 정교화
  recommendationReason?: string; // 얘도 확장해야함 {}
  createdAt: string;
  updatedAt: string;
}

// 특정 날짜 기준 플랜 항목 목록
export interface RehabPlanItemsByDate {
  rehabPlanId: number;
  date: string;          // YYYY-MM-DD
  // title?: string;        // "허리 통증 완화 루틴" 같은 이름 (옵션)
  items: RehabPlanItem[];
}
