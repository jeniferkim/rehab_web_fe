// src/pages/HomePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  mockRoutineSummaryById,
  mockTodayMainRoutineId,
} from "../mocks/routineMocks";
import { PainTrendChart } from "../components/home/PainTrendChart";

const HomePage: React.FC = () => {
  // 일단은 하드코딩된 값들 (나중에 API 연동하면 교체)
  const email = "김지원";
  const todayRecoveryScore = 85;
  const streakDays = 12;
  const todayProgress = 40;

  const navigate = useNavigate();

  // 오늘의 메인 루틴 (없을 수도 있으니 optional)
  const todayRoutine = mockRoutineSummaryById[mockTodayMainRoutineId];

  const handleClickViewAllRoutines = () => {
    navigate("/app/routines");
  };

  const handleClickStartTodayRoutine = () => {
    if (!todayRoutine) return;
    navigate(`/app/routines/${todayRoutine.id}`);
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      {/* 인사 영역 */}
      <section className="mt-2">
        <p className="text-sm font-medium text-gray-500">홈</p>
        <h1 className="mt-3 text-3xl font-extrabold text-gray-900">
          안녕하세요, {email}님!
        </h1>
        <p className="mt-1 text-sm text-gray-500">2025년 11월 27일 목요일</p>
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

      {/* 오늘의 루틴 카드 */}
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

        {todayRoutine ? (
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
                오늘의 추천 루틴
              </p>
              <h2 className="mt-1 text-sm font-semibold text-gray-900">
                {todayRoutine.title}
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                {todayRoutine.level} · {todayRoutine.duration}
                {todayRoutine.itemCount != null &&
                  ` · 운동 ${todayRoutine.itemCount}개`}
              </p>
              {todayRoutine.timeRangeLabel && (
                <p className="mt-1 text-[11px] text-gray-400">
                  권장 시간대: {todayRoutine.timeRangeLabel}
                </p>
              )}
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
            아직 설정된 오늘의 루틴이 없어요. 루틴 페이지에서 내 루틴을
            만들어볼까요?
          </div>
        )}
      </section>

      {/* 통증 감소 추이 (그래프 자리) */}
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
