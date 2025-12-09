// src/apis/reportApi.ts
import { mockProgressResponseByRange, mockWeeklyReportResponse } from "../mocks/reportMocks";
import type {
  ProgressRange,
  ProgressResponse,
  WeeklyReportResponse,
  ReportSnapshotsResponse,
  ProgressResult,
  WeeklyReportResult,
} from "../types/apis/report";
import { apiClient } from "./client";
// import { axiosInstance } from "./_client"; // 나중에 실제 연동시 사용할 axios 인스턴스

// 🚩 실제 API 붙일 때는 아래 플래그만 false로 바꾸면 됨
const USE_MOCK = true;


export const reportApi = {
  /**
   * 주간/월간 진행률 통계 조회
   * range: "7d" | "14d" | "30d"
   */
  async getProgress(params: {
    range: ProgressRange;
    endDate?: string; // 나중에 필요하면 사용
  }): Promise<ProgressResult> {
    if (USE_MOCK) {
      const { range } = params;
      const mock: ProgressResponse =
        mockProgressResponseByRange[range] ??
        mockProgressResponseByRange["7d"];

      // 🔍 debug 용: 실제로 목이 불리는지 확인
      console.log("[MOCK] getProgress", params, mock.result);

      return new Promise((resolve) =>
        setTimeout(() => resolve(mock.result), 250),
      );
    }

    const { data } = await apiClient.get<ProgressResponse>(
      "/reports/progress",
      { params },
    );
    return data.result;

    // 🎯 실제 연동 버전 (Swagger 기준)
    // const { data } = await axiosInstance.get("/api/v1/reports/progress", {
    //   params, // { range, endDate }
    // });
    // return data.result as ProgressResult;

    // throw new Error("USE_MOCK=false 인데 실제 API 구현이 없습니다.");
  },

  // 6.2 주간 하이라이트 조회
  async getWeeklyHighlight(
    weekStart?: string, // YYYY-MM-DD, 기본값: 이번 주 월요일
  ): Promise<WeeklyReportResult> {
    if (USE_MOCK) {
      const mock: WeeklyReportResponse = mockWeeklyReportResponse;

      console.log("[MOCK] getWeeklyHighlight", weekStart, mock.result);

      return new Promise((resolve) =>
        setTimeout(() => resolve(mock.result), 200),
      );
    }

    const { data } = await apiClient.get<WeeklyReportResponse>(
      "/reports/weekly",
      {
        params: weekStart ? { weekStart } : undefined,
      },
    );
    return data.result;

    // 🎯 실제 연동 버전 (Swagger 기준)
    // const { data } = await axiosInstance.get("/api/v1/reports/weekly", {
    //   params: weekStart ? { weekStart } : undefined,
    // });
    // return data.result as WeeklyReportResult;

    // throw new Error("USE_MOCK=false 인데 실제 API 구현이 없습니다.");
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
