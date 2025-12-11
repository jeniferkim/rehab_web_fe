import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RoutineSummary } from "../types/apis/routine";
import { mockMyRoutines } from "../mocks/routineMocks";

type RoutineState = {
  myRoutines: RoutineSummary[];
  addRoutine: (routine: Omit<RoutineSummary, "id">) => number;
};

export const useRoutineStore = create<RoutineState>()(
  persist(
    (set, get) => ({
      myRoutines: mockMyRoutines, // 초기엔 mockMyRoutines를 합쳐도 됨

      addRoutine: (routine) => {
        const id = Date.now(); // 데모용 ID
        const newRoutine: RoutineSummary = { id, ...routine };
        set({ myRoutines: [...get().myRoutines, newRoutine] });
        return id;
      },
    }),
    { name: "rehab-my-routines" },
  ),
);
