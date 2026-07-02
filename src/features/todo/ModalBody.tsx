import { PRIORITIES, type IModalBodyProps, type IPriority } from "./constant";

const ModalBody: React.FC<IModalBodyProps> = ({
  priority,
  setPriority,
  task,
  setTask,
  handleSubmit,
  errorTaskMessage,
  setErrorTask,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="task-name"
        className="block mb-2 text-sm font-bold text-gray-500"
      >
        Task
      </label>
      <input
        type="text"
        name="task-name"
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
          if (errorTaskMessage) {
            setErrorTask(null);
          }
        }}
        placeholder="Enter your task..."
        className={`w-full rounded-xl border ${errorTaskMessage ? "border-red-300" : "border-gray-300"} bg-white shadow-sm text-gray-600 text-sm font-normal px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200`}
      />

      <p className="text-red-500 text-sm mt-1">{errorTaskMessage}</p>

      <div className="mt-5">
        <span className="block text-sm font-bold text-gray-500">Priority</span>
        <ul className="flex gap-3 mt-3">
          {PRIORITIES.map((p: IPriority) => (
            <li
              key={p.id}
              onClick={() => setPriority(p.labelName)}
              className={`cursor-pointer rounded-lg px-4 py-2 w-24 text-center font-medium text-sm capitalize transition border ${p.borderColor} ${priority === p.labelName ? p.selectedColor : p.hoverColor}`}
            >
              {p.labelName}
            </li>
          ))}
        </ul>
      </div>

      <button className="mt-7 w-full flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold transition-shadow duration-200 disabled:cursor-not-allowed bg-purple-600 text-white shadow-lg shadow-purple-400/25 hover:bg-purple-700 disabled:bg-gray-400">
        Add
      </button>
    </form>
  );
};

export default ModalBody;
