// src/stores/rehabPlanStore.ts
import { create } from "zustand";
import type { RehabPlanSummary } from "../types/apis/rehab";
import { mockCurrentPlan } from "../mocks/rehabPlanMocks";

type RehabPlanState = {
  currentPlan: RehabPlanSummary | null;
  setCurrentPlan: (plan: RehabPlanSummary | null) => void;
};

export const useRehabPlanStore = create<RehabPlanState>((set) => ({
  currentPlan: mockCurrentPlan,
  setCurrentPlan: (plan) => set({ currentPlan: plan }),
}));
