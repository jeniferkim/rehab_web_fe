// src/apis/intakeApi.ts
import { apiClient } from "./client";
import type { ApiResponse } from "../types/apis/common";
import type { IntakeRequest, IntakeResult } from "../types/apis/intake";

export const intakeApi = {
  async getMyIntake(): Promise<IntakeResult | null> {
    const { data } = await apiClient.get<ApiResponse<IntakeResult | null>>(
      "/users/me/intake",
    );
    // 백엔드가 아직 result 를 null 안 줄 수도 있으니, 필요시 조정
    return data.result;
  },

  async upsertMyIntake(payload: IntakeRequest): Promise<IntakeResult> {
    const { data } = await apiClient.put<ApiResponse<IntakeResult>>(
      "/users/me/intake",
      payload,
    );
    return data.result;
  },
};
