// src/pages/CalendarPage.tsx
import React, { useMemo, useState } from "react";
import CalendarMonthView from "../components/calendar/CalendarMonthView";
import DayScheduleList from "../components/calendar/DayScheduleList";
import { mockEventsByDate } from "../mocks/calendarMocks";
import {
  mockDayStatusByDate,
  type DayCompletionStatus,
} from "../mocks/calendarStatusMock";

const formatDateLabel = (date: Date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const getStatusLabel = (status: DayCompletionStatus) => {
  if (status === "done") return "완료";
  if (status === "pending") return "미완료";
  return "휴식";
};

const CalendarPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 4)); // 2025-12
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 4));

  const handleChangeMonth = (offset: number) => {
    setCurrentMonth((prev) => {
      const next = new Date(prev);
      next.setMonth(prev.getMonth() + offset);
      return next;
    });
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const selectedDateLabel = useMemo(
    () => formatDateLabel(selectedDate),
    [selectedDate]
  );

  const events = mockEventsByDate[selectedDateLabel] ?? [];
  const selectedDayStatus = mockDayStatusByDate[selectedDateLabel];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <section className="mt-1">
        <h1 className="text-2xl font-bold text-gray-900">캘린더</h1>
      </section>

      {/* 상단 월 달력 */}
      <CalendarMonthView
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onChangeMonth={handleChangeMonth}
        onSelectDate={handleSelectDate}
        dayStatusByDate={mockDayStatusByDate}
      />

      {/* 상태 색상 범례 */}
      <section className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-emerald-50 border border-emerald-200" />
          <span>완료</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-amber-50 border border-amber-200" />
          <span>미완료</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-slate-50 border border-slate-200" />
          <span>휴식</span>
        </div>
        <div className="ml-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          <span>운동</span>
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          <span>복약</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>리마인더</span>
        </div>
      </section>

      {/* 선택한 날짜의 일정 + 상태 요약 */}
      <section>
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedDateLabel} 일정
            </h2>
            {selectedDayStatus && (
              <p className="mt-1 text-xs text-gray-500">
                상태: {getStatusLabel(selectedDayStatus.completionStatus)}
                {selectedDayStatus.streakCount > 0 &&
                  ` · 연속 ${selectedDayStatus.streakCount}일`}
                {selectedDayStatus.painScore != null &&
                  ` · 통증 ${selectedDayStatus.painScore}점`}
              </p>
            )}
          </div>
        </div>

        <DayScheduleList dateLabel={selectedDateLabel} events={events} />
      </section>
    </div>
  );
};

export default CalendarPage;
