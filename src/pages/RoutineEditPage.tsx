// src/pages/RoutineEditPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

import RoutineHeaderForm from "../components/routine/RoutineHeaderForm";
import RoutineDetailForm from "../components/routine/RoutineDetailForm";
import RoutineItemList from "../components/routine/RoutineItemList";

import type {
  RoutineItem,
  RoutineItemDraft,
} from "../types/routine";

// 🔹 임시 mock 데이터 (나중에 API 연동으로 교체)
const mockRoutineData: Record<
  string,
  { name: string; items: RoutineItem[] }
> = {
  "1": {
    name: "Rutine 01",
    items: [
      {
        id: "item-1",
        startTime: "09:00",
        endTime: "11:00",
        type: "meal",
        memo: "chicken",
      },
      {
        id: "item-2",
        startTime: "12:00",
        type: "medicine",
        memo: "Wegovy 3 times",
      },
    ],
  },
};

const RoutineEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [name, setName] = useState<string>("");
  const [items, setItems] = useState<RoutineItem[]>([]);
  const [draft, setDraft] = useState<RoutineItemDraft>({
    mode: "range",
    startTime: "09:00",
    endTime: "11:00",
    type: "exercise",
    memo: "",
  });

  // 🔹 최초 로드시 mock 데이터로 초기화 (나중에 API로 교체)
  useEffect(() => {
    if (!id) return;

    const found = mockRoutineData[id];
    if (found) {
      setName(found.name);
      setItems(found.items);
    }
  }, [id]);

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

  const handleDeleteItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleSave = () => {
    const payload = { id, name, items };
    console.log("루틴 수정 payload:", payload);
    // TODO: API 호출 후 /app/routines 로 이동 등
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      {/* 루틴 이름 수정 */}
      <RoutineHeaderForm name={name} onChangeName={setName} />

      <div className="grid grid-cols-[2fr,3fr] gap-6">
        {/* 새 상세 추가 */}
        <RoutineDetailForm
          draft={draft}
          onChangeDraft={setDraft}
          onAdd={handleAddItem}
        />

        {/* 기존 상세 리스트 + 삭제 */}
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

export default RoutineEditPage;
