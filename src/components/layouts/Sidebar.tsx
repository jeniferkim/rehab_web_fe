// src/components/layout/Sidebar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineClipboardDocumentList,
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";

const navItems = [
  { label: "홈", to: "/app/home", icon: HiOutlineHome },
  { label: "루틴", to: "/app/routines", icon: HiOutlineClipboardDocumentList },
  { label: "캘린더", to: "/app/calendar", icon: HiOutlineCalendarDays },
  { label: "AI 채팅", to: "/app/chat", icon: HiOutlineChatBubbleLeftRight },
  { label: "설정", to: "/app/settings", icon: HiOutlineCog6Tooth },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex h-full flex-col border-r border-slate-200 bg-white/95 backdrop-blur-sm transition-all duration-200 ${
        collapsed ? "w-20" : "w-64"
      } rounded-3xl shadow-sm`}
    >
      {/* 상단 헤더 + 토글 */}
      <div className="flex items-center justify-between px-4 py-3">
        {!collapsed && (
          <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-400">
            메뉴
          </span>
        )}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
        >
          {collapsed ? (
            <HiOutlineChevronDoubleRight className="h-4 w-4" />
          ) : (
            <HiOutlineChevronDoubleLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="mt-1 flex-1 space-y-1 px-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all",
                isActive
                  ? "bg-blue-500 text-white shadow-sm font-semibold"
                  : "text-slate-700 hover:bg-slate-50 font-medium",
              ].join(" ")
            }
          >
            <span
              className={[
                "flex h-8 w-8 items-center justify-center rounded-xl text-[18px]",
              ].join(" ")}
            >
              <Icon
                className={`h-5 w-5 ${
                  // active일 때도 자연스럽게 보이게
                  "group-[.active]:text-white"
                }`}
              />
            </span>
            {!collapsed && (
              <span className="truncate">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* 하단 작은 텍스트 */}
      <div className="mt-2 border-t border-slate-100 px-4 py-3 text-[10px] font-medium text-slate-400">
        {!collapsed && <span>RehabAI Web · v0.1</span>}
      </div>
    </aside>
  );
}
