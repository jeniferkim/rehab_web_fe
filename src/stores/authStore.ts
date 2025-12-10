// src/stores/authStore.ts
import { create } from "zustand";
import type { AppUser } from "../types/apis/user";
import type { IntakeResult } from "../types/apis/intake";
import { persist } from "zustand/middleware";

type AuthState = {
  user: AppUser | null;
  isAuthenticated: boolean;

  // 온보딩 진행 상황 + 결과
  onboardingStep: number;          // 1, 2 ... 
  intakeResult: IntakeResult | null;  // 온보딩에서 받은 값 저장 (Swagger 타입 그대로)

  // 로그인 관련
  login: (params: { email: string; password: string }) => Promise<void>;
  signup: (params: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  setUser: (user: AppUser | null) => void;

  // 온보딩 액션
  setOnboardingStep: (step: number) => void;
  completeOnboarding: (intake: IntakeResult) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      onboardingStep: 1,
      intakeResult: null,

      login: async ({ email, password }) => {
        await new Promise((r) => setTimeout(r, 500));

        const dummyUser: AppUser = {
          id: 1,
          username: "테스트 사용자",
          email,
          gender: "OTHER",
          age: 0,
          height: 0,
          weight: 0,
          profileCompleted: false,
          onboardingCompleted: false,
        };

        set({
          user: dummyUser,
          isAuthenticated: true,
          onboardingStep: 1,
          intakeResult: null,
        });
      },

      signup: async ({ email, password }) => {
        await new Promise((r) => setTimeout(r, 500));
      },

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          onboardingStep: 1,
          intakeResult: null,
        }),

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setOnboardingStep: (step) =>
        set(() => ({
          onboardingStep: step,
        })),

      completeOnboarding: (intake) =>
        set((state) => ({
          intakeResult: intake,
          onboardingStep: 99, // "완료" 마커

          user: state.user
            ? {
                ...state.user,
                onboardingCompleted: true,
                profileCompleted: true,
              }
            : state.user,
        })),
    }),
    {
      name: "rehab-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        onboardingStep: state.onboardingStep,
        intakeResult: state.intakeResult,
      }),
    }
  )
);