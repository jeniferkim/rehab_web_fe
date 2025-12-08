// src/types/apis/exercise.ts

export type ExerciseDifficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | string;
export type ExerciseBodyPart = string; // 백엔드 enum 나오면 맞추기

export type EvidenceLevel = "HIGH" | "LOW" | string; // 백엔드 enum 나오면 맞추기

// 운동 이미지
export interface ExerciseImage {
  exerciseImageId: number;
  title: string;
  imageUrl: string; // swagger 상에선 {} 였지만 문자열 URL 로 볼게
}

// 운동 미디어 (영상 등)
export type ExerciseMediaType = "VIDEO" | "IMAGE" | "GIF" | string;

export interface ExerciseMedia {
  exerciseMediaId: number;
  url: string;
  mediaType: string;
  language: string;
  duration: number | string; // 백엔드 확인하기
}

// 운동 상세 정보
export interface ExerciseDetail {
  exerciseId: number;
  title: string;
  description: string;
  bodyPart: ExerciseBodyPart; // 허리/무릎/어깨 등
  difficulty: ExerciseDifficulty;
  contraindications: Record<string, unknown>; // 금기사항 (나중에 타입 세분화 가능)
  progressionRules: Record<string, unknown>; // 진행 규칙
  evidenceLevel: EvidenceLevel;
  images: ExerciseImage[];
  media: ExerciseMedia[];
  createdAt: string;
  updatedAt: string;
}
