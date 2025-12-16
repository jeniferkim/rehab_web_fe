// src/components/chat/ChatMessageBubble.tsx
import React from "react";
import { FaRobot } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi2";
import type { ChatMessage } from "../../types/apis/chat";

type Props = {
  message: ChatMessage;
};

const AiAvatar = () => (
  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white">
    <FaRobot className="h-4 w-4" />
  </div>
);

const UserAvatar = () => (
  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600">
    <HiOutlineUser className="h-4 w-4" />
  </div>
);

const TypingDots = () => (
  <span className="inline-flex gap-1">
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0.1s]" />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]" />
  </span>
);

const ChatMessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.role === "user";

  // ✅ USER text
  if (isUser) {
    return (
      <div className="flex gap-3 justify-end">
        <div className="max-w-[70%] rounded-3xl rounded-br-md bg-blue-600 px-4 py-3 text-sm leading-relaxed text-white shadow-sm">
          {message.text}
        </div>
        <UserAvatar />
      </div>
    );
  }

  // ✅ ASSISTANT recommendation (스웨거 그대로)
  if (message.type === "recommendation") {
    return (
      <div className="flex gap-3 justify-start">
        <AiAvatar />

        <div className="max-w-[75%] rounded-3xl rounded-bl-md bg-white px-4 py-3 text-sm text-gray-900 shadow-sm">
          <div className="mb-2 font-semibold">추천 결과</div>
          <div className="mb-3 text-gray-600">{message.summary}</div>

          <div className="flex flex-col gap-2">
            {message.recommendations.map((r) => (
              <div
                key={r.exerciseId}
                className="rounded-xl border bg-gray-50 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold">{r.title}</div>
                    <div className="text-xs text-gray-500">
                      {r.bodyPart} · {r.difficulty}
                      {r.evidenceLevel ? ` · 근거 ${r.evidenceLevel}` : ""}
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-700">{r.reason}</div>

                {r.expectedBenefit && (
                  <div className="mt-1 text-xs text-gray-500">
                    기대 효과: {r.expectedBenefit}
                  </div>
                )}

                <div className="mt-3 rounded-lg bg-white px-3 py-2 text-xs text-gray-700">
                  <div>
                    {r.doseSuggestion.sets}세트 · {r.doseSuggestion.reps}회
                    {typeof r.doseSuggestion.holdSeconds === "number"
                      ? ` · 유지 ${r.doseSuggestion.holdSeconds}s`
                      : ""}
                  </div>
                  <div>휴식 {r.doseSuggestion.restSeconds}s</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ✅ ASSISTANT text
  return (
    <div className="flex gap-3 justify-start">
      <AiAvatar />

      <div className="max-w-[70%] rounded-3xl rounded-bl-md bg-white px-4 py-3 text-sm leading-relaxed text-gray-900 shadow-sm">
        {message ? <TypingDots /> : message} {/* 오류 잡음 */}
      </div>
    </div>
  );
};

export default ChatMessageBubble;
