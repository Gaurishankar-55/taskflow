import { formatDate, isOverdue, isDueSoon } from "../utils/helpers";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const overdue = isOverdue(task);
  const classes = [
    "task",
    task.priority,
    task.completed ? "done" : "",
    overdue ? "is-overdue" : "",
  ].join(" ");

  return (
    <div className={classes}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as complete`}
      />

      <div className="task-body">
        <div className="task-title">{task.title}</div>
        {task.description && <div className="task-desc">{task.description}</div>}

        <div className="meta">
          <span className={`badge ${task.priority}`}>{task.priority} priority</span>
          <span className="badge">Due: {formatDate(task.dueDate)}</span>
          <span className="badge">Created: {formatDate(task.createdAt)}</span>
          {overdue && <span className="badge overdue">Overdue</span>}
          {isDueSoon(task) && <span className="badge soon">Due soon</span>}
          {task.completed && <span className="badge low">Completed</span>}
        </div>
      </div>

      <div className="actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button className="btn-danger" onClick={() => onDelete(task)}>Delete</button>
      </div>
    </div>
  );
}
