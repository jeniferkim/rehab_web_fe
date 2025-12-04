// src/pages/ChatPage.tsx

import React, { useState } from "react";
import ChatMessageBubble, {
  type ChatMessage,
} from "../components/chat/ChatMessageBubble";
import QuickReplyChips from "../components/chat/QuickReplyChips";
import ChatInputBar from "../components/chat/ChatInputBar";
import { initialMessages } from "../mocks/chatMocks";


const quickReplies = ["허리가 아파요", "무릎 통증이 있어요", "어깨가 결려요"];

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");

  const appendMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();

    appendMessage({
      id: `u-${Date.now()}`,
      role: "user",
      text: userText,
    });

    setInput("");

    // 간단한 mock 응답
    setTimeout(() => {
      appendMessage({
        id: `a-${Date.now()}`,
        role: "assistant",
        text: "입력해 주셔서 감사합니다. 이 내용은 추후 AI 응답에 연결될 예정입니다.",
      });
    }, 500);
  };

  const handleQuickReply = (text: string) => {
    setInput(text);
  };

  return (
    <div className="flex h-full flex-col">
    {/* 상단 헤더 + 가로폭 제한 */}
    <div className="mx-auto w-full max-w-6xl px-4">
      <h1 className="mb-4 pb-3 text-2xl font-bold text-gray-900">
        채팅
      </h1>
    </div>

    {/* 채팅 본문 + max-w 유지 + flex-1 유지 */}
    <div className="mx-auto flex w-full max-w-6xl flex-col flex-1 px-4">
      {/* 메시지 리스트 */}
      <div className="flex-1 overflow-y-auto pb-2">
        <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <ChatMessageBubble key={msg.id} message={msg} />
            ))}
          </div>
        </div>

        {/* 추천 문구 chips */}
        <QuickReplyChips options={quickReplies} onSelect={handleQuickReply} />

        {/* 입력창 */}
        <ChatInputBar
          value={input}
          onChange={setInput}
          onSend={handleSend}
        />
      </div>
    </div>
  );
};

export default ChatPage;
