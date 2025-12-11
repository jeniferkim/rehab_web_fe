// src/apis/exerciseApi.ts
import type { ExerciseDetail } from "../types/apis/exercise";
import { mockExerciseDetailById } from "../mocks/exerciseMocks";
// import { apiClient } from "./client";  // 실제 API 연동 시 사용

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * BE 연결 여부 (시연용: true)
 * 실제 API 붙일 때 false로만 바꾸면 됨
 */
const USE_MOCK = true;

export const exerciseApi = {
  async getExerciseDetail(exerciseId: number): Promise<ExerciseDetail> {
    if (USE_MOCK) {
      await delay(300);
      console.log("[MOCK] GET /api/v1/exercises/{exerciseId}", exerciseId);
      return mockExerciseDetailById(exerciseId);
    }

    // 🔹 실제 API 호출 (BE 붙일 때 사용)
    // const { data } = await apiClient.get<ApiResponse<ExerciseDetail>>(
    //   `/api/v1/exercises/${exerciseId}`,
    // );
    // return data.result;

    throw new Error(
      "exerciseApi.getExerciseDetail: USE_MOCK=false 이지만 API 구현이 주석 처리되어 있습니다."
    );
  },
};
