// 신체 기본 정보 받기

// src/pages/OnboardingProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import type { Gender } from "../types/apis/user";
import { userApi } from "../apis/userApi";

const OnboardingProfilePage: React.FC = () => {
  
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  const [username, setUsername] = useState(user?.username ?? "");
  const [gender, setGender] = useState<Gender | "">(
    (user?.gender as Gender) ?? "",
  );
  const [age, setAge] = useState(user?.age ? String(user.age) : "");
  const [height, setHeight] = useState(user?.height ? String(user.height) : "");
  const [weight, setWeight] = useState(user?.weight ? String(user.weight) : "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 로그인 안 되어 있으면 로그인으로 돌려보내기
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const isValid =
    username.trim() &&
    gender &&
    age.trim() &&
    height.trim() &&
    weight.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isValid) return;

    setIsSubmitting(true);
    try {
    // TODO: 나중에 실제 API 붙이기
    // const updated = await userApi.updateMe(payload);
    // setUser({ ...user, ...updated, profileCompleted: true });

    await new Promise((r) => setTimeout(r, 300)); // 데모용 딜레이

    // 나중에 이거 주석 풀면 됨.
    // try {
    //   const payload = {
    //     username: username.trim(),
    //     gender: gender as Gender,
    //     age: Number(age),
    //     height: Number(height),
    //     weight: Number(weight),
    //   };

    //   // 1) 서버에 프로필 저장
    //   const updated = await userApi.updateMe(payload);

    //   // 2) 프론트 상태 업데이트 (profileCompleted 반영)
    //   setUser({
    //     ...user,
    //     ...updated,
    //     profileCompleted: true,
    //   });

      // 3) 다음 단계(문진)로 이동
      navigate("/onboarding/assessment", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(user);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white px-6 py-8 shadow-md">
        {/* 상단 타이틀 */}
        <header className="mb-6">
          <p className="text-xs font-semibold text-blue-600">
            온보딩 · STEP 1
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            기본 정보를 알려주세요
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            이름과 신체 정보는 재활 계획을 세밀하게 맞추는 데 사용돼요.
          </p>
        </header>

        {/* 폼 */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* 이름 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">
              이름 또는 호칭
            </label>
            <input
              type="text"
              placeholder="예: 김지원 / 지원님"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* 성별 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">성별</label>
            <div className="flex gap-2">
              {[
                { value: "MALE" as Gender, label: "남성" },
                { value: "FEMALE" as Gender, label: "여성" },
                { value: "OTHER" as Gender, label: "기타" },
              ].map((item) => {
                const active = gender === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setGender(item.value)}
                    className={[
                      "flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition",
                      active
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-white",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 나이 / 키 / 몸무게 */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-800">
                나이
              </label>
              <input
                type="number"
                min={0}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-800">
                키(cm)
              </label>
              <input
                type="number"
                min={0}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-800">
                몸무게(kg)
              </label>
              <input
                type="number"
                min={0}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "저장 중..." : "다음 단계로"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingProfilePage;