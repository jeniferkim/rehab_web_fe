// src/pages/ReportPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { reportApi } from "../apis/reportApi";
import type {
  ProgressRange,
  ProgressResult,
} from "../types/apis/report";
import { useWeeklyHighlight } from "../hooks/useWeeklyHighlight";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ----------------------------- 유틸 함수 ----------------------------- */

const RANGE_OPTIONS: ProgressRange[] = ["7d", "14d", "30d"];

const formatDateLabel = (dateStr: string) => {
  // "2025-11-25" → "11/25"
  const [, m, d] = dateStr.split("-");
  return `${m}/${d}`;
};

const formatSecondsToTime = (sec: number) => {
  if (!sec) return "0분";
  const minutes = Math.round(sec / 60);
  if (minutes < 60) return `${minutes}분`;
  const hours = Math.floor(minutes / 60);
  const restMin = minutes % 60;
  return restMin > 0 ? `${hours}시간 ${restMin}분` : `${hours}시간`;
};

/* ------------------------ 주간 트렌드 그래프 ------------------------- */

type WeeklyTrendPoint = {
  dateLabel: string;        // "11/25"
  completionRate?: number;  // 0~100
  avgPain?: number;         // 0~10
};

type WeeklyTrendChartProps = {
  data: WeeklyTrendPoint[];
};

const WeeklyTrendChart: React.FC<WeeklyTrendChartProps> = ({ data }) => {
  if (!data.length) {
    return (
      <div className="flex h-52 items-center justify-center text-xs text-gray-400">
        아직 선택한 기간에 대한 데이터가 없어요.
      </div>
    );
  }

  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 16, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="dateLabel"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          {/* 왼쪽축: 완료율(%) */}
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
          />
          {/* 오른쪽축: 통증(0~10) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 10]}
          />
          <Tooltip />
          {/* 배경 막대: 완료율 */}
          <Bar
            yAxisId="left"
            dataKey="completionRate"
            radius={[6, 6, 0, 0]}
            barSize={18}
          />
          {/* 통증 라인: 0~10 */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="avgPain"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

/* ------------------------------ 페이지 ------------------------------- */

const ReportPage: React.FC = () => {
  const { user } = useAuthStore();

  // 진행률 리포트
  const [range, setRange] = useState<ProgressRange>("7d");
  const [progress, setProgress] = useState<ProgressResult | null>(null);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);
  const [progressError, setProgressError] = useState<string | null>(null);

  // 한 줄 칭찬 / 주간 하이라이트 (공통 훅)
  const {
    weekly,
    metrics: weeklyMetrics,
    isLoading: isLoadingWeekly,
    error: weeklyError,
  } = useWeeklyHighlight();

  /* ------------------------- 진행률 리포트 로드 ------------------------- */

  useEffect(() => {
    if (!user?.userId) return;

    let cancelled = false;

    const loadProgress = async () => {
      setIsLoadingProgress(true);
      setProgressError(null);

      try {
        const result = await reportApi.getProgress({ range });
        if (!cancelled) {
          setProgress(result);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setProgressError("진행률 리포트를 불러오는 중 문제가 생겼어요.");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingProgress(false);
        }
      }
    };

    loadProgress();
    return () => {
      cancelled = true;
    };
  }, [user?.userId, range]);

  /* --------------------- 그래프/테이블용 가공 데이터 -------------------- */

  // 그래프용 주간 트렌드
  const weeklyTrendData: WeeklyTrendPoint[] = useMemo(() => {
    if (!progress) return [];

    const exerciseMap = new Map(
      progress.exerciseStats.dailyData.map((d) => [d.date, d]),
    );
    const painMap = new Map(
      progress.painStats.dailyData.map((d) => [d.date, d]),
    );

    const dates = Array.from(
      new Set([...exerciseMap.keys(), ...painMap.keys()]),
    ).sort();

    return dates.map((date) => {
      const ex = exerciseMap.get(date);
      const pain = painMap.get(date);
      return {
        dateLabel: formatDateLabel(date),
        completionRate: ex?.completionRate,
        avgPain: pain?.avgPain,
      };
    });
  }, [progress]);

  // 일별 요약 테이블
  const dailyMerged = useMemo(() => {
    if (!progress) return [];

    const exerciseMap = new Map(
      progress.exerciseStats.dailyData.map((d) => [d.date, d]),
    );
    const painMap = new Map(
      progress.painStats.dailyData.map((d) => [d.date, d]),
    );

    const dates = Array.from(
      new Set([...exerciseMap.keys(), ...painMap.keys()]),
    ).sort();

    return dates.map((date) => {
      const ex = exerciseMap.get(date);
      const pain = painMap.get(date);
      return {
        date,
        completionRate: ex?.completionRate ?? null,
        durationSec: ex?.durationSec ?? 0,
        avgPain: pain?.avgPain ?? null,
      };
    });
  }, [progress]);

  const displayName = user?.username || user?.email || "사용자";

  /* ------------------------------ 렌더링 ------------------------------ */

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      {/* 상단 헤더 + 범위 선택 + 한 줄 칭찬 요약 */}
      <section className="mt-2 rounded-3xl bg-white p-5 shadow-sm md:flex md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <p className="text-sm font-medium text-gray-500">주간 리포트</p>
          <h1 className="mt-2 text-2xl font-extrabold text-gray-900">
            이번 주 재활 흐름, 한눈에 볼까요 {displayName}님?
          </h1>
          {weekly && !weeklyError && (
            <p className="mt-2 text-sm font-semibold text-emerald-700">
              {weekly.weeklyHighlight}
            </p>
          )}
          {weeklyError && (
            <p className="mt-2 text-xs text-red-500">{weeklyError}</p>
          )}
        </div>

        <div className="flex flex-col items-end gap-3">
          {/* 범위 선택 탭 */}
          <div className="inline-flex rounded-full bg-gray-100 p-1 text-xs">
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setRange(opt)}
                className={`rounded-full px-3 py-1 font-semibold ${
                  range === opt
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                {opt === "7d" && "최근 7일"}
                {opt === "14d" && "최근 14일"}
                {opt === "30d" && "최근 30일"}
              </button>
            ))}
          </div>

          {progress && (
            <div className="text-right text-xs text-gray-400">
              {progress.startDate} ~ {progress.endDate} 기준
            </div>
          )}
        </div>
      </section>

      {/* 중앙 그리드: 왼쪽 그래프, 오른쪽 KPI 카드 */}
      <section className="grid gap-5 md:grid-cols-3">
        {/* 왼쪽: 주간 트렌드 그래프 */}
        <div className="md:col-span-2 rounded-3xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">
              주간 진행률 & 통증 추이
            </p>
            {isLoadingProgress && (
              <p className="text-[11px] text-gray-400">데이터 로딩 중…</p>
            )}
          </div>
          {progressError && (
            <p className="text-xs text-red-500">{progressError}</p>
          )}
          {!progressError && (
            <WeeklyTrendChart data={weeklyTrendData} />
          )}
        </div>

        {/* 오른쪽: KPI 카드 스택 */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl bg-blue-50 px-4 py-3">
            <p className="text-xs font-medium text-blue-800">
              평균 운동 완료율
            </p>
            <p className="mt-2 text-2xl font-extrabold text-blue-700">
              {progress?.exerciseStats.avgCompletionRate ?? 0}%
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-50 px-4 py-3">
            <p className="text-xs font-medium text-emerald-800">
              총 운동 시간
            </p>
            <p className="mt-2 text-2xl font-extrabold text-emerald-700">
              {progress
                ? formatSecondsToTime(progress.exerciseStats.totalDurationSec)
                : "0분"}
            </p>
          </div>

          <div className="rounded-2xl bg-rose-50 px-4 py-3">
            <p className="text-xs font-medium text-rose-800">
              평균 통증 점수
            </p>
            <p className="mt-2 text-2xl font-extrabold text-rose-700">
              {progress?.painStats.avgPainScore.toFixed
                ? progress.painStats.avgPainScore.toFixed(1)
                : "0.0"}
              점
            </p>
          </div>

          {/* 주간 예측 점수 / 메트릭스 요약 */}
          <div className="rounded-2xl bg-slate-900 px-4 py-3 text-white">
            <p className="text-xs font-medium text-slate-200">
              예측 회복 점수
            </p>
            <p className="mt-2 text-2xl font-extrabold">
              {weekly?.recoveryPrediction.toFixed
                ? weekly.recoveryPrediction.toFixed(1)
                : "0.0"}
              점
            </p>
            {("avgCompletionRate" in weeklyMetrics ||
              "totalExercises" in weeklyMetrics) && (
              <p className="mt-2 text-[11px] text-slate-300">
                {(weeklyMetrics.avgCompletionRate != null ||
                  weeklyMetrics.totalExercises != null) &&
                  [
                    weeklyMetrics.avgCompletionRate != null &&
                      `완료율 ${weeklyMetrics.avgCompletionRate}%`,
                    weeklyMetrics.totalExercises != null &&
                      `총 ${weeklyMetrics.totalExercises}회 운동`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 하단: 일별 요약 테이블 */}
      <section className="mb-6 rounded-3xl bg-white p-5 shadow-sm">
        <p className="mb-2 text-sm font-semibold text-gray-900">
          일별 요약
        </p>

        {isLoadingProgress && (
          <p className="text-xs text-gray-400">
            일별 데이터를 불러오는 중이에요…
          </p>
        )}

        {progressError && (
          <p className="text-xs text-red-500">{progressError}</p>
        )}

        {!isLoadingProgress && !progressError && dailyMerged.length === 0 && (
          <p className="text-xs text-gray-400">
            선택한 기간에 기록된 운동 로그가 없습니다.
          </p>
        )}

        {!isLoadingProgress && !progressError && dailyMerged.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <table className="min-w-full divide-y divide-gray-100 text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">
                    날짜
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-gray-600">
                    완료율
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-gray-600">
                    운동 시간
                  </th>
                  <th className="px-3 py-2 text-right font-semibold text-gray-600">
                    평균 통증
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white">
                {dailyMerged.map((row) => (
                  <tr key={row.date}>
                    <td className="px-3 py-2 text-gray-800">
                      {formatDateLabel(row.date)}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-800">
                      {row.completionRate != null
                        ? `${row.completionRate}%`
                        : "-"}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-800">
                      {row.durationSec
                        ? formatSecondsToTime(row.durationSec)
                        : "-"}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-800">
                      {row.avgPain != null ? `${row.avgPain}점` : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default ReportPage;
