// 문진 페이지에서 제출 시점에 서버에 저장

// src/pages/onboarding/OnboardingAssessmentPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { intakeApi } from "../apis/intakeApi";

const MSK_REGIONS = [
  "목 / 어깨",
  "허리",
  "무릎",
  "발목 / 발",
  "손 / 손목",
  "고관절",
  "기타",
];

const GOAL_PRESETS = [
  "통증 줄이고 싶어요",
  "일상생활을 편하게 하고 싶어요",
  "운동 / 스포츠로 복귀하고 싶어요",
  "자세를 교정하고 싶어요",
];

const PAIN_SCORES = [1,2,3,4,5,6,7,8,9,10];

type RiskLevel = "ok" | "high";

function triageRisk(painScore: number): RiskLevel {
  if (painScore >= 8) return "high";
  return "ok";
}

const OnboardingAssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [painScore, setPainScore] = useState<number | null>(null);
  const [selectedGoalPreset, setSelectedGoalPreset] = useState<string | null>(
    null
  );
  const [customGoal, setCustomGoal] = useState("");
  const [symptomDetail, setSymptomDetail] = useState(""); // 증상 상세 설명
  const [showRiskModal, setShowRiskModal] = useState<RiskLevel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // 통증 부위 + 통증 점수만 필수, 목표/상세 설명은 선택
  const isValid = selectedRegion !== null && painScore !== null;
  const finalGoal = customGoal || selectedGoalPreset || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || painScore === null) return;

    const risk = triageRisk(painScore);

    // TODO: 문진 값 저장
    // saveAssessment({ region: selectedRegion, painScore, goal: finalGoal });

    if (risk === "high") {
      setShowRiskModal("high");
      return;
    }

    // risk OK → 서버에 intake 저장
    setIsSubmitting(true);
    try {
      const payload = {
        painArea: mapRegionToPainAreaCode(selectedRegion),
        painLevel: painScore,
        goal: finalGoal,
        exerciseExperience: "BEGINNER" as const,
        symptomDetail,
      };

      // 나중에 실제 서버 연동 시 여기만 교체하면 됨
      // await intakeApi.upsertMyIntake(payload);

      // 데모용: 콘솔에만 출력
      console.log("[Mock] /users/me/intake 요청 바디:", payload);

      // 온보딩 완료 플래그를 프론트 유저 객체에 표시
      if (user) {
        setUser({
          ...user,
          onboardingCompleted: true,
        });
      }

      navigate("/app/home", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-md">
        {/* 헤더 */}
        <header className="mb-5">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1">
            <span className="text-[11px] font-semibold text-blue-600">
              온보딩 · STEP 2
            </span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            지금 상태를 한 번만 알려주세요
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            딱 세 가지만 체크하면, 지금 상태에 맞는 루틴부터 추천해 드릴게요.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. 통증 부위 (chips) */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">
                통증이 가장 신경 쓰이는 부위
              </h2>
              <span className="text-[11px] text-gray-400">한 가지만 선택</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {MSK_REGIONS.map((region) => {
                const isActive = selectedRegion === region;
                return (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setSelectedRegion(region)}
                    className={[
                      "rounded-full border px-3 py-1 text-xs font-medium transition",
                      isActive
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-white",
                    ].join(" ")}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* 2. 통증 정도 (숫자 칩 + 미니 설명 한 줄) */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">
                현재 통증 정도
              </h2>
              <span className="text-[11px] text-gray-400">0–10</span>
            </div>
            <p className="text-[11px] text-gray-500">
              0은 전혀 아프지 않음, 10은 참기 힘들 정도예요.
            </p>

            <div className="grid grid-cols-5 gap-2">
              {PAIN_SCORES.map((score) => {
                const isActive = painScore === score;
                return (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setPainScore(score)}
                    className={[
                      "h-8 rounded-full border text-xs font-semibold transition",
                      isActive
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-white",
                    ].join(" ")}
                  >
                    {score}
                  </button>
                );
              })}
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* 3. 증상 상세 설명 (선택) */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">
                요즘 어떤 상황에서 가장 불편한가요?
              </h2>
              <span className="text-[11px] text-gray-400">선택</span>
            </div>
            <p className="text-[11px] text-gray-500">
              예: 오래 앉았다가 일어날 때 허리가 뻐근해요. 아침에 더 심해요.
            </p>
            <textarea
              rows={3}
              value={symptomDetail}
              onChange={(e) => setSymptomDetail(e.target.value)}
              placeholder="자유롭게 적어주세요. 나중에 AI 상담에 활용돼요."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
            />
          </section>

          <div className="h-px bg-gray-100" />

          {/* 4. 재활 목표 (간단 프리셋 + 한 줄 입력) */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">
                이번 재활에서 가장 중요한 목표
              </h2>
              <span className="text-[11px] text-gray-400">선택 + 자유 입력</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {GOAL_PRESETS.map((goal) => {
                const isActive = selectedGoalPreset === goal;
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setSelectedGoalPreset(goal)}
                    className={[
                      "rounded-xl border px-3 py-2 text-[11px] text-left transition leading-snug",
                      isActive
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-white",
                    ].join(" ")}
                  >
                    {goal}
                  </button>
                );
              })}
            </div>

            <div className="space-y-1">
              <input
                id="customGoal"
                type="text"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="예: 계단 오를 때 덜 아프고 싶어요"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
              />
              {finalGoal && (
                <p className="text-[11px] text-gray-500">
                  현재 목표&nbsp;
                  <span className="font-semibold text-blue-600">
                    “{finalGoal}”
                  </span>
                </p>
              )}
            </div>
          </section>

          {/* 하단 버튼 */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "저장 중..." : "결과 확인하고 시작하기"}
            </button>
          </div>
        </form>
      </div>

      {/* 위험도 높은 경우 모달 */}
      {showRiskModal === "high" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              병원 진료가 먼저 필요해요
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              현재 통증 정도는 RehabAI만으로는 충분하지 않을 수 있어요.
              가까운 병원이나 응급실에 방문해 전문의 진료를 먼저 받아주세요.
            </p>
            <button
              type="button"
              onClick={() => setShowRiskModal(null)}
              className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900"
            >
              확인했어요
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingAssessmentPage;

// UI에서 사용하는 label -> 서버 코드로 매핑
function mapRegionToPainAreaCode(label: string): string {
  // 백엔드 ENUM 이름에 맞춰서 여기만 조정해주면 된다.
  if (label.includes("목") || label.includes("어깨")) return "NECK";
  if (label.includes("허리")) return "BACK";
  if (label.includes("무릎")) return "KNEE";
  if (label.includes("발목") || label.includes("발")) return "ANKLE";
  if (label.includes("손")) return "HAND";
  if (label.includes("고관절")) return "HIP";
  return "ETC";
}