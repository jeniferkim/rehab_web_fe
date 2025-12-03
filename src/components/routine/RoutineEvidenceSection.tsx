// 임상 근거 카드 리스트

import type { ClinicalEvidence } from "../../types/apis/routine";

interface RoutineEvidenceSectionProps {
  evidences: ClinicalEvidence[];
}

const RoutineEvidenceSection = ({
  evidences,
}: RoutineEvidenceSectionProps) => {
  if (evidences.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900">
        임상 근거
      </h3>
      <p className="mt-1 text-xs text-gray-500">
        이 루틴은 아래 근거를 바탕으로 구성되었어요.
      </p>

      <ul className="mt-3 space-y-3">
        {evidences.map((ev) => (
          <li key={ev.id} className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-medium text-gray-900">
              {ev.title}
            </p>
            <p className="mt-1 text-[11px] text-gray-500">
              {ev.source}
              {ev.year && ` · ${ev.year}`}
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-gray-600">
              {ev.summary}
            </p>
            {ev.link && (
              <a
                href={ev.link}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-[11px] font-medium text-emerald-700 hover:underline"
              >
                원문/자세히 보기 →
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RoutineEvidenceSection;
