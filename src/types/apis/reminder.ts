// src/types/apis/reminder.ts

// 추후 타입이 늘어날 수 있으니 string union으로 열어두자
export type ReminderType = "EXERCISE";         // 나중에 "ASSESSMENT" 등 추가 가능
export type ReminderChannel = "PUSH";         // 나중에 "EMAIL" 등 추가 가능

// 서버에서 내려주는 Reminder 한 건
export interface Reminder {
  reminderId: number;
  type: ReminderType;
  channel: ReminderChannel;
  rule: string;
  enabled: boolean;
  nextFireAt: string;  // ISO8601 string
  createdAt: string;
  updatedAt: string;
}

// POST /reminders 요청 바디
export interface CreateReminderRequest {
  type: ReminderType;
  channel: ReminderChannel;
  rule: string;
  enabled: boolean;
}

// PATCH /reminders/{id} 요청 바디
// 스웨거는 둘 다 required로 돼있는데, 프론트 입장에서는 부분 수정도 편하게 하도록 optional로 두는 게 깔끔
export interface UpdateReminderRequest {
  rule?: string;
  enabled?: boolean;
}
