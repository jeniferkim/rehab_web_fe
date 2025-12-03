// 현재 선택된 운동의 videoUrl로 큰 플레이어 렌더링

import type { RoutineExercise } from "../../types/apis/routine";

// src/components/routine/RoutineVideoPlayer.tsx


interface RoutineVideoPlayerProps {
  exercise: RoutineExercise;
}

const RoutineVideoPlayer = ({ exercise }: RoutineVideoPlayerProps) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-black shadow-sm">
      <div className="relative w-full pb-[56.25%]">
        {exercise.videoUrl ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={exercise.videoUrl}
            title={exercise.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-400">
            동영상 가이드를 준비 중입니다.
          </div>
        )}
      </div>

      <div className="border-t border-gray-800 bg-gray-950/70 px-4 py-3">
        <h2 className="text-sm font-semibold text-white">
          {exercise.name}
        </h2>
        <p className="mt-1 text-xs text-gray-300">
          타겟 부위: {exercise.bodyPart}
        </p>
      </div>
    </div>
  );
};

export default RoutineVideoPlayer;
