// src/apis/exerciseApi.ts
import type { ExerciseDetail } from "../types/apis/exercise";
import { mockExerciseDetailById } from "../mocks/exerciseMocks";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const exerciseApi = {
  async getExerciseDetail(exerciseId: number): Promise<ExerciseDetail> {
    // 실제 연결 시 아래로 교체
    // const { data } = await apiClient.get<ApiResponse<ExerciseDetail>>(
    //   `/api/v1/exercises/${exerciseId}`,
    // );
    // return data.result;

    await delay(300);
    console.log("[MOCK] GET /api/v1/exercises/{exerciseId}", exerciseId);

    return mockExerciseDetailById(exerciseId);
  },
};
