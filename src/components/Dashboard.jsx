import { isOverdue } from "../utils/helpers";

export default function Dashboard({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const overdue = tasks.filter(isOverdue).length;

  const stats = [
    { label: "Total", value: total, className: "" },
    { label: "Pending", value: pending, className: "pending" },
    { label: "Completed", value: completed, className: "completed" },
    { label: "Overdue", value: overdue, className: "overdue" },
  ];

  return (
    <div className="dashboard">
      {stats.map((s) => (
        <div key={s.label} className={`stat ${s.className}`}>
          <div className="num">{s.value}</div>
          <div className="label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
