// src/pages/SignupPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const SignupPage: React.FC = () => {
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
        <form className="space-y-6">
          {/* 아이디 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">아이디</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="아이디를 입력하세요"
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
              />
              <button
                type="button"
                className="whitespace-nowrap rounded-xl bg-black px-3 py-2 text-xs font-semibold text-white hover:bg-gray-900"
              >
                중복확인
              </button>
            </div>

            {/* 안내/에러 메시지 자리 */}
            <p className="rounded-xl bg-blue-50 px-3 py-2 text-xs text-blue-700">
              사용 가능한 아이디입니다.
            </p>
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
                />
                <button
                  type="button"
                  className="whitespace-nowrap rounded-xl bg-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-400"
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
              />
              <button
                type="button"
                className="whitespace-nowrap rounded-xl bg-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-400"
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
            />
            <input
              type="password"
              placeholder="비밀번호 확인"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
            />
            {/* 비밀번호 에러 메시지 자리 */}
            <p className="text-xs text-red-500">
              {/* 예: 비밀번호가 일치하지 않습니다. */}
            </p>
          </div>

          {/* 가입 버튼 */}
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900"
          >
            가입하기
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
