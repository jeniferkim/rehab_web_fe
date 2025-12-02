// src/components/settings/SettingsItem.tsx
import React from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";

type Props = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

const SettingsItem: React.FC<Props> = ({ label, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-gray-50"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </div>
      <HiOutlineChevronRight size={18} className="text-gray-400" />
    </button>
  );
};

export default SettingsItem;
