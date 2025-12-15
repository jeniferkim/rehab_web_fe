// src/apis/aiApi.ts
import { apiClient } from "./client";
import type {
  AiRecommendationRequest,
  AiRecommendationResponse,
  // (있다면) RecoveryPredictionRequest/Response 타입도 여기에 맞춰 추가
} from "../types/apis/ai";

export const aiApi = {
  recommend: async (body: AiRecommendationRequest) => {
    const { data } = await apiClient.post<AiRecommendationResponse>(
      "/api/v1/ai/recommendations",
      body
    );
    return data;
  },

  predictRecovery: async (body: any) => {
    // TODO: 스웨거 응답 타입 생기면 any 제거
    const { data } = await apiClient.post(
      "/api/v1/ai/predictions/recovery",
      body
    );
    return data;
  },

  getInferenceLogs: async () => {
    const { data } = await apiClient.get("/api/v1/ai/inference-logs");
    return data;
  },
};
