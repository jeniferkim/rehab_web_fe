// src/stores/authStore.ts
import { create } from "zustand";

type User = {
  id: string;
  email: string;
  onboardingCompleted: boolean;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (params: { email: string; password: string }) => Promise<void>;
  signup: (params: {
    email: string;
    password: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void; // 카카오 콜백 등에서 직접 세팅
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async ({ email, password }) => {
    // TODO: 여기에서 실제 로그인 API 호출
    // const { data } = await axios.post("/api/login", { email, password });
    // set({ user: data.user, isAuthenticated: true });

    // 일단 더미 구현 (나중에 API로 교체)
    await new Promise((r) => setTimeout(r, 500));
    set({
      user: {
        id: "1",
        email,
        onboardingCompleted: false, // 또는 true
      },
      isAuthenticated: true,
    });
  },

  signup: async ({ email, password, phone }) => {
    // TODO: 실제 회원가입 API 호출
    // await axios.post("/api/signup", { email, password, phone });

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
