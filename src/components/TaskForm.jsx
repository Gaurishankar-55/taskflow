import { useState } from "react";
import { validateTask } from "../utils/helpers";

export default function TaskForm({ task, onSave, onClose }) {
  const isEditing = Boolean(task);

  const [form, setForm] = useState({
    title: task?.title ?? "",
    description: task?.description ?? "",
    priority: task?.priority ?? "medium",
    dueDate: task?.dueDate ?? "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateTask(form, isEditing);
    setErrors(found);
    if (Object.keys(found).length > 0) return; // invalid input -> stop here

    onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  };

  return (
    <div className="overlay" onClick={onClose}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2>{isEditing ? "Edit Task" : "New Task"}</h2>

        <div className="field">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Finish internship report"
            autoFocus
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            placeholder="Optional details"
          />
          {errors.description && <div className="error">{errors.description}</div>}
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor="priority">Priority</label>
            <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="dueDate">Due date *</label>
            <input
              id="dueDate"
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />
            {errors.dueDate && <div className="error">{errors.dueDate}</div>}
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">
            {isEditing ? "Save changes" : "Add task"}
          </button>
        </div>
      </form>
    </div>
  );
}
