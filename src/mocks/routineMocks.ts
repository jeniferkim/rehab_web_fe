// 루틴 목록/생성/수정용 mock
// AI 추천 루틴 리스트
// 내 루틴 예시 데이터
// mockRoutineData (id 기준으로 불러오는 샘플)

// src/mocks/routineMocks.ts

import type {
  RoutineSummary,
  RoutineDetail,
  RoutineItem,
} from "../types/apis/routine";

// ✅ 내 루틴 리스트 (RoutinesPage에서 쓰는 목록용)
export const mockMyRoutines: RoutineSummary[] = [
  {
    id: "1",
    title: "Routine 01",
    duration: "2H",
    level: "기본",
    itemCount: 2,
    timeRangeLabel: "09:00 ~ 12:00",
  },
  {
    id: "2",
    title: "아침 스트레칭 루틴",
    duration: "30분",
    level: "초급",
    itemCount: 3,
    timeRangeLabel: "07:30 ~ 08:00",
  },
];

// ✅ AI 추천 루틴 카드에서 쓸 요약 리스트 (AiRoutineSection용)
export const mockAiRoutineSummaries: RoutineSummary[] = [
  {
    id: "neck-1",
    title: "거북목 교정 루틴",
    duration: "15분",
    level: "초급",
  },
  {
    id: "back-1",
    title: "허리 통증 완화 루틴",
    duration: "20분",
    level: "중급",
  },
  {
    id: "knee-1",
    title: "무릎 안정화 루틴",
    duration: "25분",
    level: "초급",
  },
];

// ✅ 루틴 상세 조회용 mock (RoutineEditPage에서 사용)
//   실제 API라면: GET /routines/:id → RoutineDetail
const mockRoutineItems1: RoutineItem[] = [
  {
    id: "1-1",
    startTime: "09:00",
    endTime: "09:10",
    type: "exercise",
    memo: "허리 스트레칭 3세트",
  },
  {
    id: "1-2",
    startTime: "11:00",
    endTime: "11:10",
    type: "exercise",
    memo: "거북목 교정 운동",
  },
];

const mockRoutineItems2: RoutineItem[] = [
  {
    id: "2-1",
    startTime: "07:30",
    endTime: "07:45",
    type: "exercise",
    memo: "가벼운 전신 스트레칭",
  },
  {
    id: "2-2",
    startTime: "07:45",
    endTime: "08:00",
    type: "exercise",
    memo: "목/어깨 위주 스트레칭",
  },
];

export const mockRoutineDetailsById: Record<string, RoutineDetail> = {
  "1": {
    id: "1",
    title: "Routine 01",
    duration: "2H",
    level: "기본",
    items: mockRoutineItems1,
  },
  "2": {
    id: "2",
    title: "아침 스트레칭 루틴",
    duration: "30분",
    level: "초급",
    items: mockRoutineItems2,
  },
};
