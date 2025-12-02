// src/pages/SettingsPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SettingsSection from "../components/settings/SettingsSection";
import SettingsItem from "../components/settings/SettingsItem";
import ToggleItem from "../components/settings/ToggleItem";
// import { Divider } from "../components/settings/Divider";

// react-icons
import {
  HiOutlineBell,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineTrash,
} from "react-icons/hi2";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  const toggleNotification = () => {
    setIsNotificationEnabled((prev) => !prev);
  };

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">설정</h1>

      {/* --------------------------- */}
      {/* 🔔 알림 · 계정 관련 설정     */}
      {/* --------------------------- */}
      <SettingsSection title="계정 및 알림">
        <ToggleItem
          label="알림 설정"
          icon={<HiOutlineBell size={20} className="text-gray-500" />}
          value={isNotificationEnabled}
          onToggle={toggleNotification}
        />

        <SettingsItem
          label="비밀번호 재설정"
          icon={<HiOutlineLockClosed size={20} className="text-gray-500" />}
          onClick={() => navigate("/app/settings/password-reset")}
        />

        <SettingsItem
          label="회원정보 수정"
          icon={<HiOutlineUser size={20} className="text-gray-500" />}
          onClick={() => navigate("/app/settings/profile")}
        />
      </SettingsSection>

      {/* --------------------------- */}
      {/* 🚪 로그아웃 / 계정 탈퇴      */}
      {/* --------------------------- */}
      <SettingsSection title="보안">
        <SettingsItem
          label="로그아웃"
          icon={<HiOutlineArrowLeftOnRectangle size={20} className="text-gray-500" />}
          onClick={() => {
            console.log("Logout clicked");
            // TODO: logout 처리 후 /login 이동
          }}
        />

        <SettingsItem
          label="계정 탈퇴"
          icon={<HiOutlineTrash size={20} className="text-red-500" />}
          onClick={() => {
            console.log("Delete account clicked");
            // TODO: 탈퇴 확인 모달 띄우기
          }}
        />
      </SettingsSection>
    </div>
  );
};

export default SettingsPage;
