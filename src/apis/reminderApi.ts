// src/apis/reminderApi.ts
import { apiClient } from "./client";
import type {
  Reminder,
  CreateReminderRequest,
  UpdateReminderRequest,
} from "../types/apis/reminder";
import type { ApiResponse } from "../types/apis/common";

export const reminderApi = {
  // GET /reminders
  async list(): Promise<Reminder[]> {
    const { data } = await apiClient.get<ApiResponse<Reminder[]>>("/reminders");
    return data.result;
  },

  // POST /reminders
  async create(payload: CreateReminderRequest): Promise<Reminder> {
    const { data } = await apiClient.post<ApiResponse<Reminder>>(
      "/reminders",
      payload
    );
    return data.result;
  },

  // PATCH /reminders/{id}
  async update(
    reminderId: number,
    payload: UpdateReminderRequest
  ): Promise<Reminder> {
    const { data } = await apiClient.patch<ApiResponse<Reminder>>(
      `/reminders/${reminderId}`,
      payload
    );
    return data.result;
  },
};
