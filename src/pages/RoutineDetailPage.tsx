// 플랜 항목 목록 조회 → 항목에 들어있는 exerciseId로 운동 상세 여러 개 조회 → 합쳐서 RoutineDetailView 만들기
// src/pages/RoutineDetailPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import RoutineVideoPlayer from "../components/routine/RoutineVideoPlayer";
import RoutineExercisePlaylist from "../components/routine/RoutineExercisePlaylist";
import RoutineInfoPanel from "../components/routine/RoutineInfoPanel";
import RoutineEvidenceSection from "../components/routine/RoutineEvidenceSection";
import NextExerciseBar from "../components/routine/NextExerciseBar";

import type {
  RoutineDetailView,
  RoutineExercise,
  ExerciseSet,
} from "../types/apis/routine";
import { updateDayStatus } from "../mocks/calendarStatusMock";
import { RoutineCompleteModal } from "../components/routine/RoutineCompleteModal";
import { PainScoreModal } from "../components/routine/PainScoreModal";
import { rehabPlanApi } from "../apis/rehabPlanApi";
import { exerciseApi } from "../apis/exerciseApi";
import { exerciseLogApi } from "../apis/exerciseLogApi";
import { useAuthStore } from "../stores/authStore";

// YYYY-MM-DD
const formatDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
};

// PlanItem.doses → ExerciseSet[] (백엔드 스키마 확정 전이니 any 기반으로 느슨하게 처리)
const mapDosesToExerciseSets = (doses: any): ExerciseSet[] => {
  if (!doses || !Array.isArray(doses)) return [];

  return doses.map((dose: any, idx: number) => ({
    setOrder: idx + 1,
    reps: typeof dose.reps === "number" ? dose.reps : undefined,
    holdSeconds:
      typeof dose.holdSeconds === "number" ? dose.holdSeconds : undefined,
    restSeconds:
      typeof dose.restSeconds === "number" ? dose.restSeconds : undefined,
  }));
};

// ExerciseDetail + PlanItem → RoutineExercise
const buildRoutineExercise = (params: {
  planItem: any;
  detail: any;
}): RoutineExercise => {
  const { planItem, detail } = params;

  const firstImage = detail.images?.[0];
  const videoMedia = detail.media?.find(
    (m: any) => m.type === "VIDEO" || m.type === "video",
  );

  const sets = mapDosesToExerciseSets(planItem.doses);

  return {
    id: planItem.planItemId,
    exerciseId: detail.exerciseId,
    name: detail.title,
    bodyPart: detail.bodyPart ?? "",
    difficulty: detail.difficulty,
    thumbnailUrl: firstImage?.imageUrl,
    videoUrl: videoMedia?.url,
    caution:
      typeof detail.contraindications?.summary === "string"
        ? detail.contraindications.summary
        : undefined,
    sets,
    estimatedMinutes: sets.length > 0 ? sets.length * 2 : undefined, // 대충 세트 수 * 2분
  };
};

/* ------------------------------------------------------------------ */
/*  1. 껍데기: 플랜/운동 API로부터 RoutineDetailView 로딩           */
/* ------------------------------------------------------------------ */

const RoutineDetailPage = () => {
  const { routineId } = useParams<{ routineId: string }>(); // 라우트: /app/routines/:routineId (실제로는 rehabPlanId)
  const [routine, setRoutine] = useState<RoutineDetailView | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!routineId) {
      setLoadError("잘못된 루틴 ID입니다.");
      return;
    }

    const rehabPlanId = Number(routineId);
    if (Number.isNaN(rehabPlanId)) {
      setLoadError("잘못된 루틴 ID 형식입니다.");
      return;
    }

    let cancelled = false;

    const loadRoutine = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const today = formatDateKey(new Date());

        // 1) 오늘 날짜 기준 플랜 항목 조회
        const planItemsByDate =
          await rehabPlanApi.getPlanItemsByDate(rehabPlanId, today);
        const items = planItemsByDate.items ?? [];

        if (items.length === 0) {
          if (!cancelled) {
            setLoadError("오늘 진행할 운동이 없습니다.");
          }
          return;
        }

        // 2) 각 항목의 운동 상세 조회
        const details = await Promise.all(
          items.map((item: any) =>
            exerciseApi.getExerciseDetail(item.exerciseId),
          ),
        );

        // 3) RoutineExercise 리스트로 변환
        const exercises: RoutineExercise[] = items.map(
          (item: any, idx: number) =>
            buildRoutineExercise({ planItem: item, detail: details[idx] }),
        );

        // 4) 최종 ViewModel 구성
        const detailView: RoutineDetailView = {
          id: rehabPlanId,
          title: "오늘의 재활 루틴",
          level: "초급", // TODO: 백엔드 플랜 레벨 나오면 매핑
          duration: `${exercises.length * 5}분`, // 대략: 운동 개수 * 5분
          exercises,
          clinicalEvidence: [], // TODO: 나중에 실제 근거 데이터 연동
        };

        if (!cancelled) {
          setRoutine(detailView);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setLoadError("루틴 정보를 불러오는 중 문제가 발생했습니다.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadRoutine();

    return () => {
      cancelled = true;
    };
  }, [routineId]);

  if (isLoading && !routine) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-8">
        <p className="text-sm text-gray-500">루틴 정보를 불러오는 중이에요…</p>
      </div>
    );
  }

  if (loadError || !routine) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-8">
        <p className="text-sm text-gray-500">
          {loadError ?? "루틴 정보를 찾을 수 없습니다."}
        </p>
      </div>
    );
  }

  return <RoutineDetailPageContent routine={routine} />;
};

export default RoutineDetailPage;

/* ------------------------------------------------------------------ */
/*  2. 실제 내용: 기존 비즈니스 로직 그대로 유지                      */
/* ------------------------------------------------------------------ */

interface RoutineDetailPageContentProps {
  routine: RoutineDetailView;
}

const RoutineDetailPageContent = ({ routine }: RoutineDetailPageContentProps) => {
  const { user } = useAuthStore();

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
  const handleSubmitPainScore = async () => {
    const loggedAt = new Date().toISOString();

    // 1) 운동 로그 저장 (mock 기준)
    if (user?.userId) {
      try {
        await Promise.all(
          routine.exercises.map((ex) =>
            exerciseLogApi.createExerciseLog({
              userId: user.userId,
              body: {
                planItemId: ex.id,           // 우리는 planItemId를 RoutineExercise.id로 사용 중
                loggedAt,
                painAfter: painScore,
                completionRate: 100,
                // 필요하면 여기서 rpe, durationSec 등 추가
              },
            }),
          ),
        );
        console.log("[Routine] exercise logs saved for routine", routine.id);
      } catch (e) {
        console.error("[Routine] save exercise logs failed", e);
        // 일단 서비스 끊기지 않게 캘린더/네비게이션은 계속 진행
      }
    } else {
      console.log("[Routine] user is null, skip exerciseLogApi");
    }

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

    // 모달 닫고 홈으로 이동
    setIsPainModalOpen(false);
    navigate("/app/home");
  };

  /* 🔹 5) 렌더링 */
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:px-8">
      {/* 상단 헤더 */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
            내 루틴
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            {routine.title}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {routine.level ?? "맞춤"} · {routine.duration ?? "약 20분"} 루틴
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

      {/* 메인 레이아웃 */}
      <main className="grid gap-8 lg:grid-cols-[minmax(0,3.1fr)_minmax(320px,1.2fr)] xl:items-start">
        {/* 왼쪽: 큰 비디오 + 진행 영역 */}
        <section className="space-y-5">
          {/* 비디오 영역 */}
          <div className="aspect-video min-h-[360px] overflow-hidden rounded-2xl border border-slate-800/60 bg-black shadow-xl md:min-h-[420px] xl:min-h-[480px]">
            <RoutineVideoPlayer exercise={currentExercise} />
          </div>

          {/* 다음 운동 진행 바 (리모컨 느낌) */}
          <NextExerciseBar
            currentIndex={currentIndex}
            total={totalExercises}
            currentExercise={currentExercise}
            onNext={handleNextExercise}
          />

          {/* 루틴/운동 정보 카드들 – 따라 하기에는 2순위 정보라 아래로 */}
          <RoutineInfoPanel routine={routine} exercise={currentExercise} />

          <RoutineEvidenceSection
            evidences={routine.clinicalEvidence ?? []}
          />
        </section>

        {/* 오른쪽: 운동 리스트만, 스크롤해도 고정 */}
        <aside className="space-y-4 lg:sticky lg:top-24">
          <RoutineExercisePlaylist
            exercises={routine.exercises}
            selectedId={currentExercise.id}
            onSelect={handleSelectExercise}
          />

          {/* 작은 진행 요약 카드 (옵션) */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-xs text-gray-600">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800">
                오늘 루틴 진행 상황
              </span>
              <span>
                {currentIndex + 1} / {totalExercises} 세션
              </span>
            </div>
            <p className="mt-1 text-[11px] text-gray-500">
              오른쪽 리스트에서 다른 운동을 선택해 바로 이동할 수 있어요.
            </p>
          </div>
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
