import type { AiRecommendationItem } from "./ai";

// src/types/chat.ts
export type ChatRole = "user" | "assistant";

export type ChatMessage =
  | {
      id: string;
      role: "user";
      type: "text";
      text: string;
    }
  | {
      id: string;
      role: "assistant";
      type: "text";
      text: string;
      isTyping?: boolean;
    }
  | {
      id: string;
      role: "assistant";
      type: "recommendation";
      summary: string;
      recommendations: AiRecommendationItem[]; // ✅ 스웨거 result.recommendations 그대로 사용
    };


// 요건 쓰이나
export type ChatExerciseCard = {
  exerciseId: number;
  title: string;
  bodyPart: string;
  difficulty: string;
  reason: string;
  expectedBenefit?: string;
  dose: {
    sets: number;
    reps: number;
    restSeconds: number;
    holdSeconds?: number;
  };
};
