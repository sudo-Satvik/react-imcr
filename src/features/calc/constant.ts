import type { IButtons } from "./interfaces";

// btnCategory: 0 for numbers, 1 for operators and 0 for del and ac only
export const BUTTONS: IButtons[] = [
  {
    id: 1,
    vlabel: "Ac",
    btnCategory: 2,
  },
  {
    id: 2,
    vlabel: "del",
    btnCategory: 2,
  },
  {
    id: 3,
    vlabel: "÷",
    btnCategory: 1,
  },
  {
    id: 4,
    vlabel: "×",
    btnCategory: 1,
  },
  {
    id: 5,
    vlabel: "7",
    btnCategory: 0,
  },
  {
    id: 6,
    vlabel: "8",
    btnCategory: 0,
  },
  {
    id: 7,
    vlabel: "9",
    btnCategory: 0,
  },
  {
    id: 8,
    vlabel: "-",
    btnCategory: 1,
  },
  {
    id: 9,
    vlabel: "4",
    btnCategory: 0,
  },
  {
    id: 10,
    vlabel: "5",
    btnCategory: 0,
  },
  {
    id: 11,
    vlabel: "6",
    btnCategory: 0,
  },
  {
    id: 12,
    vlabel: "+",
    btnCategory: 1,
  },
  {
    id: 13,
    vlabel: "1",
    btnCategory: 0,
  },
  {
    id: 14,
    vlabel: "2",
    btnCategory: 0,
  },
  {
    id: 15,
    vlabel: "3",
    btnCategory: 0,
  },
  {
    id: 16,
    vlabel: "0",
    btnCategory: 0,
  },
  {
    id: 17,
    vlabel: ".",
    btnCategory: 0,
  },
  {
    id: 18,
    vlabel: "=",
    btnCategory: 1,
  },
];

export const ALLOWED_KEYS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  ".",
  "%",
  "×",
  "÷",
  "=",
  "del",
  "Ac",
];
