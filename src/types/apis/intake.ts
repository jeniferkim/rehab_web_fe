// src/types/apis/intake.ts

// 백엔드 enum이 있다면 여기에 맞춰 union 으로 조정해도 됨
export type PainAreaCode = string; // 예: "NECK", "KNEE" ...
export type ExerciseExperience = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface IntakeRequest {
  painArea: PainAreaCode;
  painLevel: number; // 0~10
  goal: string;
  exerciseExperience: ExerciseExperience;
}

export interface IntakeResult {
  intakeId: number;
  painArea: PainAreaCode;
  painLevel: number;
  goal: string;
  exerciseExperience: ExerciseExperience;
  createdAt: string; // ISO string
  updatedAt: string;
}
