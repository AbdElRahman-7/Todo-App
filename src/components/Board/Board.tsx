import Column from "../Column/Column";
import AddTask from "../AddTask/AddTask";
import { useState } from "react";
import { useTaskContext } from "../../context/useTaskContext";

const Board = () => {
  const { tasks } = useTaskContext();
  const [search, setSearch] = useState("");
  const [filterLabel, setFilterLabel] = useState("");

  const allLabels = Array.from(new Set(tasks.flatMap((task) => task.labels)));

  return (
    <div className="board">
      <div className="board-header">
        <AddTask
          isGeneral={true}
          closeForm={() => console.log("Closing form")}
        />
        <div className="board-controls">
          <input
            type="text"
            placeholder="Search Tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={filterLabel}
            onChange={(e) => setFilterLabel(e.target.value)}
            className="filter-select"
          >
            <option value="">All Labels</option>
            {allLabels.map((label, i) => (
              <option key={i} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="boardContent">
        <Column status="todo" search={search} filterLabel={filterLabel} />
        <Column
          status="in-progress"
          search={search}
          filterLabel={filterLabel}
        />
        <Column status="done" search={search} filterLabel={filterLabel} />
      </div>
    </div>
  );
};

export default Board;