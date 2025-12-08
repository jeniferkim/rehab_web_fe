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

  async updateMe(payload: UpdateUserProfileRequest): Promise<AppUser> {
    const { data } = await apiClient.patch<ApiResponse<UserProfile>>(
      "/users/me",
      payload,
    );
    return mapUserProfileToAppUser(data.result);
  },
};
