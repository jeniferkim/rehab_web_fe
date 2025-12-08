// src/apis/exerciseLogApi.ts
// import { apiClient } from "./client";
// import type { ApiResponse } from "../types/apis/common";
import type {
  ExerciseLog,
  ExerciseLogsByDate,
  CreateExerciseLogRequest,
} from "../types/apis/exerciseLog";
import { mockExerciseLogsByDate } from "../mocks/exerciseLogMocks";

// 간단 딜레이 유틸 (mock 용)
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const exerciseLogApi = {
  /**
   * 특정 날짜 운동 로그 조회
   * GET /api/v1/exercise-logs?userId=...&date=YYYY-MM-DD
   */
  async getLogsByDate(params: {
    userId: number;
    date: string; // YYYY-MM-DD
  }): Promise<ExerciseLogsByDate> {
    // 🔹 실제 서버 연결 시
    // const { data } = await apiClient.get<
    //   ApiResponse<ExerciseLogsByDate>
    // >("/api/v1/exercise-logs", { params });
    // return data.result;

    // 🔹 지금은 mock 데이터로 대체
    await delay(300);
    console.log("[MOCK] GET /api/v1/exercise-logs", params);
    return mockExerciseLogsByDate;
  },

  /**
   * 운동 로그 생성
   * POST /api/v1/exercise-logs?userId=...
   */
  async createExerciseLog(params: {
    userId: number;
    payload: CreateExerciseLogRequest;
  }): Promise<ExerciseLog> {
    const { userId, payload } = params;

    // 🔹 실제 서버 연결 시
    // const { data } = await apiClient.post<
    //   ApiResponse<{ exerciseLog: ExerciseLog }>
    // >("/api/v1/exercise-logs", payload, {
    //   params: { userId },
    // });
    // return data.result.exerciseLog;

    // 🔹 mock: 요청값을 그대로 로그로 만들어서 반환
    await delay(300);
    console.log("[MOCK] POST /api/v1/exercise-logs", { userId, payload });

    const now = new Date().toISOString();

    const mockLog: ExerciseLog = {
      exerciseLogId: Math.floor(Math.random() * 100000),
      userId,
      planItemId: payload.planItemId,
      loggedAt: payload.loggedAt,
      painBefore: payload.painBefore,
      painAfter: payload.painAfter,
      rpe: payload.rpe,
      completionRate: payload.completionRate,
      durationSec: payload.durationSec,
      notes: payload.notes,
      status: "COMPLETED",
      createdAt: now,
      updatedAt: now,
    };

    return mockLog;
  },
};
