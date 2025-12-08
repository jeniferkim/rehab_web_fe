// src/mocks/exerciseMocks.ts
import type { ExerciseDetail } from "../types/apis/exercise";

// 스웨거 Example 를 베이스로 한 공통 목 데이터
const baseExerciseDetail: ExerciseDetail = {
  exerciseId: 0,
  title: "브리지",
  description: "허리와 둔부의 안정성을 높이는 스트레칭입니다.",
  bodyPart: "BACK",
  difficulty: "BEGINNER",
  contraindications: {},     // 금기사항 (지금은 비워둠)
  progressionRules: {},      // 진행/변형 규칙 (지금은 비워둠)
  evidenceLevel: "A",
  images: [
    {
      exerciseImageId: 1,
      title: "브리지 기본 자세",
      imageUrl: "https://example.com/bridge.png",
    },
  ],
  media: [
    {
      exerciseMediaId: 1,
      url: "https://example.com/bridge.mp4",
      mediaType: "VIDEO",
      language: "ko",
      duration: "00:01:00",
    },
  ],
  createdAt: "2025-12-08T06:21:24.828Z",
  updatedAt: "2025-12-08T06:21:24.828Z",
};

// 🔹 ID마다 살짝 다른 것처럼 보이게 만드는 헬퍼
export function mockExerciseDetailById(exerciseId: number): ExerciseDetail {
  return {
    ...baseExerciseDetail,
    exerciseId,
    title: `브리지 변형 #${exerciseId}`,
    images: baseExerciseDetail.images.map((img) => ({
      ...img,
      exerciseImageId: exerciseId,
    })),
    media: baseExerciseDetail.media.map((m) => ({
      ...m,
      exerciseMediaId: exerciseId,
    })),
  };
}
