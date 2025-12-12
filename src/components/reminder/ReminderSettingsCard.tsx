// src/components/reminder/ReminderSettingsCard.tsx
import { useEffect, useState } from "react";
import { reminderApi } from "../../apis/reminderApi";
import type { Reminder } from "../../types/apis/reminder";

const DEFAULT_RULE = "매일 21:00"; // 임시 프리셋

export const ReminderSettingsCard = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [reminderId, setReminderId] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [rule, setRule] = useState(DEFAULT_RULE);
  const [nextFireAt, setNextFireAt] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  // 1) 초기 로딩: /reminders
  useEffect(() => {
    const fetchReminder = async () => {
      try {
        setLoading(true);
        setError(null);

        const reminders = await reminderApi.list();

        // type/channel 기준으로 첫 번째 것만 사용
        const exerciseReminder = reminders.find(
          (r) => r.type === "EXERCISE" && r.channel === "PUSH"
        );

        if (exerciseReminder) {
          hydrateFromReminder(exerciseReminder);
        }
      } catch (e) {
        setError("리마인더 정보를 불러오지 못했어요.");
        console.error('데이터를 불러오는 중 오류 발생:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchReminder();
  }, []);

  const hydrateFromReminder = (reminder: Reminder) => {
    setReminderId(reminder.reminderId);
    setEnabled(reminder.enabled);
    setRule(reminder.rule);
    setNextFireAt(reminder.nextFireAt ?? null);
  };

  // 2) 저장 버튼 클릭 시: create or update
  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      let updated: Reminder;

      if (reminderId == null) {
        // 아직 없는 경우 → 생성
        updated = await reminderApi.create({
          type: "EXERCISE",
          channel: "PUSH",
          rule,
          enabled,
        });
      } else {
        // 이미 있는 경우 → 수정
        updated = await reminderApi.update(reminderId, {
          rule,
          enabled,
        });
      }

      hydrateFromReminder(updated);
    } catch (e) {
      setError("리마인더 설정을 저장하지 못했어요.");
      console.error('데이터를 불러오는 중 오류 발생:', e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-4 text-sm text-gray-500">
        리마인더 정보를 불러오는 중입니다…
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            운동 리마인더
          </h2>
          <p className="text-xs text-gray-500">
            매일 일정 시간에 푸시 알림으로 재활 루틴을 상기시켜줘요.
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

      <div className="mb-3 space-y-1">
        <label className="text-xs font-medium text-gray-700">
          리마인더 규칙 (rule)
        </label>
        <input
          type="text"
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder='예: "매일 21:00" 혹은 cron 형식'
          value={rule}
          onChange={(e) => setRule(e.target.value)}
        />
        {nextFireAt && (
          <p className="text-[11px] text-gray-400">
            다음 알림 예정 시각: {new Date(nextFireAt).toLocaleString()}
          </p>
        )}
      </div>

      {error && (
        <p className="mb-2 text-xs text-red-500">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {saving ? "저장 중…" : "리마인더 저장"}
      </button>
    </div>
  );
};
