import TaskItem from "./TaskItem";

export default function TaskList({ tasks, totalCount, onToggle, onEdit, onDelete }) {
  // Empty state 1: no tasks created yet
  if (totalCount === 0) {
    return (
      <div className="empty">
        <div className="icon">📝</div>
        <p>No tasks yet. Click "New Task" to add your first one.</p>
      </div>
    );
  }

  // Empty state 2: tasks exist, but search/filters hide them all
  if (tasks.length === 0) {
    return (
      <div className="empty">
        <div className="icon">🔍</div>
        <p>No tasks match your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
