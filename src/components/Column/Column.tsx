import "./column.scss";
import TaskList from "../TaskList/TaskList";
import { useDrop } from "react-dnd";
import { useTaskContext } from "../../context/useTaskContext";
import type { Task } from "../../types/Todo";
import { useEffect, useRef } from "react";
interface ColumnProps {
  status: "todo" | "in-progress" | "done";
}

const Column = ({ status }: ColumnProps) => {
  const { updateTask } = useTaskContext();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: Task) => {
      updateTask({ ...item, status });
    },
  });

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [drop]);

  return (
    <div className="column" ref={ref}>
      <h2>{status.toUpperCase()}</h2>
      <TaskList status={status} />
    </div>
  );
};

export default Column;
