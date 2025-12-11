// src/stores/rehabPlanStore.ts
import { create } from "zustand";
import type { RehabPlanSummary } from "../types/apis/rehab";

type RehabPlanState = {
  currentPlan: RehabPlanSummary | null;
  setCurrentPlan: (plan: RehabPlanSummary | null) => void;
};

export const useRehabPlanStore = create<RehabPlanState>((set) => ({
  currentPlan: null,
  setCurrentPlan: (plan) => set({ currentPlan: plan }),
}));
