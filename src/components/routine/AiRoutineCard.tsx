type Props = {
  routine: AiRoutineMock;
};

// AiRoutineCard.tsx (또는 타입 정의 파일)

export type AiRoutineMock = {
  title: string;
  durationLabel: string;
  levelLabel: string;
  youtubeUrl: string;
  image: string;
};

export const AiRoutineCard: React.FC<Props> = ({ routine }) => {
  const handleClick = () => {
    window.open(routine.youtubeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="min-w-[220px] flex-1 rounded-3xl bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-32 w-full bg-gray-900">
        <img
          src={routine.image}
          alt={routine.title}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* 텍스트 영역: 패딩/간격 정리 */}
      <div className="p-4">
        <p className="text-sm font-semibold text-gray-900 line-clamp-1">
          {routine.title}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {routine.durationLabel} · {routine.levelLabel}
        </p>
      </div>
    </button>
  );
};
