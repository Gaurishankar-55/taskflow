import { useState, useMemo } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { getVisibleTasks, todayStr } from "./utils/helpers";
import Dashboard from "./components/Dashboard";
import Toolbar from "./components/Toolbar";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import ConfirmDelete from "./components/ConfirmDelete";

const STORAGE_KEY = "taskflow_tasks_v1";

export default function App() {
  // All tasks live in Local Storage, so they survive a page refresh
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, []);

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
    dueBefore: "",
    sortBy: "deadline",
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const visibleTasks = useMemo(() => getVisibleTasks(tasks, filters), [tasks, filters]);

  /* ----- actions ----- */
  const closeForm = () => {
    setFormOpen(false);
    setEditingTask(null);
  };

  const openNew = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const saveTask = (data) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...t, ...data } : t)));
    } else {
      const newTask = {
        id: Date.now().toString(),
        ...data,
        completed: false,
        createdAt: todayStr(),
      };
      setTasks([newTask, ...tasks]);
    }
    closeForm();
  };

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const confirmDelete = () => {
    setTasks(tasks.filter((t) => t.id !== deletingTask.id));
    setDeletingTask(null);
  };

  return (
    <div className="container">
      <header>
        <h1>
          Task<span>Flow</span>
        </h1>
        <button className="btn-primary" onClick={openNew}>
          + New Task
        </button>
      </header>

      <Dashboard tasks={tasks} />
      <Toolbar filters={filters} onChange={setFilters} />

      <TaskList
        tasks={visibleTasks}
        totalCount={tasks.length}
        onToggle={toggleTask}
        onEdit={openEdit}
        onDelete={setDeletingTask}
      />

      {formOpen && <TaskForm task={editingTask} onSave={saveTask} onClose={closeForm} />}

      {deletingTask && (
        <ConfirmDelete
          task={deletingTask}
          onConfirm={confirmDelete}
          onClose={() => setDeletingTask(null)}
        />
      )}
    </div>
  );
}
