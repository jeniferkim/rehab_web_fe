// src/types/apis/exercise.ts

export type ExerciseDifficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | string;
export type EvidenceLevel = "A" | "B" | "C" | "D" | string;

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
  type: ExerciseMediaType;
}

// 운동 상세 정보
export interface ExerciseDetail {
  exerciseId: number;
  title: string;
  description: string;
  bodyPart: string; // 허리/무릎/어깨 등
  difficulty: ExerciseDifficulty;
  contraindications: Record<string, unknown>; // 금기사항 (나중에 타입 세분화 가능)
  progressionRules: Record<string, unknown>; // 진행 규칙
  evidenceLevel: EvidenceLevel;
  images: ExerciseImage[];
  media: ExerciseMedia[];
}
