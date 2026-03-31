import { useTaskContext } from "../../context/useTaskContext";
import TaskComponent from "../Task/Task";
interface TaskListProps {
  status: "todo" | "in-progress" | "done";
}

const TaskList = ({ status }: TaskListProps) => {
  const { tasks } = useTaskContext();
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {filteredTasks.map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
