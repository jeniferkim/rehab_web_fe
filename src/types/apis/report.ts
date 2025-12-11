// src/types/apis/report.ts

// 6.1 진행률 리포트 조회
export type ProgressRange = "7d" | "14d" | "30d";

export type ProgressExerciseDaily = {
  date: string;           // "2025-11-25"
  completionRate: number; // 0~100
  durationSec: number;    // 초 단위
};

export type ProgressPainDaily = {
  date: string;           // "2025-11-25"
  avgPain: number;        // 0~10 기준 평균 통증
};

export type MedicationDailyData = {
  date: string;
  completionRate: number;
};

export type ProgressResult = {
  range: ProgressRange;   // "7d" | "14d" | "30d"
  startDate: string;      // "2025-11-25"
  endDate: string;        // "2025-12-01"
  exerciseStats: {
    avgCompletionRate: number;
    totalDurationSec: number;
    dailyData: ProgressExerciseDaily[];
  };
  medicationStats: {
    avgCompletionRate: number;
    dailyData?: MedicationDailyData[];
  };
  painStats: {
    avgPainScore: number;
    dailyData: ProgressPainDaily[];
  };
};

export type ProgressResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ProgressResult;
};

// 6.2 주간 하이라이트 조회
export type WeeklyReportResult = {
  reportSnapshotId: number;
  userId: number;
  period: "WEEKLY" | "MONTHLY" | string; // 스펙 상 WEEKLY, 혹시 확장 대비
  coveredRange: {
    start: string; // "2025-11-25"
    end: string;   // "2025-12-01"
  };
  weeklyHighlight: string;   // "7일 연속 운동 달성! ..."
  metrics: string;           // "{\"totalExercises\":28,\"avgCompletionRate\":82}"
  recoveryPrediction: number; // 78.50
  generatedAt: string;       // ISO datetime
  createdAt: string;
  updatedAt: string;
};

export type WeeklyReportResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: WeeklyReportResult;
};

// 6.3 리포트 스냅샷 조회
export type ReportSnapshotItem = {
  reportSnapshotId: number;
  period: "WEEKLY" | "MONTHLY" | string;
  coveredRange: {
    start: string;
    end: string;
  };
  weeklyHighlight: string;
  metrics: string;
  recoveryPrediction: number;
  generatedAt: string;
};

export type ReportSnapshotsResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ReportSnapshotItem[];
};
