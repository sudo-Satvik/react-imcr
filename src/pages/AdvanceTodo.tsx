import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../components/ui/custom-modal/modal";
import type { IGroupedTask, ITodo, TPriority } from "../features/todo/constant";
import ModalBody from "../features/todo/ModalBody";
import TodoCard from "../features/todo/TodoCard";

const LOCAL_STORAGE_KEY = "advanceTodo";

const fetchDefaultTodo = (): ITodo[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }

  return [];
};

const AdvanceTodo = () => {
  const [todo, setTodo] = useState<ITodo[]>(fetchDefaultTodo);
  const [task, setTask] = useState<string>("");
  const [priority, setPriority] = useState<TPriority>("high");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeleteingId] = useState<string | null>(null);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false);
  const [errorTask, setErrorTask] = useState<string | null>(null);

  // Modal Closing Logic (Accessibility)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenAddModal(false);
        setOpenEditModal(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todo));
  }, [todo]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!task.trim()) {
      setErrorTask("Please enter the task name :)");
      return;
    }

    if (editingId) {
      // Edit existing task
      setTodo((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                taskName: task,
                priority,
              }
            : item,
        ),
      );

      setEditingId(null);
      setOpenEditModal(false);
    } else {
      // Add new task
      const newTodo: ITodo = {
        id: crypto.randomUUID(),
        taskName: task,
        priority,
        progress: "todo",
      };

      setTodo((prev) => [...prev, newTodo]);

      setOpenAddModal(false);
    }

    resetTaskInputs();
  };

  const resetTaskInputs = () => {
    setTask("");
    setPriority("high");
    setErrorTask(null);
  };

  const handleModalClose = () => {
    resetTaskInputs();
    setOpenAddModal(false);
    setOpenEditModal(false);
    setDeleteingId(null);
  };

  const groupedTask: IGroupedTask[] = [
    {
      priority: "high",
      tasks: todo.filter((task) => task.priority === "high"),
    },
    {
      priority: "medium",
      tasks: todo.filter((task) => task.priority === "medium"),
    },
    {
      priority: "low",
      tasks: todo.filter((task) => task.priority === "low"),
    },
  ];

  const handleProgress = (id: string): void => {
    setTodo((prev) =>
      prev.map((item: ITodo) => {
        if (item.id !== id) return item;

        let nextProgress: "todo" | "in progress" | "done";

        if (item.progress === "todo") {
          nextProgress = "in progress";
        } else if (item.progress === "in progress") {
          nextProgress = "done";
        } else {
          nextProgress = "todo";
        }

        return {
          ...item,
          progress: nextProgress,
        };
      }),
    );
  };

  const handleEditTask = (id: string): void => {
    debugger;
    const todoToEdit = todo.find((item: ITodo) => item.id === id);

    if (!todoToEdit) return;

    setEditingId(todoToEdit.id);
    setTask(todoToEdit.taskName);
    setPriority(todoToEdit.priority);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (id: string): void => {
    setDeleteingId(id);
    setOpenConfirmationModal(true);
  };

  const handleDeleteTask = (): void => {
    if (deletingId) {
      setTodo((prev) => prev.filter((item) => item.id !== deletingId));
      setDeleteingId(null);
    }

    setOpenConfirmationModal(false);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-start items-center w-full">
        {/* Heading */}
        <div className="flex justify-between items-center max-w-180 w-full mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 font-secondary">
            Task List
          </h1>
          <button
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold transition-shadow duration-200 disabled:cursor-not-allowed bg-purple-600 text-white shadow-lg shadow-purple-400/25 hover:bg-purple-700 disabled:bg-gray-400"
            onClick={() => setOpenAddModal(true)}
          >
            <Plus /> Add Task
          </button>
        </div>

        {/* Content List */}
        <div className="flex flex-col gap-4 max-w-180 w-full">
          {todo && todo.length > 0 ? (
            groupedTask.map((group: IGroupedTask) => (
              <div
                key={group.priority}
                className="flex flex-col gap-4 max-w-180 w-full"
              >
                {group.tasks.map((todo: ITodo) => (
                  <TodoCard
                    item={todo}
                    onProgress={handleProgress}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            ))
          ) : (
            <p className="font-semibold text-xl text-gray-600 h-40 flex items-center justify-center">
              No Tasks as of now
            </p>
          )}
        </div>
      </div>

      {openAddModal &&
        createPortal(
          <Modal
            onCrossClick={handleModalClose}
            header={"Add a Task"}
            children={
              <ModalBody
                priority={priority}
                setPriority={setPriority}
                task={task}
                setTask={setTask}
                handleSubmit={handleSubmit}
                errorTaskMessage={errorTask}
                setErrorTask={setErrorTask}
              />
            }
          />,
          document.body,
        )}

      {openEditModal &&
        createPortal(
          <Modal
            onCrossClick={handleModalClose}
            header={"Edit your Task"}
            children={
              <ModalBody
                priority={priority}
                setPriority={setPriority}
                task={task}
                setTask={setTask}
                handleSubmit={handleSubmit}
                errorTaskMessage={errorTask}
                setErrorTask={setErrorTask}
              />
            }
          />,
          document.body,
        )}

      {openConfirmationModal &&
        createPortal(
          <Modal onCrossClick={handleModalClose}>
            <div className="flex flex-col items-center justify-center py-6">
              <p className="text-xl font-semibold text-gray-900 leading-relaxed">
                Are you sure you want to delete this task?
              </p>

              <div className="flex justify-center gap-6 mt-8">
                <button
                  onClick={handleDeleteTask}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold transition-shadow duration-200 disabled:cursor-not-allowed bg-purple-600 text-white shadow-lg shadow-purple-400/25 hover:bg-purple-700 disabled:bg-gray-400"
                >
                  Delete
                </button>
                <button
                  onClick={() => setOpenConfirmationModal(false)}
                  style={{ border: "1px solid #d1d5dc" }}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold transition-shadow duration-200 disabled:cursor-not-allowed bg-white text-gray-500 border border-gray-300 shadow-sm hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>,
          document.body,
        )}
    </>
  );
};

export default AdvanceTodo;
