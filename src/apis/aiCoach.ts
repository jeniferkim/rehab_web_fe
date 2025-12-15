// src/apis/aiCoach.ts
export type ParsedData = { disease: string; level: number; goal: string };

export type RoutineItem = {
  time: string;
  timeMode: "point" | "range";
  type: "exercise" | "meal" | "medication";
  detail: string;
  // tags?: string[];  // 모바일에 있으면 옵션
};

export type RoutineResult = {
  title: string;
  items: RoutineItem[];
};

export interface AICoachProvider {
  parse(text: string): Promise<ParsedData>;
  generate(parsed: ParsedData): Promise<RoutineResult>;
}
