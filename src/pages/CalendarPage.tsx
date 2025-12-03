// src/pages/CalendarPage.tsx
import React, { useMemo, useState } from "react";
import CalendarMonthView from "../components/calendar/CalendarMonthView";
import DayScheduleList from "../components/calendar/DayScheduleList";
import { mockEventsByDate } from "../mocks/calendarMocks";

const formatDateLabel = (date: Date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
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
      />

      {/* 선택한 날짜의 일정 리스트 */}
      <DayScheduleList
        dateLabel={selectedDateLabel}
        events={events}
      />
    </div>
  );
};

export default CalendarPage;
