// src/stores/exerciseLogStore.ts
import { create } from "zustand";
import type { ExerciseLog } from "../types/apis/exerciseLog";

type ExerciseLogState = {
  // YYYY-MM-DD → ExerciseLog[]
  logsByDate: Record<string, ExerciseLog[]>;
  addLogForDate: (date: string, log: ExerciseLog) => void;
  resetAllLogs: () => void;
};

export const useExerciseLogStore = create<ExerciseLogState>()((set) => ({
  logsByDate: {},
  addLogForDate: (date, log) =>
    set((state) => {
      const prevLogs = state.logsByDate[date] ?? [];
      const nextLogs = [...prevLogs, log];

      const nextLogsByDate = {
        ...state.logsByDate,
        [date]: nextLogs,
      };

      // 🔍 디버깅용 콘솔
      console.log("[store] addLogForDate called");
      console.log("  date:", date);
      console.log("  new log:", log);
      console.log("  logsByDate after:", nextLogsByDate);

      return { logsByDate: nextLogsByDate };
    }),
  resetAllLogs: () => set({ logsByDate: {} }),
}));
