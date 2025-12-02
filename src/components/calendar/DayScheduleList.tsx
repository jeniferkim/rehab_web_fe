// src/components/calendar/DayScheduleList.tsx
import React from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
} from "react-icons/hi2";

type CalendarEventType = "exercise" | "meal" | "medicine";

export type CalendarEvent = {
  id: string;
  time: string; // "13:00"
  type: CalendarEventType;
  title: string;
  done?: boolean;
};

type Props = {
  dateLabel: string; // "2025-12-04"
  events: CalendarEvent[];
};

const typeLabel: Record<CalendarEventType, string> = {
  exercise: "운동",
  meal: "식사",
  medicine: "복약",
};

const typeColorClass: Record<CalendarEventType, string> = {
  exercise: "text-blue-500",
  meal: "text-emerald-500",
  medicine: "text-indigo-500",
};

const DayScheduleList: React.FC<Props> = ({ dateLabel, events }) => {
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-lg font-bold text-gray-900">
        {dateLabel} 일정
      </h2>

      {events.length === 0 ? (
        <p className="rounded-2xl bg-white py-10 text-center text-sm text-gray-400 shadow-sm">
          등록된 일정이 없습니다.
        </p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm"
            >
              {/* 시간 + 내용 */}
              <div className="flex items-start gap-4 text-sm">
                <div className="w-16 text-gray-900">
                  {event.time}
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2 text-xs text-gray-500">
                    <HiOutlineClock className="h-3.5 w-3.5 text-gray-400" />
                    <span className={typeColorClass[event.type]}>
                      {typeLabel[event.type]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900">{event.title}</p>
                </div>
              </div>

              {/* 완료 체크 */}
              <button
                type="button"
                className="text-gray-300 hover:text-blue-500"
              >
                {event.done ? (
                  <HiOutlineCheckCircle className="h-6 w-6 text-blue-500" />
                ) : (
                  <span className="inline-block h-6 w-6 rounded-full border border-gray-300" />
                )}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default DayScheduleList;
