// src/components/routine/RoutineCard.tsx
import React from "react";
import type { RoutineSummary } from "../../types/apis/routine";
import { FiCalendar, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

type Props = {
  routine: RoutineSummary;
  onClick?: () => void;
  onDelete?: () => void;
};

const RoutineCard: React.FC<Props> = ({ routine, onClick, onDelete }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-3xl bg-white p-4 shadow-sm"
    >
      <div>
        <p className="text-sm font-semibold text-gray-900">{routine.title}</p>
        <p className="mt-1 px-3 text-xs text-gray-500">
          {routine.itemCount ?? 0}개 · {routine.timeRangeLabel ?? "-"}
        </p>
      </div>

      <div className="flex items-center gap-3 text-gray-400">
        <FiCalendar
          onClick={(e) => {
            e.stopPropagation(); // 카드 클릭 방지
            navigate("/app/calendar");
          }}
          className="text-lg  hover:text-blue-600 cursor-pointer"
        />

        {/* 삭제 버튼 */}
        <FiTrash2
          className="text-lg hover:text-red-500 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // 카드 클릭 방지
            onDelete?.();
          }}
        />
      </div>
    </button>
  );
};

export default RoutineCard;
