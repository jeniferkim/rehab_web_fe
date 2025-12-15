// src/stores/chatStore.ts
import { create } from "zustand";
import type { ChatMessage } from "../types/apis/chat";

type ChatState = {
  messages: ChatMessage[];
  isLoading: boolean;
  addMessage: (m: ChatMessage) => void;
  setLoading: (v: boolean) => void;
  clear: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),
  setLoading: (v) => set({ isLoading: v }),
  clear: () => set({ messages: [] }),
}));
