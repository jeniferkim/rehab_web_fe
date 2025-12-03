// components/routine/RoutineItemList.tsx
// 앱의 “09:00 ~ 11:00 / 식사 / chicken” 리스트 부분.

// src/components/routine/RoutineItemList.tsx
import React from "react";
import type { RoutineItem, RoutineType } from "../../types/apis/routine";

type Props = {
  items: RoutineItem[];
  onDelete: (id: string) => void;
};

const RoutineItemList: React.FC<Props> = ({ items, onDelete }) => {
  if (items.length === 0) {
    return (
      <section className="rounded-3xl bg-white p-4 text-center text-sm text-gray-400 shadow-sm">
        루틴 상세를 추가해 주세요.
      </section>
    );
  }

  return (
    <section className="space-y-3">
      {items.map((item) => (
        <RoutineItemRow key={item.id} item={item} onDelete={onDelete} />
      ))}
    </section>
  );
};

type RowProps = {
  item: RoutineItem;
  onDelete: (id: string) => void;
};

const RoutineItemRow: React.FC<RowProps> = ({ item, onDelete }) => {
  const timeLabel = item.endTime
    ? `${item.startTime} ~ ${item.endTime}`
    : item.startTime;

  const typeLabel: Record<RoutineType, string> = {
    exercise: "운동",
    meal: "식사",
    medicine: "복약",
  };

  return (
    <div className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
      <div className="flex items-start gap-4 text-sm">
        <div className="w-24 text-gray-600">{timeLabel}</div>
        <div>
          <p className="text-xs text-blue-500">{typeLabel[item.type]}</p>
          <p className="text-sm text-gray-900">{item.memo}</p>
        </div>
      </div>
      <button
        type="button"
        className="text-gray-400 hover:text-red-500"
        onClick={() => onDelete(item.id)}
      >
        🗑
      </button>
    </div>
  );
};

export default RoutineItemList;
