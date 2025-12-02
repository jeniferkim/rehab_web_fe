// src/components/layout/Header.jsx
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      {/* 로고 / 서비스명 */}
      <div className="flex items-center gap-2">
        <span className="rounded-lg bg-blue-600 px-2 py-1 text-sm font-bold text-white">
          RehabAI
        </span>
        <span className="text-lg font-semibold text-gray-800">
          Personal Rehab Coach
        </span>
      </div>

      {/* 우측 프로필 영역 */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm hover:bg-gray-100"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
            J
          </div>
          <span className="hidden text-sm font-medium text-gray-800 sm:inline">
            사용자 이름
          </span>
          <span className="text-xs text-gray-500">▼</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 rounded-md border border-gray-100 bg-white py-1 text-sm shadow-lg">
            <button className="block w-full px-3 py-2 text-left hover:bg-gray-50">
              내 프로필
            </button>
            <button className="block w-full px-3 py-2 text-left hover:bg-gray-50">
              설정
            </button>
            <div className="my-1 border-t" />
            <button className="block w-full px-3 py-2 text-left text-red-500 hover:bg-red-50">
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
}