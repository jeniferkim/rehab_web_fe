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

  login: async ({ email }) => {
    // TODO: 여기에서 실제 로그인 API 연동 후 /users/me 호출로 교체
    // 일단 더미 구현 (나중에 API로 교체)
    await new Promise((r) => setTimeout(r, 500));
    const dummyUser: AppUser = {
      id: "1",
      email,
      onboardingCompleted: false,
    };

    set({
      user: dummyUser,
      isAuthenticated: true,
    });
  },

  signup: async () => {
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
