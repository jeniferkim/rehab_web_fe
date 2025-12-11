// components/routine/MyRoutineSection.tsx
// “내 루틴” 타이틀 + 생성 버튼 + 내 루틴 리스트(있으면)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoutineCard from "./RoutineCard";
// import type { RoutineSummary } from "../../types/apis/routine";
import { useRoutineStore } from "../../stores/routineStore";
import type { RoutineSummary } from "../../types/apis/routine";

// 프롭스 기반 날릴거야~
// type Props = {
//   routines: RoutineSummary[];
// };

const MyRoutineSection: React.FC = () => {
  const navigate = useNavigate();

  // zustand store 에서 내 루틴 + 삭제 액션 가져오기
  const { myRoutines, removeRoutine } = useRoutineStore();

  // 삭제 확인 모달용 상태
  const [ deleteTarget, setDeleteTarget ] = useState<RoutineSummary | null>(null);

  const handleClickRoutine = (id: number) => {
    navigate(`/app/routines/${id}`);
  };

  const handleRequestDelete = (routine: RoutineSummary) => {
    setDeleteTarget(routine);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    removeRoutine(deleteTarget.id);
    setDeleteTarget(null);
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
  };

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
          <span>새 루틴 생성하기</span>
        </button>
      </div>

      {myRoutines.length === 0 ? (
        <p className="pt-4 text-center text-xs text-gray-400">
          저장된 루틴이 없습니다.
        </p>
      ) : (
        <div className="space-y-3">
          {myRoutines.map((r) => (
            <RoutineCard
              key={r.id}
              routine={r}
              onClick={() => handleClickRoutine(r.id)}
              onDelete={() => handleRequestDelete(r)}
            />
          ))}
        </div>
      )}
      {/* 🧊 삭제 확인 모달 */}
      {deleteTarget && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="text-base font-semibold text-gray-900">
              루틴을 삭제할까요?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              “{deleteTarget.title}” 루틴이 목록에서 완전히 사라집니다.
            </p>

            <div className="mt-5 flex justify-end gap-2 text-sm">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="rounded-xl border border-gray-200 px-4 py-2 text-gray-600 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyRoutineSection;
