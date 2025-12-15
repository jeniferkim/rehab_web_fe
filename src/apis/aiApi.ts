// src/apis/aiApi.ts
import { apiClient } from "./client"; // 너 프로젝트 경로에 맞게 조정
import type {
  AiRecommendationRequest,
  AiRecommendationResponse,
} from "../types/apis/ai";

export const aiApi = {
  recommend: async (body: AiRecommendationRequest) => {
    const { data } = await apiClient.post<AiRecommendationResponse>(
      "/api/v1/ai/recommendations",
      body,
    );
    return data;
  },
};
