// src/routes/ProtectedAppRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
// import { Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export const ProtectedAppRoute = () => {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/login" replace />;

  if (!user.onboardingCompleted) {
    return <Navigate to="/onboarding/profile" replace />;
  }

  return <Outlet />;
};
