// src/pages/RoutineDetailPage.tsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import { mockRoutineDetailById } from "../mocks/routineMocks";

import RoutineVideoPlayer from "../components/routine/RoutineVideoPlayer";
import RoutineExercisePlaylist from "../components/routine/RoutineExercisePlaylist";
import RoutineInfoPanel from "../components/routine/RoutineInfoPanel";
import RoutineEvidenceSection from "../components/routine/RoutineEvidenceSection";
import type { RoutineExercise } from "../types/apis/routine";

const RoutineDetailPage = () => {
  const { routineId } = useParams<{ routineId: string }>();
  const routine = routineId ? mockRoutineDetailById[routineId] : undefined;

  // 실제 API 붙이면: 로딩/에러 처리 필요
  if (!routine) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-8">
        <p className="text-sm text-gray-500">
          루틴 정보를 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  const [selectedExercise, setSelectedExercise] = useState<RoutineExercise>(
    routine.exercises[0],
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* 상단 헤더 */}
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
            내 루틴
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            {routine.title}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {routine.level} · {routine.duration} 루틴
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            총 {routine.exercises.length}개 운동
          </span>
          <button
            type="button"
            className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50"
          >
            오늘 완료 처리
          </button>
          <button
            type="button"
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            // onClick={() => navigate(`/app/routines/${routine.id}/edit`)}
          >
            루틴 편집하기
          </button>
        </div>
      </header>

      {/* 메인 영역: 비디오 + 플레이리스트 */}
      <main className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.2fr)]">
        {/* 왼쪽: 비디오 + 설명 */}
        <section className="space-y-4">
          <RoutineVideoPlayer exercise={selectedExercise} />

          <RoutineInfoPanel routine={routine} exercise={selectedExercise} />
        </section>

        {/* 오른쪽: 운동 플레이리스트 + 임상 근거(축약) */}
        <aside className="space-y-4">
          <RoutineExercisePlaylist
            exercises={routine.exercises}
            selectedId={selectedExercise.id}
            onSelect={setSelectedExercise}
          />

          <RoutineEvidenceSection evidences={routine.clinicalEvidence} />
        </aside>
      </main>
    </div>
  );
};

export default RoutineDetailPage;
