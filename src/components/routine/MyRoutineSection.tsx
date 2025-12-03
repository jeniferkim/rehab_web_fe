// components/routine/MyRoutineSection.tsx
// “내 루틴” 타이틀 + 생성 버튼 + 내 루틴 리스트(있으면)

import React from "react";
import { useNavigate } from "react-router-dom";
import RoutineCard from "./RoutineCard";
import type { RoutineSummary } from "../../types/apis/routine";

type Props = {
  routines: RoutineSummary[];
};

const MyRoutineSection: React.FC<Props> = ({ routines }) => {
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold text-gray-900">내 루틴</h2>

      <div>
        <button
          type="button"
          onClick={() => navigate("/app/routines/new")}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-50/40 px-4 py-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          <span className="text-lg">＋</span>
          <span>루틴 생성하기</span>
        </button>
      </div>

      {routines.length === 0 ? (
        <p className="pt-4 text-center text-xs text-gray-400">
          저장된 루틴이 없습니다.
        </p>
      ) : (
        <div className="space-y-3">
          {routines.map((r) => (
            <RoutineCard key={r.id} routine={r} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyRoutineSection;
