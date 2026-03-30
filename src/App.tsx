import './App.css'
import Board from './components/Board/Board';
import { TaskProvider } from './context/TaskContext';

function App() {

  return (
    <TaskProvider>
      <div style={{ padding: "20px" }}>
        <h1>TODO App</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <Board />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App
