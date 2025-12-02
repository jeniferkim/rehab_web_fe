// src/components/char/ChatInputBar.tsx
import React from "react";
import { HiPaperAirplane } from "react-icons/hi2";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

const ChatInputBar: React.FC<Props> = ({
  value,
  onChange,
  onSend,
  disabled,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim().length > 0) onSend();
    }
  };

  return (
    <div className="border-t border-gray-100 bg-white px-3 py-3">
      <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2">
        <input
          type="text"
          className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
          placeholder="메시지를 입력하세요..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={onSend}
          disabled={disabled || value.trim().length === 0}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <HiPaperAirplane className="h-4 w-4 -translate-x-px rotate-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatInputBar;
