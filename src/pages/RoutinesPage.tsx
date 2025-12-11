// src/pages/RoutinesPage.tsx

import AiRoutineSection from "../components/routine/AiRoutineSection";
import MyRoutineSection from "../components/routine/MyRoutineSection";
import { useRoutineStore } from "../stores/routineStore";
// import { mockMyRoutines } from "../mocks/routineMocks";

const RoutinesPage: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      {/* 상단 타이틀 섹션 */}
      <section className="mt-1">
        <h1 className="text-2xl font-bold text-gray-900">루틴</h1>
        <p className="mt-1 text-sm text-gray-500">
          AI 추천 루틴과 나만의 루틴을 관리할 수 있어요.
        </p>
      </section>

      {/* AI 추천 루틴 섹션 */}
      <AiRoutineSection />

      {/* 내 루틴 섹션 (루틴 생성하기 버튼 + 내 루틴 리스트) */}
      {/* <MyRoutineSection routines={mockMyRoutines} /> */}
      <MyRoutineSection routines={useRoutineStore().myRoutines} />
    </div>
  );
};

export default RoutinesPage;
