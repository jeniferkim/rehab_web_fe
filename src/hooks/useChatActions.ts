// src/hooks/useChatActions.ts

import type { AiRecommendationResponse } from "../types/apis/ai";
import type { ChatMessage } from "../types/apis/chat";

const uuid = () => crypto.randomUUID();

export function classifyIntent(text: string) {
  if (/(추천|운동|루틴|오늘|뭐 해야)/.test(text)) return "RECOMMENDATION";
  if (/(회복|예측|점수|내일|이번주)/.test(text)) return "RECOVERY";
  return "UNKNOWN";
}

export function mapRecommendationToChatMessage(
  res: AiRecommendationResponse,
): ChatMessage {
  const items = res.result?.recommendations ?? [];

  return {
    id: uuid(),
    role: "assistant",
    type: "recommendation",
    summary: "오늘 상태를 기반으로 추천한 운동이에요.",
    // exercises: items.map((r) => ({
    //   exerciseId: r.exerciseId,
    //   title: r.title,
    //   bodyPart: r.bodyPart,
    //   difficulty: r.difficulty,
    //   reason: r.reason,
    //   expectedBenefit: r.expectedBenefit,
    //   dose: r.doseSuggestion,
    // })),
    recommendations: items,
  };
}

export function makeSystemMessage(text: string): ChatMessage {
  return {
    id: uuid(),
    role: "assistant",
    type: "text",
    text,
  };
}

export function makeAssistantTextMessage(text: string, isTyping = false): ChatMessage {
  return {
    id: uuid(),
    role: "assistant",
    type: "text",
    text,
    isTyping,
  };
}

export function makeUserMessage(text: string): ChatMessage {
  return {
    id: uuid(),
    role: "user",
    type: "text",
    text,
  };
}
