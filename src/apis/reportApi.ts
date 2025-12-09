// src/apis/reportApi.ts
import type {
  ProgressRange,
  ProgressResponse,
  WeeklyReportResponse,
  ReportSnapshotsResponse,
} from "../types/apis/report";
import { apiClient } from "./client";

export const reportApi = {
  // 6.1 진행률 리포트 조회
  getProgress: async (params: {
    range: ProgressRange;      // "7d" | "14d" | "30d"
    endDate?: string;          // 선택, "YYYY-MM-DD"
  }): Promise<ProgressResponse["result"]> => {
    const { data } = await apiClient.get<ProgressResponse>("/reports/progress", {
      params,
    });
    return data.result;
  },

  // 6.2 주간 하이라이트 조회
  getWeeklyHighlight: async (params?: {
    weekStart?: string;        // 선택, "YYYY-MM-DD"
  }): Promise<WeeklyReportResponse["result"]> => {
    const { data } = await apiClient.get<WeeklyReportResponse>("/reports/weekly", {
      params,
    });
    return data.result;
  },

  // 6.3 리포트 스냅샷 목록 조회
  getSnapshots: async (params?: {
    period?: "WEEKLY" | "MONTHLY";
    limit?: number;           // 기본 10
  }): Promise<ReportSnapshotsResponse["result"]> => {
    const { data } = await apiClient.get<ReportSnapshotsResponse>("/reports/snapshots", {
      params,
    });
    return data.result;
  },
};
