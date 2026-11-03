import { useEffect, useState } from "react";
import type { Task } from "./schemas";
import { simulateFetchTasks } from "./mockApi";
import TaskList from "./TaskList";
import NewTaskForm from "./newtaskform.tsx";

function TaskBoard() {
  const [status, setStatus] =
    useState<"loading" | "success" | "empty" | "error">("loading");
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = () => {
    setStatus("loading");
    simulateFetchTasks()
      .then((data) => {
        setTasks(data);
        setStatus(data.length === 0 ? "empty" : "success");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = (newTaskInput: { title: string; dueDate?: string }) => {
    const newTask: Task = {
      id: Date.now(),
      title: newTaskInput.title,
      done: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    if (status === "empty") setStatus("success");
  };

  // --- IF KONTROLLERİ (STRAND 1 STEP 2) ---
  let content;
  if (status === "loading") {
    content = <p>Loading tasks...</p>;
  } else if (status === "error") {
    content = (
      <div>
        <p>We couldn't load your tasks.</p>
        <button onClick={fetchTasks}>Try again</button>
      </div>
    );
  } else if (status === "empty") {
    content = <p>No tasks yet. Add your first one below.</p>;
  } else {
    content = <TaskList tasks={tasks} />;
  }

  return (
    <div>
      <NewTaskForm onAddTask={handleAddTask} />
      {/* Strand 3: aria-live kapsayıcısı */}
      <div aria-live="polite">
        {content}
      </div>
    </div>
  );
}

export default TaskBoard;