// src/stores/reminderStore.ts
import { create } from "zustand";
import { reminderApi } from "../apis/reminderApi";
import type {
  Reminder,
  CreateReminderRequest,
  UpdateReminderRequest,
} from "../types/apis/reminder";

interface ReminderStoreState {
  reminders: Reminder[];

  loading: boolean; // 목록 불러오는 중
  saving: boolean;  // 생성/수정 중
  error: string | null;

  // actions
  fetchReminders: () => Promise<void>;
  createReminder: (payload: CreateReminderRequest) => Promise<Reminder>;
  updateReminder: (
    reminderId: number,
    payload: UpdateReminderRequest
  ) => Promise<Reminder>;

  // helpers
  getExercisePushReminder: () => Reminder | null;
  clearError: () => void;
}

export const useReminderStore = create<ReminderStoreState>((set, get) => ({
  reminders: [],

  loading: false,
  saving: false,
  error: null,

  // 1) 전체 리마인더 조회
  async fetchReminders() {
    try {
      set({ loading: true, error: null });

      const reminders = await reminderApi.list();

      set({
        reminders,
        loading: false,
      });
    } catch (e) {
      console.error(e);
      set({
        loading: false,
        error: "리마인더 정보를 불러오지 못했어요.",
      });
    }
  },

  // 2) 리마인더 생성
  async createReminder(payload) {
    try {
      set({ saving: true, error: null });

      const created = await reminderApi.create(payload);

      set((state) => ({
        saving: false,
        reminders: [...state.reminders, created],
      }));

      return created;
    } catch (e) {
      console.error(e);
      set({
        saving: false,
        error: "리마인더 생성에 실패했어요.",
      });
      // 실패했을 때도 컴포넌트에서 핸들링할 수 있도록 에러 다시 던져주고 싶으면:
      // throw e;
      throw e;
    }
  },

  // 3) 리마인더 수정
  async updateReminder(reminderId, payload) {
    try {
      set({ saving: true, error: null });

      const updated = await reminderApi.update(reminderId, payload);

      set((state) => ({
        saving: false,
        reminders: state.reminders.map((r) =>
          r.reminderId === reminderId ? updated : r
        ),
      }));

      return updated;
    } catch (e) {
      console.error(e);
      set({
        saving: false,
        error: "리마인더 수정에 실패했어요.",
      });
      throw e;
    }
  },

  // 4) EXERCISE + PUSH용 리마인더 한 개 가져오기
  getExercisePushReminder() {
    const { reminders } = get();
    return (
      reminders.find(
        (r) => r.type === "EXERCISE" && r.channel === "PUSH"
      ) ?? null
    );
  },

  clearError() {
    set({ error: null });
  },
}));
