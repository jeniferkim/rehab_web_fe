// src/apis/userApi.ts
import { apiClient } from "./client";
import type { ApiResponse } from "../types/apis/common";
import type { AppUser, UserProfile, UpdateUserProfileRequest } from "../types/apis/user";

function mapUserProfileToAppUser(result: UserProfile): AppUser {
  return {
    ...result,
    onboardingCompleted: false, // intake 끝날 때 프론트에서 true 로 변경
  };
}

export const userApi = {
  async getMe(): Promise<AppUser> {
    const { data } = await apiClient.get<ApiResponse<UserProfile>>("/users/me");
    return mapUserProfileToAppUser(data.result);
  },

  // 온보딩용: 최초 프로필 생성 → Swagger의 POST /users/me 사용
  async createMe(payload: UpdateUserProfileRequest): Promise<AppUser> {
    const { data } = await apiClient.post<ApiResponse<UserProfile>>(
      "/users/me",
      payload,
    );
    return mapUserProfileToAppUser(data.result);
  },

  // 옵션) 나중에 "설정 > 프로필 수정" 페이지에서 쓸 업데이트용 메서드
  async updateMe(payload: UpdateUserProfileRequest): Promise<AppUser> {
    const { data } = await apiClient.patch<ApiResponse<UserProfile>>(
      "/users/me",
      payload,
    );
    return mapUserProfileToAppUser(data.result);
  },
};
