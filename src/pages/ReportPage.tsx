import React, { useEffect, useMemo, useState } from "react";
import { reportApi } from "../apis/reportApi";
import type { ProgressRange, ProgressResult } from "../types/apis/report";
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
  const [, m, d] = dateStr.split("-");
  return `${m}/${d}`;
};

/* ------------------------ 주간 트렌드 그래프 ------------------------- */

type WeeklyTrendPoint = {
  dateLabel: string;
  completionRate?: number;
  avgPain?: number;
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
    <div className="h-56 w-full rounded-2xl bg-slate-50 px-4 py-3">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />
          <XAxis
            dataKey="dateLabel"
            tick={{ fontSize: 11, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
          />
          {/* 왼쪽축: 완료율(%) */}
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
          />
          {/* 오른쪽축: 통증(0~10) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 10]}
          />
          <Tooltip
            formatter={(value: number, key) =>
              key === "completionRate" ? `${value}%` : `${value}점`
            }
            labelFormatter={(label) => `${label}`}
          />
          <Bar
            yAxisId="left"
            dataKey="completionRate"
            barSize={26}
            radius={[8, 8, 4, 4]}
            fill="#2563EB"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="avgPain"
            stroke="#1D4ED8"
            strokeWidth={2.2}
            dot={{ r: 3.5, strokeWidth: 1, stroke: "#1D4ED8" }}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

/* ------------------------------ 페이지 ------------------------------- */

const ReportPage: React.FC = () => {
  const [range, setRange] = useState<ProgressRange>("7d");
  const [progress, setProgress] = useState<ProgressResult | null>(null);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);
  const [progressError, setProgressError] = useState<string | null>(null);

  const {
    weekly,
    metrics: weeklyMetrics,
    isLoading: isLoadingWeekly,
    error: weeklyError,
  } = useWeeklyHighlight();

  /* ------------------------- 진행률 리포트 로드 ------------------------- */

  useEffect(() => {
    let cancelled = false;

    const loadProgress = async () => {
      setIsLoadingProgress(true);
      setProgressError(null);

      try {
        const result = await reportApi.getProgress({ range });
        console.log("[ReportPage] progress result", result);

        if (!cancelled) setProgress(result);
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setProgressError("진행률 리포트를 불러오는 중 문제가 생겼어요.");
        }
      } finally {
        if (!cancelled) setIsLoadingProgress(false);
      }
    };

    loadProgress();

    return () => {
      cancelled = true;
    };
  }, [range]);

  /* --------------------- 그래프/테이블용 가공 데이터 -------------------- */

  const weeklyTrendData: WeeklyTrendPoint[] = useMemo(() => {
    if (!progress) return [];

    const exerciseMap = new Map(
      progress.exerciseStats.dailyData.map((d) => [d.date, d])
    );
    const painMap = new Map(
      progress.painStats.dailyData.map((d) => [d.date, d])
    );

    const dates = Array.from(
      new Set([...exerciseMap.keys(), ...painMap.keys()])
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

  // ✅ 운동 시간(durationSec) 제거한 병합 데이터
  const dailyMerged = useMemo(() => {
    if (!progress) return [];

    const exerciseMap = new Map(
      progress.exerciseStats.dailyData.map((d) => [d.date, d])
    );
    const painMap = new Map(
      progress.painStats.dailyData.map((d) => [d.date, d])
    );

    const dates = Array.from(
      new Set([...exerciseMap.keys(), ...painMap.keys()])
    ).sort();

    return dates.map((date) => {
      const ex = exerciseMap.get(date);
      const pain = painMap.get(date);

      return {
        date,
        completionRate: ex?.completionRate ?? null,
        avgPain: pain?.avgPain ?? null,
      };
    });
  }, [progress]);

  /* ------------------------------ 렌더링 ------------------------------ */

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      {/* 상단 헤더 + 범위 선택 + 한 줄 칭찬 */}
      <section className="mt-2 rounded-3xl bg-white p-5 shadow-sm md:flex md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <p className="text-sm font-medium text-gray-500">주간 리포트</p>
          <h1 className="mt-2 text-2xl font-extrabold text-gray-900">
            지난 기간의 재활 기록을 정리했어요.
          </h1>

          {weekly && !weeklyError && (
            <p className="mt-2 text-sm font-semibold text-blue-700">
              {weekly.weeklyHighlight}
            </p>
          )}
          {isLoadingWeekly && (
            <p className="mt-2 text-xs text-gray-400">
              이번 주 한 줄 칭찬을 준비하는 중이에요…
            </p>
          )}
          {weeklyError && (
            <p className="mt-2 text-xs text-red-500">{weeklyError}</p>
          )}
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="inline-flex rounded-full bg-slate-100 p-1 text-xs">
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setRange(opt)}
                className={`rounded-full px-3 py-1 font-semibold transition ${
                  range === opt
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
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

      {/* 중앙: 그래프 + KPI 카드 */}
      <section className="grid gap-5 md:grid-cols-3">
        {/* 그래프 영역 */}
        <div className="md:col-span-2 rounded-3xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">
              진행률 & 통증 추이
            </p>
            {isLoadingProgress && (
              <p className="text-[11px] text-gray-400">데이터 로딩 중…</p>
            )}
          </div>

          {progressError && (
            <p className="text-xs text-red-500">{progressError}</p>
          )}

          {!progressError && <WeeklyTrendChart data={weeklyTrendData} />}
        </div>

        {/* 오른쪽 KPI – 운동 시간 카드 제거 */}
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 px-4 py-3">
            <p className="text-[11px] font-medium text-blue-700">
              평균 운동 완료율
            </p>
            <p className="mt-1 text-2xl font-extrabold text-blue-900">
              {progress?.exerciseStats.avgCompletionRate ?? 0}%
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 px-4 py-3">
            <p className="text-[11px] font-medium text-blue-700">
              평균 통증 점수
            </p>
            <p className="mt-1 text-2xl font-extrabold text-blue-900">
              {progress?.painStats.avgPainScore != null
                ? typeof progress.painStats.avgPainScore === "number"
                  ? progress.painStats.avgPainScore.toFixed(1)
                  : progress.painStats.avgPainScore
                : "0.0"}
              점
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-slate-900 px-4 py-3 text-white">
            <p className="text-[11px] font-medium text-blue-100">
              예측 회복 점수
            </p>
            <p className="mt-1 text-2xl font-extrabold">
              {weekly?.recoveryPrediction != null
                ? typeof weekly.recoveryPrediction === "number"
                  ? weekly.recoveryPrediction.toFixed(1)
                  : weekly.recoveryPrediction
                : "0.0"}
              점
            </p>

            {("avgCompletionRate" in weeklyMetrics ||
              "totalExercises" in weeklyMetrics) && (
              <p className="mt-2 text-[11px] text-blue-100/80">
                {[
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
        <p className="mb-3 text-sm font-semibold text-gray-900">일별 요약</p>

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
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-[13px] text-gray-600">
                  <th className="w-20 px-4 py-2.5 text-left font-semibold">
                    날짜
                  </th>
                  <th className="px-4 py-2.5 text-center font-semibold">
                    완료율
                  </th>
                  <th className="w-24 px-4 py-2.5 text-right font-semibold">
                    평균 통증
                  </th>
                </tr>
              </thead>
              <tbody>
                {dailyMerged.map((row, idx) => {
                  const isEven = idx % 2 === 0;
                  const rowBg = isEven ? "bg-white" : "bg-slate-50/80";
                  return (
                    <tr key={row.date} className={`${rowBg} text-gray-800`}>
                      <td className="px-4 py-2.5">
                        {formatDateLabel(row.date)}
                      </td>
                      <td className="px-4 py-2.5">
                        {row.completionRate == null ? (
                          <span className="text-gray-400">-</span>
                        ) : (
                          <div className="mx-auto flex w-[220px] items-center gap-3">
                            {/* 미니 바 */}
                            <div className="h-2.5 flex-1 rounded-full bg-gray-200">
                              <div
                                className="h-2.5 rounded-full bg-blue-600"
                                style={{ width: `${row.completionRate}%` }}
                              />
                            </div>

                            {/* 퍼센트 */}
                            <span className="w-10 text-right text-sm font-semibold text-gray-700">
                              {row.completionRate}%
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        {row.avgPain != null ? `${row.avgPain}점` : "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default ReportPage;
