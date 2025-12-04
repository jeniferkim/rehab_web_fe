// components/routine/RoutineHeaderForm.tsx
// 루틴 이름 입력/수정

import React from "react";

type Props = {
  name: string;
  onChangeName: (value: string) => void;
};

const RoutineHeaderForm: React.FC<Props> = ({ name, onChangeName }) => {
  return (
    <section className="mt-1">
      <input
        className="w-full border-b border-gray-200 bg-transparent pb-2 text-2xl font-bold outline-none"
        placeholder="루틴 이름을 입력하세요"
        value={name}
        onChange={(e) => onChangeName(e.target.value)}
      />
    </section>
  );
};

export default RoutineHeaderForm;
