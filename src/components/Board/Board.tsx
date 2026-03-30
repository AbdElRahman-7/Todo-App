import Column from "../Column/Column";

const Board = () => {
  return (
    <>
      <div className="board">
        <Column title="Todo" />
        <Column title="In Progress" />
        <Column title="Done" />
      </div>
    </>
  );
};

export default Board;
