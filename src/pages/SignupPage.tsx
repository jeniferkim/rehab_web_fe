// src/pages/SignupPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);
  const login = useAuthStore((state) => state.login);

  const [email, setemail] = useState("");
  const [phone, setPhone] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [idCheckMsg, setIdCheckMsg] = useState<string | null>(null);

  const handleIdCheck = () => {
    if (!email) {
      setIdCheckMsg("아이디를 먼저 입력해 주세요.");
      return;
    }
    // TODO: 실제 아이디 중복확인 API 호출
    setIdCheckMsg("사용 가능한 아이디입니다.");
  };

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
      await signup({ email, password, phone });

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
      setErrorMsg("회원가입 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
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
          {/* 아이디 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">아이디</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="아이디를 입력하세요"
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                  setIdCheckMsg(null);
                }}
                autoComplete="email"
              />
              <button
                type="button"
                onClick={handleIdCheck}
                className="whitespace-nowrap rounded-xl bg-black px-3 py-2 text-xs font-semibold text-white hover:bg-gray-900"
              >
                중복확인
              </button>
            </div>

            {idCheckMsg && (
              <p className="rounded-xl bg-blue-50 px-3 py-2 text-xs text-blue-700">
                {idCheckMsg}
              </p>
            )}
          </div>

          {/* 휴대폰 번호 + 인증 */}
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                휴대폰 번호
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  placeholder="01012345678"
                  className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button
                  type="button"
                  className="whitespace-nowrap rounded-xl bg-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-400"
                  onClick={() => {
                    alert("인증번호 발송 기능은 추후 제공됩니다.");
                  }}
                >
                  인증번호
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="인증번호 6자리"
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
              />
              <button
                type="button"
                className="whitespace-nowrap rounded-xl bg-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-400"
                onClick={() => {
                  alert("인증 완료 기능은 추후 제공됩니다.");
                }}
              >
                인증완료
              </button>
            </div>
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
