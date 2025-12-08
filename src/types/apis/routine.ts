// src/types/apis/routine.ts

/** ------------------------------
 *  루틴 카드에서 쓰는 요약 정보
 *  (홈/루틴 리스트에서 사용)
 * ------------------------------ */
export type RoutineSummary = {
  id: number;     
  title: string;
  duration?: string;         // "15분"
  level?: string;            // "초급" 등
  itemCount?: number;        // 운동 개수
  timeRangeLabel?: string;   // "09:00 ~ 12:00"
};


/** ------------------------------
 *  운동 세트 정보 (PLAN Item의 doses 기반)
 * ------------------------------ */
export type ExerciseSet = {
  setOrder: number;          // 1, 2, 3...
  reps?: number;             // 10회
  holdSeconds?: number;      // 30초 버티기
  restSeconds?: number;      // 30초 휴식
};


/** ------------------------------
 *  루틴에 포함된 단일 운동
 *  (플랜 Item + ExerciseDetail → 변환됨)
 * ------------------------------ */
export type RoutineExercise = {
  id: number;                // planItemId 또는 exerciseId
  exerciseId: number;        // 실제 운동 ID
  name: string;
  bodyPart: string;          // "허리", "목", "무릎" 등
  difficulty?: string;       // BEGINNER 등
  thumbnailUrl?: string;
  videoUrl?: string;
  caution?: string;
  sets: ExerciseSet[];
  estimatedMinutes?: number;
};


/** ------------------------------
 *  루틴 상세 기본 구조
 *  (플랜 기반 루틴 상세 페이지에서 사용)
 * ------------------------------ */
export type RoutineDetail = {
  id: number | string;       // rehabPlanId
  title: string;
  phase?: string;            // PHASE_1 etc
  duration?: string;         // "30분"
  level?: string;
};


/** ------------------------------
 *  임상 근거 (옵션)
 * ------------------------------ */
export type ClinicalEvidence = {
  id: string;
  title: string;
  source: string;  // JOSPT 등
  year?: number;
  summary: string;
  link?: string;
};


/** ------------------------------
 *  최종 루틴 상세 ViewModel
 *  (페이지에서 사용하는 통합 구조)
 * ------------------------------ */
export type RoutineDetailView = RoutineDetail & {
  exercises: RoutineExercise[];
  clinicalEvidence?: ClinicalEvidence[];
};
