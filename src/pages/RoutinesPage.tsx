// src/pages/RoutinesPage.tsx
import React from "react";

// 이미 만들어둔 컴포넌트들 import
import AiRoutineSection from "../components/routine/AiRoutineSection";
import MyRoutineSection from "../components/routine/MyRoutineSection";
import type { RoutineSummary } from "../types/routine";

const RoutinesPage: React.FC = () => {
  // 나중에 서버 연동하면 실제 내 루틴 리스트로 대체
  const myRoutines: RoutineSummary[] = [
    // 예시 하나 넣고 싶으면:
    // {
    //   id: "1",
    //   title: "Rutine 01",
    //   duration: "2H",
    //   level: "기본",
    //   itemCount: 2,
    //   timeRangeLabel: "09:00 ~ 12:00",
    // },
  ];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      {/* 상단 타이틀 */}
      <section className="mt-1">
        <h1 className="text-2xl font-bold text-gray-900">루틴</h1>
        <p className="mt-1 text-sm text-gray-500">
          AI 추천 루틴과 나만의 루틴을 관리할 수 있어요.
        </p>
      </section>

      {/* AI 추천 루틴 섹션 */}
      <AiRoutineSection />

      {/* 내 루틴 섹션 (루틴 생성하기 버튼 + 내 루틴 리스트) */}
      <MyRoutineSection routines={myRoutines} />
    </div>
  );
};

export default RoutinesPage;
