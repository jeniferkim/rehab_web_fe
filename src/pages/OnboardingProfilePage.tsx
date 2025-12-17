// 신체 기본 정보 받기

// src/pages/OnboardingProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import type { Gender } from "../types/apis/user";
// import { userApi } from "../apis/userApi";

const OnboardingProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  const [username, setUsername] = useState(user?.username ?? "");
  const [gender, setGender] = useState<Gender | "">(
    (user?.gender as Gender) ?? ""
  );
  const [age, setAge] = useState(user?.age ? String(user.age) : "");
  const [height, setHeight] = useState(user?.height ? String(user.height) : "");
  const [weight, setWeight] = useState(user?.weight ? String(user.weight) : "");

  const [address, setAddress] = useState(user?.address ?? "");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
    weight.trim() &&
    address.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isValid) return;

    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      // 1) 나중에 실제 API 붙일 때 사용할 payload
      const payload = {
        username: username.trim(),
        gender: gender as Gender,
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        address: address.trim(),
        // TODO: birthDate는 UI에서 입력받거나, 나이 기준으로 계산해서 넣도록 추후 보완
        birthDate: "1990-01-01",
      };

      // 목임. 나중에 돌아가면 삭제.
      // 2) 프론트 상태 업데이트 (profileCompleted 반영)
      setUser({
        ...user,
        // ...updated,
        ...payload,
        profileCompleted: true,
      });

      // 2) 실제 서버 호출로 프로필 저장
      //    (userApi.createMe 내부에서 PATCH /users/me 호출하는 구조)
      // const updatedUser = await userApi.createMe(payload);

      // 3) 전역 상태 업데이트 (서버가 내려준 profileCompleted 값을 신뢰)
      // setUser(updatedUser);

      // 4) 다음 단계(문진)로 이동
      navigate("/onboarding/assessment", { replace: true });
    } catch (err: any) {
      // 서버에서 내려주는 message가 있으면 우선 사용
      const msg =
        err?.response?.data?.message ||
        "프로필 저장 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.";
      setErrorMsg(msg);
      console.log("[OnboardingProfile] error:", err?.response?.data);
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
          <p className="text-xs font-semibold text-blue-600">온보딩 · STEP 1</p>
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
              placeholder="예: 김지원 / 젠"
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

          {/* ✅ 주소 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">
              거주 지역
            </label>
            <input
              type="text"
              placeholder="예: 서울시 강동구"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-200"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}

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
