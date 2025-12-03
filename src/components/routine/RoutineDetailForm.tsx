// components/routine/RoutineDetailForm.tsx
// 앱의 “시간 설정 + 루틴 내용 + 텍스트 입력 + 완료 버튼”과 동일 개념.
// 웹에선 왼쪽 패널로 배치하고, “추가하기” 누르면 오른쪽 리스트에 push.

import React from "react";
import type { RoutineItemDraft, RoutineType } from "../../types/apis/routine";

type Props = {
  draft: RoutineItemDraft;
  onChangeDraft: (value: RoutineItemDraft) => void;
  onAdd: () => void;
};

const RoutineDetailForm: React.FC<Props> = ({
  draft,
  onChangeDraft,
  onAdd,
}) => {
  const setMode = (mode: "range" | "point") =>
    onChangeDraft({ ...draft, mode });

  const setType = (type: RoutineType) =>
    onChangeDraft({ ...draft, type });

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm">
      {/* 시간 모드 토글 */}
      <div className="mb-4 flex rounded-2xl bg-gray-100 p-1 text-xs font-semibold">
        <button
          type="button"
          className={`flex-1 rounded-2xl py-2 ${
            draft.mode === "point" ? "bg-white text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setMode("point")}
        >
          특정 시간
        </button>
        <button
          type="button"
          className={`flex-1 rounded-2xl py-2 ${
            draft.mode === "range" ? "bg-white text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setMode("range")}
        >
          시간 범위
        </button>
      </div>

      {/* 시간 입력 */}
      <div className="mb-4 flex gap-2 text-sm">
        <input
          type="time"
          value={draft.startTime}
          onChange={(e) =>
            onChangeDraft({ ...draft, startTime: e.target.value })
          }
          className="w-full rounded-2xl border border-gray-200 px-3 py-2"
        />
        {draft.mode === "range" && (
          <>
            <span className="flex items-center text-gray-400">~</span>
            <input
              type="time"
              value={draft.endTime ?? ""}
              onChange={(e) =>
                onChangeDraft({ ...draft, endTime: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-3 py-2"
            />
          </>
        )}
      </div>

      {/* 타입 선택 */}
      <div className="mb-4 flex gap-2 text-sm">
        <TypeChip
          label="운동"
          active={draft.type === "exercise"}
          onClick={() => setType("exercise")}
        />
        <TypeChip
          label="식사"
          active={draft.type === "meal"}
          onClick={() => setType("meal")}
        />
        <TypeChip
          label="복약"
          active={draft.type === "medicine"}
          onClick={() => setType("medicine")}
        />
      </div>

      {/* 메모 */}
      <textarea
        className="mb-4 h-24 w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white"
        placeholder="루틴 내용을 입력하세요"
        value={draft.memo}
        onChange={(e) =>
          onChangeDraft({ ...draft, memo: e.target.value })
        }
      />

      <button
        type="button"
        onClick={onAdd}
        className="w-full rounded-2xl bg-black py-2 text-sm font-semibold text-white hover:bg-gray-900"
      >
        루틴 상세 추가하기
      </button>
    </section>
  );
};

type TypeChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const TypeChip: React.FC<TypeChipProps> = ({ label, active, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-2xl border px-3 py-2 text-sm ${
        active
          ? "border-blue-500 bg-blue-50 text-blue-600"
          : "border-gray-200 bg-white text-gray-500"
      }`}
    >
      {label}
    </button>
  );
};

export default RoutineDetailForm;
