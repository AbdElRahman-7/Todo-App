import Board from "./components/Board/Board";
import "./styles/main.scss";

function App() {


  return (
    <div className="app container">
      <h1 className="app-title">TODO App</h1>
      <div className="app-content">
        <Board />
      </div>
    </div>
  );
}

export default App;
