// 오른쪽 사이드: 운동 리스트(썸네일, 이름, 세트×횟수/휴식)
// 클릭 시 선택 운동 변경

import type { RoutineExercise } from "../../types/apis/routine";

// src/components/routine/RoutineExercisePlaylist.tsx


interface RoutineExercisePlaylistProps {
  exercises: RoutineExercise[];
  selectedId: string;
  onSelect: (exercise: RoutineExercise) => void;
}

const RoutineExercisePlaylist = ({
  exercises,
  selectedId,
  onSelect,
}: RoutineExercisePlaylistProps) => {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">
          오늘의 운동 순서
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          운동을 클릭하면 동영상과 상세 세트 정보를 볼 수 있어요.
        </p>
      </div>

      <ul className="max-h-[420px] divide-y divide-gray-100 overflow-y-auto">
        {exercises.map((ex, index) => {
          const totalSets = ex.sets.length;
          const totalReps = ex.sets
            .map((s) => s.reps ?? 0)
            .reduce((a, b) => a + b, 0);

          const isSelected = ex.id === selectedId;

          return (
            <li
              key={ex.id}
              className={`flex cursor-pointer gap-3 px-4 py-3 text-sm ${
                isSelected
                  ? "bg-emerald-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => onSelect(ex)}
            >
              <div className="mt-0.5 text-xs font-semibold text-gray-400">
                {index + 1}
              </div>
              <div className="flex flex-1 gap-3">
                {ex.thumbnailUrl && (
                  <div className="h-14 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={ex.thumbnailUrl}
                      alt={ex.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="line-clamp-2 text-xs font-medium text-gray-900">
                    {ex.name}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-500">
                    {ex.bodyPart} · 세트 {totalSets}개 · 총 {totalReps}
                    회
                  </p>
                  {ex.caution && (
                    <p className="mt-1 text-[11px] text-amber-600">
                      주의: {ex.caution}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default RoutineExercisePlaylist;
