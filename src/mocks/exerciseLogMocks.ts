// src/mocks/exerciseLogMocks.ts
import type { ExerciseLogsByDate } from "../types/apis/exerciseLog";

export const mockExerciseLogsByDate: ExerciseLogsByDate = {
  date: "2025-12-08",
  logs: [
    {
      exerciseLogId: 1,
      userId: 1,
      planItemId: 101,
      loggedAt: "2025-12-08T09:00:00.000Z",
      painBefore: 5,
      painAfter: 3,
      rpe: 7,
      completionRate: 100,
      durationSec: 600,
      notes: "첫 세트는 조금 뻐근했지만 끝나고는 괜찮아졌음",
      status: "COMPLETED",
      createdAt: "2025-12-08T09:00:00.000Z",
      updatedAt: "2025-12-08T09:00:00.000Z",
    },
  ],
};
