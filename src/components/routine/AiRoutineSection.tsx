// components/routine/AiRoutineSection.tsx
// “AI 추천 루틴” 타이틀 + 가로 스크롤 카드 리스트

import React from "react";

import img1 from "../../assets/cc.png";
import img2 from "../../assets/hidoc.png";
import img3 from "../../assets/jasaeng.png";
import { AiRoutineCard, type AiRoutineMock } from "./AiRoutineCard";

const AI_ROUTINES_MOCK: AiRoutineMock[] = [
  {
    title: "척주협착증 운동 6가지",
    durationLabel: "20분",
    levelLabel: "초급",
    youtubeUrl: "https://www.youtube.com/watch?v=zyP8d2O5uuc",
    image: img1,
  },
  {
    title: "허리 스트레칭",
    durationLabel: "5분",
    levelLabel: "초급",
    youtubeUrl: "https://www.youtube.com/watch?v=Ju5_WR8VxRI",
    image: img2,
  },
  {
    title: "기립근 운동",
    durationLabel: "7분",
    levelLabel: "중급",
    youtubeUrl: "https://www.youtube.com/watch?v=K0bpwlCMiFE",
    image: img3,
  },
];

const AiRoutineSection: React.FC = () => {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold text-gray-900">AI 추천 루틴</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {AI_ROUTINES_MOCK.map((r) => (
          <AiRoutineCard key={r.title} routine={r} />
        ))}
      </div>
    </section>
  );
};

export default AiRoutineSection;
