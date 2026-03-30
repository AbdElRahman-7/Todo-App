import type { TaskCardProps } from "../../types/todo";

const TaskCard = ({ task }: TaskCardProps) => {
if (!task) return null;

return (
<div className="task-card">
    <h3>{task.title}</h3>
    {task.description && <p>{task.description}</p>}

    <div className="labels">
    {task.labels.map((label, index) => (
        <span key={index} className="label">
        {label}
        </span>
    ))}
    </div>
    
    <div className="checklist">
    {task.checklist.map((item, index) => (
        <div key={index} className="checklist-item">gi
        <input type="checkbox" checked={item.done} readOnly />
        <span>{item.text}</span>
        </div>
    ))}
    </div>
</div>
);
};

export default TaskCard;
