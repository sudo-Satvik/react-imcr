import type { Dispatch, SubmitEvent, SetStateAction } from "react";

export type TPriority = "high" | "medium" | "low";
export type TProgress = "todo" | "in progress" | "done";

export interface ITodo {
  id: string;
  taskName: string;
  priority: TPriority;
  progress: TProgress;
}

export interface IPriority {
  id: number;
  textColor: string;
  hoverColor: string;
  borderColor: string;
  selectedColor: string;
  labelName: "high" | "low" | "medium";
}

export const PRIORITIES: IPriority[] = [
  {
    id: 1,
    textColor: "text-red-500",
    hoverColor: "hover:bg-red-50",
    borderColor: "border-red-500",
    selectedColor: "bg-red-500 text-white",
    labelName: "high",
  },
  {
    id: 2,
    textColor: "text-yellow-500",
    hoverColor: "hover:bg-yellow-50",
    borderColor: "border-yellow-500",
    selectedColor: "bg-yellow-500 text-white",
    labelName: "medium",
  },
  {
    id: 3,
    textColor: "text-green-500",
    hoverColor: "hover:bg-green-50",
    borderColor: "border-green-500",
    selectedColor: "bg-green-500 text-white",
    labelName: "low",
  },
];

export interface IModalBodyProps {
  priority: TPriority;
  setPriority: Dispatch<SetStateAction<TPriority>>;
  task: string;
  setTask: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  errorTaskMessage: string;
  setErrorTask: Dispatch<SetStateAction<string>>;
}

export interface ITodoCardProps {
  item: ITodo;
  onProgress: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface IGroupedTask {
  priority: TPriority;
  tasks: ITodo[];
}
