import type React from "react";

export interface ICalcButtonProps {
  children: React.ReactNode | string;
  className?: string;
  colorId?: number;
  clickHandler?: () => void;
}

export interface IButtons {
  id: number;
  vlabel: string;
  btnCategory: 0 | 1 | 2;
}

export interface IHistoryState {
  id: string;
  expression: string;
  result: string;
}
