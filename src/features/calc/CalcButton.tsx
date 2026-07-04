import React from "react";
import type { ICalcButtonProps } from "./interfaces";

const CalcButton: React.FC<ICalcButtonProps> = ({
  children,
  className,
  colorId,
  clickHandler,
}) => {
  return (
    <button
      onClick={clickHandler}
      className={`${colorId === 1 ? "text-[#339DFF] bg-[#005DB2]" : colorId === 2 ? "bg-[#616161] text-[#A5A5A5] text-[24px]!" : "bg-[#303136] text-[#29A8FF]"} px-[20.5px] py-1.5 text-[32px] rounded-2xl flex items-center justify-center font-semibold cursor-pointer transition-all active:scale-90 hover:opacity-70 ${className}`}
    >
      {children}
    </button>
  );
};

export default CalcButton;
