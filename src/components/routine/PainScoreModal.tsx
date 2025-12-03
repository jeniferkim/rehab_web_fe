// 슬라이더 또는 라디오 버튼(1~10)
// 문구: “지금 느끼는 통증을 1~10점 사이에서 선택해 주세요.”
// 버튼: “통증 점수 저장”

interface PainScoreModalProps {
  open: boolean;
  value: number | null;
  onChange: (value: number) => void;
  onSubmit: () => void;
}

export const PainScoreModal = ({
  open,
  value,
  onChange,
  onSubmit,
}: PainScoreModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-gray-900">
          오늘 운동 후 통증은 어떠신가요?
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          1점은 거의 통증이 없는 상태, 10점은 참기 힘들 정도의 통증이에요.
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>1 (통증 거의 없음)</span>
          <span>10 (매우 심함)</span>
        </div>

        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={value ?? 5}
          className="mt-2 w-full"
          onChange={(e) => onChange(Number(e.target.value))}
        />

        <p className="mt-2 text-sm font-medium text-center text-emerald-700">
          현재 선택: {value ?? 5}점
        </p>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            onClick={onSubmit}
          >
            통증 점수 저장
          </button>
        </div>
      </div>
    </div>
  );
};
