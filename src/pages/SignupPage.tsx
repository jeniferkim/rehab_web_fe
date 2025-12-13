// src/pages/SignupPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password || !passwordCheck) {
      setErrorMsg("필수 입력 항목을 모두 채워 주세요.");
      return;
    }

    if (password !== passwordCheck) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 1) 회원가입
      await signup({ email, password });

      // 2) 자동 로그인
      await login({ email, password });

      const currentUser = useAuthStore.getState().user;

      // 3) 온보딩 or 홈으로
      if (currentUser && !currentUser.onboardingCompleted) {
        navigate("/onboarding/profile", { replace: true });
      } else {
        navigate("/app/home", { replace: true });
      }
    } catch (error) {
      const axiosError = error as any;
      const serverMessage =
        axiosError?.response?.data?.message ??
        "회원가입 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.";

      setErrorMsg(serverMessage);
      console.log("회원가입 에러:", axiosError?.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white px-8 py-8 shadow-md">
        {/* 상단 제목/설명 */}
        <header className="mb-6">
          <p className="text-sm font-semibold text-blue-600">OnBeat</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">회원가입</h1>
          <p className="mt-1 text-xs text-gray-500">
            재활 코칭 서비스를 이용하기 위해 간단한 정보를 입력해 주세요.
          </p>
        </header>

        {/* 폼 */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* 이메일 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">이메일</label>
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        
          {/* 비밀번호 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <input
              type="password"
              placeholder="비밀번호 확인"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "가입 중..." : "가입하기"}
          </button>
        </form>

        {/* 하단 로그인 링크 */}
        <div className="mt-4 text-center text-xs text-gray-500">
          이미 계정이 있으신가요?{" "}
          <Link
            to="/login"
            className="font-semibold text-gray-800 underline underline-offset-4 hover:text-black"
          >
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
