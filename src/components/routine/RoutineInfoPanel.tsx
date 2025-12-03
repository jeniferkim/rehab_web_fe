// 루틴 제목, 난이도, 전체 시간, 총 세트 수, 예상 소요 시간 등

import type { RoutineDetailView, RoutineExercise } from "../../types/apis/routine";

interface RoutineInfoPanelProps {
  routine: RoutineDetailView;
  exercise: RoutineExercise;
}

const RoutineInfoPanel = ({
  routine,
  exercise,
}: RoutineInfoPanelProps) => {
  const totalSets = exercise.sets.length;

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {/* 루틴 요약 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900">
          루틴 요약
        </h3>
        <dl className="mt-3 space-y-2 text-xs text-gray-600">
          <div className="flex items-center justify-between">
            <dt>난이도</dt>
            <dd>{routine.level}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>총 소요 시간</dt>
            <dd>{routine.duration}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>운동 개수</dt>
            <dd>{routine.exercises.length}개</dd>
          </div>
        </dl>
      </div>

      {/* 현재 선택 운동 세트 정보 */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900">
          현재 운동 세트/회수
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          {exercise.name} · 세트 {totalSets}개
        </p>

        <ul className="mt-3 space-y-2 text-xs">
          {exercise.sets.map((set) => (
            <li
              key={set.setOrder}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
            >
              <span className="font-medium">
                {set.setOrder}세트
              </span>
              <div className="flex gap-3 text-gray-600">
                {set.reps && <span>{set.reps}회</span>}
                {set.holdSeconds && <span>{set.holdSeconds}초 유지</span>}
                {set.restSeconds && (
                  <span className="text-gray-500">
                    휴식 {set.restSeconds}초
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RoutineInfoPanel;
