import './column.scss';
import React from 'react';
import TaskList from '../TaskList/TaskList';
interface ColumnProps {
  status: "todo" | "in-progress" | "done";
}

const Column: React.FC<ColumnProps> = ({ status }) => {
  return (
    <div className="column"
    >
      <h2>{status.toUpperCase()}</h2>
      <TaskList status={status} />
    </div>
  );
};

export default Column;
