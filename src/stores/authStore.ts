// src/stores/authStore.ts
import { create } from "zustand";
import type { AppUser } from "../types/apis/user";
import type { IntakeResult } from "../types/apis/intake";
import { persist } from "zustand/middleware";
import { authApi } from "../apis/authApi";

type AuthState = {
  //  devForceLogin: () => void;   // dev용 임시 로그인
  user: AppUser | null;
  isAuthenticated: boolean;

  // 토큰
  accessToken: string | null;
  refreshToken: string | null;

  // 온보딩 진행 상황 + 결과
  onboardingStep: number; // 1, 2 ...
  intakeResult: IntakeResult | null; // 온보딩에서 받은 값 저장 (Swagger 타입 그대로)

  // 로그인 관련
  login: (params: { email: string; password: string }) => Promise<void>;
  signup: (params: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  setUser: (user: AppUser | null) => void;

  // OAuth(카카오) 포함: 토큰 세팅용
  setTokens: (params: {
    accessToken: string;
    refreshToken?: string | null;
  }) => void;

  // 온보딩 액션
  setOnboardingStep: (step: number) => void;
  completeOnboarding: (intake: IntakeResult) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    // (set, get) => ({
    (set) => ({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,

      onboardingStep: 1,
      intakeResult: null,

      devForceLogin: () => {
        const dummyUser: AppUser = {
          id: 999,
          username: "개발용 사용자",
          email: "dev@example.com",
          gender: "OTHER",
          age: 0,
          height: 0,
          weight: 0,
          profileCompleted: false,
          onboardingCompleted: false,
        };

        // 토큰도 대충 채워두면 좋음 (실제 API 안 타도 프론트는 돌아감)
        set({
          user: dummyUser,
          isAuthenticated: true,
          accessToken: "DEV_ACCESS_TOKEN",
          refreshToken: "DEV_REFRESH_TOKEN",
          onboardingStep: 1,
          intakeResult: null,
        });

        // 혹시 axios 인터셉터에서 localStorage 읽고 있으면 거기도 넣어주기
        localStorage.setItem("accessToken", "DEV_ACCESS_TOKEN");
        localStorage.setItem("refreshToken", "DEV_REFRESH_TOKEN");
      },

      // 실제 로그인 api 연동
      login: async ({ email, password }) => {
        // 1) 로그인 요청 → 토큰 받기
        const data = await authApi.login({ email, password });

        // 1) 토큰 저장
        localStorage.setItem("accessToken", data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }

        // 이것도 백 준비되면!
        // // 토큰 + 유저 세팅
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken ?? null,
          user: data.user,
          isAuthenticated: true,
          onboardingStep: 1,
          intakeResult: null,
        });
        //
        // localStorage에도 저장 (axios 인터셉터 fallback용)
        localStorage.setItem("accessToken", data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }
      },
      //
      // 실제 회원가입 api 연동
      signup: async ({ email, password }) => {
        await authApi.signup({
          email,
          password,
          passwordCheck: password,
          emailVerified: false, // 임시로 false. 추후 개발
        });
        // 여기서는 자동 로그인까지 할지, 그냥 “성공만 알리고 로그인 페이지로 보내기” 할지 선택
      },

      logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        set({
          user: null,
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          onboardingStep: 1,
          intakeResult: null,
        });
      },

      setUser: (user) =>
        set((state) => ({
          user,
          isAuthenticated: !!user || !!state.accessToken,
        })),

      //  카카오 포함 토큰 세팅
      setTokens: ({ accessToken, refreshToken }) =>
        set((state) => {
          // localStorage 동기화
          localStorage.setItem("accessToken", accessToken);
          if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
          }
          return {
            accessToken,
            refreshToken: refreshToken ?? state.refreshToken,
            isAuthenticated: true,
          };
        }),

      setOnboardingStep: (step) =>
        set(() => ({
          onboardingStep: step,
        })),

      // 온보딩 끝났을 때 IntakeResult + 유저 상태 업데이트
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
      name: "rehab-auth", // ← localStorage key
      // 로컬에 저장할 필드만 선택
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        onboardingStep: state.onboardingStep,
        intakeResult: state.intakeResult,
        // 토큰도 저장
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
