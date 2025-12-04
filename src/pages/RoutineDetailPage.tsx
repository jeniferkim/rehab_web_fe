// src/pages/RoutineDetailPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { mockRoutineDetailById } from "../mocks/routineMocks";

import RoutineVideoPlayer from "../components/routine/RoutineVideoPlayer";
import RoutineExercisePlaylist from "../components/routine/RoutineExercisePlaylist";
import RoutineInfoPanel from "../components/routine/RoutineInfoPanel";
import RoutineEvidenceSection from "../components/routine/RoutineEvidenceSection";

import NextExerciseBar from "../components/routine/NextExerciseBar";


import type { RoutineDetailView, RoutineExercise } from "../types/apis/routine";
import { updateDayStatus } from "../mocks/calendarStatusMock";
import { RoutineCompleteModal } from "../components/routine/RoutineCompleteModal";
import { PainScoreModal } from "../components/routine/PainScoreModal";

// YYYY-MM-DD
const formatDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
};

// 1. 껍데기: 데이터 유무만 판단
const RoutineDetailPage = () => {
  const { routineId } = useParams<{ routineId: string }>();
  const routine = routineId ? mockRoutineDetailById[routineId] : undefined;

  if (!routine) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-8">
        <p className="text-sm text-gray-500">루틴 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return <RoutineDetailPageContent routine={routine} />;
};

export default RoutineDetailPage;

// 2. 실제 내용
interface RoutineDetailPageContentProps {
  routine: RoutineDetailView;
}

const RoutineDetailPageContent = ({ routine }: RoutineDetailPageContentProps) => {
  /* 🔹 1) 기본 상태 */
  const totalExercises = routine.exercises.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentExercise = routine.exercises[currentIndex];

  const [isCompletedToday, setIsCompletedToday] = useState(false);

  // streak mock (루틴 단위)
  const [streak, setStreak] = useState(5);
  const [bestStreak, setBestStreak] = useState(12);

  // 모달
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isPainModalOpen, setIsPainModalOpen] = useState(false);
  const [painScore, setPainScore] = useState(5);

  const showToast = (msg: string) => alert(msg);

  const todayKey = formatDateKey(new Date());

  /* 🔹 2) 운동 선택 + 다음 운동 */
  const handleSelectExercise = (exercise: RoutineExercise) => {
    const index = routine.exercises.findIndex((ex) => ex.id === exercise.id);
    if (index !== -1) setCurrentIndex(index);
  };

  const handleNextExercise = () => {
    if (currentIndex < totalExercises - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }
    setIsCompleteModalOpen(true);
  };

  const navigate = useNavigate();


  /* 🔹 3) 루틴 완료 처리 */
  const handleConfirmCompleteRoutine = () => {
    if (!isCompletedToday) {
      const next = streak + 1;
      setIsCompletedToday(true);
      setStreak(next);
      setBestStreak((prev) => Math.max(prev, next));

      // ✅ 캘린더 상태 mock 갱신
      updateDayStatus(todayKey, (prev) => ({
        completionStatus: "done",
        streakCount: next, // 오늘까지 연속 일수
        painScore: prev?.painScore, // 통증은 나중에 모달에서 갱신
        hasExercise: prev?.hasExercise ?? true,
        hasMedication: prev?.hasMedication ?? false,
        hasReminder: prev?.hasReminder ?? false,
      }));

      showToast(`오늘 루틴 완료! 연속 ${next}일째 🎉`);
    }

    setIsCompleteModalOpen(false);
    setIsPainModalOpen(true); // 통증 점수 모달 열기
  };

  /* 🔹 4) 통증 점수 저장 */
  const handleSubmitPainScore = () => {
    // ✅ 해당 날짜의 painScore만 업데이트
    updateDayStatus(todayKey, (prev) => ({
      completionStatus: prev?.completionStatus ?? "pending",
      streakCount: prev?.streakCount ?? streak,
      hasExercise: prev?.hasExercise ?? true,
      hasMedication: prev?.hasMedication ?? false,
      hasReminder: prev?.hasReminder ?? false,
      painScore,
    }));

    showToast(`통증 점수 ${painScore}점으로 기록했어요.`);
    setIsPainModalOpen(false);
  };

  /* 🔹 5) 렌더링 */
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* 상단 헤더 */}
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
            내 루틴
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">{routine.title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {routine.level} · {routine.duration} 루틴
          </p>
          <p className="mt-1 text-xs text-gray-400">
            연속 {streak}일 진행 중 · 최고 {bestStreak}일
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            총 {routine.exercises.length}개 운동
          </span>

          {isCompletedToday ? (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
              오늘 루틴 완료됨
            </span>
          ) : (
            <button
              type="button"
              className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50"
              onClick={() => setIsCompleteModalOpen(true)}
            >
              오늘 완료 처리
            </button>
          )}

          <button
            type="button"
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            onClick={() => navigate(`/app/routines/${routine.id}/edit`)}
          >
            루틴 편집하기
          </button>
        </div>
      </header>

      {/* 메인 */}
      <main className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.2fr)]">
        {/* 왼쪽: 비디오 + 정보 + 다음 운동 바 */}
        <section className="space-y-4">
          <RoutineVideoPlayer exercise={currentExercise} />
          <RoutineInfoPanel routine={routine} exercise={currentExercise} />
          <NextExerciseBar
            currentIndex={currentIndex}
            total={totalExercises}
            currentExercise={currentExercise}
            onNext={handleNextExercise}
          />
        </section>

        {/* 오른쪽: 운동 리스트 + 임상 근거 */}
        <aside className="space-y-4">
          <RoutineExercisePlaylist
            exercises={routine.exercises}
            selectedId={currentExercise.id}
            onSelect={handleSelectExercise}
          />
          <RoutineEvidenceSection evidences={routine.clinicalEvidence} />
        </aside>
      </main>

      {/* 루틴 완료 모달 */}
      <RoutineCompleteModal
        open={isCompleteModalOpen}
        isCompletedToday={isCompletedToday}
        onClose={() => setIsCompleteModalOpen(false)}
        onConfirm={handleConfirmCompleteRoutine}
      />

      {/* 통증 점수 모달 */}
      <PainScoreModal
        open={isPainModalOpen}
        value={painScore}
        onChange={setPainScore}
        onSubmit={handleSubmitPainScore}
      />
    </div>
  );
};
