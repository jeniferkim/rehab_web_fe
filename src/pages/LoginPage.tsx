// src/pages/LoginPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
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
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="아이디"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="mt-4 w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900"
          >
            로그인
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
