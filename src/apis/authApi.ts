// 최종. 스웨거 보고 맞춰놓음
// src/apis/authApi.ts
import { apiClient } from "./client";
import type { AppUser } from "../types/apis/user";

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  email: string;
  password: string;
  passwordCheck: string;
  emailVerified?: boolean; // 일단 우회. 나중에 구현
};

export type AuthResponse = {
  accessToken: string;
  refreshToken?: string;
  user: AppUser;
};

export const authApi = {
  signup: async (body: SignupRequest): Promise<void> => {
    await apiClient.post("/auth/signup", body);
  },

  login: async (body: LoginRequest): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>("/auth/login", body);
    return res.data;
  },

  me: async (): Promise<AppUser> => {
    const res = await apiClient.get<AppUser>("/users/me");
    return res.data;
  },
};
