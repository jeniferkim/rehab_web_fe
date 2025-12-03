// 다음 운동 버튼
// 아래쪽 고정 또는 비디오 아래에 붙는 바
// “n / 전체 m개 · 다음 운동 →” 같은 느낌으로

import type { RoutineExercise } from "../../types/apis/routine";

// src/components/routine/NextExerciseBar.tsx


interface NextExerciseBarProps {
  currentIndex: number;
  total: number;
  currentExercise: RoutineExercise;
  onNext: () => void;
}

const NextExerciseBar = ({
  currentIndex,
  total,
  currentExercise,
  onNext,
}: NextExerciseBarProps) => {
  const isLast = currentIndex === total - 1;

  return (
    <div className="mt-4 flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
      <div>
        <p className="text-xs font-medium text-gray-500">
          오늘의 운동 {currentIndex + 1} / {total}
        </p>
        <p className="text-sm font-semibold text-gray-900">
          {currentExercise.name}
        </p>
      </div>
      <button
        type="button"
        className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
        onClick={onNext}
      >
        {isLast ? "루틴 완료하기" : "다음 운동으로"}
      </button>
    </div>
  );
};

export default NextExerciseBar;
