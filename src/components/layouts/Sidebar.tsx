// src/components/layout/Sidebar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "홈", to: "/app/home", icon: "🏠" },
  { label: "루틴", to: "/app/routines", icon: "📋" },
  { label: "캘린더", to: "/app/calendar", icon: "📅" },
  { label: "AI 코치", to: "/app/coach", icon: "🤖" },
  { label: "설정", to: "/app/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex h-full flex-col border-r bg-white transition-all duration-200 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* 상단 토글 버튼 */}
      <div className="flex items-center justify-between px-3 py-3">
        {!collapsed && (
          <span className="text-xs font-semibold uppercase text-gray-500">
            메뉴
          </span>
        )}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="ml-auto rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-50"
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="mt-2 flex-1 space-y-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50",
              ].join(" ")
            }
          >
            <span className="flex h-7 w-7 items-center justify-center text-base">
              {item.icon}
            </span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* 하단 작은 텍스트 (옵션) */}
      <div className="border-t px-3 py-3 text-[10px] text-gray-400">
        {!collapsed && <span>RehabAI Web · v0.1</span>}
      </div>
    </aside>
  );
}
