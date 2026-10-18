export const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };

// Today's date as YYYY-MM-DD in the user's local timezone
export const todayStr = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

export const isOverdue = (task) => !task.completed && task.dueDate < todayStr();

export const isDueSoon = (task) => {
  if (task.completed || isOverdue(task)) return false;
  const diffDays = (new Date(task.dueDate) - new Date(todayStr())) / 86400000;
  return diffDays <= 2;
};

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

// Search + filter + sort in one place so App stays small
export const getVisibleTasks = (tasks, { search, status, priority, dueBefore, sortBy }) => {
  let list = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  if (status === "completed") list = list.filter((t) => t.completed);
  if (status === "pending") list = list.filter((t) => !t.completed);
  if (status === "overdue") list = list.filter(isOverdue);
  if (priority !== "all") list = list.filter((t) => t.priority === priority);
  if (dueBefore) list = list.filter((t) => t.dueDate <= dueBefore);

  const sorted = [...list];
  if (sortBy === "deadline") sorted.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  if (sortBy === "priority") sorted.sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
  if (sortBy === "status") sorted.sort((a, b) => Number(a.completed) - Number(b.completed));
  if (sortBy === "newest") sorted.sort((a, b) => b.id.localeCompare(a.id));
  return sorted;
};

// Form validation: returns an object of error messages (empty = valid)
export const validateTask = (form, isEditing) => {
  const errors = {};
  const title = form.title.trim();

  if (!title) errors.title = "Title is required.";
  else if (title.length < 3) errors.title = "Title must be at least 3 characters.";
  else if (title.length > 80) errors.title = "Title can be at most 80 characters.";

  if (form.description.length > 300) errors.description = "Description can be at most 300 characters.";

  if (!form.dueDate) errors.dueDate = "Please pick a due date.";
  else if (!isEditing && form.dueDate < todayStr()) errors.dueDate = "Due date cannot be in the past.";

  return errors;
};
