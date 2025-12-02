// src/components/chat/ChatMessageBubble.tsx
import React from "react";
import { FaRobot } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi2";

export type ChatRole = "assistant" | "user";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  isTyping?: boolean;
};

type Props = {
  message: ChatMessage;
};

const ChatMessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* 어시스턴트 아바타 */}
      {!isUser && (
        <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white">
          <FaRobot className="h-4 w-4" />
        </div>
      )}

      {/* 말풍선 */}
      <div
        className={`max-w-[70%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "rounded-br-md bg-blue-600 text-white"
            : "rounded-bl-md bg-white text-gray-900"
        }`}
      >
        {message.isTyping ? (
          <span className="inline-flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0.1s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]" />
          </span>
        ) : (
          message.text
        )}
      </div>

      {/* 사용자 아바타 */}
      {isUser && (
        <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600">
          <HiOutlineUser className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default ChatMessageBubble;
