// src/pages/RoutinesPage.tsx
import React from "react";
import AiRoutineSection from "../components/routine/AiRoutineSection";
import MyRoutineSection from "../components/routine/MyRoutineSection";
import { useAuthStore } from "../stores/authStore";

const GANGDONG_SPORTS_URL =
  "https://www.gangdong.go.kr/web/culture/bbs/athletic";

const LocalProgramSection: React.FC = () => {
  const { user } = useAuthStore();

  // 데모 고정값: 요청대로 서울시 강동구
  const region = user?.address?.trim() || "서울시 강동구";

  // ✅ “실제 지자체 공식명/일정”처럼 보이지 않게 ‘예시’로 구성
  const mockPrograms = [
    {
      title: "올림픽공원 걷기/스트레칭 클래스 (예시)",
      desc: "가벼운 유산소 + 전신 스트레칭 중심",
    },
    {
      title: "강동구 생활체육 기초 근력운동 (예시)",
      desc: "초급 근력(코어/하체)·자세 교정 중심",
    },
    {
      title: "보건소/복지관 재활운동 프로그램 (예시)",
      desc: "재활 이후 유지 운동·통증 관리 교육 중심",
    },
  ];

  const openGangdongPage = () => {
    window.open(GANGDONG_SPORTS_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            우리 동네 프로그램
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {region} 기준으로 참고할 수 있는 활동을 정리했어요.
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
          예시 · 데모
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {mockPrograms.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
          >
            <div className="text-sm font-bold text-gray-900">{p.title}</div>
            <div className="mt-1 text-xs text-gray-600">{p.desc}</div>

            <button
              type="button"
              onClick={openGangdongPage}
              className="mt-3 w-full rounded-xl bg-black py-2 text-sm font-semibold text-white hover:bg-gray-900"
            >
              강동구청 프로그램 보러가기
            </button>

            <p className="mt-2 text-[11px] text-gray-500">
              * 데모에서는 공공 페이지로 연결하고, 추후 공공데이터/API 연동으로
              확장 가능
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const RoutinesPage: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <section className="mt-1">
        <h1 className="text-2xl font-bold text-gray-900">루틴</h1>
        <p className="mt-1 text-sm text-gray-500">
          AI 추천 루틴과 나만의 루틴을 관리할 수 있어요.
        </p>
      </section>

      {/* AI 추천 루틴 섹션 */}
      <AiRoutineSection />

      {/* ✅ AI 추천 루틴 아래: 지역 프로그램 데모 섹션 */}
      <LocalProgramSection />

      <MyRoutineSection />
    </div>
  );
};

export default RoutinesPage;
