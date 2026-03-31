import { useDrag } from "react-dnd";
import { type Task  } from "../../types/Todo";
import { useRef } from "react";
import { useEffect } from "react";

interface TaskProps {
  task: Task;
}

const TaskComponent=  ({ task }: TaskProps) => {
    const ref = useRef<HTMLDivElement>(null);

  const [,drag]= useDrag({
    type:'TASK',
    item: { ...task },
  });
  
  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  return (
    <div 
      ref={ref}
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
