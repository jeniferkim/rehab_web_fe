// src/mocks/reportMocks.ts
import type {
  ProgressRange,
  ProgressResponse,
  WeeklyReportResponse,
} from "../types/apis/report";

// 🔹 6.1 진행률 리포트 조회 mock (Swagger 응답 모양 그대로)
export const mockProgressResponseByRange: Record<
  ProgressRange,
  ProgressResponse
> = {
  "7d": {
    isSuccess: true,
    code: "200",
    message: "요청에 성공하였습니다.",
    result: {
      range: "7d",
      startDate: "2025-11-25",
      endDate: "2025-12-01",
      exerciseStats: {
        avgCompletionRate: 82,
        totalDurationSec: 8400,
        dailyData: [
          { date: "2025-11-25", completionRate: 75, durationSec: 1200 },
          { date: "2025-11-26", completionRate: 80, durationSec: 900 },
          { date: "2025-11-27", completionRate: 85, durationSec: 1800 },
          { date: "2025-11-28", completionRate: 90, durationSec: 1500 },
          { date: "2025-11-29", completionRate: 70, durationSec: 600 },
          { date: "2025-11-30", completionRate: 88, durationSec: 1800 },
          { date: "2025-12-01", completionRate: 85, durationSec: 600 },
        ],
      },
      medicationStats: {
        avgCompletionRate: 92,
        dailyData: [],
      },
      painStats: {
        avgPainScore: 5,
        dailyData: [
          { date: "2025-11-25", avgPain: 6 },
          { date: "2025-11-26", avgPain: 6 },
          { date: "2025-11-27", avgPain: 5 },
          { date: "2025-11-28", avgPain: 4 },
          { date: "2025-11-29", avgPain: 4 },
          { date: "2025-11-30", avgPain: 3 },
          { date: "2025-12-01", avgPain: 3 },
        ],
      },
    },
  },

  // 14d / 30d 는 우선 7d 데이터를 살짝 변형해서 느낌만 보이게
  "14d": {
    isSuccess: true,
    code: "200",
    message: "요청에 성공하였습니다.",
    result: {
      range: "14d",
      startDate: "2025-11-18",
      endDate: "2025-12-01",
      exerciseStats: {
        avgCompletionRate: 80,
        totalDurationSec: 16800,
        dailyData: [],
      },
      medicationStats: {
        avgCompletionRate: 90,
        dailyData: [],
      },
      painStats: {
        avgPainScore: 5.2,
        dailyData: [],
      },
    },
  },
  "30d": {
    isSuccess: true,
    code: "200",
    message: "요청에 성공하였습니다.",
    result: {
      range: "30d",
      startDate: "2025-11-02",
      endDate: "2025-12-01",
      exerciseStats: {
        avgCompletionRate: 78,
        totalDurationSec: 36000,
        dailyData: [],
      },
      medicationStats: {
        avgCompletionRate: 88,
        dailyData: [],
      },
      painStats: {
        avgPainScore: 5.5,
        dailyData: [],
      },
    },
  },
};

// 🔹 6.2 주간 하이라이트 조회 mock (Swagger 응답 모양 그대로)
export const mockWeeklyReportResponse: WeeklyReportResponse = {
  isSuccess: true,
  code: "200",
  message: "요청에 성공하였습니다.",
  result: {
    reportSnapshotId: 4001,
    userId: 123,
    period: "WEEKLY",
    coveredRange: {
      start: "2025-11-25",
      end: "2025-12-01",
    },
    weeklyHighlight: "7일 연속 운동 달성! 꾸준한 습관이 회복을 만들고 있어요.",
    metrics: JSON.stringify({
      totalExercises: 28,
      avgCompletionRate: 82,
    }),
    recoveryPrediction: 78.5,
    generatedAt: "2025-12-01T23:00:00",
    createdAt: "2025-12-01T23:00:00",
    updatedAt: "2025-12-01T23:00:00",
  },
};
