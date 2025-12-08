// src/mocks/exerciseMocks.ts
import type { ExerciseDetail } from "../types/apis/exercise";

export const mockExerciseDetail: ExerciseDetail = {
  exerciseId: 1,
  title: "브릿지",
  description: "엉덩이와 코어를 사용하는 기본 재활 운동입니다.",
  bodyPart: "LOW_BACK",
  difficulty: "BEGINNER",
  contraindications: {},
  progressionRules: {},
  evidenceLevel: "A",
  images: [
    {
      exerciseImageId: 1,
      title: "브릿지 시작 자세",
      imageUrl: "https://example.com/bridge-start.png",
    },
  ],
  media: [
    {
      exerciseMediaId: 1,
      url: "https://example.com/bridge-video.mp4",
      type: "VIDEO",
    },
  ],
};
