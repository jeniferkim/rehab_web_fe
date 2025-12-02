// src/components/routine/RoutineCard.tsx
import React from "react";
import type { RoutineSummary } from "../../types/routine";

type Props = {
  routine: RoutineSummary;
};

const RoutineCard: React.FC<Props> = ({ routine }) => {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-gray-900">
          {routine.title}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {(routine.itemCount ?? 0)}개 · {routine.timeRangeLabel ?? "-"}
        </p>
      </div>
      <div className="flex items-center gap-3 text-gray-400">
        <button className="hover:text-gray-600">📅</button>
        <button className="hover:text-red-500">🗑</button>
      </div>
    </div>
  );
};

export default RoutineCard;
