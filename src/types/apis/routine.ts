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
  duration: string; // "30분", "2H"
  level: string;    // "초급", "중급" 등
  items: RoutineItem[]; // 기존 스케줄용 (있다면 그대로 유지)
};

// 세트 정보
export type ExerciseSet = {
  setOrder: number;     // 1, 2, 3...
  reps?: number;        // 10회
  holdSeconds?: number; // 30초 버티기
  restSeconds?: number; // 30초 휴식
};

// 루틴에 포함된 단일 운동
export type RoutineExercise = {
  id: string;
  name: string;
  bodyPart: string;          // "허리", "목", "무릎" 등
  thumbnailUrl?: string;
  videoUrl?: string;         // YouTube embed URL 또는 ID
  caution?: string;          // 주의사항 한 줄
  sets: ExerciseSet[];
  estimatedMinutes?: number; // 이 운동에 걸리는 예상 시간
};

// 임상 근거 / 논문 / 가이드라인
export type ClinicalEvidence = {
  id: string;
  title: string;    // 논문/가이드 제목
  source: string;   // 예: "JOSPT", "대한정형외과학회"
  year?: number;
  summary: string;  // 한 줄 요약
  link?: string;    // 원문 링크
};

// 최종 루틴 상세 ViewModel (페이지에서 사용할 데이터)
export type RoutineDetailView = RoutineDetail & {
  exercises: RoutineExercise[];
  clinicalEvidence: ClinicalEvidence[];
};
