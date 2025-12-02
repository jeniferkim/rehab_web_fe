// src/pages/HomePage.tsx
import React from "react";

const HomePage: React.FC = () => {
  // 일단은 하드코딩된 값들 (나중에 API 연동하면 교체)
  const username = "김지원";
  const todayRecoveryScore = 85;
  const streakDays = 12;
  const todayProgress = 40;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      {/* 인사 영역 */}
      <section className="mt-2">
        <p className="text-sm font-medium text-gray-500">홈</p>
        <h1 className="mt-3 text-3xl font-extrabold text-gray-900">
          안녕하세요, {username}님!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          2025년 11월 27일 목요일
        </p>
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
            <span className="mb-1 text-sm font-semibold text-gray-700">
              일
            </span>
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

      {/* 오늘의 루틴 */}
      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-base font-semibold text-gray-900">
            오늘의 루틴
          </p>
          <button className="text-sm text-gray-400 hover:text-gray-600">
            전체 보기 &gt;
          </button>
        </div>

        <ul className="divide-y divide-gray-100">
          {/* 1. 완료된 루틴 */}
          <li className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gray-100" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  스트레칭
                </p>
                <p className="text-xs text-gray-500">10분</p>
              </div>
            </div>
            <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
              완료
            </span>
          </li>

          {/* 2. 진행 전 루틴들 */}
          <li className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gray-100" />
              <div>
                <p className="text-sm font-semibold text-gray-900">스쿼트</p>
                <p className="text-xs text-gray-500">15분</p>
              </div>
            </div>
          </li>

          <li className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gray-100" />
              <div>
                <p className="text-sm font-semibold text-gray-900">걷기</p>
                <p className="text-xs text-gray-500">30분</p>
              </div>
            </div>
          </li>
        </ul>
      </section>

      {/* 통증 감소 추이 (그래프 자리) */}
      <section className="mb-4 rounded-3xl bg-white p-5 shadow-sm">
        <p className="mb-3 text-base font-semibold text-gray-900">
          통증 감소 추이
        </p>
        <div className="flex h-40 items-center justify-center rounded-2xl bg-gray-50 text-sm text-gray-400">
          통증/회복 점수 차트 영역
        </div>
      </section>
    </div>
  );
};

export default HomePage;
