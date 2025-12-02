// src/components/calendar/DatePickerModal.tsx
import React from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";

type Props = {
  open: boolean;
  onClose: () => void;
  currentMonth: Date;
  selectedDate: Date;
  onChangeMonth: (offset: number) => void;
  onSelectDate: (date: Date) => void;
};

const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"];

const DatePickerModal: React.FC<Props> = ({
  open,
  onClose,
  currentMonth,
  selectedDate,
  onChangeMonth,
  onSelectDate,
}) => {
  if (!open) return null;

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center text-sm font-semibold text-blue-600">
          루틴 적용 날짜 선택
        </h2>

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

        {/* 요일 */}
        <div className="mb-2 grid grid-cols-7 text-center text-xs text-gray-400">
          {weekdayLabels.map((label) => (
            <div key={label}>{label}</div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-y-1 text-sm mb-6">
          {days.map((day, idx) => {
            if (day === null) return <div key={idx} />;

            const date = new Date(year, month, day);
            const selected = isSameDay(date, selectedDate);

            return (
              <button
                key={idx}
                type="button"
                className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full transition ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => onSelectDate(date)}
              >
                {day}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mx-auto block text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default DatePickerModal;
