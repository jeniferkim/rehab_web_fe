// src/pages/OAuthSuccessPage.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { authApi } from "../apis/authApi";
import type { AppUser } from "../types/apis/user";

const OAuthSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [message, setMessage] = useState("카카오 로그인 처리 중입니다...");

  const setTokens = useAuthStore((state) => state.setTokens);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const run = async () => {
      const searchParams = new URLSearchParams(location.search);

      // 백엔드가 넘겨주는 이름에 맞춰 조정
      const accessToken =
        searchParams.get("accessToken") || searchParams.get("token");
      const refreshToken = searchParams.get("refreshToken");
      const error = searchParams.get("error");

      if (error) {
        setMessage("카카오 로그인에 실패했습니다. 다시 시도해 주세요.");
        return;
      }

      if (!accessToken) {
        setMessage("로그인 정보가 없습니다. 다시 로그인해 주세요.");
        return;
      }

      // 1) 토큰 저장 (refreshToken이 없을 수도 있으니 안전하게)
      setTokens({
        accessToken,
        ...(refreshToken ? { refreshToken } : {}),
      });

      try {
        // 2) 내 정보 조회 (여기서 200 떨어지면 “로그인 성공” 확정)
        const me: AppUser = await authApi.me();
        setUser(me);

        // 3) 온보딩 여부에 따라 이동
        const next = me?.onboardingCompleted
          ? "/app/home"
          : "/onboarding/profile";
        navigate(next, { replace: true });
      } catch (err) {
        console.log("[OAuthSuccess] me() failed:", err);
        setMessage(
          "로그인은 됐지만 사용자 정보를 불러오지 못했어요. 다시 시도해 주세요."
        );
        navigate("/onboarding/profile");

        return;
      }
    };

    run();
  }, [location.search, navigate, setTokens, setUser]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="rounded-xl bg-white px-6 py-8 shadow-md">
        <p className="text-center text-lg font-medium text-gray-800">
          {message}
        </p>
      </div>
    </div>
  );
};

export default OAuthSuccessPage;
