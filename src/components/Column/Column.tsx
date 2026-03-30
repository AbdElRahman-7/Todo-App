import TaskCard from "../TaskCard/TaskCard";
import type { Task } from "../../types/todo";

type ColumnProps = {
  title: string;
};

const dummyTasks: Task[] = [
  {
    id: "1",
    title: "Learn React",
    description: "Study hooks",
    status: "todo",
    labels: ["frontend"],
    checklist: [
      { text: "useState", done: true },
      { text: "useEffect", done: false },
    ],
  },
];

const Column = ({ title }: ColumnProps) => {
  return (
    <div>
      <h2>{title}</h2>
      {dummyTasks.map((task) => 
        <TaskCard key={task.id} task={task} />
      )}
    </div>
  );
};

export default Column;
