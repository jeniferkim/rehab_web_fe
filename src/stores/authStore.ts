// src/stores/authStore.ts
import { create } from "zustand";
import type { AppUser } from "../types/apis/user";

type AuthState = {
  user: AppUser | null;
  isAuthenticated: boolean;
  login: (params: { email: string; password: string }) => Promise<void>;
  signup: (params: {
    email: string;
    password: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => void;
  setUser: (user: AppUser | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async ({ email, password }) => {
    // TODO: 여기에서 실제 로그인 API 연동 후 /users/me 호출로 교체
    // 일단 더미 구현 (나중에 API로 교체)
    await new Promise((r) => setTimeout(r, 500));
    const dummyUser: AppUser = {
      userId: 1,
      username: "테스트 사용자",
      email,
      gender: "OTHER",
      age: 0,
      height: 0,
      weight: 0,
      profileCompleted: false,
      onboardingCompleted: false, // STEP2 끝나면 true 로 setUser에서 바꿔줌
    };

    set({
      user: dummyUser,
      isAuthenticated: true,
    });
  },

  signup: async ({ email, password, phone }) => {
    // TODO: 실제 회원가입 API 호출
    // 일단 더미 딜레이만
    await new Promise((r) => setTimeout(r, 500));
  },

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

    setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
}));
