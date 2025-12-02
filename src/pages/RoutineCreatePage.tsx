// src/pages/RoutineCreatePage.tsx
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import RoutineHeaderForm from "../components/routine/RoutineHeaderForm";
import RoutineDetailForm from "../components/routine/RoutineDetailForm";
import RoutineItemList from "../components/routine/RoutineItemList";
import type {
  RoutineItem,
  RoutineItemDraft,
} from "../types/routine";

const RoutineCreatePage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [items, setItems] = useState<RoutineItem[]>([]);
  const [draft, setDraft] = useState<RoutineItemDraft>({
    mode: "range",
    startTime: "09:00",
    endTime: "11:00",
    type: "exercise",
    memo: "",
  });

  const handleAddItem = () => {
    if (!draft.startTime || !draft.memo) return;

    const newItem: RoutineItem = {
      id: uuid(),
      startTime: draft.startTime,
      endTime: draft.mode === "range" ? draft.endTime : undefined,
      type: draft.type,
      memo: draft.memo,
    };

    setItems((prev) => [...prev, newItem]);
    setDraft((prev) => ({ ...prev, memo: "" }));
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    const payload = { name, items };
    console.log("루틴 저장 payload:", payload);
    // TODO: API 연동 후 /app/routines 로 이동 등
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <RoutineHeaderForm name={name} onChangeName={setName} />

      <div className="grid grid-cols-[2fr,3fr] gap-6">
        <RoutineDetailForm
          draft={draft}
          onChangeDraft={setDraft}
          onAdd={handleAddItem}
        />
        <RoutineItemList items={items} onDelete={handleDeleteItem} />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="w-40 rounded-2xl bg-black py-2 text-sm font-semibold text-white hover:bg-gray-900"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default RoutineCreatePage;
