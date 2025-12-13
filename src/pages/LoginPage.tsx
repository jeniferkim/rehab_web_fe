// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

// 카카오 인가 URL 
const KAKAO_AUTH_URL =
  import.meta.env.KAKAO_AUTH_URL; 

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg("이메일와 비밀번호를 모두 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ email, password });

      const currentUser = useAuthStore.getState().user;

      // ✅ App 라우트 구조에 맞춰서 /app/home 으로 이동
      if (currentUser && !currentUser.onboardingCompleted) {
        // 온보딩 페이지 만들면 여기로 연결
        navigate("/onboarding/profile", { replace: true }); // 👶🏻 Todo: 온보딩 엔드포인트 확인
      } else {
        navigate("/app/home", { replace: true });
      }
    } catch (error) {
      setErrorMsg("이메일 또는 비밀번호가 올바르지 않습니다.");
      console.log("로그인 에러: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKakaoLogin = () => {
    // ✅ 카카오 로그인은 보통 백엔드 OAuth 엔드포인트로 리다이렉트
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm px-6">
        {/* 로고 & 문구 */}
        <div className="mb-10 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100">
            <span className="text-2xl">📈</span>
          </div>
          <div className="text-center">
            <p className="text-2xl font-extrabold text-blue-600">Rehab</p>
            <p className="mt-1 text-xs text-gray-500">
              당신의 건강한 내일을 위한 스마트한 선택
            </p>
          </div>
        </div>

        {/* 이메일/패스워드 폼 */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="이메일"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>

        {/* 구분선 */}
        <div className="my-4 flex items-center justify-center">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="px-3 text-[10px] text-gray-400">또는</span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        {/* ✅ 카카오 로그인 버튼 */}
        <button
          type="button"
          onClick={handleKakaoLogin}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FEE500] py-3 text-sm font-semibold text-gray-900 hover:brightness-95"
        >
          {/* 아이콘 자리는 나중에 svg 넣어도 되고 지금은 텍스트만 */}
          <span>카카오로 3초 만에 시작하기</span>
        </button>

        {/* 하단 링크 */}
        <div className="mt-6 text-center">
          <Link
            to="/signup"
            className="text-xs font-medium text-gray-500 underline underline-offset-4 hover:text-gray-700"
          >
            회원가입 하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
