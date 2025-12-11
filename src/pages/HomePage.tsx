// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PainTrendChart, type PainTrendItem } from "../components/home/PainTrendChart";
import { useAuthStore } from "../stores/authStore";
// import type { RehabPlanSummary } from "../types/apis/rehab";
import { rehabPlanApi } from "../apis/rehabPlanApi";
// import { exerciseLogApi } from "../apis/exerciseLogApi";
// import type { ExerciseLog } from "../types/apis/exerciseLog";
import { calculateDailyRecoveryScore, calculateStreak } from "../utils/recovery";
import { useExerciseLogStore } from "../stores/exerciseLogStore";
import { useRehabPlanStore } from "../stores/rehabPlanStore";

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`; // YYYY-MM-DD
};


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const logsByDate = useExerciseLogStore((s) => s.logsByDate);
  


  // 회복 점수 / 스트릭 / 진행률
  const [todayRecoveryScore, setTodayRecoveryScore] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [todayProgress, setTodayProgress] = useState(0); // 나중에 별도 산식으로 교체

  const [isLoadingScore] = useState(false); // 오류 잡음


  // 현재 활성 플랜
  const { currentPlan, setCurrentPlan } = useRehabPlanStore(); // 얘는 시연용
  // const [currentPlan, setCurrentPlan] = useState<RehabPlanSummary | null>(null);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);

  const [painTrendData, setPainTrendData] = useState<PainTrendItem[]>([]);


  // 오늘 날짜 레이블
  // const today = new Date();
  const todayLabel = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const displayName = user?.username || user?.email || "사용자";

  /* ------------------------------------------------------------------ */
  /*  1. 현재 활성 플랜 조회                                             */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (!user?.userId) return;

    let cancelled = false;

    const fetchCurrentPlan = async () => {
      setIsLoadingPlan(true);
      try {
        const plan = await rehabPlanApi.getCurrentPlanForUser(Number(user.userId));
        if (!cancelled) {
          setCurrentPlan(plan);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingPlan(false);
        }
      }
    };

    fetchCurrentPlan();

    return () => {
      cancelled = true;
    };
  }, [user?.userId]);


  /* ------------------------------------------------------------------ */
  /*  2. 운동 로그 기반 회복 점수 / 스트릭 계산                         */
  /* ------------------------------------------------------------------ */
  // useEffect(() => {
  //   if (!user?.userId) return;

  //   let cancelled = false;

  //   const loadScoreAndStreak = async () => {
  //     setIsLoadingScore(true);

  //     try {
  //       const todayStr = formatDate(today);

  //       // 일단 최근 7일만 본다 (mock 기준)
  //       const dates: string[] = [];
  //       const tmpDate = new Date(today);

  //       for (let i = 0; i < 7; i += 1) {
  //         const copy = new Date(tmpDate);
  //         copy.setDate(tmpDate.getDate() - i);
  //         dates.push(formatDate(copy));
  //       }

  //       const results = await Promise.all(
  //         dates.map((date) =>
  //           exerciseLogApi.getLogsByDate({
  //             userId: user.userId,
  //             date,
  //           }),
  //         ),
  //       );

  //       const logsByDateMap: Record<string, ExerciseLog[]> = {};
  //       results.forEach((res, idx) => {
  //         logsByDateMap[dates[idx]] = res.logs ?? [];
  //       });

  //       const todayLogs = logsByDateMap[todayStr] ?? [];

  //       const score = calculateDailyRecoveryScore(todayLogs);
  //       const streak = calculateStreak({ logsByDate: logsByDateMap, today: todayStr });

  //       // 2) 통증 추이용 데이터 만들기 (최근 7일 기준)
  //       const trendItems: PainTrendItem[] = dates
  //         .slice()           // 원본 dates를 그대로 사용
  //         .reverse()         // 오래된 날짜 → 최신 날짜 순으로 그리고 싶으면
  //         .map((date) => {
  //           const logs = logsByDateMap[date] ?? [];

  //           const painBeforeVals = logs
  //             .map((log) => log.painBefore)
  //             .filter((v): v is number => typeof v === "number");
  //           const painAfterVals = logs
  //             .map((log) => log.painAfter)
  //             .filter((v): v is number => typeof v === "number");

  //           const avg = (arr: number[]) =>
  //             arr.length
  //               ? Math.round(arr.reduce((sum, v) => sum + v, 0) / arr.length)
  //               : 0;

  //           const painBefore = avg(painBeforeVals);
  //           const painAfter = avg(painAfterVals);

  //           // "YYYY-MM-DD" → "MM/DD"로 라벨 변환
  //           const [, mm, dd] = date.split("-");
  //           const dateLabel = `${mm}/${dd}`;

  //           return { dateLabel, painBefore, painAfter };
  //         });

  //       // 3) 상태 반영
  //       if (!cancelled) {
  //         setPainTrendData(trendItems);
  //       }


  //       // 진행률은 일단 간단하게: 오늘 로그가 1개라도 있으면 100, 아니면 0
  //       const progress = todayLogs.length > 0 ? 100 : 0;

  //       if (!cancelled) {
  //         setTodayRecoveryScore(score);
  //         setStreakDays(streak);
  //         setTodayProgress(progress);
  //       }
  //       } catch (e) {
  //         console.error(e);
  //         if (!cancelled) {
  //           setTodayRecoveryScore(0);
  //           setStreakDays(0);
  //           setTodayProgress(0);
  //         }
  //       } finally {
  //         if (!cancelled) {
  //           setIsLoadingScore(false);
  //         }
  //       }
  //     };

  //     loadScoreAndStreak();
  //     return () => {
  //       cancelled = true;
  //     };
  //   }, [user?.userId]);

  useEffect(() => {
    if (!user?.userId) return;

    const today = new Date();
    const todayStr = formatDate(today);

    // 최근 7일 날짜 리스트 만들기
    const dates: string[] = [];
    const tmpDate = new Date(today);

    for (let i = 0; i < 7; i += 1) {
      const copy = new Date(tmpDate);
      copy.setDate(tmpDate.getDate() - i);
      dates.push(formatDate(copy));
    }

    console.log("[Home] logsByDate:", logsByDate);


    // 1) 오늘 로그
    const todayLogs = logsByDate[todayStr] ?? [];

    // 2) 회복 점수 / 스트릭 계산
    const score = calculateDailyRecoveryScore(todayLogs);
    const streak = calculateStreak({ logsByDate, today: todayStr });

    // 3) 통증 추이 데이터 생성
    const trendItems: PainTrendItem[] = dates
      .slice()
      .reverse() // 오래된 날짜 → 최신 날짜
      .map((date) => {
        const logs = logsByDate[date] ?? [];

        const painBeforeVals = logs
          .map((log) => log.painBefore)
          .filter((v): v is number => typeof v === "number");
        const painAfterVals = logs
          .map((log) => log.painAfter)
          .filter((v): v is number => typeof v === "number");

        const avg = (arr: number[]) =>
          arr.length
            ? Math.round(arr.reduce((sum, v) => sum + v, 0) / arr.length)
            : 0;

        const painBefore = avg(painBeforeVals);
        const painAfter = avg(painAfterVals);

        const [, mm, dd] = date.split("-");
        const dateLabel = `${mm}/${dd}`;

        return { dateLabel, painBefore, painAfter };
      });

    // 4) 진행률: 오늘 로그가 1개라도 있으면 100, 아니면 0
    const progress = todayLogs.length > 0 ? 100 : 0;

    // 5) 상태 반영
    setTodayRecoveryScore(score);
    setStreakDays(streak);
    setTodayProgress(progress);
    setPainTrendData(trendItems);
  }, [user?.userId, logsByDate]);


  /* ------------------------------------------------------------------ */
  /*  3. 네비게이션 핸들러                                               */
  /* ------------------------------------------------------------------ */

  const handleClickViewAllRoutines = () => {
    navigate("/app/routines");
  };

  const handleClickStartTodayRoutine = () => {
    if (!currentPlan) return;

    // 아직 플랜 → 루틴 상세 라우트가 확정 안 됐으니
    // 일단 루틴 목록으로만 보내고, 나중에 /app/routines/:planId 로 바꿔도 됨
    // navigate(`/app/routines/${currentPlan.id}`);
    navigate(`/app/routines/${currentPlan.rehabPlanId}`);
  };





  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      {/* 인사 영역 */}
      <section className="mt-2">
        <p className="text-sm font-medium text-gray-500">홈</p>
        <h1 className="mt-3 text-3xl font-extrabold text-gray-900">
          안녕하세요, {displayName}님!
        </h1>
        <p className="mt-1 text-sm text-gray-500">{todayLabel}</p>
      </section>

      {/* 상단 카드: 오늘의 회복 점수 / 연속 달성 */}
      <section className="grid gap-4 md:grid-cols-2">
        {/* 오늘의 회복 점수 */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-gray-500">
            오늘의 회복 점수
          </p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-extrabold text-blue-600">
              {todayRecoveryScore}
            </span>
            <span className="mb-1 text-sm font-semibold text-blue-600">점</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {isLoadingScore
              ? "오늘 운동 기록을 불러오는 중이에요."
              : "빠른 회복을 축하합니다."}
          </p>
        </div>

        {/* 연속 달성 */}
        <div className="rounded-3xl bg-orange-50 p-5 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-gray-600">연속 달성</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-extrabold text-gray-900">
              {streakDays}
            </span>
            <span className="mb-1 text-sm font-semibold text-gray-700">일</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            꾸준한 열정! 대단해요.
          </p>
        </div>
      </section>

      {/* 오늘의 진행률 */}
      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-base font-semibold text-gray-900">
            오늘의 진행률
          </p>
          <p className="text-sm font-semibold text-blue-600">
            {todayProgress}%
          </p>
        </div>
        <div className="h-2 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all"
            style={{ width: `${todayProgress}%` }}
          />
        </div>
      </section>

      {/* 오늘의 루틴 카드 – 현재 활성 플랜 기반 */}
      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-base font-semibold text-gray-900">
            오늘의 루틴
          </p>
          <button
            type="button"
            className="text-sm text-gray-400 hover:text-gray-600"
            onClick={handleClickViewAllRoutines}
          >
            전체 보기 &gt;
          </button>
        </div>

        {isLoadingPlan ? (
          <div className="rounded-2xl bg-gray-50 px-4 py-5 text-center text-xs text-gray-400">
            오늘의 루틴을 불러오는 중이에요...
          </div>
        ) : currentPlan ? (
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
                현재 활성 재활 플랜
              </p>
              <h2 className="mt-1 text-sm font-semibold text-gray-900">
                {currentPlan.title}
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                {currentPlan.startDate} ~ {currentPlan.endDate} 진행 중
              </p>
            </div>

            <button
              type="button"
              className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
              onClick={handleClickStartTodayRoutine}
            >
              오늘 루틴 시작하기
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-5 text-sm text-gray-500">
            아직 활성화된 재활 플랜이 없어요. 루틴 페이지에서 내 루틴을
            만들어볼까요?
          </div>
        )}
      </section>

      {/* 통증 감소 추이 (그래프) */}
      <section className="mb-4 rounded-3xl bg-white p-5 shadow-sm">
        <p className="mb-3 text-base font-semibold text-gray-900">
          통증 감소 추이
        </p>
        <PainTrendChart data={painTrendData} />
      </section>
    </div>
  );
};


export default HomePage;
