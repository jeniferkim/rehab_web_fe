// 이거 스웨거랑 맞음
// src/types/ai.ts
export type TargetArea = "LOWER_BACK" | "NECK" | "SHOULDER" | "KNEE" | string;

export type AiRecommendationRequest = {
  context: {
    currentPainLevel: number; // 0~10
    goal: string;
    targetArea: TargetArea;
  };
};

export type AiDoseSuggestion = {
  sets: number;
  reps: number;
  restSeconds: number;
  holdSeconds?: number;
};

export type AiRecommendationItem = {
  exerciseId: number;
  title: string;
  bodyPart: string;
  difficulty: string;
  reason: string;
  expectedBenefit?: string;
  doseSuggestion: AiDoseSuggestion;
  evidenceLevel?: string;
  knowledgeReferences?: number[];
};

export type AiRecommendationResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    recommendations: AiRecommendationItem[];
    modelInfo?: { modelKey: string; modelVer: string };
    aiInferenceLogId?: number;
  };
};
