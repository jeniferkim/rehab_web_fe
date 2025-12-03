// components/routine/AiRoutineSection.tsx
// “AI 추천 루틴” 타이틀 + 가로 스크롤 카드 리스트

import React from "react";
import AiRoutineCard from "./AiRoutineCard";
import { mockAiRoutineSummaries } from "../../mocks/routineMocks";


const AiRoutineSection: React.FC = () => {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold text-gray-900">AI 추천 루틴</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {mockAiRoutineSummaries.map((routine) => (
          <AiRoutineCard key={routine.id} routine={routine} />
        ))}
      </div>
    </section>
  );
};

export default AiRoutineSection;

