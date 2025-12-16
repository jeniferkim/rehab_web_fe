// src/pages/ReminderSettingsPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReminderStore } from "../stores/reminderStore";

// rule 문자열에서 "HH:mm" 형태만 뽑아내는 헬퍼
const extractTimeFromRule = (rule?: string | null): string | null => {
  if (!rule) return null;
  const match = rule.match(/(\d{1,2}):(\d{2})/); // 예: "21:00", "매일 21:00" 등
  if (!match) return null;

  const hour = match[1].padStart(2, "0");
  const minute = match[2];
  return `${hour}:${minute}`;
};

const DEFAULT_TIME = "21:00"; // 기본 21시

const ReminderSettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  };

  const {
    reminders,
    loading,
    saving,
    // error,
    fetchReminders,
    createReminder,
    updateReminder,
    clearError,
  } = useReminderStore();

  const [enabled, setEnabled] = useState(true);
  const [time, setTime] = useState<string>(DEFAULT_TIME);
  const [localError, setLocalError] = useState<string | null>(null);

  // EXERCISE + PUSH 리마인더 한 개
  const exerciseReminder = useMemo(
    () =>
      reminders.find((r) => r.type === "EXERCISE" && r.channel === "PUSH") ??
      null,
    [reminders]
  );

  // 최초 진입 시 리마인더 불러오기
  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  // 서버에서 가져온 값으로 폼 초기화
  useEffect(() => {
    if (!exerciseReminder) return;

    setEnabled(exerciseReminder.enabled);

    const t = extractTimeFromRule(exerciseReminder.rule);
    setTime(t ?? DEFAULT_TIME);
  }, [exerciseReminder]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleSave = async () => {
    clearError();
    setLocalError(null);

    if (!time) {
      setLocalError("알림 시간을 선택해주세요.");
      return;
    }

    // HTML time input은 "HH:MM" 형식
    // rule은 일단 "HH:mm" 문자열 그대로 저장 (나중에 BE랑 포맷 맞춰도 됨)
    const rule = time;

    showToast("리마인더가 저장됐어요!");

    try {
      if (!exerciseReminder) {
        // 아직 리마인더가 없는 경우 → 생성
        await createReminder({
          type: "EXERCISE",
          channel: "PUSH",
          rule,
          enabled,
        });
      } else {
        // 있는 경우 → 수정
        await updateReminder(exerciseReminder.reminderId, {
          rule,
          enabled,
        });
      }
    } catch {
      // store에서 error 세팅해주니까 여기서는 로컬 에러만 두면 됨
      return;
    }
  };

  const nextFireLabel =
    exerciseReminder?.nextFireAt &&
    new Date(exerciseReminder.nextFireAt).toLocaleString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="px-6 py-6">
      {/* 상단 헤더 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            운동 리마인더 설정
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            주기적으로 재활 루틴을 잊지 않도록 알림 시간을 설정할 수 있어요.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/app/settings")}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          설정으로 돌아가기
        </button>
      </div>

      {/* 내용 카드 */}
      <div className="max-w-xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        {/* ON / OFF 토글 */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              운동 리마인더
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              지정한 시간에 푸시 알림으로 오늘의 루틴을 알려줄게요.
            </p>
          </div>

          <label className="inline-flex cursor-pointer items-center gap-2">
            <span className="text-xs text-gray-600">
              {enabled ? "켜짐" : "꺼짐"}
            </span>
            <input
              type="checkbox"
              className="peer sr-only"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
            <div className="h-5 w-9 rounded-full bg-gray-300 peer-checked:bg-blue-500">
              <div className="relative h-5 w-9">
                <div className="absolute left-0 top-0 h-5 w-5 translate-x-0 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
              </div>
            </div>
          </label>
        </div>

        {/* 시간 선택 */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-gray-700">
              알림 시간
            </label>

            <input
              type="time"
              value={time}
              onChange={handleTimeChange}
              className="w-44 rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <p className="text-[11px] text-gray-500">
            예: 21:00으로 설정하면 매일 밤 9시에 운동 알림이 발송돼요.
          </p>
        </div>

        {/* 다음 알림 예정 안내 */}
        {nextFireLabel && (
          <p className="mb-4 text-[11px] text-gray-400">
            다음 알림 예정: {nextFireLabel}
          </p>
        )}

        {/* 에러 메시지 (시연용: 로컬 검증 에러만 노출) */}
        {localError && (
          <p className="mb-3 text-xs text-red-500">{localError}</p>
        )}

        {/* 액션 버튼 */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/app/home")}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            홈으로 이동
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "저장 중…" : "리마인더 저장"}
          </button>
        </div>
      </div>

      {/* 로딩 상태 오버레이 (선택사항) */}
      {loading && (
        <div className="mt-3 text-xs text-gray-500">
          리마인더 정보를 불러오는 중이에요…
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-black px-4 py-3 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
};

export default ReminderSettingsPage;
