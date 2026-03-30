import React from "react";
import { type Task  } from "../../types/Todo";

interface TaskProps {
  task: Task;
}

const TaskComponent: React.FC<TaskProps> = ({ task }) => {
  return (
    <div
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h4>{task.title}</h4>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskComponent;
