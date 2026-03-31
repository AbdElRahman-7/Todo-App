import Column from "../Column/Column";
import AddTask from "../AddTask/AddTask";

const Board = () => {
  return (
    <>
      <div className="board">
        <AddTask />
        <Column status="todo" />
        <Column status="in-progress" />
        <Column status="done" />
      </div>
    </>
  );
};

export default Board;
