// src/pages/ChatPage.tsx
import React, { useState } from "react";
import ChatMessageBubble from "../components/chat/ChatMessageBubble";
import QuickReplyChips from "../components/chat/QuickReplyChips";
import ChatInputBar from "../components/chat/ChatInputBar";
import type { ChatMessage } from "../types/apis/chat";
import { aiApi } from "../apis/aiApi";

const quickReplies = ["허리가 아파요", "무릎 통증이 있어요", "어깨가 결려요"];

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "a-init",
      role: "assistant",
      type: "text",
      text: "어느 부위가 불편한가요? 예: 허리가 아파요",
    },
  ]);
  const [input, setInput] = useState("");

  const appendMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const inferTargetArea = (text: string) => {
    // ✅ 아주 단순 룰(지금은 임시). 모바일 답 오면 팀 기준에 맞춰 교체
    if (/(허리)/.test(text)) return "LOWER_BACK";
    if (/(무릎)/.test(text)) return "KNEE";
    if (/(어깨)/.test(text)) return "SHOULDER";
    return "LOWER_BACK";
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input.trim();

    appendMessage({
      id: `u-${Date.now()}`,
      role: "user",
      type: "text",
      text: userText,
    });

    setInput("");

    // typing 메시지
    const typingId = `a-typing-${Date.now()}`;
    appendMessage({
      id: typingId,
      role: "assistant",
      type: "text",
      text: "추천을 생성 중이에요...",
      isTyping: true,
    });

    try {
      const targetArea = inferTargetArea(userText);

      const res = await aiApi.recommend({
        context: {
          currentPainLevel: 6, // ✅ 임시. 나중에 통증 입력값 연결
          goal: "통증 완화", // ✅ 임시. 나중에 선택값 연결
          targetArea,
        },
      });

      // typing 제거
      setMessages((prev) => prev.filter((m) => m.id !== typingId));

      if (!res.isSuccess) {
        appendMessage({
          id: `a-fail-${Date.now()}`,
          role: "assistant",
          type: "text",
          text: res.message || "추천 생성에 실패했어요.",
        });
        return;
      }

      appendMessage({
        id: `a-rec-${Date.now()}`,
        role: "assistant",
        type: "recommendation",
        summary: "현재 입력을 기반으로 추천했어요.",
        recommendations: res.result.recommendations, // ✅ 스웨거 그대로
      });
    } catch (e) {
      // typing 제거
      setMessages((prev) => prev.filter((m) => m.id !== typingId));

      appendMessage({
        id: `a-err-${Date.now()}`,
        role: "assistant",
        type: "text",
        text: "서버 연결이 원활하지 않아요. 잠시 후 다시 시도해주세요.",
      });

      console.log("에러 발생", e); // 에러 잡음
    }
  };

  const handleQuickReply = (text: string) => {
    setInput(text);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h1 className="mb-4 pb-3 text-2xl font-bold text-gray-900">채팅</h1>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4">
        <div className="flex-1 overflow-y-auto pb-2">
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <ChatMessageBubble key={msg.id} message={msg} />
            ))}
          </div>
        </div>

        <QuickReplyChips options={quickReplies} onSelect={handleQuickReply} />

        <ChatInputBar value={input} onChange={setInput} onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPage;
