// src/components/routine/AiRoutineCard.tsx
import React from "react";
import type { RoutineSummary } from "../../types/routine";

type Props = {
  routine: RoutineSummary;
};

const AiRoutineCard: React.FC<Props> = ({ routine }) => {
  return (
    <button className="min-w-[220px] flex-1 rounded-3xl bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 h-16 w-full rounded-2xl bg-gray-100" />
      <p className="text-sm font-semibold text-gray-900">{routine.title}</p>
      <p className="mt-1 text-xs text-gray-500">
        {routine.duration} · {routine.level}
      </p>
    </button>
  );
};

export default AiRoutineCard;
