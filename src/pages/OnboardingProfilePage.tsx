// src/pages/OnboardingProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const OnboardingProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  const [nickname, setNickname] = useState(user?.email ?? "");
  const [ageRange, setAgeRange] = useState("");
  const [painArea, setPainArea] = useState("");
  const [goal, setGoal] = useState("");

  // 로그인 안 되어 있으면 로그인으로 돌려보내기
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const isValid = nickname.trim() && ageRange && painArea;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // 나중에 이 값들은 따로 profileStore나 서버로 보낼 수 있음
    const updatedUser = {
      ...user,
      onboardingCompleted: true, // ✅ 온보딩 완료 플래그
    };

    setUser(updatedUser);
    navigate("/app/home", { replace: true }); // 지금은 바로 홈으로 보내기
    // 추후 /onboarding/assessment-intro 같은 다음 단계로 바꿔도 됨
  };

  const handleSkip = () => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    setUser({
      ...user,
      onboardingCompleted: true,
    });
    navigate("/app/home", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white px-6 py-8 shadow-md">
        {/* 상단 타이틀 */}
        <header className="mb-6">
          <p className="text-xs font-semibold text-blue-600">OnBeat Onboarding</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            기본 프로필을 알려주세요
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            앞으로의 홈 재활 코칭을 위해 몇 가지만 간단히 확인할게요.
          </p>
        </header>

        {/* 폼 */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* 닉네임 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">
              닉네임
            </label>
            <input
              type="text"
              placeholder="앱에서 사용할 이름을 입력하세요"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

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

          {/* 재활 목표 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">
              재활 목표
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

          {/* 버튼 영역 */}
          <div className="mt-4 space-y-3">
            <button
              type="submit"
              disabled={!isValid}
              className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              다음으로
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 text-xs font-medium text-gray-500 hover:bg-gray-50"
            >
              나중에 할게요 (건너뛰기)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingProfilePage;
