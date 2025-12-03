// 텍스트: “오늘 루틴을 모두 완료했어요! 오늘 루틴 완료로 체크할까요?”
// 버튼: “오늘 루틴 완료하기” / “나중에 할게요”

interface RoutineCompleteModalProps {
  open: boolean;
  isCompletedToday?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const RoutineCompleteModal = ({
  open,
  isCompletedToday = false,
  onClose,
  onConfirm,
}: RoutineCompleteModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-gray-900">
          오늘 루틴을 모두 완료했어요 🎉
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {isCompletedToday
            ? "오늘은 이미 이 루틴을 완료로 체크했어요."
            : "오늘 루틴을 완료로 체크하고, streak와 회복 점수를 업데이트할까요?"}
        </p>
        <div className="mt-6 flex justify-end gap-3 text-sm">
          <button
            type="button"
            className="rounded-full border border-gray-200 px-4 py-2 text-gray-600 hover:bg-gray-50"
            onClick={onClose}
          >
            나중에 할게요
          </button>
          <button
            type="button"
            className="rounded-full bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
            onClick={onConfirm}
          >
            오늘 루틴 완료하기
          </button>
        </div>
      </div>
    </div>
  );
};
