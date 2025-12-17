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
      <div className="mb-3 h-20 w-full overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={routine.image}
          alt={routine.title}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      <p className="text-sm font-semibold text-gray-900">{routine.title}</p>
      <p className="mt-1 text-xs text-gray-500">
        {routine.durationLabel} · {routine.levelLabel}
      </p>
    </button>
  );
};
