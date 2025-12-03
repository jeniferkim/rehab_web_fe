// 채팅 페이지 mock
// 초기 메시지 배열, 샘플 대화

import type { ChatMessage } from "../components/chat/ChatMessageBubble";

export const initialMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    text: "안녕하세요! 오늘 어떤 점이 궁금하신가요?",
  },
];