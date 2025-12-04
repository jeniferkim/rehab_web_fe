// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!username || !password) {
      setErrorMsg("아이디와 비밀번호를 모두 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ username, password });

      // 로그인 후 온보딩 여부에 따라 라우팅
      const currentUser = useAuthStore.getState().user;
      if (currentUser && !currentUser.onboardingCompleted) {
        navigate("/onboarding/profile", { replace: true }); // 👶🏻 Todo: 온보딩 엔드포인트 확인
      } else {
        navigate("/home", { replace: true });
      }
    } catch (error) {
      // 실제 API 사용 시 에러 메시지 파싱해서 세팅
      setErrorMsg("아이디 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm px-6">
        {/* 로고 & 문구 */}
        <div className="mb-10 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100">
            {/* 아이콘 자리 */}
            <span className="text-2xl">📈</span>
          </div>
          <div className="text-center">
            <p className="text-2xl font-extrabold text-blue-600">OnBeat</p>
            <p className="mt-1 text-xs text-gray-500">
              당신의 건강한 내일을 위한 스마트한 선택
            </p>
          </div>
        </div>

        {/* 폼 */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="아이디"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
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

          {/* 에러 메시지 */}
          {errorMsg && (
            <p className="text-xs text-red-500">{errorMsg}</p>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>

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
