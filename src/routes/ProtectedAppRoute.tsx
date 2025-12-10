// src/routes/ProtectedAppRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export const ProtectedAppRoute = () => {
  const { user, onboardingStep, intakeResult } = useAuthStore();

  // 2) 온보딩 완료 여부 판단
  const hasCompletedOnboarding =
    !!user.onboardingCompleted || !!intakeResult || onboardingStep >= 99;

  if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding/profile" replace />;
  }

  // 3) 다 통과하면 /app/* 렌더
  return <Outlet />;
};
