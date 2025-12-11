import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RoutineSummary } from "../types/apis/routine";
import { mockMyRoutines } from "../mocks/routineMocks";

type RoutineState = {
  myRoutines: RoutineSummary[];
  addRoutine: (routine: Omit<RoutineSummary, "id">) => number;
  removeRoutine: (id: number) => void;
};

export const useRoutineStore = create<RoutineState>()(
  persist(
    (set, get) => ({
    //   시연용: 새로고침 시 mock 리스트를 기본값으로 설정
      myRoutines: mockMyRoutines,

      addRoutine: (routine) => {
        const id = Date.now(); // 데모용 ID
        const newRoutine: RoutineSummary = { id, ...routine };
        set({ myRoutines: [...get().myRoutines, newRoutine] });
        return id;
      },

      removeRoutine: (id) => {
        set({
          myRoutines: get().myRoutines.filter((r) => r.id !== id),
        });
      },
    }),
    { name: "rehab-my-routines" },
  ),
);
