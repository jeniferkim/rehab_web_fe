// src/pages/CalendarPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import CalendarMonthView from "../components/calendar/CalendarMonthView";
import DayScheduleList from "../components/calendar/DayScheduleList";
import { mockEventsByDate } from "../mocks/calendarMocks";
import {
  mockDayStatusByDate,
  type DayCompletionStatus,
  type DayStatusMeta,
} from "../mocks/calendarStatusMock";
import { useAuthStore } from "../stores/authStore";
import type { ExerciseLog } from "../types/apis/exerciseLog";
import { exerciseLogApi } from "../apis/exerciseLogApi";
import { buildDayStatusFromLogs } from "../utils/buildDayStatusFromLogs";

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
  const { user } = useAuthStore();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [logs, setLogs] = useState<ExerciseLog[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [logsError, setLogsError] = useState<string | null>(null);

  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 4)); // 2025-12

  const handleChangeMonth = (offset: number) => {
    setCurrentMonth((prev) => {
      const next = new Date(prev);
      next.setMonth(prev.getMonth() + offset);
      return next;
    });
  };

  useEffect(() => {
    if (!user?.userId) return;

    let cancelled = false;

    const fetchLogs = async () => {
      setIsLoadingLogs(true);
      setLogsError(null);

      try {
        const dateStr = formatDateLabel(selectedDate);
        const res = await exerciseLogApi.getLogsByDate({
          userId: user.userId,
          date: dateStr,
        });

        if (!cancelled) {
          setLogs(res.logs ?? []);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setLogsError("운동 로그를 불러오는 중 문제가 생겼어요.");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingLogs(false);
        }
      }
    };

    fetchLogs();
    return () => {
      cancelled = true;
    };
  }, [user?.userId, selectedDate]);


  const selectedDateLabel = useMemo(
    () => formatDateLabel(selectedDate),
    [selectedDate]
  );

  const events = mockEventsByDate[selectedDateLabel] ?? [];
  const selectedDayStatus: DayStatusMeta = useMemo(
    () => buildDayStatusFromLogs(logs),
    [logs],
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <section className="mt-1">
        <h1 className="text-2xl font-bold text-gray-900">캘린더</h1>
      </section>

      {/* 상단 월 달력 */}
      <CalendarMonthView
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onChangeMonth={handleChangeMonth}
        onSelectDate={setSelectedDate}
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
                {selectedDayStatus.recoveryScore != null &&
                  ` · 회복 점수 ${selectedDayStatus.recoveryScore}점`}
              </p>
            )}
          </div>
        </div>

        <DayScheduleList dateLabel={selectedDateLabel} events={events} />
      </section>

      <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold text-gray-900">
          {formatDateLabel(selectedDate)} 운동 로그
        </h2>

        {isLoadingLogs && (
          <p className="text-xs text-gray-500">로그 불러오는 중…</p>
        )}

        {logsError && (
          <p className="text-xs text-red-500">{logsError}</p>
        )}

        {!isLoadingLogs && !logsError && logs.length === 0 && (
          <p className="text-xs text-gray-400">
            이 날짜에는 기록된 운동 로그가 없습니다.
          </p>
        )}

        {!isLoadingLogs && logs.length > 0 && (
          <ul className="space-y-2">
            {logs.map((log) => (
              <li
                key={log.exerciseLogId}
                className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2 text-xs"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    PlanItem #{log.planItemId}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    통증 {log.painBefore ?? "-"} → {log.painAfter ?? "-"} / RPE{" "}
                    {log.rpe ?? "-"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">
                    {log.completionRate}%
                  </p>
                  {log.durationSec && (
                    <p className="text-[11px] text-gray-400">
                      {(log.durationSec / 60).toFixed(0)}분
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

    </div>
  );
};

export default CalendarPage;
