// src/types/routine.ts

// AI 추천/내 루틴 카드에 쓰는 요약 정보
export type RoutineSummary = {
  id: string;
  title: string;
  duration: string;      // "15분"
  level: string;         // "초급", "중급" 등
  itemCount?: number;    // 내 루틴 카드에서만 사용 (옵션)
  timeRangeLabel?: string; // "09:00 ~ 12:00"
};

// 루틴 상세 타입
export type RoutineType = "exercise" | "meal" | "medicine";

// 루틴 상세 실제 아이템
export type RoutineItem = {
  id: string;
  startTime: string;   // "09:00"
  endTime?: string;    // "11:00"
  type: RoutineType;
  memo: string;
};

// 루틴 상세 작성 중일 때 드래프트
export type RoutineItemDraft = {
  mode: "range" | "point"; // 특정 시간 vs 시간 범위
  startTime: string;
  endTime?: string;
  type: RoutineType;
  memo: string;
};

// 루틴 상세 조회 응답용 (GET /routines/:id)
export type RoutineDetail = {
  id: string;
  title: string;
  duration: string;
  level: string;
  items: RoutineItem[];
};
