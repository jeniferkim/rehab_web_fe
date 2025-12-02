// src/components/settings/ToggleItem.tsx
import React from "react";

type Props = {
  label: string;
  icon?: React.ReactNode;
  value: boolean;
  onToggle: () => void;
};

const ToggleItem: React.FC<Props> = ({ label, icon, value, onToggle }) => {
  return (
    <div className="flex w-full items-center justify-between px-5 py-4">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={value}
          onChange={onToggle}
          className="peer sr-only"
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-5"></div>
      </label>
    </div>
  );
};

export default ToggleItem;
