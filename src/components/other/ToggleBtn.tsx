import React from "react";

interface IToggleBtnProps {
  condition: boolean | number | string | unknown;
  triggerFunc: () => void;
}

const ToggleBtn: React.FC<IToggleBtnProps> = ({ condition, triggerFunc }) => {
  return (
    <div
      className={`w-10 h-5 rounded-full cursor-pointer transition-all ${
        condition ? "bg-blue-300" : "bg-gray-300"
      }`}
      onClick={triggerFunc}
    >
      <div
        className={`w-5 h-5 bg-blue-600 rounded-full shadow-lg transition-all ${
          condition ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </div>
  );
};

export default ToggleBtn;
