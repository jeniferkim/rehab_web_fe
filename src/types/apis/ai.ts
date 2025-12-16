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

// 1) Gemini parse 결과
export type AiParsedPrompt = {
  disease: string;
  level: string;
  goal: string;
};

// 2) CustomAI 초안 루틴
export type AiDraftRoutineItem = {
  category: string;
  time: string;
  action: string;
};

export type AiDraftRoutine = {
  title: string;
  items: AiDraftRoutineItem[];
};

// 3) Gemini refine 결과 (앱 스케줄)
export type AiRefinedRoutineItem = {
  time: string;
  timeMode: "point" | "range";
  type: "exercise" | "meal" | "medication";
  detail: string;
};

// (선택) 최종 “저장용” payload를 이 단계에서 정의해두면 편함
export type AiRoutineFlowResult = {
  parsed: AiParsedPrompt;
  draft: AiDraftRoutine;
  refined: AiRefinedRoutineItem[];
};
