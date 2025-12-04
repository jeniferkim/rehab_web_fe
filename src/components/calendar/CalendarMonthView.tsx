import React from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";

type DayCompletionStatus = "done" | "pending" | "rest";

type DayStatusMeta = {
  completionStatus: DayCompletionStatus;
  hasExercise: boolean;
  hasMedication: boolean;
  hasReminder: boolean;
};

type DayStatusMap = Record<string, DayStatusMeta>;

type Props = {
  currentMonth: Date;
  selectedDate: Date;
  onChangeMonth: (offset: number) => void; // -1, +1
  onSelectDate: (date: Date) => void;
  dayStatusByDate: DayStatusMap;
};

const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"];

// YYYY-MM-DD 포맷
const formatDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const CalendarMonthView: React.FC<Props> = ({
  currentMonth,
  selectedDate,
  onChangeMonth,
  onSelectDate,
  dayStatusByDate,
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

  const getDayClasses = (
    status: DayCompletionStatus | undefined,
    isSelected: boolean,
    isToday: boolean
  ) => {
    let base =
      "mx-auto flex h-10 w-10 flex-col items-center justify-center rounded-full text-xs transition";

    if (isSelected) {
      return `${base} bg-blue-600 text-white`;
    }

    if (status === "done") {
      return `${base} bg-emerald-50 text-emerald-700`;
    }

    if (status === "pending") {
      return `${base} bg-amber-50 text-amber-700`;
    }

    if (status === "rest") {
      return `${base} bg-slate-50 text-slate-400`;
    }

    if (isToday) {
      return `${base} border border-blue-500 text-blue-600 font-semibold`;
    }

    return `${base} text-gray-800 hover:bg-gray-100`;
  };

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
          const dateKey = formatDateKey(thisDate);
          const dayStatus = dayStatusByDate[dateKey];

          const isToday = isSameDay(thisDate, today);
          const isSelected = isSameDay(thisDate, selectedDate);

          const classes = getDayClasses(
            dayStatus?.completionStatus,
            isSelected,
            isToday
          );

          return (
            <button
              key={idx}
              type="button"
              className={classes}
              onClick={() => onSelectDate(thisDate)}
            >
              <span>{day}</span>

              {/* 운동/복약/리마인더 유무를 작은 점으로 표시 */}
              <span className="mt-0.5 flex gap-0.5">
                {dayStatus?.hasExercise && (
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                )}
                {dayStatus?.hasMedication && (
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                )}
                {dayStatus?.hasReminder && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarMonthView;
