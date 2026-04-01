import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.scss";
import { TaskProvider } from "./context/TaskContext.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </TaskProvider>
  </StrictMode>,
);
