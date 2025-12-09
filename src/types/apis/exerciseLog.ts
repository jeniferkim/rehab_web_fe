// 운동 로그 타입 정의
// 요것도 스웨거 보고 맞춰놓은거임. 픽스~~ 수정할 거면 잘 확인하기
// src/types/apis/exerciseLog.ts

// status 값은 스웨거 예시는 "COMPLETED" 하나지만,
// 나중에 "SKIPPED", "PARTIAL" 등 늘어날 수 있어서 일단 string 으로 열어둠.
export type ExerciseLogStatus = "COMPLETED" | string;

// 개별 운동 로그
export interface ExerciseLog {
  exerciseLogId: number;
  userId: number;
  planItemId: number;
  loggedAt: string; // ISO datetime (예: 2025-12-08T03:31:39.300Z)
  painBefore: number;
  painAfter: number;
  rpe: number; // 자각적 운동강도
  completionRate: number; // 0~100 (%)
  durationSec: number; // 운동 시간(초)
  notes: string;
  status: ExerciseLogStatus;
  createdAt: string;
  updatedAt: string;
}

// 특정 날짜 기준 로그 목록
export interface ExerciseLogsByDate {
  date: string; // YYYY-MM-DD
  logs: ExerciseLog[];
}

// POST /exercise-logs body
export interface CreateExerciseLogRequest {
  planItemId: number;
  loggedAt: string;
  painBefore: number;
  painAfter: number;
  rpe: number;
  completionRate: number;
  durationSec: number;
  notes: string;
}
