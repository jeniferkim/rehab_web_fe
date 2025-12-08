// src/types/apis/user.ts

// 백엔드 ENUM
export type Gender = "MALE" | "FEMALE" | "OTHER";

// ✅ 백엔드에서 내려오는 "완전한" 프로필 구조
export interface UserProfile {
  userId: number;
  username: string;
  email: string;
  gender: Gender;
  age: number;
  height: number;
  weight: number;
  profileCompleted: boolean;
}

// ✅ 프론트에서만 쓰는 유저 타입
// - 로그인 직후처럼 일부 정보만 있는 상태도 허용
// - 과거 코드의 id 사용을 위해 id도 옵션으로 추가
export type AppUser = Partial<UserProfile> & {
  // 프론트에서만 쓰는 임시 id (예전 코드 호환용)
  id?: string | number;
  // 온보딩(문진) 완료 여부 플래그
  onboardingCompleted?: boolean;
};

// ✅ 프로필 수정 요청 바디 (백엔드 스펙 그대로)
export interface UpdateUserProfileRequest {
  username: string;
  gender: Gender;
  age: number;
  height: number;
  weight: number;
}
