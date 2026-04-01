import TaskComponent from "../Task/Task";
import type { Task } from "../../types/Todo";
interface TaskListProps {
  tasks: Task[];
  updateTask: (task: Task) => void;
}

const TaskList = ({ tasks, updateTask }: TaskListProps) => {

  return (
    <div className="taskList">
      
      {tasks.map((task) => (
        <TaskComponent key={task.id} task={task} updateTask={updateTask} />
      ))}
    </div>
  );
};

export default TaskList;
