// src/apis/exerciseApi.ts
import { apiClient } from "./client";
import type { ApiResponse } from "../types/apis/common";
import type { ExerciseDetail } from "../types/apis/exercise";
import { mockExerciseDetail } from "../mocks/exerciseMocks";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const exerciseApi = {
  /**
   * 운동 상세 조회
   * GET /api/v1/exercises/{exerciseId}
   */
  async getExerciseDetail(exerciseId: number): Promise<ExerciseDetail> {
    // 🔹 실제 서버 연결 시
    // const { data } = await apiClient.get<ApiResponse<ExerciseDetail>>(
    //   `/api/v1/exercises/${exerciseId}`,
    // );
    // return data.result;

    // 🔹 mock 데이터
    await delay(300);
    console.log("[MOCK] GET /api/v1/exercises/{exerciseId}", exerciseId);

    // exerciseId별로 다른 것처럼 보이게만 살짝 바꿔줌
    return {
      ...mockExerciseDetail,
      exerciseId,
      title: `${mockExerciseDetail.title} #${exerciseId}`,
    };
  },
};
