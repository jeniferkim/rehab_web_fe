// 루틴 목록/생성/수정용 mock
// AI 추천 루틴 리스트
// 내 루틴 예시 데이터
// mockRoutineData (id 기준으로 불러오는 샘플)

// src/mocks/routineMocks.ts

import type {
  RoutineSummary,
  RoutineDetail,
  RoutineItem,
  ExerciseSet,
  RoutineExercise,
  ClinicalEvidence,
  RoutineDetailView,
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

const setsNeckStretch: ExerciseSet[] = [
  { setOrder: 1, reps: 10, restSeconds: 30 },
  { setOrder: 2, reps: 10, restSeconds: 30 },
];

const setsShoulderRoll: ExerciseSet[] = [
  { setOrder: 1, reps: 15, restSeconds: 20 },
  { setOrder: 2, reps: 15, restSeconds: 20 },
];

const neckStretch: RoutineExercise = {
  id: "ex-neck-1",
  name: "목 측면 스트레칭",
  bodyPart: "목",
  thumbnailUrl:
    "https://img.youtube.com/vi/VIDEO_ID_1/hqdefault.jpg",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
  caution: "통증이 느껴지면 범위를 줄이고, 어지러우면 중단하세요.",
  sets: setsNeckStretch,
  estimatedMinutes: 5,
};

const shoulderRoll: RoutineExercise = {
  id: "ex-shoulder-1",
  name: "어깨 돌리기",
  bodyPart: "어깨",
  thumbnailUrl:
    "https://img.youtube.com/vi/VIDEO_ID_2/hqdefault.jpg",
  videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
  caution: "호흡을 멈추지 말고 편안하게 반복하세요.",
  sets: setsShoulderRoll,
  estimatedMinutes: 5,
};

const evidenceList: ClinicalEvidence[] = [
  {
    id: "e1",
    title: "목 통증 완화를 위한 스트레칭 프로그램 효과",
    source: "JOSPT",
    year: 2020,
    summary:
      "거북목 증후군 환자에서 4주간의 스트레칭 프로그램이 통증 감소와 기능 향상에 유의한 효과를 보였다는 연구.",
    link: "https://example.com/paper1",
  },
  {
    id: "e2",
    title: "어깨 가동성 회복을 위한 운동안",
    source: "대한정형외과학회지",
    year: 2018,
    summary:
      "어깨 관절 가동범위 제한 환자에게 단계적 스트레칭이 유의한 기능 개선을 보였다는 보고.",
    link: "https://example.com/paper2",
  },
];

export const mockRoutineDetailById: Record<string, RoutineDetailView> = {
  "1": {
    id: "1",
    title: "거북목 교정 루틴",
    duration: "15분",
    level: "초급",
    items: [], // 기존 스케줄용이 필요 없으면 비워둬도 됨
    exercises: [neckStretch, shoulderRoll],
    clinicalEvidence: evidenceList,
  },
};

// 오늘 메인 루틴으로 사용할 id
export const mockTodayMainRoutineId = "1";

// id -> 루틴 요약 맵 (홈에서 사용)
export const mockRoutineSummaryById: Record<string, RoutineSummary> = {
  "1": {
    id: "1",
    title: "거북목 교정 루틴",
    duration: "15분",
    level: "초급",
    itemCount: 2,
    timeRangeLabel: "오전 9시 ~ 10시",
  },
  // 필요하면 나머지 루틴도 채우기
};