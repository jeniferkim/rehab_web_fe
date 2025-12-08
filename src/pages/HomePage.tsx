// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PainTrendChart } from "../components/home/PainTrendChart";
import { useAuthStore } from "../stores/authStore";
import type { RehabPlanSummary } from "../types/apis/rehab";
import { rehabPlanApi } from "../apis/rehabPlanApi";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // 일단은 하드코딩된 값들 (나중에 API 연동하면 교체)
  const todayRecoveryScore = 85;
  const streakDays = 12;
  const todayProgress = 40;

  const [currentPlan, setCurrentPlan] = useState<RehabPlanSummary | null>(null);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);


  // 오늘 날짜 레이블
  const todayLabel = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    const fetchCurrentPlan = async () => {
      setIsLoadingPlan(true);
      try {
        const plan = await rehabPlanApi.getCurrentPlanForUser(user.userId);
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
  }, [user]);


  const handleClickViewAllRoutines = () => {
    navigate("/app/routines");
  };

  const handleClickStartTodayRoutine = () => {
    if (!currentPlan) return;

    // 아직 플랜 → 루틴 상세 라우트가 확정 안 됐으니
    // 일단 루틴 목록으로만 보내고, 나중에 /app/routines/:planId 로 바꿔도 됨
    // navigate(`/app/routines/${currentPlan.id}`);
    navigate("/app/routines");
  };

  const displayName = user?.username || user?.email || "사용자";


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
            빠른 회복을 축하합니다.
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
        <PainTrendChart />
      </section>
    </div>
  );
};


export default HomePage;
