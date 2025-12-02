// src/components/calendar/CalendarMonthView.tsx
import React from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";

type Props = {
  currentMonth: Date;
  selectedDate: Date;
  onChangeMonth: (offset: number) => void; // -1, +1
  onSelectDate: (date: Date) => void;
};

const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"];

const CalendarMonthView: React.FC<Props> = ({
  currentMonth,
  selectedDate,
  onChangeMonth,
  onSelectDate,
}) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); // 0-11

  // 이번 달 1일이 무슨 요일인지
  const firstDay = new Date(year, month, 1).getDay();
  // 이번 달 총 일수
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const days: (number | null)[] = [];
  // 앞에 비는 칸
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  // 실제 날짜
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      {/* 월 헤더 */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onChangeMonth(-1)}
          className="rounded-full p-1 hover:bg-gray-100"
        >
          <HiOutlineChevronLeft className="text-gray-500" />
        </button>
        <div className="text-base font-semibold text-gray-900">
          {year}년 {month + 1}월
        </div>
        <button
          type="button"
          onClick={() => onChangeMonth(1)}
          className="rounded-full p-1 hover:bg-gray-100"
        >
          <HiOutlineChevronRight className="text-gray-500" />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="mb-2 grid grid-cols-7 text-center text-xs text-gray-400">
        {weekdayLabels.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-y-1 text-sm">
        {days.map((day, idx) => {
          if (day === null) {
            return <div key={idx} />;
          }

          const thisDate = new Date(year, month, day);
          const isToday = isSameDay(thisDate, today);
          const selected = isSameDay(thisDate, selectedDate);

          let classes =
            "mx-auto flex h-9 w-9 items-center justify-center rounded-full transition";

          if (selected) {
            classes += " bg-blue-600 text-white";
          } else if (isToday) {
            classes += " border border-blue-500 text-blue-600";
          } else {
            classes += " text-gray-800 hover:bg-gray-100";
          }

          return (
            <button
              key={idx}
              type="button"
              className={classes}
              onClick={() => onSelectDate(thisDate)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarMonthView;
