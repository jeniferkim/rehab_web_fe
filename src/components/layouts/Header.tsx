// src/components/layout/Header.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  // 유저 정보 읽어오기
  const user = useAuthStore((s) => s.user);


  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

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
          {/* 프로필 동그라미 (이니셜) */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
            {user?.username ? user.username[0].toUpperCase() : "?"}
          </div>

          {/* 이름 */}
          <span className="hidden text-sm font-medium text-gray-800 sm:inline">
            {user?.username ?? "사용자"}
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
            <button 
              onClick={handleLogout}
              className="block w-full px-3 py-2 text-left text-red-500 hover:bg-red-50"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
}