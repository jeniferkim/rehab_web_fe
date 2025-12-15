// src/apis/aiCoach.recommendProvider.ts
import { aiApi } from "./aiApi";
import type { AICoachProvider, ParsedData, RoutineResult } from "./aiCoach";

const quickParse = (text: string): ParsedData => {
  // 최소 추정(웹 MVP)
  const disease = /(목)/.test(text)
    ? "목 통증"
    : /(어깨)/.test(text)
    ? "어깨 통증"
    : /(허리|디스크)/.test(text)
    ? "허리 통증"
    : /(무릎)/.test(text)
    ? "무릎 통증"
    : "근골격 불편";

  const level = (() => {
    const m = text.match(/(\d{1,2})\s*(점|\/10)?/);
    return m ? Math.min(10, Math.max(0, Number(m[1]))) : 5;
  })();

  const goal = /(자세|교정)/.test(text)
    ? "자세 교정"
    : /(유연|스트레칭)/.test(text)
    ? "유연성 향상"
    : /(근력|강화)/.test(text)
    ? "근력 강화"
    : "통증 완화";

  return { disease, level, goal };
};

export const recommendProvider: AICoachProvider = {
  parse: async (text) => quickParse(text),

  generate: async (parsed) => {
    // 추천 API 스키마에 맞춰 요청값 구성
    const targetArea = /목/.test(parsed.disease)
      ? "NECK"
      : /어깨/.test(parsed.disease)
      ? "SHOULDER"
      : /무릎/.test(parsed.disease)
      ? "KNEE"
      : "LOWER_BACK";

    const res = await aiApi.recommend({
      context: {
        currentPainLevel: parsed.level,
        goal: parsed.goal,
        targetArea,
      },
    });

    const recs = res.result?.recommendations ?? [];
    const times = ["10:00", "16:00", "20:00"];

    return {
      title: `${parsed.disease} 루틴`,
      items: recs.slice(0, 6).map((r, idx) => ({
        time: times[idx % times.length],
        timeMode: "point",
        type: "exercise",
        detail: `${r.title} · ${r.doseSuggestion.sets}세트 x ${r.doseSuggestion.reps}회`,
      })),
    } satisfies RoutineResult;
  },
};
