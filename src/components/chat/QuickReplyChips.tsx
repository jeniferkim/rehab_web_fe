// src/components/chat/QuickReplyChips.tsx
import React from "react";

type Props = {
  options: string[];
  onSelect: (value: string) => void;
};

const QuickReplyChips: React.FC<Props> = ({ options, onSelect }) => {
  if (options.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 border-t border-gray-100 bg-white px-3 py-3">
      {options.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect(label)}
          className="rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default QuickReplyChips;
