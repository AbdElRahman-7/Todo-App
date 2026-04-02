import TaskList from "../TaskList/TaskList";
import { useDrop } from "react-dnd";
import { useTaskContext } from "../../context/useTaskContext";
import type { Task } from "../../types/Todo";
import { useEffect, useRef, useState } from "react";
import AddTask from "../AddTask/AddTask";
interface ColumnProps {
  status: "todo" | "in-progress" | "done";
  search?: string;
  filterLabel?: string;
}

const Column = ({ status, search = "", filterLabel = "" }: ColumnProps) => {
  const { tasks, updateTask } = useTaskContext();
  const [showForm, setShowForm] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  
  const ref = useRef<HTMLDivElement>(null);

  const filteredTasks = tasks.filter((task: Task) => {
    const matchesStatus = task.status === status;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesLabel = filterLabel ? task.labels.includes(filterLabel) : true;
    return matchesStatus && matchesSearch && matchesLabel;
  });
  


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
      <div className="column-header">
        <h2 className="column__title">{status.toUpperCase()}</h2>
        <div className="column-actions">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="toggle-btn"
            disabled={filteredTasks.length === 0}
          >
            {isCollapsed ? "Show" : "Hide"} All
          </button>
          <button className="add-task-btn" onClick={() => setShowForm(!showForm)}>
            +
          </button>
        </div>
      </div>
      
      {!isCollapsed && (
        <>
          {showForm && (
            <AddTask   isGeneral={false} status={status} closeForm={() => setShowForm(false)} />
          )}

          <div className="column__tasks">
            <TaskList tasks={filteredTasks} updateTask={updateTask} />
          </div>
        </>
      )}
    </div>
  );
};

export default Column;
