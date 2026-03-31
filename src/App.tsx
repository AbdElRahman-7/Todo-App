import './App.css'
import Board from './components/Board/Board';
function App() {

  return (
      <div style={{ padding: "20px" }}>
        <h1>TODO App</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <Board />
        </div>
      </div>
  );
}

export default App
