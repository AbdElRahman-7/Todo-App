import { useDrag } from "react-dnd";
import type { Task } from "../../types/Todo";
import { useRef, useState, useEffect } from "react";
import { useTaskContext } from "../../context/useTaskContext";
import AddTask from "../AddTask/AddTask";

interface TaskProps {
  task: Task;
  updateTask: (task: Task) => void;
}

const TaskComponent = ({ task, updateTask }: TaskProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { deleteTask } = useTaskContext();
  const [editing, setEditing] = useState(false);
  const [newCheck, setNewCheck] = useState("");

  // Toggle checklist item
  const toggleChecklist = (index: number) => {
    const updatedChecklist = task.checklist.map((c, i) =>
      i === index ? { ...c, done: !c.done } : c,
    );
    updateTask({ ...task, checklist: updatedChecklist });
  };

  // Add new checklist item
  const addChecklistItem = () => {
    if (!newCheck.trim()) return;
    updateTask({
      ...task,
      checklist: [
        ...task.checklist,
        { id: String(Date.now()), text: newCheck.trim(), done: false },
      ],
    });
    setNewCheck("");
  };

  // Drag functionality
  const [, drag] = useDrag({
    type: "TASK",
    item: { ...task },
  });

  useEffect(() => {
    if (ref.current) drag(ref.current);
  }, [drag]);

  if (editing) {
    return (
      <AddTask
        status={task.status}
        closeForm={() => setEditing(false)}
        isGeneral={false}
        taskToEdit={task} 
      />
    );
  }

  return (
    <div ref={ref} className={`task-card ${task.status}`}>
      <h4 className="task-title">{task.title}</h4>
      {task.description && <p className="task-desc">{task.description}</p>}

      {task.labels.length > 0 && (
        <div className="task-labels">
          {task.labels.map((label, idx) => (
            <span key={idx} className="label">
              {label}
            </span>
          ))}
        </div>
      )}

      <div className="task-actions">
        <button className="edit" onClick={() => setEditing(true)}>✏️</button>
        <button className="delete" onClick={() => deleteTask(task.id)}>×</button>
      </div>

      <div className="task-checklist">
        <ul>
          {task.checklist.map((item, i) => (
            <li
              key={item.id}
              className={`checklist-item ${item.done ? "done" : ""}`}
              onClick={() => toggleChecklist(i)}
            >
              {item.text}
            </li>
          ))}
        </ul>

        <div className="checklist-add">
          <input
            type="text"
            value={newCheck}
            onChange={(e) => setNewCheck(e.target.value)}
            placeholder="New checklist item"
          />
          <button onClick={addChecklistItem}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
