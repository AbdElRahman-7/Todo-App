import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Task } from "../types/Todo";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}
const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TaskProvider = ({ children }: { children: ReactNode }) => {
    //Initialize state with localStorage data
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  //Persist tasks to localStorage on change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);



  //CUD operations
  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    );
  };
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  //Context value
  const contextValue: TaskContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
export { TaskContext, TaskProvider };

