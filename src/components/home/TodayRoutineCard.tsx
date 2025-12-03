// src/components/home/TodayRoutineCard.tsx
import { useNavigate } from "react-router-dom";
import type { RoutineSummary } from "../../types/apis/routine";

interface TodayRoutineCardProps {
  routine?: RoutineSummary; // 오늘 루틴이 없을 수도 있으니 옵션
}

const TodayRoutineCard = ({ routine }: TodayRoutineCardProps) => {
  const navigate = useNavigate();

  // 오늘 루틴이 없을 때
  if (!routine) {
    return (
      <section className="rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-5 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900">오늘의 루틴</h2>
        <p className="mt-2 text-xs text-gray-500">
          아직 설정된 루틴이 없어요. 루틴 페이지에서 내 루틴을 만들어볼까요?
        </p>
        <button
          type="button"
          className="mt-3 inline-flex items-center rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => navigate("/app/routines")}
        >
          루틴 목록 보러가기
        </button>
      </section>
    );
  }

  const handleStartClick = () => {
    navigate(`/app/routines/${routine.id}`);
  };

  return (
    <section className="rounded-2xl border border-gray-100 bg-white px-4 py-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
            오늘의 루틴
          </p>
          <h2 className="mt-1 text-sm font-semibold text-gray-900">
            {routine.title}
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            {routine.level} · {routine.duration} · 운동 {routine.itemCount}개
          </p>
          {routine.timeRangeLabel && (
            <p className="mt-1 text-[11px] text-gray-400">
              권장 시간대: {routine.timeRangeLabel}
            </p>
          )}
        </div>

        <button
          type="button"
          className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
          onClick={handleStartClick}
        >
          오늘 루틴 시작하기
        </button>
      </div>
    </section>
  );
};

export default TodayRoutineCard;
