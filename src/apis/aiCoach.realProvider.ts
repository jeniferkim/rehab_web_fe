// src/apis/aiCoach.realProvider.ts
import type { AICoachProvider } from "./aiCoach";
// import { parseUserPrompt, refineRoutineForApp } from "./gemini";
// import { generateRoutineFromCustomAI } from "./customAI";

export const realProvider: AICoachProvider = {
  parse: async (text) => {
    throw new Error("Real provider not configured");
  },
  generate: async (parsed) => {
    throw new Error("Real provider not configured");
  },
};
