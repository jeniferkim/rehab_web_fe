// src/pages/OnboardingProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const OnboardingProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  // ✅ 닉네임/사용자 ID 제거 → 기본 프로필만
  const [ageRange, setAgeRange] = useState("");
  const [painArea, setPainArea] = useState("");
  const [goal, setGoal] = useState("");

  // 로그인 안 되어 있으면 로그인으로 돌려보내기
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // 필수값: 연령대 + 주요 통증 부위
  const isValid = !!(ageRange && painArea);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isValid) return;

    // TODO: 프로필 정보 저장 (예: profileStore 또는 서버 전송)
    // 이 예시는 user 객체에 임시로 붙여두는 형태라,
    // 실제 타입 정의에 맞게 수정해서 사용하면 됨.
    const updatedUser = {
      ...user,
      // ⚠ 실제 User 타입에 맞게 key 이름은 프로젝트에서 조정하기
      profile: {
        ageRange,
        mainPainArea: painArea,
        goal,
      },
      // 온보딩 전체 완료는 "문진까지 끝난 후"에 설정하는 걸 추천
      // onboardingCompleted: true,
    };

    setUser(updatedUser);

    // 프로필 완료 후 → 문진(assessment) 페이지로 이동
    navigate("/onboarding/assessment", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white px-6 py-8 shadow-md">
        {/* 상단 타이틀 */}
        <header className="mb-6">
          <p className="text-xs font-semibold text-blue-600">온보딩 · Step 1</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            기본 정보를 알려주세요
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            앞으로의 홈 재활 코칭을 위해 몇 가지만 간단히 확인할게요.
          </p>
        </header>

        {/* 폼 */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* 연령대 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">
              연령대
            </label>
            <select
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
            >
              <option value="">선택하세요</option>
              <option value="20s">20대</option>
              <option value="30s">30대</option>
              <option value="40s">40대</option>
              <option value="50s">50대</option>
              <option value="60+">60대 이상</option>
            </select>
          </div>

          {/* 주요 통증 부위 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">
              주요 통증 부위
            </label>
            <select
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
              value={painArea}
              onChange={(e) => setPainArea(e.target.value)}
            >
              <option value="">선택하세요</option>
              <option value="knee">무릎</option>
              <option value="back">허리</option>
              <option value="shoulder">어깨</option>
              <option value="neck">목</option>
              <option value="etc">기타</option>
            </select>
          </div>

          {/* 재활 목표 (선택) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">
              재활 목표 (선택)
            </label>
            <select
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="">선택하세요 (선택)</option>
              <option value="pain">통증 줄이기</option>
              <option value="daily">일상생활 복귀</option>
              <option value="sport">운동/스포츠 복귀</option>
              <option value="health">전반적인 건강 관리</option>
            </select>
          </div>

          {/* 버튼 영역 – 스킵 제거 */}
          <div className="mt-4">
            <button
              type="submit"
              disabled={!isValid}
              className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              다음으로
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingProfilePage;
