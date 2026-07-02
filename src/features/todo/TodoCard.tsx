import { Edit, Trash2 } from "lucide-react";
import type React from "react";
import CircularProgress from "./CircularProgress";
import type { ITodoCardProps } from "./constant";
import { getColorBadge, getProgressCount } from "./helper";

const TodoCard: React.FC<ITodoCardProps> = ({
  item,
  onProgress,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      key={item.id}
      className="w-full shadow-[0px_6px_58px_rgba(196,203,214,0.10)] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 border border-gray-200"
    >
      <div className="flex-1 min-w-0 flex  justify-between items-start sm:items-center gap-3">
        <div className="flex gap-5 items-center">
          <div className="min-w-0">
            <span className="text-sm font-normal text-[#91929e] block mb-1">
              Task
            </span>
            <p className="text-base capitalize font-normal text-gray-900 truncate">
              {item.taskName}
            </p>
          </div>

          <div
            className={`text-sm font-semibold capitalize px-2 py-1 rounded-full ${getColorBadge(item.priority)} hidden sm:inline-flex`}
          >
            {item.priority}
          </div>
        </div>

        <div className="flex gap-5">
          {/* Circle */}
          <CircularProgress
            progress={getProgressCount(item.progress)}
            size={25}
            strokeWidth={3}
          />

          {/* Update :::: ToDo | Progress | Done */}
          <button
            className="rounded-lg capitalize px-3 py-2 text-[#7d8592] font-bold text-xs cursor-pointer min-w-18 text-center w-30"
            onClick={() => onProgress(item.id)}
          >
            {item.progress}
          </button>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => onEdit(item.id)}>
              <Edit />
            </button>
            <button className="text-red-500" onClick={() => onDelete(item.id)}>
              <Trash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
