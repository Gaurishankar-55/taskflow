export default function Toolbar({ filters, onChange }) {
  const set = (name) => (e) => onChange({ ...filters, [name]: e.target.value });

  return (
    <div className="toolbar">
      <input
        className="search"
        placeholder="Search by title..."
        value={filters.search}
        onChange={set("search")}
      />
      <select value={filters.status} onChange={set("status")} aria-label="Filter by status">
        <option value="all">All status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="overdue">Overdue</option>
      </select>
      <select value={filters.priority} onChange={set("priority")} aria-label="Filter by priority">
        <option value="all">All priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select value={filters.sortBy} onChange={set("sortBy")} aria-label="Sort tasks">
        <option value="deadline">Sort: Deadline</option>
        <option value="priority">Sort: Priority</option>
        <option value="status">Sort: Status</option>
        <option value="newest">Sort: Newest</option>
      </select>
      <input
        type="date"
        value={filters.dueBefore}
        onChange={set("dueBefore")}
        title="Show tasks due on or before this date"
        aria-label="Due on or before"
      />
    </div>
  );
}
