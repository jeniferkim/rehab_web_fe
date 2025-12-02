// components/routine/AiRoutineSection.tsx
// “AI 추천 루틴” 타이틀 + 가로 스크롤 카드 리스트

import React from "react";
import AiRoutineCard from "./AiRoutineCard";
import type { RoutineSummary } from "../../types/routine";

const aiRoutines: RoutineSummary[] = [
  { id: "1", title: "거북목 교정 루틴", duration: "15분", level: "초급" },
  { id: "2", title: "허리 통증 완화", duration: "20분", level: "중급" },
  { id: "3", title: "무릎 안정화 루틴", duration: "10분", level: "초급" },
];

const AiRoutineSection: React.FC = () => {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold text-gray-900">AI 추천 루틴</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {aiRoutines.map((routine) => (
          <AiRoutineCard key={routine.id} routine={routine} />
        ))}
      </div>
    </section>
  );
};

export default AiRoutineSection;

