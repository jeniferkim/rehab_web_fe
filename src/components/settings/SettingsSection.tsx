// src/components/settings/SettingsSection.tsx
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

const SettingsSection: React.FC<Props> = ({ title, children }) => {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-sm font-semibold text-gray-500">{title}</h2>
      <div className="divide-y divide-gray-200 rounded-2xl bg-white shadow-sm">
        {children}
      </div>
    </section>
  );
};

export default SettingsSection;
